// Row-for-row parity between each vendored ACR.md and its generated HTML partial: same tables,
// same row count, and every cell's text equal. The Markdown side is parsed here independently of
// the generator, so a generator bug can't hide itself.
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { build } from '../../scripts/acr-to-html.mjs';

const dir = path.resolve(__dirname, 'acr');
const { reports } = JSON.parse(fs.readFileSync(path.join(dir, 'acr.config.json'), 'utf8')) as { reports: Array<{ slug: string }> };
const synced = reports.filter((r) => fs.existsSync(path.join(dir, r.slug, 'ACR.md')));

const mdText = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\\\|/g, '|')
    .trim();
const htmlText = (s: string) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .trim();

function mdTables(md: string): string[][][] {
  const tables: string[][][] = [];
  let cur: string[][] | null = null;
  for (const line of md.split('\n')) {
    if (line.startsWith('|')) {
      if (/^\|[\s|:-]+\|$/.test(line.trim())) continue; // separator row
      cur ??= [];
      cur.push(line.trim().slice(1, -1).split(/(?<!\\)\|(?=(?:[^`]*`[^`]*`)*[^`]*$)/).map(mdText));
    } else if (cur) {
      tables.push(cur);
      cur = null;
    }
  }
  if (cur) tables.push(cur);
  return tables;
}

function htmlTables(html: string): string[][][] {
  return [...html.matchAll(/<table[\s\S]*?<\/table>/g)].map((t) =>
    [...t[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) => [...r[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => htmlText(c[1]))),
  );
}

describe('ACR partials', () => {
  it('has at least one synced report', () => expect(synced.length).toBeGreaterThan(0));

  it.each(synced.map((r) => r.slug))('%s: committed acr.html matches a fresh regen', (slug) => {
    const fresh = build().find((b) => b.file.endsWith(path.join(slug, 'acr.html')));
    expect(fresh).toBeDefined();
    expect(fs.readFileSync(fresh!.file, 'utf8')).toBe(fresh!.html);
  });

  it.each(synced.map((r) => r.slug))('%s: every table row and cell matches ACR.md', (slug) => {
    const md = fs.readFileSync(path.join(dir, slug, 'ACR.md'), 'utf8');
    const html = fs.readFileSync(path.join(dir, slug, 'acr.html'), 'utf8');
    const a = mdTables(md);
    const b = htmlTables(html);
    expect(b.length).toBe(a.length);
    a.forEach((rows, i) => {
      expect(b[i].length, `table ${i + 1} row count`).toBe(rows.length);
      rows.forEach((row, j) => expect(b[i][j], `table ${i + 1} row ${j + 1}`).toEqual(row));
    });
  });

  it.each(synced.map((r) => r.slug))('%s: tables are captioned, scoped and in a labelled focusable region', (slug) => {
    const html = fs.readFileSync(path.join(dir, slug, 'acr.html'), 'utf8');
    const tables = [...html.matchAll(/<div role="region" aria-labelledby="([^"]+)" tabindex="0"[^>]*>\s*<table[\s\S]*?<\/table>/g)];
    expect(tables.length).toBe((html.match(/<table/g) ?? []).length);
    for (const t of tables) {
      expect(t[0]).toContain(`<caption id="${t[1]}"`);
      expect(t[0]).toMatch(/<thead><tr>(<th scope="col"[^>]*>[\s\S]*?<\/th>)+<\/tr><\/thead>/);
    }
  });

  it.each(synced.map((r) => r.slug))('%s: header block names version, date, product version, source SHA, contact and the ACR.md link', (slug) => {
    const html = fs.readFileSync(path.join(dir, slug, 'acr.html'), 'utf8');
    const src = JSON.parse(fs.readFileSync(path.join(dir, slug, 'SOURCE.json'), 'utf8')) as { repo: string; path: string; sha: string };
    for (const k of ['Report version', 'Report date', 'Product version', 'Source', 'Contact', 'Full report']) expect(html).toContain(`>${k}</dt>`);
    expect(html).toContain(`${src.repo}/blob/${src.sha}/${src.path}`);
    expect(html).not.toContain('Not stated in the report');
  });
});
