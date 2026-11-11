// Types for scripts/build-meta.mjs, used by vite.config.ts and src/lib/build-meta.test.ts.
import type { Plugin } from 'vite';
export type BuildMeta = { commit: string; builtAt: string };
export function gitHead(): string;
export function resolveCommit(env?: Record<string, string | undefined>, git?: () => string): string;
export function buildMeta(env?: Record<string, string | undefined>, now?: Date, git?: () => string): BuildMeta;
export function buildMetaPlugin(meta?: BuildMeta): Plugin;
