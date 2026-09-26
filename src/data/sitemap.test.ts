import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PROJECTS } from './projects';

// public/sitemap.xml is maintained by hand — fail loudly when it drifts.
const sitemap = readFileSync(join(process.cwd(), 'public', 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

describe('public/sitemap.xml', () => {
  it.each(['/', '/projects', '/resume', '/contact'])('lists %s', (path) => {
    expect(urls).toContain(`https://www.jdilig.me${path}`);
  });

  it.each(PROJECTS.map((p) => p.slug))('lists /projects/%s', (slug) => {
    expect(urls).toContain(`https://www.jdilig.me/projects/${slug}`);
  });

  it('has no duplicate entries', () => {
    expect(new Set(urls).size).toBe(urls.length);
  });
});
