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
};

const SHOTS: Shot[] = [
  { slug: 'home-light', path: '/', theme: 'light' },
  { slug: 'home-dark', path: '/', theme: 'dark' },
  { slug: 'projects-light', path: '/projects', theme: 'light' },
  { slug: 'projects-dark', path: '/projects', theme: 'dark' },
  { slug: 'resume', path: '/resume', theme: 'light' },
  { slug: 'contact', path: '/contact', theme: 'light' },

  // External project previews
  {
    slug: 'squanto-home',
    path: 'https://squanto.app/',
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

    // Best-effort wait for fonts; ignore if the context closes first.
    await page
      .evaluate(() => document.fonts?.ready)
      .catch(() => undefined);

    // Let first paint / hero animations settle.
    await page.waitForTimeout(1500);

    await page.screenshot({
      path: path.join(OUT_DIR, `${shot.slug}.png`),
      // External sites look better cropped to the viewport (no weird vh pages).
      fullPage: !shot.external,
    });
  });
}
