import { test, expect } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

const OUT_DIR = path.join(process.cwd(), 'public', 'screenshots');

type Shot = {
  slug: string;
  path: string;
  theme?: 'light' | 'dark';
  /** If true, `path` is treated as an absolute URL; theme init is skipped. */
  external?: boolean;
  /** Per-test timeout override (ms). External sites may need more. */
  timeout?: number;
  /**
   * Page title values that should cause the test to fail (indicating the
   * route landed on a 404 / error page). Matched as a substring.
   */
  failIfTitleContains?: string[];
};

// Default guard-rails for any external SPA — if the route 404s, the router
// will set one of these titles client-side and we should reject the shot.
const DEFAULT_404_TITLES = [
  '404',
  'Not Found',
  'Page Not Found',
  'Server Error',
  'Unauthorized',
];

const SHOTS: Shot[] = [
  // --- jdilig.me (local dev server) ---
  { slug: 'home-light', path: '/', theme: 'light' },
  { slug: 'home-dark', path: '/', theme: 'dark' },
  { slug: 'projects-light', path: '/projects', theme: 'light' },
  { slug: 'projects-dark', path: '/projects', theme: 'dark' },
  { slug: 'project-detail-squanto', path: '/projects/squanto', theme: 'dark' },
  { slug: 'project-detail-jdilig-me', path: '/projects/jdilig-me', theme: 'light' },
  { slug: 'resume', path: '/resume', theme: 'light' },
  { slug: 'contact', path: '/contact', theme: 'light' },

  // --- Squanto public pages (routes confirmed against docs/site/SITEMAP.md) ---
  { slug: 'squanto-home', path: 'https://squanto.app/home', external: true, timeout: 60_000 },
  { slug: 'squanto-audience-map', path: 'https://squanto.app/audience-map', external: true, timeout: 60_000 },
  { slug: 'squanto-about', path: 'https://squanto.app/about', external: true, timeout: 60_000 },
  { slug: 'squanto-help', path: 'https://squanto.app/help', external: true, timeout: 60_000 },
  { slug: 'squanto-contact', path: 'https://squanto.app/contact-us', external: true, timeout: 60_000 },
  { slug: 'squanto-demo', path: 'https://squanto.app/request-a-demo', external: true, timeout: 60_000 },
];

test.beforeAll(() => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
});

for (const shot of SHOTS) {
  test(`capture ${shot.slug}`, async ({ page }) => {
    test.setTimeout(shot.timeout ?? 30_000);

    if (!shot.external && shot.theme) {
      await page.addInitScript((t) => {
        try {
          localStorage.setItem('theme', t);
        } catch {
          /* noop */
        }
      }, shot.theme);
    }

    await page.goto(shot.path, {
      waitUntil: shot.external ? 'load' : 'domcontentloaded',
      timeout: 30_000,
    });

    await page.evaluate(() => document.fonts?.ready).catch(() => undefined);

    // Give the SPA router a moment to hydrate and set document.title.
    await page.waitForTimeout(1500);

    // 404 guard — fail the test if the router landed on an error page.
    const badTitles = shot.failIfTitleContains ?? DEFAULT_404_TITLES;
    const title = await page.title();
    for (const bad of badTitles) {
      expect(
        title.toLowerCase().includes(bad.toLowerCase()),
        `Route ${shot.path} rendered a ${bad} page (title: "${title}")`,
      ).toBeFalsy();
    }

    await page.screenshot({
      path: path.join(OUT_DIR, `${shot.slug}.png`),
      fullPage: !shot.external,
    });
  });
}
