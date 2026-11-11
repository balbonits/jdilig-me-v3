import type { Page } from '@playwright/test';

/**
 * Loads and decodes every <img> on the page before a screenshot.
 *
 * Gallery tiles use loading="lazy", which is right for visitors, but a
 * full-page screenshot captures the whole page without scrolling it. Tiles
 * below the first viewport (the jdilig.me gallery at phone widths) may or may
 * not have loaded by then, so the same build gave different pixels run to run.
 * Switching them to eager and waiting for decode makes the capture repeatable.
 */
export async function settleImages(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const imgs = [...document.images];
    for (const img of imgs) img.loading = 'eager';
    await Promise.all(
      imgs.map(async (img) => {
        if (!img.complete) {
          await new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true });
            img.addEventListener('error', () => resolve(), { once: true });
          });
        }
        await img.decode().catch(() => undefined);
      }),
    );
  });
}
