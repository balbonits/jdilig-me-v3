import { test, expect } from '@playwright/test';
import { settleImages } from './settle-images';

// /projects/jdilig-me at phone widths has lazy gallery tiles below the first
// viewport. Two captures of the same build used to differ when some tiles
// hadn't loaded yet, which hides real visual regressions.
for (const theme of ['light', 'dark'] as const) {
  test(`full-page capture of /projects/jdilig-me at 375 px is repeatable (${theme})`, async ({ browser }) => {
    const shoot = async () => {
      const ctx = await browser.newContext({ viewport: { width: 375, height: 800 }, colorScheme: theme, reducedMotion: 'reduce' });
      await ctx.addInitScript((t) => localStorage.setItem('theme', t), theme);
      const page = await ctx.newPage();
      await page.goto('/projects/jdilig-me', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      await settleImages(page);
      const broken = await page.evaluate(() => [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc || i.src));
      expect(broken, 'every image has loaded before the capture').toEqual([]);
      const png = await page.screenshot({ fullPage: true, animations: 'disabled', caret: 'hide' });
      await ctx.close();
      return png;
    };
    const a = await shoot();
    const b = await shoot();
    expect(Buffer.compare(a, b), 'two captures of the same build are byte-identical').toBe(0);
  });
}
