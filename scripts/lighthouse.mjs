#!/usr/bin/env node
// Run Lighthouse against the deployed site and write the four category
// scores to src/data/lighthouse.json so the project detail page can
// render them. Scores below the threshold are flagged in stdout so we
// can surface them in BACKLOG.md.
//
// Usage: npm run lighthouse [-- --url=https://example.com]

import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';

const SCORE_THRESHOLD = 90;
const DEFAULT_URL = 'https://www.jdilig.me/';

function parseArgs(argv) {
  const args = { url: DEFAULT_URL, formFactor: 'desktop', out: null };
  for (const a of argv.slice(2)) {
    if (a.startsWith('--url=')) args.url = a.slice('--url='.length);
    else if (a.startsWith('--out=')) args.out = a.slice('--out='.length);
    else if (a === '--mobile') args.formFactor = 'mobile';
    else if (a === '--desktop') args.formFactor = 'desktop';
  }
  return args;
}

const { url, formFactor, out } = parseArgs(process.argv);

const isMobile = formFactor === 'mobile';
const screenEmulation = isMobile
  ? { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75, disabled: false }
  : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1, disabled: false };

console.log(`Launching Chrome (headless)...`);
const chrome = await chromeLauncher.launch({
  chromeFlags: ['--headless=new', '--no-sandbox'],
});

try {
  console.log(`Running Lighthouse against ${url} (${formFactor})...`);
  const runner = await lighthouse(url, {
    port: chrome.port,
    output: 'json',
    logLevel: 'error',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor,
    screenEmulation,
  });

  if (!runner) {
    throw new Error('Lighthouse returned no result');
  }

  const lhr = runner.lhr;
  const cats = lhr.categories;
  const scores = {
    performance: Math.round((cats.performance.score || 0) * 100),
    accessibility: Math.round((cats.accessibility.score || 0) * 100),
    bestPractices: Math.round((cats['best-practices'].score || 0) * 100),
    seo: Math.round((cats.seo.score || 0) * 100),
  };

  const result = {
    url: lhr.finalDisplayedUrl ?? lhr.requestedUrl ?? url,
    measuredAt: lhr.fetchTime ?? new Date().toISOString(),
    formFactor,
    lighthouseVersion: lhr.lighthouseVersion,
    scores,
  };

  const outPath = out
    ? join(process.cwd(), out)
    : join(process.cwd(), 'src', 'data', 'lighthouse.json');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(result, null, 2) + '\n');

  console.log('\n  Lighthouse scores:');
  for (const [k, v] of Object.entries(scores)) {
    const flag = v < SCORE_THRESHOLD ? '⚠' : '✓';
    console.log(`    ${flag} ${k.padEnd(15)} ${String(v).padStart(3)} / 100`);
  }
  console.log(`\n  → wrote ${outPath}`);

  const lows = Object.entries(scores).filter(([, v]) => v < SCORE_THRESHOLD);
  if (lows.length > 0) {
    console.log(
      `\n  ${lows.length} categor${lows.length === 1 ? 'y' : 'ies'} below ${SCORE_THRESHOLD} — log to BACKLOG.md.`,
    );
    process.exitCode = 0;
  }
} finally {
  await chrome.kill();
}
