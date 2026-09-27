import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { FULL_WIDTH, THUMB_WIDTH, thumbnailSrc } from '@/lib/screenshots';
import { PROJECTS } from './projects';

// Gallery tiles pick between the thumbnail and the original with srcset, which
// only works if both files exist at the widths the srcset claims.
const inPublic = (src: string) => join(process.cwd(), 'public', src);
const widthOf = async (src: string) => (await sharp(inPublic(src)).metadata()).width;

const previews = PROJECTS.flatMap((p) => (p.previewImage ? [p.previewImage] : []));
const gallery = [...new Set(PROJECTS.flatMap((p) => p.gallery ?? []).map((g) => g.src))];

describe('screenshots', () => {
  it.each([...new Set([...previews, ...gallery])])('%s exists', (src) => {
    expect(existsSync(inPublic(src))).toBe(true);
  });

  it.each(gallery)('%s is full width and has a thumbnail', async (src) => {
    expect(await widthOf(src)).toBe(FULL_WIDTH);
    expect(await widthOf(thumbnailSrc(src))).toBe(THUMB_WIDTH);
  });
});
