// Turns each project's vendored ACR.md (src/data/acr/<slug>/ACR.md, synced by scripts/sync-acr.sh)
// into the HTML partial shown on its case-study page (src/data/acr/<slug>/acr.html).
// No dependencies: it handles only the Markdown an ACR uses (headings, bullets, paragraphs, tables,
// `code`, **bold**, [links](url) and bare URLs). Remarks are kept verbatim.
// Usage: node scripts/acr-to-html.mjs          writes every acr.html
//        node scripts/acr-to-html.mjs --check  regenerates in memory, prints a diff and exits 1 on drift
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src/data/acr');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Inline Markdown to HTML. `code` is literal; links and bold apply outside code. */
export function inline(text, base) {
  const parts = text.split(/(`[^`]*`)/);
  return parts
    .map((p) => {
      if (p.startsWith('`') && p.endsWith('`') && p.length > 1) return `<code>${esc(p.slice(1, -1))}</code>`;
      let out = '';
      const re = /\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<]+[^\s<.,;:)])|\*\*([^*]+)\*\*/g;
      let last = 0;
      let m;
      while ((m = re.exec(p))) {
        out += esc(p.slice(last, m.index));
        if (m[1]) out += link(m[2], inline(m[1], base), base);
        else if (m[3]) out += link(m[3], esc(m[3]), base);
        else out += `<strong>${inline(m[4], base)}</strong>`;
        last = m.index + m[0].length;
      }
      return out + esc(p.slice(last));
    })
    .join('');
}

function link(href, label, base) {
  // Relative links in ACR.md point into the source repo at the vendored SHA.
  const url = /^(https?:|mailto:|#)/.test(href) ? href : new URL(href, base).href;
  return `<a href="${esc(url)}" class="text-accent underline underline-offset-2" rel="noreferrer">${label}</a>`;
}

/** Splits a Markdown table row into cells, ignoring pipes inside `code`. */
export function cells(line) {
  const out = [];
  let cur = '';
  let inCode = false;
  const body = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === '`') inCode = !inCode;
    if (c === '\\' && body[i + 1] === '|') { cur += '|'; i++; continue; }
    if (c === '|' && !inCode) { out.push(cur.trim()); cur = ''; continue; }
    cur += c;
  }
  out.push(cur.trim());
  return out;
}

export function render(md, source, slug) {
  const base = `${source.repo}/blob/${source.sha}/${path.posix.dirname(source.path)}/`;
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  let heading = '';
  let t = 0;
  let title = '';
  for (let i = 0; i < lines.length; ) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    let m;
    if ((m = /^# (.+)/.exec(line))) {
      title = m[1];
      html.push(`<h3 class="mb-2 text-[17px] font-semibold text-fg-strong">${inline(m[1], base)}</h3>`);
      i++;
    } else if ((m = /^#{2,} (.+)/.exec(line))) {
      heading = m[1];
      html.push(`<h4 class="mt-4 mb-1 text-[15px] font-semibold text-fg-strong">${inline(m[1], base)}</h4>`);
      i++;
    } else if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const head = cells(rows[0]);
      const body = rows.slice(2).map(cells);
      const id = `acr-${slug}-t${++t}`;
      html.push(
        `<div role="region" aria-labelledby="${id}" tabindex="0" class="overflow-x-auto rounded-[12px] border border-border-DEFAULT">`,
        `<table class="w-full min-w-[36rem] border-collapse text-left text-[14px] leading-[1.55]">`,
        `<caption id="${id}" class="px-3 pt-3 pb-2 text-left font-semibold text-fg-strong">${inline(heading || title, base)}</caption>`,
        `<thead><tr>${head.map((h) => `<th scope="col" class="border-b border-border-strong px-3 py-2 font-semibold text-fg-strong">${inline(h, base)}</th>`).join('')}</tr></thead>`,
        `<tbody>`,
        ...body.map(
          (r) =>
            `<tr>${r
              .map((c, k) =>
                k === 0
                  ? `<th scope="row" class="border-b border-border-faint px-3 py-2 align-top font-medium text-fg">${inline(c, base)}</th>`
                  : `<td class="border-b border-border-faint px-3 py-2 align-top">${inline(c, base)}</td>`,
              )
              .join('')}</tr>`,
        ),
        `</tbody>`,
        `</table>`,
        `</div>`,
      );
    } else if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && /^- /.test(lines[i])) items.push(lines[i++].slice(2));
      html.push(`<ul class="m-0 flex list-disc flex-col gap-[7px] pl-[18px]">${items.map((x) => `<li>${inline(x, base)}</li>`).join('')}</ul>`);
    } else {
      const para = [];
      while (i < lines.length && lines[i].trim() && !/^(#|\||- )/.test(lines[i])) para.push(lines[i++].trim());
      html.push(`<p>${inline(para.join(' '), base)}</p>`);
    }
  }
  const short = source.sha.slice(0, 7);
  const header = [
    `<dl class="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 gap-y-1 rounded-[12px] border border-border-DEFAULT p-3 text-[14px]">`,
    ...[
      ['Report version', `${esc(short)} (the source repo commit this report was taken from)`],
      ['Report date', field(md, 'Report date', base)],
      ['Product version', field(md, 'Version', base)],
      ['Source', `<a href="${esc(`${source.repo}/commit/${source.sha}`)}" class="text-accent underline underline-offset-2" rel="noreferrer">${esc(source.repo.replace('https://github.com/', ''))} at ${esc(short)}</a>`],
      ['Contact', field(md, 'Contact', base)],
      ['Full report', `<a href="${esc(`${source.repo}/blob/${source.sha}/${source.path}`)}" class="text-accent underline underline-offset-2" rel="noreferrer">${esc(source.path)} in the source repo</a>`],
    ].map(([k, v]) => `<dt class="font-semibold text-fg-strong">${k}</dt><dd class="m-0 min-w-0 break-words">${v}</dd>`),
    `</dl>`,
  ];
  return [
    `<!-- Generated by scripts/acr-to-html.mjs from src/data/acr/${slug}/ACR.md (${source.repo} at ${source.sha}). Do not edit by hand. -->`,
    `<div class="flex flex-col gap-3.5" data-acr="${esc(slug)}">`,
    // Title first, then the report header block, then the body.
    ...(title ? [html[0], ...header, ...html.slice(1)] : [...header, ...html]),
    `</div>`,
    '',
  ].join('\n');
}

function field(md, name, base) {
  const m = new RegExp(`^- \\*\\*${name}:\\*\\* (.+)$`, 'm').exec(md);
  return m ? inline(m[1], base) : 'Not stated in the report';
}

export function build() {
  const { reports } = JSON.parse(fs.readFileSync(path.join(dir, 'acr.config.json'), 'utf8'));
  const out = [];
  for (const r of reports) {
    const mdFile = path.join(dir, r.slug, 'ACR.md');
    if (!fs.existsSync(mdFile)) continue; // configured but not synced yet
    const source = JSON.parse(fs.readFileSync(path.join(dir, r.slug, 'SOURCE.json'), 'utf8'));
    if (source.repo !== r.repo || source.path !== r.path) throw new Error(`${r.slug}: SOURCE.json doesn't match acr.config.json`);
    out.push({ file: path.join(dir, r.slug, 'acr.html'), html: render(fs.readFileSync(mdFile, 'utf8'), source, r.slug) });
  }
  return out;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const check = process.argv.includes('--check');
  let drift = 0;
  for (const { file, html } of build()) {
    const rel = path.relative(root, file);
    const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
    if (old === html) { console.log(`ok ${rel}`); continue; }
    if (!check) { fs.writeFileSync(file, html); console.log(`wrote ${rel}`); continue; }
    drift++;
    const a = old.split('\n'), b = html.split('\n');
    console.log(`DRIFT ${rel}`);
    for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) console.log(`  line ${i + 1}\n  - ${a[i] ?? ''}\n  + ${b[i] ?? ''}`);
  }
  if (drift) { console.log(`::error::${drift} ACR partial(s) differ from a fresh regen. Run npm run acr and commit the result.`); process.exit(1); }
}
