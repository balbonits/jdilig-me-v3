// Build identity for the deployed site (BUILD-META). The Vite build stamps
// <meta name="build-commit" content="<sha>"> into index.html (and so into every
// prerendered page) and emits /build.json with { commit, builtAt }, so
// `npm run live-check -- --expect-sha <sha>` can prove which commit is live.
//
// The commit comes from VERCEL_GIT_COMMIT_SHA on Vercel, else `git rev-parse HEAD`
// locally, else "unknown". Only a 40-char hex SHA is ever written: nothing else
// from the environment reaches the output.

import { execFileSync } from 'node:child_process';

const SHA = /^[0-9a-f]{40}$/;

export function gitHead() {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
}

export function resolveCommit(env = process.env, git = gitHead) {
  const fromEnv = String(env.VERCEL_GIT_COMMIT_SHA ?? '').trim().toLowerCase();
  if (SHA.test(fromEnv)) return fromEnv;
  const fromGit = String(git() ?? '').trim().toLowerCase();
  return SHA.test(fromGit) ? fromGit : 'unknown';
}

export function buildMeta(env = process.env, now = new Date(), git = gitHead) {
  return { commit: resolveCommit(env, git), builtAt: now.toISOString() };
}

// Vite plugin: client build only (the SSR build used by prerender is skipped).
export function buildMetaPlugin(meta = buildMeta()) {
  let ssr = false;
  return {
    name: 'build-meta',
    apply: 'build',
    configResolved(config) {
      ssr = Boolean(config.build.ssr);
    },
    transformIndexHtml() {
      return ssr ? [] : [{ tag: 'meta', attrs: { name: 'build-commit', content: meta.commit }, injectTo: 'head' }];
    },
    generateBundle() {
      if (ssr) return;
      this.emitFile({ type: 'asset', fileName: 'build.json', source: JSON.stringify(meta, null, 2) + '\n' });
    },
  };
}
