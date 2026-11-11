import { existsSync, readFileSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { expect, test } from '@playwright/test';

// PERF-100: prerendered pages are hydrated in place. Before, main.tsx used
// createRoot, which threw the prerendered markup away and painted it again
// after the bundle ran, so LCP landed behind the JS. Pages are served from
// dist/ (npm run build) through a fake origin, the way Vercel serves them:
// cleanUrls, and 404.html with a 404 status for any unknown path.

const DIST = join(process.cwd(), 'dist');
const ORIGIN = 'http://hydration.test';
const TYPES: Record<string, string> = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon',
};

function fileFor(path: string): string | undefined {
  const clean = decodeURIComponent(path).replace(/^\/+|\/+$/g, '');
  const candidates = clean === '' ? ['index.html'] : [`${clean}.html`, clean, join(clean, 'index.html')];
  return candidates.map((c) => join(DIST, c)).find((f) => existsSync(f) && statSync(f).isFile());
}

const PATHS = ['/', '/projects', '/projects/jdilig-me', '/ux', '/ux/design-system', '/resume', '/contact', '/no-such-page'];

for (const path of PATHS) {
  test(`${path} keeps its prerendered markup (hydrated, not re-rendered)`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => {
      if (m.type() === 'error' && !m.text().startsWith('Failed to load resource')) errors.push(m.text());
    });
    await page.route(`${ORIGIN}/**`, async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname.startsWith('/_vercel/')) return route.fulfill({ status: 204, body: '' });
      const file = fileFor(url.pathname);
      const notFound = !file && extname(url.pathname) === '';
      const body = file ? readFileSync(file) : notFound ? readFileSync(join(DIST, '404.html')) : 'not found';
      const type = file ? TYPES[extname(file)] ?? 'application/octet-stream' : 'text/html';
      return route.fulfill({ status: file ? 200 : 404, body, headers: { 'content-type': type } });
    });
    await page.addInitScript(() => {
      const w = window as unknown as { __rootRemovals: number };
      w.__rootRemovals = 0;
      new MutationObserver((records) => {
        for (const r of records) {
          if ((r.target as Element).id === 'root') w.__rootRemovals += r.removedNodes.length;
        }
      }).observe(document, { childList: true, subtree: true });
    });
    await page.goto(ORIGIN + path);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#main h1')).toHaveCount(1);
    // The app is live: React attached to the prerendered nodes.
    await expect.poll(() => page.evaluate(() => {
      const root = document.getElementById('root')!;
      return Object.keys(root).some((k) => k.startsWith('__reactContainer'));
    })).toBe(true);
    expect(await page.evaluate(() => (window as unknown as { __rootRemovals: number }).__rootRemovals)).toBe(0);
    expect(errors).toEqual([]);
  });
}
