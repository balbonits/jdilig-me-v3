// Writes a static HTML file per route into dist/ with the page's real content
// and its own title, description, canonical, Open Graph and Twitter tags.
// Run after `vite build` and the SSR build of src/entry-server.tsx.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = join(root, 'dist');
const ssr = join(root, 'dist-ssr', 'entry-server.js');
const { render, pages, structuredData, PROFILE } = await import(pathToFileURL(ssr).href);

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setTag(html, pattern, replacement) {
  if (!pattern.test(html)) throw new Error(`prerender: tag not found: ${pattern}`);
  return html.replace(pattern, replacement);
}

const jsonLd = structuredData()
  .map((d) => `<script type="application/ld+json">${JSON.stringify(d).replace(/</g, '\\u003c')}</script>`)
  .join('\n    ');

for (const { url, file, meta } of pages()) {
  const body = render(url);
  if (!body || body.length < 200) throw new Error(`prerender: empty render for ${url}`);
  const canonical = new URL(meta.path, PROFILE.website).href;
  const t = esc(meta.title);
  const d = esc(meta.description);
  let html = template;
  html = setTag(html, /<title>[\s\S]*?<\/title>/, `<title>${t}</title>`);
  html = setTag(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${d}" />`);
  html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${meta.noindex ? PROFILE.website + '/' : canonical}" />`);
  html = setTag(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${t}" />`);
  html = setTag(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${d}" />`);
  html = setTag(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${t}" />`);
  html = setTag(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${d}" />`);
  const headExtra = meta.noindex
    ? '<meta name="robots" content="noindex" />'
    : `<link rel="canonical" href="${canonical}" />`;
  html = setTag(html, /<\/head>/, `    ${headExtra}\n    ${jsonLd}\n  </head>`);
  // data-route lets main.tsx hydrate only when this markup is for the current URL.
  html = setTag(html, /<div id="root"><\/div>/, `<div id="root" data-route="${esc(url)}">${body}</div>`);
  const out = join(dist, file);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log(`prerendered ${url} -> dist/${file}`);
}

rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });
