import { test } from '@playwright/test';
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
  /** Scroll to a selector before capturing (optional). */
  scrollTo?: string;
};

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

  // --- Squanto public pages ---
  {
    slug: 'squanto-home',
    path: 'https://squanto.app/',
    external: true,
    timeout: 60_000,
  },
  {
    slug: 'squanto-audience-map',
    path: 'https://squanto.app/audience-map',
    external: true,
    timeout: 60_000,
  },
  {
    slug: 'squanto-about',
    path: 'https://squanto.app/about-us',
    external: true,
    timeout: 60_000,
  },
  {
    slug: 'squanto-faq',
    path: 'https://squanto.app/faq',
    external: true,
    timeout: 60_000,
  },
  {
    slug: 'squanto-contact',
    path: 'https://squanto.app/contact-us',
    external: true,
    timeout: 60_000,
  },
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

    await page
      .evaluate(() => document.fonts?.ready)
      .catch(() => undefined);

    await page.waitForTimeout(1500);

    if (shot.scrollTo) {
      await page
        .locator(shot.scrollTo)
        .first()
        .scrollIntoViewIfNeeded()
        .catch(() => undefined);
      await page.waitForTimeout(400);
    }

    await page.screenshot({
      path: path.join(OUT_DIR, `${shot.slug}.png`),
      fullPage: !shot.external,
    });
  });
}
