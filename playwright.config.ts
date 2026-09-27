import { defineConfig, devices } from '@playwright/test';

// Playwright uses a dedicated port so it never collides with `npm run dev`
// for this repo or any other project you might be running at the same time.
const PORT = Number(process.env.PLAYWRIGHT_PORT) || 4173;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: BASE_URL,
    trace: 'off',
    // Optional: point at an already-installed Chromium instead of the one
    // `npx playwright install` downloads (handy in CI and sandboxes).
    launchOptions: process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {},
  },
  projects: [
    {
      name: 'chromium',
      // Sets the viewport to 1280×720 at 1× (screenshots are 1280 px wide).
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: `vite --port ${PORT} --strictPort`,
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 30_000,
  },
});
