import { expect, test } from '@playwright/test';

// CA's MOTION-SPEC v0.2 condition: an interrupted transition never blocks
// input for more than 280ms. This uses REAL pointer input (page.mouse, which
// goes through the browser's hit-testing), not element.click(), which skips it.
for (const width of [320, 375, 1280]) {
  test(`at ${width}px a real second click 40ms into a transition lands, within 280ms`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.addInitScript(() => {
      const w = window as unknown as { __downs: number[]; __uxAt: number | null };
      w.__downs = [];
      w.__uxAt = null;
      document.addEventListener('pointerdown', () => w.__downs.push(performance.now()), true);
      const tick = () => {
        if (w.__uxAt === null && location.pathname === '/ux') w.__uxAt = performance.now();
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    await page.goto('/projects');
    const first = page.locator('main a[href="/projects/squanto"]').first();
    const second = page.locator('header a[href="/ux"]').first();
    await first.scrollIntoViewIfNeeded();
    const a = (await first.boundingBox())!;
    const b = (await second.boundingBox())!;
    await page.mouse.click(a.x + a.width / 2, a.y + a.height / 2);
    await page.waitForTimeout(40);
    await page.mouse.click(b.x + b.width / 2, b.y + b.height / 2);
    await expect(page).toHaveURL(/\/ux$/, { timeout: 2000 });
    // The rAF probe records the first frame the URL is /ux; wait for that frame.
    await expect.poll(() => page.evaluate(() => (window as unknown as { __uxAt: number | null }).__uxAt)).not.toBeNull();
    const { downs, uxAt } = await page.evaluate(() => {
      const w = window as unknown as { __downs: number[]; __uxAt: number | null };
      return { downs: w.__downs, uxAt: w.__uxAt };
    });
    expect(downs.length).toBe(2);
    const ms = uxAt! - downs[1];
    console.log(`${width}px: second input to /ux in ${Math.round(ms)}ms`);
    expect(ms).toBeLessThanOrEqual(280);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('UX case studies');
    await expect(page.getByRole('heading', { level: 1 })).toBeFocused();
  });
}
