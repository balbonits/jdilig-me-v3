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

const pages = [
  { path: '/', title: 'jdilig.me — John Dilig, Front-End Developer' },
  { path: '/projects', title: 'Projects — jdilig.me' },
  { path: '/projects/squanto', title: 'Squanto — jdilig.me' },
  { path: '/ux', title: 'UX case studies — jdilig.me' },
  { path: '/ux/design-system', title: 'Ember UI case study — jdilig.me' },
  { path: '/ux/job-tracker/case-study', title: 'Job tracker case study — jdilig.me' },
  { path: '/ux/dev-dashboard/case-study', title: 'Dev dashboard case study — jdilig.me' },
  { path: '/resume', title: 'Resume — jdilig.me' },
  { path: '/contact', title: 'Contact — jdilig.me' },
  { path: '/accessibility', title: 'Accessibility — jdilig.me' },
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

for (const path of ['/nope', '/projects/nope', '/ux/nope']) {
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
    .getByRole('link', { name: 'Contact' })
    .click();

  await expect(status).toHaveText('Contact — jdilig.me');
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

// UX-FLOW-V3-LOOSEN D5: cards open the project's own page, not a pop-up.
test('a project card opens its page, and Back returns to the list', async ({ page }) => {
  await page.goto('/projects');
  await page.locator('main article a[href^="/projects/"]').first().click();
  await expect(page).toHaveURL(/\/projects\/[a-z0-9-]+$/);
  await expect(page.locator('dialog[open]')).toHaveCount(0);
  await page.goBack();
  await expect(page).toHaveURL(/\/projects$/);
});

test('old #work links land on the Projects section', async ({ page }) => {
  await page.goto('/#work');
  await expect(page.getByRole('heading', { level: 2, name: 'Projects' })).toBeInViewport();
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
  // The dev server renders on the client, and React can commit after the
  // load event. Pressing Tab before the skip link exists leaves focus on
  // <body> (outline none), so wait for it, then check Tab really landed.
  const skip = page.getByRole('link', { name: 'Skip to content' });
  await expect(skip).toBeAttached();
  await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();

  const outline = await skip.evaluate((el) => {
    const style = getComputedStyle(el);
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

test('the UX nav item leads to the Ember UI case study and its live links', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'UX' }).click();
  await expect(page).toHaveTitle('UX case studies — jdilig.me');
  await page.getByRole('link', { name: /^Ember UI/ }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Ember UI: an accessible design system starter');
  await expect(page.getByRole('link', { name: 'View the Storybook' })).toHaveAttribute('href', '/ux/design-system/storybook/');
  await expect(page.getByRole('link', { name: 'View the code' })).toHaveAttribute('href', 'https://github.com/balbonits/a11y-design-system');
});

test('the header fits a 320px screen without sideways scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  for (const path of ['/', '/ux/design-system', '/ux/job-tracker/case-study', '/ux/dev-dashboard/case-study']) {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
  }
});

test('the Ember UI Storybook is served from its subpath', async ({ request }) => {
  for (const file of ['index.html', 'iframe.html', 'index.json']) {
    const res = await request.get(`/ux/design-system/storybook/${file}`);
    expect(res.status(), file).toBe(200);
  }
});

test('the job tracker prototype is served from its subpath, and its case study links to it', async ({ page, request }) => {
  // The dev server only maps the folder's index.html; Vercel serves it at /ux/job-tracker/ (checked live).
  const res = await request.get('/ux/job-tracker/index.html');
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain('/ux/job-tracker/assets/');
  const build = await (await request.get('/ux/job-tracker/BUILD.json')).json();
  expect(build.repo).toBe('https://github.com/balbonits/job-app-tracker');
  await page.goto('/ux');
  await page.getByRole('link', { name: /Job tracker/ }).click();
  await expect(page).toHaveURL(/\/ux\/job-tracker\/case-study$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Job tracker: a calm way to run a job search');
  await expect(page.getByRole('link', { name: 'Open the prototype' })).toHaveAttribute('href', '/ux/job-tracker/');
  await expect(page.getByRole('link', { name: 'View the code' })).toHaveAttribute('href', 'https://github.com/balbonits/job-app-tracker');
});

test('the dev dashboard prototype is served from its subpath, and its case study links to it', async ({ page, request }) => {
  // The dev server only maps the folder's index.html; Vercel serves it at /ux/dev-dashboard/.
  const res = await request.get('/ux/dev-dashboard/index.html');
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain('/ux/dev-dashboard/assets/');
  const build = await (await request.get('/ux/dev-dashboard/BUILD.json')).json();
  expect(build.repo).toBe('https://github.com/balbonits/devtool-dashboard');
  expect(build.tag).toBe('v0.1.0');
  await page.goto('/ux');
  await page.getByRole('link', { name: /Dev dashboard/ }).click();
  await expect(page).toHaveURL(/\/ux\/dev-dashboard\/case-study$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Dev dashboard: a deploys view built for the on-call moment');
  await expect(page.getByRole('link', { name: 'Open the prototype' })).toHaveAttribute('href', '/ux/dev-dashboard/');
  await expect(page.getByRole('link', { name: 'View the code' })).toHaveAttribute('href', 'https://github.com/balbonits/devtool-dashboard');
});

test('the dev dashboard is described as live, not upcoming', async ({ page }) => {
  await page.goto('/ux/design-system');
  await expect(page.getByRole('link', { name: 'dev dashboard', exact: true })).toHaveAttribute('href', '/ux/dev-dashboard/');
  await expect(page.locator('main')).not.toContainText('dev dashboard is next');
  await page.goto('/accessibility');
  await expect(page.getByRole('link', { name: 'Dev dashboard ACR' })).toHaveAttribute(
    'href',
    'https://github.com/balbonits/devtool-dashboard/blob/main/docs/ACR.md',
  );
  await expect(page.locator('main')).not.toContainText("isn't built yet");
  await expect(page.getByRole('link', { name: 'Ember UI design system ACR' })).toHaveAttribute('href', '/ux/design-system#acr');
  await expect(page.locator('main')).not.toContainText('will be linked here when');
});

test('the /accessibility report links each have a 44px hit area that does not overlap', async ({ page }) => {
  for (const width of [320, 639, 640, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/accessibility');
    const names = ['Job tracker ACR', 'Ember UI design system ACR', 'Dev dashboard ACR'];
    await page.getByRole('link', { name: names[1] }).scrollIntoViewIfNeeded();
    const boxes = [];
    for (const name of names) {
      const box = await page.getByRole('link', { name }).boundingBox();
      expect(box, `${name} @${width}`).not.toBeNull();
      boxes.push({ name, ...box! });
    }
    for (const b of boxes) {
      const cx = b.x + Math.min(b.width, 44) / 2;
      const cy = b.y + b.height / 2;
      for (const dy of [-21, 0, 21]) {
        const hit = await page.evaluate(
          ([x, y]) => document.elementFromPoint(x, y)?.closest('a')?.textContent?.trim() ?? null,
          [cx, cy + dy],
        );
        expect(hit, `${b.name} @${width}, ${dy}px from centre`).toBe(b.name);
      }
    }
  }
});
