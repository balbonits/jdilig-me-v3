import { expect, test, type Page } from '@playwright/test';

// A quick walk through the site the way a visitor uses it, against the dev
// server playwright.config.ts starts. Run it with `npm run test:e2e`.

/** Collects page errors and failed responses while a test runs. */
function watchForProblems(page: Page): string[] {
  const problems: string[] = [];
  page.on('pageerror', (error) => problems.push(`error: ${error.message}`));
  page.on('console', (message) => {
    // The response handler below reports failed requests.
    const text = message.text();
    if (message.type() === 'error' && !text.startsWith('Failed to load resource')) {
      problems.push(`console: ${text}`);
    }
  });
  page.on('response', (response) => {
    // Vercel's analytics scripts only exist on Vercel.
    if (response.status() >= 400 && !response.url().includes('/_vercel/')) {
      problems.push(`${response.status()}: ${response.url()}`);
    }
  });
  return problems;
}

/** Waits for CSS animations (the pop-up slides in) to finish. */
async function settled(page: Page) {
  await page.waitForFunction(() =>
    document.getAnimations().every((a) => a.playState !== 'running'),
  );
}

const pages = [
  { path: '/', title: 'jdilig.me — John Dilig, Front-End Developer' },
  { path: '/projects', title: 'Projects — jdilig.me' },
  { path: '/projects/squanto', title: 'Squanto — jdilig.me' },
  { path: '/resume', title: 'Resume — jdilig.me' },
  { path: '/contact', title: 'Contact — jdilig.me' },
];

for (const { path, title } of pages) {
  test(`${path} has its own title and canonical URL, one heading, and no errors`, async ({
    page,
  }) => {
    const problems = watchForProblems(page);
    await page.goto(path);

    await expect(page).toHaveTitle(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://www.jdilig.me${path}`,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    expect(problems).toEqual([]);
  });
}

for (const path of ['/nope', '/projects/nope']) {
  test(`${path} shows the 404 page and stays out of search results`, async ({
    page,
  }) => {
    await page.goto(path);

    await expect(page).toHaveTitle(/^Page not found/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Nothing here',
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex',
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  });
}

test('moving between pages announces the new page to screen readers', async ({
  page,
}) => {
  await page.goto('/');
  const status = page.getByRole('status');
  await expect(status).toBeEmpty();

  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Resume' })
    .click();

  await expect(status).toHaveText('Resume — jdilig.me');
});

// Regression: opening the last image of a long gallery and then moving to a
// project with fewer images used to blank the page.
test('paging through every project after opening a lightbox never breaks a page', async ({
  page,
}) => {
  const problems = watchForProblems(page);
  await page.goto('/projects/city-app-framework');

  const visited = new Set<string>();
  while (!visited.has(page.url())) {
    visited.add(page.url());

    const tiles = page.locator('main button:has(img)');
    if ((await tiles.count()) > 0) {
      await tiles.last().click();
      await expect(page.locator('dialog[open]')).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(page.locator('dialog[open]')).toHaveCount(0);
    }

    // Wait for the next project to show, not just for a heading: the old
    // page's heading is still there for a moment.
    const next = page.getByRole('link', { name: /NEXT/ });
    const nextTitle = await next.locator('div').last().innerText();
    await next.click();
    await expect(page.getByRole('heading', { level: 1 })).toContainText(nextTitle);
  }

  expect(visited.size).toBeGreaterThan(3);
  expect(problems).toEqual([]);
});

test('a pop-up closes on Esc and on a backdrop click, but not when a drag ends outside it', async ({
  page,
}) => {
  await page.goto('/projects');
  const dialog = page.locator('dialog[open]');
  const open = async () => {
    await page.locator('main article button').first().click();
    await expect(dialog).toBeVisible();
    await settled(page);
  };

  await open();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);

  await open();
  await page.mouse.click(10, 10);
  await expect(dialog).toHaveCount(0);

  // Press on the title, drag out over the backdrop, release.
  await open();
  const title = await dialog.getByRole('heading', { level: 2 }).boundingBox();
  if (!title) throw new Error('The pop-up has no title');
  await page.mouse.move(title.x + 10, title.y + title.height / 2);
  await page.mouse.down();
  await page.mouse.move(10, 10, { steps: 8 });
  await page.mouse.up();
  await expect(dialog).toBeVisible();
});

test('the theme follows the OS until the visitor picks one', async ({ page }) => {
  const html = page.locator('html');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  await expect(html).toHaveAttribute('data-theme', 'light');

  await page.emulateMedia({ colorScheme: 'dark' });
  await expect(html).toHaveAttribute('data-theme', 'dark');

  await page.getByRole('button', { name: 'Switch to light theme' }).click();
  await expect(html).toHaveAttribute('data-theme', 'light');

  // The visitor chose, so the OS no longer decides.
  await page.emulateMedia({ colorScheme: 'light' });
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.waitForTimeout(300);
  await expect(html).toHaveAttribute('data-theme', 'light');
});

test('keyboard focus is still drawn in forced-colors mode', async ({ page }) => {
  await page.emulateMedia({ forcedColors: 'active' });
  await page.goto('/');
  await page.keyboard.press('Tab');

  const outline = await page.evaluate(() => {
    const style = getComputedStyle(document.activeElement as Element);
    return { style: style.outlineStyle, width: style.outlineWidth };
  });
  expect(outline.style).toBe('solid');
  expect(outline.width).not.toBe('0px');
});

test('each Lighthouse gauge is one image with a name', async ({ page }) => {
  await page.goto('/projects/jdilig-me');

  await expect(
    page.getByRole('img', { name: /score: \d+ out of 100$/ }),
  ).toHaveCount(4);
});
