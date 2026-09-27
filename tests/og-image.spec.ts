import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { PROFILE } from '../src/data/profile';
import { displayUrl } from '../src/lib/url';

// Renders public/og-image.png: the picture shown when someone shares a link
// to the site (LinkedIn, Slack, email). Uses the site's fonts and dark-theme
// colors. Run: `npm run og:image`.

const OUT = path.join(process.cwd(), 'public', 'og-image.png');
const WIDTH = 1200; // the standard link-preview size (1.91:1)
const HEIGHT = 630;

// setContent() pages can't load local files, so fonts and the logo are inlined.
function dataUrl(file: string, type: string): string {
  const bytes = fs.readFileSync(path.join(process.cwd(), file));
  return `data:${type};base64,${bytes.toString('base64')}`;
}
const font = (file: string) => dataUrl(`node_modules/${file}`, 'font/woff2');

const CSS = `
@font-face {
  font-family: Geist;
  font-weight: 100 900;
  src: url(${font('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')});
}
@font-face {
  font-family: "Instrument Serif";
  font-style: italic;
  src: url(${font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')});
}
@font-face {
  font-family: "JetBrains Mono";
  font-weight: 100 900;
  src: url(${font('@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2')});
}
* { box-sizing: border-box; margin: 0; }
body {
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  padding: 64px 80px 68px;
  display: flex;
  flex-direction: column;
  font-family: Geist, sans-serif;
  color: #fafaf9;
  background:
    radial-gradient(ellipse 55% 75% at 92% 8%, rgb(251 146 60 / 0.16), transparent 70%),
    radial-gradient(ellipse at 30% 40%, #1c1917 0%, #0c0a09 70%);
}
.accent { color: #fb923c; }
.brand {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: "JetBrains Mono", monospace;
  font-size: 30px;
  font-weight: 500;
}
.brand img { width: 52px; height: 52px; border-radius: 50%; }
main { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.eyebrow {
  font-family: "JetBrains Mono", monospace;
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
h1 {
  margin-top: 18px;
  font-size: 116px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.045em;
}
.role {
  margin-top: 14px;
  font-family: "Instrument Serif", serif;
  font-style: italic;
  font-size: 64px;
  line-height: 1.1;
}
.blurb { font-size: 29px; color: #d6d3d1; }
`;

function renderCard(): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><style>${CSS}</style></head>
<body>
  <div class="brand">
    <img src="${dataUrl('public/logo.png', 'image/png')}" alt="">
    <span>${displayUrl(PROFILE.website).replace('.', '<span class="accent">.</span>')}</span>
  </div>
  <main>
    <p class="eyebrow accent">§ ${PROFILE.location}</p>
    <h1>${PROFILE.name}<span class="accent">.</span></h1>
    <p class="role accent">${PROFILE.role}</p>
  </main>
  <p class="blurb">React, TypeScript, and 18+ years shipping high-traffic web apps.</p>
</body>
</html>`;
}

test('render og-image.png', async ({ page }) => {
  await page.setViewportSize({ width: WIDTH, height: HEIGHT });
  await page.setContent(renderCard());
  await page.evaluate(() => document.fonts.ready);

  // Fail rather than ship a preview in fallback fonts.
  const faces = await page.evaluate(() =>
    [...document.fonts].map((f) => `${f.family.replace(/"/g, '')}: ${f.status}`),
  );
  expect(faces.sort()).toEqual([
    'Geist: loaded',
    'Instrument Serif: loaded',
    'JetBrains Mono: loaded',
  ]);

  const png = await page.screenshot();
  await sharp(png).png({ compressionLevel: 9 }).toFile(OUT);
});
