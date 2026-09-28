/**
 * Screenshots are at least 1280 px wide (Playwright's Desktop Chrome preset)
 * and each has a 720 px-wide copy in
 * public/screenshots/thumbs/, written by scripts/thumbnails.mjs.
 * src/data/screenshots.test.ts checks both.
 */
export const FULL_WIDTH = 1280;
export const THUMB_WIDTH = 720;

/** "/screenshots/home-dark.webp" → "/screenshots/thumbs/home-dark.webp" */
export function thumbnailSrc(src: string): string {
  return src.replace(/^\/screenshots\//, '/screenshots/thumbs/');
}

/** Lets the browser pick the thumbnail unless the slot needs more pixels. */
export function screenshotSrcSet(src: string): string {
  return `${thumbnailSrc(src)} ${THUMB_WIDTH}w, ${src} ${FULL_WIDTH}w`;
}
