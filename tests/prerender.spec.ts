import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';
import { expect, test } from '@playwright/test';

// Every prerendered page in dist/ (npm run build) loads and renders in a real
// browser with 0 console errors (MOTION-SPEC D1: the data router switch must
// keep SSR/prerender output working). Files are served straight from dist/,
// the way Vercel serves them (cleanUrls), through a routed fake origin, so
// this checks the prerendered HTML itself, not the dev server's SPA shell.

const DIST = join(process.cwd(), 'dist');
const ORIGIN = 'http://prerender.test';
const SKIP = ['ux/design-system/storybook', 'ux/job-tracker/index.html', 'ux/dev-dashboard/index.html'];
const TYPES: Record<string, string> = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ico': 'image/x-icon', '.txt': 'text/plain', '.xml': 'application/xml',
};

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    const rel = relative(DIST, full);
    if (SKIP.some((s) => rel.startsWith(s))) return [];
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith('.html') ? [rel] : [];
  });
}

/** dist file for a URL path, the way cleanUrls resolves it. */
function fileFor(path: string): string | undefined {
  const clean = decodeURIComponent(path).replace(/^\/+/, '');
  const candidates = clean === '' ? ['index.html'] : [clean, `${clean}.html`, join(clean, 'index.html')];
  return candidates.map((c) => join(DIST, c)).find((f) => existsSync(f) && statSync(f).isFile());
}

const pages = existsSync(DIST)
  ? htmlFiles(DIST).map((f) => '/' + f.replace(/\.html$/, '').replace(/(^|\/)index$/, ''))
  : [];

test('dist/ exists with prerendered pages (run npm run build first)', () => {
  expect(pages.length).toBeGreaterThan(10);
});

for (const path of pages) {
  test(`prerendered ${path || '/'} renders with 0 console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    await page.route(`${ORIGIN}/**`, async (route) => {
      const url = new URL(route.request().url());
      if (url.pathname.startsWith('/_vercel/')) return route.fulfill({ status: 204, body: '' });
      const file = fileFor(url.pathname);
      if (!file) return route.fulfill({ status: 404, body: 'not found' });
      return route.fulfill({
        status: 200,
        body: readFileSync(file),
        headers: { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' },
      });
    });
    await page.goto(ORIGIN + (path || '/'));
    // The prerendered HTML already has the page's heading before any JS runs.
    const html = readFileSync(fileFor(path || '/')!, 'utf8');
    expect(html).toMatch(/<h1[\s>]/);
    await expect(page.locator('#main h1')).toHaveCount(1);
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
}
