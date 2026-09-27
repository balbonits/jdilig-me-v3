#!/usr/bin/env node
// Write a 720 px-wide copy of every public/screenshots/*.webp to
// public/screenshots/thumbs/, and delete thumbnails whose screenshot is
// gone. Gallery tiles load these copies (see src/lib/screenshots.ts); the
// full-size file only loads in the lightbox.
//
// Usage: npm run thumbnails
// tests/screenshots.spec.ts also runs this after every capture run.

import sharp from 'sharp';
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

// Keep in sync with THUMB_WIDTH in src/lib/screenshots.ts.
const THUMB_WIDTH = 720;

const DIR = join(process.cwd(), 'public', 'screenshots');
const THUMBS_DIR = join(DIR, 'thumbs');

export async function makeThumbnails() {
  mkdirSync(THUMBS_DIR, { recursive: true });
  const shots = readdirSync(DIR).filter((f) => f.endsWith('.webp'));

  for (const file of shots) {
    await sharp(join(DIR, file))
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80, smartSubsample: true })
      .toFile(join(THUMBS_DIR, file));
  }

  for (const file of readdirSync(THUMBS_DIR)) {
    if (!shots.includes(file)) rmSync(join(THUMBS_DIR, file));
  }

  return shots.length;
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const count = await makeThumbnails();
  console.log(`Wrote ${count} thumbnails to public/screenshots/thumbs/`);
}
