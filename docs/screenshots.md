# Screenshots / Playwright

How the project gallery is built and refreshed.

## What gets captured

`tests/screenshots.spec.ts` walks a `Shot[]` list and writes each capture to `public/screenshots/<slug>.png`.

Three flavors of shots:

1. **Local site** — routes served by the dev server (Playwright's `webServer` config auto-starts vite). Captures both light and dark themes.
2. **External project sites** — `squanto.app`, `games.jdilig.me`, etc. — for the project gallery in `src/data/projects.ts`.
3. **Project detail pages** — the local v3 site rendering each project's gallery, captured for use as previews on the projects page.

## Pipeline

```
npm run screenshots
  └─ playwright test
       ├─ webServer auto-starts `vite --port 4173 --strictPort`
       ├─ for each Shot:
       │    1. (local only) inject theme into localStorage via addInitScript
       │    2. page.goto(path) — load: 'load' for external, 'domcontentloaded' for local
       │    3. await document.fonts.ready  (best-effort)
       │    4. wait 1500ms for SPA hydration / rAF first-paint
       │    5. (optional) press a key to kick canvas-based games
       │    6. (optional) extra wait
       │    7. 404 guard — fail if document.title contains '404' / 'Not Found' / 'Server Error' / 'Unauthorized'
       │    8. screenshot to public/screenshots/<slug>.png
       └─ exit 0 if all pass
```

## The 404 guard

After hydration, the spec fails the test if `document.title` contains any of:
- `404`
- `Not Found`
- `Page Not Found`
- `Server Error`
- `Unauthorized`

We added this after silently capturing Squanto's NotFound page when I'd guessed `/about-us` and `/faq` instead of the real routes `/about` and `/help` — see commit `dee3727`. Now bad URLs fail loudly during capture instead of polluting the gallery.

Override the bad-title list per shot via `failIfTitleContains: ['custom']` if a real page legitimately includes one of the default words.

## Adding a new shot

```ts
// tests/screenshots.spec.ts
const SHOTS: Shot[] = [
  // ... existing entries
  {
    slug: 'my-new-shot',                 // becomes <slug>.png
    path: '/some/route',                 // local path or absolute URL
    theme: 'dark',                       // local only
    external: true,                      // for absolute URLs
    timeout: 60_000,                     // optional, default 30s
    extraWaitMs: 2500,                   // optional, for slow pages
    pressKey: 'Space',                   // optional, click + key before screenshot
  },
];
```

Then `npm run screenshots` to write the file.

## Wiring a screenshot into a project's gallery

Each `Project` in `src/data/projects.ts` can carry:

```ts
previewImage?: string;            // shown on cards + as hero on detail page
gallery?: { src: string; alt: string }[];   // multi-image lightbox on detail page
```

Both expect paths under `/screenshots/`. Example:

```ts
{
  slug: 'jdilig-me',
  // ...
  previewImage: '/screenshots/home-dark.png',
  gallery: [
    { src: '/screenshots/home-dark.png',     alt: 'Home — dark mode' },
    { src: '/screenshots/projects-dark.png', alt: 'Projects index' },
  ],
}
```

`ProjectHeroPreview.tsx` renders the image when present and falls back to a starfield SVG when not — that's why early shots had a starfield placeholder before the real captures landed.

## Capturing external sites

Three things to know before adding an external shot:

1. **Verify the URL renders content.** Don't guess routes — read the project's sitemap or router file. Curl-ing the URL doesn't help on SPAs (every path returns the same outer HTML); the 404 guard is your safety net.
2. **`waitUntil: 'load'`** instead of `'domcontentloaded'` for externals — they often have ongoing connections (analytics, maps, ads) that would prevent `'networkidle'` from firing within a reasonable time.
3. **Bump `timeout`** to 60s for externals. The defaults are tuned for local dev.

## Capturing canvas games

Canvas games gate first paint on a user gesture (browsers' AudioContext policy). Without a click or key event, the canvas stays blank.

Pattern in the spec:

```ts
{
  slug: 'game-running-man',
  path: 'https://games.jdilig.me/games/running-man/index.html',
  external: true,
  pressKey: 'Space',         // simulates user gesture
  extraWaitMs: 1500,         // let the rAF loop draw a few frames
}
```

The `pressKey` step does `page.mouse.click(640, 400)` first to focus the page, then `page.keyboard.press(key)`. This is enough for keyboard-driven games like Running Man and Maze Runner. Click-driven games (Block Arena, Neon Tower Defense) may still capture before gameplay kicks in — acceptable for a thumbnail preview.

## Where the captures live

- `public/screenshots/*.png` — committed to the repo. Sized 1280×800 @ 2× device scale (so they look sharp on retina).
- `test-results/` — Playwright run artifacts. Gitignored.
- `playwright-report/` — HTML report. Gitignored.

## Re-capturing

Anytime UI changes that visitors might want to see:

```sh
npm run screenshots
```

The run is fast (~30–50s for the full set) and idempotent — same input → same output. Commit the regenerated PNGs if they meaningfully differ.

For just the games or just one slug:

```sh
npx playwright test -g "game-"          # all slugs starting with "game-"
npx playwright test -g "running-man"    # single slug
```

## Anti-patterns

- ❌ Adding a shot whose URL you haven't verified renders. The 404 guard helps but isn't perfect.
- ❌ Capturing logged-in pages of external apps. The session won't persist across runs.
- ❌ Bumping `extraWaitMs` to fix flakiness. If the page needs more than 4s, there's a deeper timing issue — diagnose with `await page.locator('something-real').waitFor()`.
- ❌ Committing `test-results/` or `playwright-report/`. They're gitignored for a reason.
