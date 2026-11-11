#!/usr/bin/env node
// On-demand health check of a deployed jdilig.me. Read-only: it only loads
// pages. No schedule, no polling; run it when you want to verify a deploy.
//
// Usage: npm run live-check -- --url https://www.jdilig.me [--expect-sha <sha>] [--out report.md] [--skip-lighthouse]
//
// 1. Fetches /sitemap.xml and every route in it: HTTP 200 and a real <title>.
// 2. axe-core on every route at 320 and 1280 px: 0 serious or critical.
// 3. Lighthouse mobile and desktop on /, a project page, /ux and one case
//    study: all four categories, anything under 100 fails.
// 4. Deploy identity: the build-commit meta tag and /build.json that the build
//    stamps (scripts/build-meta.mjs), plus headers and the vendored BUILD.json
//    files. With --expect-sha (7 to 40 hex chars) the meta on every route and
//    /build.json must match it; without it they must at least agree.
// Writes a markdown summary to stdout (and --out). Progress goes to stderr.
// Exit code 1 when any check fails, 2 when the run itself breaks.
//
// Browsers: Playwright's Chromium (or CHROMIUM_PATH) for axe, and
// chrome-launcher's Chrome (or CHROME_PATH) for Lighthouse.
// axe-core is not a direct dependency: it is resolved from the copy Lighthouse
// installs (lighthouse depends on axe-core).

import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { chromium } from '@playwright/test';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import * as chromeLauncher from 'chrome-launcher';

const require = createRequire(import.meta.url);
const AXE_PATH = require.resolve('axe-core/axe.min.js', { paths: [require.resolve('lighthouse')] });

const LH_ROUTES = ['/', '/projects/jdilig-me', '/ux', '/ux/design-system'];
const AXE_WIDTHS = [320, 1280];
const BAD_TITLES = [/^\s*$/, /\b404\b/, /not found/i, /server error/i];

function parseArgs(argv) {
  const args = { url: 'https://www.jdilig.me', out: null, lighthouse: true, expectSha: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const val = () => (a.includes('=') ? a.slice(a.indexOf('=') + 1) : argv[++i]);
    if (a === '--url' || a.startsWith('--url=')) args.url = val();
    else if (a === '--out' || a.startsWith('--out=')) args.out = val();
    else if (a === '--expect-sha' || a.startsWith('--expect-sha=')) args.expectSha = String(val() ?? '').toLowerCase();
    else if (a === '--skip-lighthouse') args.lighthouse = false;
    else throw new Error(`Unknown argument: ${a}`);
  }
  args.url = args.url.replace(/\/+$/, '');
  if (args.expectSha !== null && !/^[0-9a-f]{7,40}$/.test(args.expectSha)) {
    throw new Error('--expect-sha must be 7 to 40 hex characters');
  }
  return args;
}

const log = (...m) => console.error(...m);
const esc = (s) => String(s).replace(/\|/g, '\\|');
const titleOf = (html) => {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/&amp;/g, '&').replace(/&mdash;/g, '—').replace(/&#x27;|&#39;/g, "'").trim() : '';
};
const commitOf = (html) => {
  const tag = html.match(/<meta[^>]+name=["']build-commit["'][^>]*>/i);
  const m = tag && tag[0].match(/content=["']([^"']*)["']/i);
  return m ? m[1].toLowerCase() : null;
};
const shaMatches = (commit, expect) => Boolean(commit) && commit.startsWith(expect);
const short = (c) => (c && /^[0-9a-f]{40}$/.test(c) ? c.slice(0, 7) : c ?? '—');
const ptNow = () =>
  new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles', dateStyle: 'medium', timeStyle: 'short' }) + ' PT';

async function routesFromSitemap(base) {
  const res = await fetch(`${base}/sitemap.xml`);
  if (!res.ok) throw new Error(`GET /sitemap.xml returned ${res.status}`);
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  if (!paths.length) throw new Error('sitemap.xml lists no routes');
  return [...new Set(paths)];
}

async function fetchCheck(base, path) {
  try {
    const res = await fetch(base + path, { redirect: 'follow' });
    const html = await res.text();
    const title = titleOf(html);
    const problems = [];
    if (res.status !== 200) problems.push(`HTTP ${res.status}`);
    if (BAD_TITLES.some((re) => re.test(title))) problems.push(`bad title "${title}"`);
    return { status: res.status, title, commit: commitOf(html), problems };
  } catch (e) {
    return { status: 'error', title: '', commit: null, problems: [`fetch failed: ${e.message}`] };
  }
}

async function axeCheck(browser, base, path, width) {
  // bypassCSP: the site's CSP (rightly) blocks injected scripts, and axe has to be
  // injected. It only affects this test browser, not the site.
  const ctx = await browser.newContext({ viewport: { width, height: 800 }, bypassCSP: true });
  const page = await ctx.newPage();
  try {
    await page.goto(base + path, { waitUntil: 'networkidle', timeout: 45_000 });
    await page.addScriptTag({ path: AXE_PATH });
    const v = await page.evaluate(async () => {
      // eslint-disable-next-line no-undef
      const r = await axe.run(document, { resultTypes: ['violations'] });
      return r.violations
        .filter((x) => x.impact === 'serious' || x.impact === 'critical')
        .map((x) => `${x.id} (${x.impact}, ${x.nodes.length})`);
    });
    return v;
  } catch (e) {
    return [`run failed: ${e.message.split('\n')[0]}`];
  } finally {
    await ctx.close();
  }
}

async function lighthouseRuns(base) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });
  const rows = [];
  try {
    for (const path of LH_ROUTES) {
      for (const formFactor of ['mobile', 'desktop']) {
        log(`lighthouse ${formFactor} ${path}`);
        const row = { path, formFactor, scores: null, problems: [] };
        try {
          const runner = await lighthouse(
            base + path,
            { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] },
            formFactor === 'desktop' ? desktopConfig : undefined,
          );
          const lhr = runner?.lhr;
          if (!lhr) throw new Error('no result');
          if (lhr.runtimeError) throw new Error(`${lhr.runtimeError.code}: ${lhr.runtimeError.message}`);
          row.scores = {};
          for (const [k, label] of [['performance', 'Perf'], ['accessibility', 'A11y'], ['best-practices', 'BP'], ['seo', 'SEO']]) {
            const s = lhr.categories[k]?.score;
            if (s == null) row.problems.push(`no ${label} score`);
            else {
              row.scores[label] = Math.round(s * 100);
              if (row.scores[label] < 100) row.problems.push(`${label} ${row.scores[label]}`);
            }
          }
        } catch (e) {
          row.problems.push(`run failed: ${e.message.split('\n')[0]}`);
        }
        rows.push(row);
      }
    }
  } finally {
    await chrome.kill();
  }
  return rows;
}

async function deployInfo(base, expect) {
  const lines = [];
  const problems = [];
  let metaCommit = null;
  try {
    const res = await fetch(base + '/');
    for (const h of ['x-vercel-id', 'etag', 'last-modified', 'server']) {
      const v = res.headers.get(h);
      if (v) lines.push(`${h}: \`${v}\``);
    }
    metaCommit = commitOf(await res.text());
    lines.push(metaCommit ? `Site commit (build-commit meta on /): \`${metaCommit}\`` : 'Site commit: not exposed (no build-commit meta tag on /).');
  } catch (e) {
    lines.push(`Could not read /: ${e.message}`);
  }
  let jsonCommit = null;
  try {
    const res = await fetch(base + '/build.json');
    if (res.ok) {
      const b = await res.json();
      jsonCommit = String(b.commit ?? '').toLowerCase() || null;
      lines.push(`/build.json: commit \`${jsonCommit ?? '—'}\`, built ${b.builtAt ?? '—'}`);
    } else lines.push(`/build.json: HTTP ${res.status}`);
  } catch (e) {
    lines.push(`/build.json: could not read (${e.message})`);
  }
  if (expect) {
    lines.push(`Expected commit: \`${expect}\``);
    if (!shaMatches(metaCommit, expect)) problems.push(`build-commit meta on / is ${metaCommit ?? 'missing'}, expected ${expect}`);
    if (!shaMatches(jsonCommit, expect)) problems.push(`/build.json commit is ${jsonCommit ?? 'missing'}, expected ${expect}`);
  } else if (metaCommit && jsonCommit && metaCommit !== jsonCommit) {
    problems.push(`build-commit meta (${metaCommit}) and /build.json (${jsonCommit}) disagree`);
  }
  for (const p of ['/ux/job-tracker/BUILD.json', '/ux/dev-dashboard/BUILD.json']) {
    try {
      const res = await fetch(base + p);
      if (!res.ok) continue;
      const b = await res.json();
      const sha = b.commit ?? b.sha ?? b.gitSha ?? '';
      lines.push(`${p}: ${[b.repo, b.tag, sha].filter(Boolean).join(' ')}`);
    } catch {
      /* not exposed */
    }
  }
  return { lines, problems };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const base = args.url;
  const started = ptNow();
  log(`live-check ${base}`);
  const routes = await routesFromSitemap(base);
  log(`${routes.length} routes from sitemap.xml`);

  const fetched = {};
  for (const r of routes) fetched[r] = await fetchCheck(base, r);

  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const axe = {};
  try {
    for (const r of routes) {
      axe[r] = {};
      for (const w of AXE_WIDTHS) {
        log(`axe ${w} ${r}`);
        axe[r][w] = await axeCheck(browser, base, r, w);
      }
    }
  } finally {
    await browser.close();
  }

  const lh = args.lighthouse ? await lighthouseRuns(base) : [];
  const deploy = await deployInfo(base, args.expectSha);

  const failures = [];
  for (const r of routes) {
    for (const p of fetched[r].problems) failures.push(`${r}: ${p}`);
    // Only app routes carry the meta; proxied pages (e.g. /whitepaper/) have none, so a missing tag is not checked per route.
    const c = fetched[r].commit;
    if (args.expectSha && c && !shaMatches(c, args.expectSha)) failures.push(`${r}: build-commit ${c}, expected ${args.expectSha}`);
    for (const w of AXE_WIDTHS) for (const v of axe[r][w]) failures.push(`${r} @${w}: axe ${v}`);
  }
  for (const row of lh) for (const p of row.problems) failures.push(`Lighthouse ${row.formFactor} ${row.path}: ${p}`);
  for (const p of deploy.problems) failures.push(`Deploy: ${p}`);

  const md = [];
  md.push(`## Live check: ${base}`, '');
  md.push(`Run ${started}. Result: **${failures.length ? `FAIL (${failures.length})` : 'PASS'}**.`, '');
  md.push('**Deploy**', '', ...deploy.lines.map((l) => `- ${l}`), '');
  if (args.lighthouse) {
    md.push('**Lighthouse** (fails under 100)', '', '| Route | Form factor | Perf | A11y | BP | SEO |', '|---|---|---|---|---|---|');
    for (const row of lh) {
      const s = row.scores ?? {};
      md.push(`| ${row.path} | ${row.formFactor} | ${['Perf', 'A11y', 'BP', 'SEO'].map((k) => s[k] ?? '—').join(' | ')} |`);
    }
    md.push('');
  } else md.push('Lighthouse: skipped (--skip-lighthouse).', '');
  md.push(`**Routes** (${routes.length} from sitemap.xml; axe counts serious + critical)`, '', '| Route | HTTP | Title | Commit | axe 320 | axe 1280 |', '|---|---|---|---|---|---|');
  for (const r of routes) {
    const f = fetched[r];
    const n = (w) => (axe[r][w].some((v) => v.startsWith('run failed')) ? 'error' : axe[r][w].length);
    md.push(`| ${r} | ${f.status} | ${esc(f.title)} | ${short(f.commit)} | ${n(320)} | ${n(1280)} |`);
  }
  md.push('');
  if (failures.length) md.push('**Failures**', '', ...failures.map((f) => `- ${f}`), '');
  const out = md.join('\n');
  console.log(out);
  if (args.out) writeFileSync(args.out, out + '\n');
  process.exitCode = failures.length ? 1 : 0;
}

main().catch((e) => {
  log(`live-check could not run: ${e.message}`);
  process.exitCode = 2;
});
