import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { FULL_WIDTH, THUMB_WIDTH, thumbnailSrc } from '@/lib/screenshots';
import { PROJECTS } from './projects';

// Gallery tiles and project previews pick between the thumbnail and the
// original with srcset, which needs both files at the widths it claims. The
// browser only uses the claimed width to pick a file (CSS sizes the image), so
// an original may be wider than FULL_WIDTH but not narrower.
const inPublic = (src: string) => join(process.cwd(), 'public', src);
const widthOf = async (src: string) => (await sharp(inPublic(src)).metadata()).width;

const previews = PROJECTS.flatMap((p) => (p.previewImage ? [p.previewImage] : []));
const gallery = PROJECTS.flatMap((p) => p.gallery ?? []).map((g) => g.src);
const images = [...new Set([...previews, ...gallery])];

describe('screenshots', () => {
  it.each(images)('%s exists and is at least 1280 px wide', async (src) => {
    expect(existsSync(inPublic(src))).toBe(true);
    expect(await widthOf(src)).toBeGreaterThanOrEqual(FULL_WIDTH);
  });

  it.each(images)('%s has a 720 px thumbnail', async (src) => {
    expect(await widthOf(thumbnailSrc(src))).toBe(THUMB_WIDTH);
  });
});
