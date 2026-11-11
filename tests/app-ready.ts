import type { Page } from '@playwright/test';

// PERF-100: the app boots after first paint (src/main.tsx imports src/boot.tsx
// on the next frame), so page.goto() can return before React has mounted. In
// the dev server nothing is prerendered, so a test that reads the DOM or the
// title straight away must wait for React first. Locator assertions retry on
// their own and don't need this.
export async function waitForApp(page: Page): Promise<void> {
  await page.waitForFunction(() => {
    const root = document.getElementById('root');
    return !!root && Object.keys(root).some((k) => k.startsWith('__reactContainer'));
  });
  // Let the first commit and its effects (document.title among them) run.
  await page.evaluate(
    () => new Promise<void>((r) => requestAnimationFrame(() => setTimeout(r))),
  );
}
