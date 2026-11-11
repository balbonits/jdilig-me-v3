import { expect, test, type Page } from '@playwright/test';

// Page transitions (docs/MOTION-SPEC.md): internal links run as View
// Transitions, reduced motion and browsers without the API change pages
// instantly, focus moves to the new h1, and Back keeps its scroll position.

type Probe = { calls: number; names: string[][] };

/** Counts startViewTransition calls and records the morph names present
 *  when the old page is captured (just before the DOM update). */
async function probeTransitions(page: Page) {
  await page.addInitScript(() => {
    const probe: Probe = { calls: 0, names: [] };
    (window as unknown as { __vt: Probe }).__vt = probe;
    const original = document.startViewTransition?.bind(document);
    if (!original) return;
    document.startViewTransition = ((arg: unknown) => {
      probe.calls += 1;
      const update = typeof arg === 'function' ? arg : (arg as { update?: () => unknown })?.update;
      return original(() => {
        probe.names.push(
          [...document.querySelectorAll<HTMLElement>('[style*="view-transition-name"]')].map(
            (el) => el.style.viewTransitionName,
          ),
        );
        return update?.();
      });
    }) as typeof document.startViewTransition;
  });
}

const probe = (page: Page) => page.evaluate(() => (window as unknown as { __vt: Probe }).__vt);

function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  return errors;
}

/** Every element's view-transition-name is unique on the page. */
async function expectUniqueNames(page: Page) {
  const names = await page.evaluate(() =>
    [...document.querySelectorAll('*')]
      .map((el) => getComputedStyle(el).viewTransitionName)
      .filter((n) => n && n !== 'none'),
  );
  expect(new Set(names).size).toBe(names.length);
}

for (const width of [320, 375, 1280]) {
  test(`at ${width}px a project card morphs its title into the detail page and focus lands on the h1`, async ({
    page,
  }) => {
    const errors = watchErrors(page);
    await page.setViewportSize({ width, height: 800 });
    await probeTransitions(page);
    await page.goto('/projects');
    await expectUniqueNames(page);

    await page.locator('main a[href="/projects/squanto"]').first().click();
    await expect(page).toHaveURL(/\/projects\/squanto$/);
    await expect(page).toHaveTitle('Squanto — jdilig.me');
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeFocused();
    await expectUniqueNames(page);

    const p = await probe(page);
    expect(p.calls).toBe(1);
    // Only the clicked card carried the morph name when the old page was captured.
    expect(p.names[0]).toEqual(['project-title']);
    expect(errors).toEqual([]);
  });
}

test('a UX card morphs into its case study, and header links also transition', async ({ page }) => {
  await probeTransitions(page);
  await page.goto('/ux');
  await page.locator('main a[href="/ux/design-system"]').click();
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveTitle('Contact — jdilig.me');
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();

  const p = await probe(page);
  expect(p.calls).toBe(2);
  expect(p.names[0]).toEqual(['ux-title']);
});

test('reduced motion changes pages instantly, with no transition', async ({ page }) => {
  const errors = watchErrors(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await probeTransitions(page);
  await page.goto('/projects');
  await page.locator('main a[href="/projects/squanto"]').first().click();
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page).toHaveURL(/\/projects$/);

  expect((await probe(page)).calls).toBe(0);
  // The CSS backstop: no View Transition styles apply under reduce.
  expect(await page.evaluate(() => getComputedStyle(document.getElementById('main')!).viewTransitionName)).toBe('none');
  expect(errors).toEqual([]);
});

test('browsers without the View Transitions API still change pages, with no errors', async ({ page }) => {
  const errors = watchErrors(page);
  await page.addInitScript(() => {
    // @ts-expect-error -- simulate a browser without the API
    delete Document.prototype.startViewTransition;
  });
  await page.goto('/projects');
  expect(await page.evaluate(() => 'startViewTransition' in document)).toBe(false);
  await page.locator('main a[href="/projects/squanto"]').first().click();
  await expect(page).toHaveTitle('Squanto — jdilig.me');
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page).toHaveTitle('Projects — jdilig.me');
  expect(errors).toEqual([]);
});

test('the skip link works after a client-side page change', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'Projects' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();

  const skip = page.getByRole('link', { name: 'Skip to content' });
  await skip.focus();
  await expect(skip).toBeVisible();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('#main'))).toBe(true);
});

test('Back returns to the exact scroll position on a long page, and new pages open at the top', async ({ page }) => {
  // The long home page at 375px is where Back used to land short (1989 vs
  // 2166px) while the transition was still running.
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  const link = page.locator('main a[href^="/projects/"]').last();
  await link.scrollIntoViewIfNeeded();
  await page.evaluate(() => window.scrollBy(0, 0));
  const before = await page.evaluate(() => window.scrollY);
  expect(before).toBeGreaterThan(1500);

  await link.click();
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(before);
  // And it stays there once the transition has finished.
  await page.waitForTimeout(400);
  expect(await page.evaluate(() => window.scrollY)).toBe(before);
});

// The interrupted-transition condition (input never blocked over 280ms) is
// tested with real pointer input in transitions-input.spec.ts.

test('a title inside a hidden region never morphs, so there are no ghost frames', async ({ page }) => {
  await page.goto('/projects');
  const pseudos = await page.evaluate(async () => {
    const link = document.querySelector<HTMLAnchorElement>('main a[href="/projects/squanto"]')!;
    // Put the source title in a closed region, like a collapsed panel.
    (link.closest('article') ?? link.parentElement!).hidden = true;
    const seen = new Set<string>();
    const original = document.startViewTransition.bind(document);
    document.startViewTransition = ((arg: Parameters<typeof original>[0]) => {
      const t = original(arg);
      t.ready.then(() => {
        for (const a of document.getAnimations()) {
          const p = (a.effect as KeyframeEffect | null)?.pseudoElement;
          if (p) seen.add(p);
        }
      }, () => {});
      return t;
    }) as typeof document.startViewTransition;
    link.click();
    await new Promise((r) => setTimeout(r, 500));
    return [...seen];
  });
  await expect(page).toHaveURL(/\/projects\/squanto$/);
  expect(pseudos.some((p) => p.includes('(page)'))).toBe(true);
  expect(pseudos.filter((p) => p.includes('old(project-title)'))).toEqual([]);
});

test('Back replays the transition and focuses the h1', async ({ page }) => {
  await probeTransitions(page);
  await page.goto('/projects');
  await page.locator('main a[href="/projects/squanto"]').first().click();
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  await page.goBack();
  await expect(page).toHaveTitle('Projects — jdilig.me');
  await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  expect((await probe(page)).calls).toBe(2);
});

test('in-page hash links still jump to their section', async ({ page }) => {
  await page.goto('/');
  await page.locator('a[href="#projects"]').first().click();
  await expect(page).toHaveURL(/#projects$/);
  await expect
    .poll(() => page.evaluate(() => Math.abs(document.getElementById('projects')!.getBoundingClientRect().top)))
    .toBeLessThan(120);
  // A #hash jump isn't a page change: focus stays off the h1.
  await expect(page.getByRole('heading', { level: 1 })).not.toBeFocused();
});
