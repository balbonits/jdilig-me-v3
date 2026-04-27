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
  /**
   * Extra delay before screenshot — useful for canvas-based pages where
   * the first paint happens after a few rAF cycles.
   */
  extraWaitMs?: number;
  /**
   * Send this key to the page before screenshot. Useful for games that
   * gate their canvas first-paint on a user gesture (AudioContext rule).
   */
  pressKey?: string;
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

  // --- AI Browser Game Demos (games.jdilig.me) ---
  // Games gate their first canvas paint on a user gesture (AudioContext
  // policy). We send a Space keypress before screenshotting so the canvas
  // is in its running state, not blank.
  { slug: 'games-home', path: 'https://games.jdilig.me/', external: true, timeout: 60_000 },
  { slug: 'game-running-man', path: 'https://games.jdilig.me/games/running-man/index.html', external: true, timeout: 60_000, pressKey: 'Space', extraWaitMs: 1500 },
  { slug: 'game-neon-tower-defense', path: 'https://games.jdilig.me/games/neon-tower-defense/index.html', external: true, timeout: 60_000, pressKey: '1', extraWaitMs: 1500 },
  { slug: 'game-block-fps', path: 'https://games.jdilig.me/games/block-fps/index.html', external: true, timeout: 60_000, extraWaitMs: 2500 },
  { slug: 'game-maze-runner', path: 'https://games.jdilig.me/games/maze-runner/index.html', external: true, timeout: 60_000, pressKey: 'Space', extraWaitMs: 1500 },

  // --- Coding Interview Reviewer (local-only, must be running on :3000) ---
  { slug: 'coding-interview-reviewer', path: 'http://localhost:3000/exercises', external: true, timeout: 30_000, extraWaitMs: 1500 },
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
      // For game pages we need stylesheets fully applied + the rAF loop
      // running, so wait for the network to go quiet rather than just `load`.
      waitUntil: shot.pressKey
        ? 'networkidle'
        : shot.external
          ? 'load'
          : 'domcontentloaded',
      timeout: 30_000,
    });

    await page.evaluate(() => document.fonts?.ready).catch(() => undefined);

    // Give the SPA router a moment to hydrate and set document.title.
    await page.waitForTimeout(1500);

    // Quick computed-styles sanity check for game pages — confirms the
    // stylesheet actually applied (we hit a case where `load` fired before
    // CSS painted and the screenshot showed the unstyled fallback).
    if (shot.pressKey) {
      const computed = await page
        .evaluate(() => {
          const body = document.body;
          const canvas = document.querySelector('canvas') as HTMLCanvasElement | null;
          if (!body) return null;
          const bs = getComputedStyle(body);
          return {
            bodyBg: bs.backgroundColor,
            bodyDisplay: bs.display,
            canvasW: canvas?.clientWidth ?? 0,
            canvasH: canvas?.clientHeight ?? 0,
          };
        })
        .catch(() => null);
      console.log(`[${shot.slug}] computed:`, JSON.stringify(computed));
    }

    if (shot.pressKey) {
      // Click the canvas directly (not viewport coords) so the gesture
      // unambiguously targets the game and unlocks AudioContext.
      const canvas = page.locator('canvas').first();
      try {
        await canvas.waitFor({ state: 'visible', timeout: 5000 });
        await canvas.click({ timeout: 5000 });
      } catch {
        // No canvas on this page — fall through; pressKey alone may still help.
      }
      await page.keyboard.press(shot.pressKey);
    }

    if (shot.extraWaitMs) {
      await page.waitForTimeout(shot.extraWaitMs);
    }

    // For game pages: verify the canvas is actually rendering (non-uniform
    // pixel content) before screenshotting, so we don't ship a blank
    // canvas just because the rAF loop hadn't kicked in.
    if (shot.pressKey) {
      const status = await page
        .evaluate(() => {
          const canvas = document.querySelector('canvas') as HTMLCanvasElement | null;
          if (!canvas) return 'no-canvas' as const;
          // WebGL canvases throw on getImageData; treat presence as enough.
          const isWebGL = !!(
            canvas.getContext('webgl') || canvas.getContext('webgl2')
          );
          if (isWebGL) return 'webgl' as const;
          const ctx = canvas.getContext('2d');
          if (!ctx) return 'unknown-ctx' as const;
          try {
            const w = canvas.width;
            const h = canvas.height;
            if (!w || !h) return 'zero-size' as const;
            const sample = ctx.getImageData(
              Math.floor(w * 0.25),
              Math.floor(h * 0.25),
              Math.floor(w * 0.5),
              Math.floor(h * 0.5),
            ).data;
            const first = `${sample[0]},${sample[1]},${sample[2]}`;
            for (let i = 4; i < sample.length; i += 4) {
              const here = `${sample[i]},${sample[i + 1]},${sample[i + 2]}`;
              if (here !== first) return 'rendered' as const;
            }
            return 'blank' as const;
          } catch {
            return 'cors-or-error' as const;
          }
        })
        .catch(() => 'eval-failed' as const);

      console.log(`[${shot.slug}] canvas status: ${status}`);
      if (status === 'blank' || status === 'no-canvas' || status === 'zero-size') {
        // Give it one more nudge — extra wait + a re-press.
        await page.waitForTimeout(1500);
        if (shot.pressKey) {
          await page.keyboard.press(shot.pressKey).catch(() => undefined);
          await page.waitForTimeout(800);
        }
      }
    }

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
