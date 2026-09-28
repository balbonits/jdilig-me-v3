import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { getProject } from './projects';

// The City App Framework white paper is its own Vercel project; vercel.json
// serves it at /whitepaper/ so the link stays on jdilig.me.
type Rule = { source: string; destination: string };
const config: { redirects: Rule[]; rewrites: Rule[] } = JSON.parse(
  readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'),
);
const rewriteAt = (source: string) => config.rewrites.findIndex((r) => r.source === source);

describe('/whitepaper/ (vercel.json)', () => {
  it('is proxied before the SPA fallback would serve the app there', () => {
    for (const source of ['/whitepaper/', '/whitepaper/:path*']) {
      expect(rewriteAt(source)).toBeGreaterThanOrEqual(0);
      expect(rewriteAt(source)).toBeLessThan(rewriteAt('/(.*)'));
    }
  });

  it('gets the trailing slash its relative links need', () => {
    expect(config.redirects).toContainEqual(
      expect.objectContaining({ source: '/whitepaper', destination: '/whitepaper/' }),
    );
  });

  it("is where City App Framework's white paper button goes", () => {
    expect(getProject('city-app-framework')?.links.live).toBe('https://www.jdilig.me/whitepaper/');
  });
});
