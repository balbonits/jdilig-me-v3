// Types for scripts/acr-to-html.mjs, used by src/data/acr.test.ts.
export function inline(text: string, base: string): string;
export function cells(line: string): string[];
export function render(md: string, source: { repo: string; path: string; sha: string }, slug: string): string;
export function build(): Array<{ file: string; html: string }>;
export const HIT_44: string;
export function standalone(fragment: string, crowded?: boolean): string;
