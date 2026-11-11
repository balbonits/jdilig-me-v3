import { expect, test, type Page } from '@playwright/test';

// JDM-44d: hit areas (the element's box plus any ::before extension) must never overlap a neighbour's.
// They may touch. Run with `npm run test:e2e`.

type Rect = { name: string; l: number; r: number; t: number; b: number };

/** Each visible target's effective hit rect: its border box unioned with an absolutely positioned ::before. */
async function hitRects(page: Page, selector: string): Promise<Rect[]> {
  return page.evaluate((sel) => {
    const px = (v: string) => (v.endsWith('px') ? parseFloat(v) : 0);
    return [...document.querySelectorAll<HTMLElement>(sel)]
      .filter((e) => { const r = e.getBoundingClientRect(); return r.width > 1 && r.height > 1 && getComputedStyle(e).visibility !== 'hidden'; })
      .map((e) => {
        const r = e.getBoundingClientRect();
        const rect = { name: (e.innerText || e.getAttribute('aria-label') || '').trim().slice(0, 30), l: r.left, r: r.right, t: r.top, b: r.bottom };
        const bs = getComputedStyle(e, '::before');
        if (bs.content !== 'none' && bs.display !== 'none' && bs.position === 'absolute') {
          rect.l = Math.min(rect.l, r.left + px(bs.left));
          rect.r = Math.max(rect.r, r.right - px(bs.right));
          rect.t = Math.min(rect.t, r.top + px(bs.top));
          rect.b = Math.max(rect.b, r.bottom - px(bs.bottom));
        }
        return rect;
      });
  }, selector);
}

const overlaps = (a: Rect, b: Rect) => Math.min(a.r, b.r) - Math.max(a.l, b.l) > 0.01 && Math.min(a.b, b.b) - Math.max(a.t, b.t) > 0.01;

for (const width of [320, 375, 768, 1280]) {
  test(`header nav hit areas don't overlap at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    const rects = await hitRects(page, 'header nav a, header nav button');
    expect(rects.length).toBeGreaterThan(4);
    rects.sort((a, b) => a.l - b.l);
    for (let i = 1; i < rects.length; i++) {
      expect(overlaps(rects[i - 1], rects[i]), `${rects[i - 1].name} overlaps ${rects[i].name}`).toBe(false);
    }
  });

  test(`/ux/design-system report links: standalone ones are 44px, none overlap, at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/ux/design-system');
    const all = await hitRects(page, '[data-acr] a');
    for (let i = 0; i < all.length; i++)
      for (let j = i + 1; j < all.length; j++) expect(overlaps(all[i], all[j]), `${all[i].name} overlaps ${all[j].name}`).toBe(false);
    const big = await hitRects(page, '[data-acr] a.before\\:absolute');
    expect(big.length).toBe(2);
    // 0.1px tolerance: a link wrapped onto two lines resolves its ::before to 43.98px from subpixel line boxes.
    for (const r of big) expect(Math.min(r.r - r.l, r.b - r.t), r.name).toBeGreaterThanOrEqual(43.9);
  });
}
