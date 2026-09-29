import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { PAGES, projectMeta, type PageMeta } from './pages';
import { PROJECTS } from './projects';

const html = readFileSync(join(process.cwd(), 'index.html'), 'utf8');

const all: [string, PageMeta][] = [
  ...Object.entries<PageMeta>(PAGES),
  ...PROJECTS.map((p): [string, PageMeta] => [p.slug, projectMeta(p)]),
];

describe('page meta', () => {
  it('gives every page its own title', () => {
    const titles = all.map(([, meta]) => meta.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  it.each(all)('%s has a title and a description', (_name, meta) => {
    expect(meta.title.trim()).not.toBe('');
    expect(meta.description.trim()).not.toBe('');
  });

  it.each(all)('%s has a title that fits a tab and a search result', (_name, meta) => {
    expect(meta.title.length).toBeLessThanOrEqual(60);
  });

  it('keeps only the error pages out of search results', () => {
    const hidden = all.filter(([, meta]) => meta.noindex).map(([name]) => name);
    expect(hidden.sort()).toEqual(['error', 'notFound']);
  });

  // index.html is what visitors and crawlers that don't run scripts get.
  it("matches index.html's title and description on the home page", () => {
    expect(html).toContain(`<title>${PAGES.home.title}</title>`);
    expect(html.match(/name="description"\s+content="([^"]+)"/)?.[1]).toBe(
      PAGES.home.description,
    );
  });

  // A fixed canonical URL would name the home page for every route.
  it('leaves the canonical URL out of index.html (each page sets its own)', () => {
    expect(html).not.toMatch(/<link[^>]+rel="canonical"/);
  });
});
