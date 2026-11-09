import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (f: string) => readFileSync(join(process.cwd(), f), 'utf8');
const vercel = JSON.parse(read('vercel.json')) as {
  headers: { source: string; headers: { key: string; value: string }[] }[];
};
const all = vercel.headers.flatMap((h) => h.headers);
const csp = all.find((h) => h.key === 'Content-Security-Policy')!.value;

describe('vercel.json security headers', () => {
  it.each([
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'Referrer-Policy',
    'X-Frame-Options',
    'Permissions-Policy',
    'Content-Security-Policy',
  ])('sets %s', (key) => {
    expect(all.some((h) => h.key === key)).toBe(true);
  });

  // The theme script in index.html runs inline; the CSP allows it by hash, so
  // editing that script means updating the hash in vercel.json.
  it("allows index.html's inline script by hash", () => {
    const scripts = [...read('index.html').matchAll(/<script>([\s\S]*?)<\/script>/g)];
    expect(scripts).toHaveLength(1);
    const hash = createHash('sha256').update(scripts[0][1]).digest('base64');
    expect(csp).toContain(`'sha256-${hash}'`);
  });

  it('lets Vercel Analytics and Speed Insights load and report (same origin)', () => {
    expect(csp).toMatch(/script-src 'self'/);
    expect(csp).toMatch(/connect-src 'self'/);
    expect(csp).toContain("frame-ancestors 'none'");
  });
});
