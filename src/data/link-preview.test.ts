import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

// The link-preview image named in index.html (made by `npm run og:image`)
// must exist at the size its tags claim, or shared links show no picture.
const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');
const meta = (key: string) =>
  html.match(new RegExp(`(?:property|name)="${key}"\\s+content="([^"]+)"`))?.[1];

describe('link preview (index.html)', () => {
  it('og:image and twitter:image name the same file in public/', () => {
    const url = meta('og:image') ?? '';
    expect(url).toMatch(/^https:\/\/www\.jdilig\.me\//);
    expect(meta('twitter:image')).toBe(url);
    expect(existsSync(join(process.cwd(), 'public', new URL(url).pathname))).toBe(true);
  });

  it('the image is the size og:image:width / og:image:height claim', async () => {
    const file = join(process.cwd(), 'public', new URL(meta('og:image') ?? '').pathname);
    const { width, height } = await sharp(file).metadata();
    expect([width, height]).toEqual([
      Number(meta('og:image:width')),
      Number(meta('og:image:height')),
    ]);
  });
});
