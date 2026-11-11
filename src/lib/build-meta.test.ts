import { describe, expect, it } from 'vitest';
import { buildMeta, resolveCommit } from '../../scripts/build-meta.mjs';

const A = 'a'.repeat(40);
const B = '0123456789abcdef0123456789abcdef01234567';

describe('build-meta', () => {
  it('prefers VERCEL_GIT_COMMIT_SHA', () => {
    expect(resolveCommit({ VERCEL_GIT_COMMIT_SHA: A }, () => B)).toBe(A);
  });

  it('falls back to git when the env var is missing or not a SHA', () => {
    expect(resolveCommit({}, () => B)).toBe(B);
    expect(resolveCommit({ VERCEL_GIT_COMMIT_SHA: 'main; echo hi' }, () => B)).toBe(B);
  });

  it('writes "unknown" rather than anything that is not a 40-char SHA', () => {
    expect(resolveCommit({}, () => '')).toBe('unknown');
    expect(resolveCommit({ VERCEL_GIT_COMMIT_SHA: 'abc123' }, () => 'not a sha')).toBe('unknown');
  });

  it('has only commit and builtAt, with no other env values', () => {
    const meta = buildMeta({ VERCEL_GIT_COMMIT_SHA: A, SECRET_TOKEN: 'x' }, new Date('2026-11-11T04:00:00Z'), () => '');
    expect(meta).toEqual({ commit: A, builtAt: '2026-11-11T04:00:00.000Z' });
  });
});
