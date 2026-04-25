import { test } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

const OUT_DIR = path.join(process.cwd(), 'public', 'screenshots');

const ROUTES: Array<{ slug: string; path: string; theme?: 'light' | 'dark' }> = [
  { slug: 'home-light', path: '/', theme: 'light' },
  { slug: 'home-dark', path: '/', theme: 'dark' },
  { slug: 'projects-light', path: '/projects', theme: 'light' },
  { slug: 'projects-dark', path: '/projects', theme: 'dark' },
  { slug: 'resume', path: '/resume', theme: 'light' },
  { slug: 'contact', path: '/contact', theme: 'light' },
];

test.beforeAll(() => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
});

for (const { slug, path: routePath, theme = 'light' } of ROUTES) {
  test(`capture ${slug}`, async ({ page }) => {
    await page.addInitScript((t) => {
      try {
        localStorage.setItem('theme', t);
      } catch {
        /* noop */
      }
    }, theme);

    await page.goto(routePath);
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => document.fonts.ready);
    // Let the first paint settle — avoids flicker in captured images.
    await page.waitForTimeout(250);

    await page.screenshot({
      path: path.join(OUT_DIR, `${slug}.png`),
      fullPage: true,
    });
  });
}
