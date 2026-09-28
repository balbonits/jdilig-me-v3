# BACKLOG

Upcoming features and tasks for jdilig.me v3. Loosely ordered by priority. Each item should leave enough context that we can pick it up cold.

> Hygiene: when a commit/merge to `main` completes or invalidates an item, the same commit (or one immediately after) should update this file. See [`docs/workflow.md`](./docs/workflow.md) for the rule.

---

## 1. Lighthouse follow-ups

**Production scores** (Sept 27, 2026 — desktop, Lighthouse 13.5.0, measured by the **Lighthouse** workflow). April 2026 scores in parentheses.

| Site | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `www.jdilig.me` | 100 (82) | 100 (95) | 100 (100) | 100 (100) |

Squanto's scores are no longer shown on the site or measured (removed Sept 2026 at John's request).

**Why the April scores were low.** Until Sept 2026, `npm run lighthouse` set `formFactor: 'desktop'` without Lighthouse's desktop preset. So it tested at phone speed (4× slower CPU, 1.6 Mbps, 150 ms latency, phone user agent) and then graded the result against the stricter desktop thresholds. On the same local build, the old settings scored Performance 82 and the desktop preset scored 100.

**Fixed in Sept 2026**
- **Fonts** are self-hosted (Fontsource), so there's no render-blocking Google Fonts stylesheet.
- **Screenshots** are WebP: 5.0 MB → 1.3 MB for the set. Images on the Squanto project page went from 2.3 MB to 0.2 MB.
- **Color contrast.** The light-mode accent is now orange-700, and informational text no longer uses `--fg-faint`. axe reports 0 issues on every route in both themes.

**Optional next steps**
- About 45 KB of the JS bundle goes unused on any given page, because the whole app ships as one file. Route-level code splitting would fix that, but Total Blocking Time is already 0 ms on desktop.
- Move the workflow's `actions/checkout`, `actions/setup-node` and `actions/upload-artifact` past `@v4`. GitHub warns that v4 targets Node 20 and forces it onto Node 24; the run still passes.

---

## 2. Lighthouse automation

The **Lighthouse** workflow (`.github/workflows/lighthouse.yml`) scores `www.jdilig.me` from a GitHub runner. It runs when started by hand, or on a push that changes `scripts/lighthouse.mjs` or the workflow file. It prints the new JSON file and attaches it to the run; committing it is still manual. Possible next steps:
- Run it automatically after each production deploy (a Vercel Deploy Hook or a `deployment_status` trigger).
- Have it open a PR with the updated JSON when scores change.

Low priority — manual is fine for now since the score doesn't change often.

---

## 3. Add GA4 / Google Analytics

Add page-view + basic event tracking via Google Analytics 4.

**Scope**
- Provision a GA4 property and measurement ID (`G-XXXXXXXXXX`); store as `VITE_GA_MEASUREMENT_ID` in Vercel env (Production + Preview).
- Inject `gtag.js` (lazy / consent-gated, not blocking initial render) and fire a page view on every React Router navigation.
- Track explicit events worth measuring: project-card click, resume PDF download, theme toggle.
- Add a **cookie / consent banner** (GA sets `_ga` cookies, so this is required for EU/CA visitors). Headless UI dialog or a small inline strip — match the design tokens.
- **Update privacy disclosure**: the README's Privacy section describes the current analytics (Vercel Web Analytics + Speed Insights, no ad or social trackers). It must change when GA goes live.

**Notes**
- Keep the bar low: page views + 4–5 events. Don't add a full analytics layer or event taxonomy.
- Honor `Do Not Track` and `prefers-reduced-data` if it's cheap; otherwise just respect the consent choice.

---

## 4. Operational follow-ups (do soon, not features)

Loose ends from the launch session that don't fit into a feature ticket.

- **On hold / not doing (John's call, Sept 27, 2026):** revoking the old Resend key and deleting its Vercel env vars (the form is gone and the Resend account isn't paid); deleting the old `jdilig-me` Vercel project; spot-checking on real phones. Don't re-suggest these.
- **Improve game canvas screenshots.** Per-game previews still capture only the HUD overlay. The capture spec now clicks the canvas, sends a key, waits for `networkidle`, and probes computed styles. Diagnostic shows `bodyBg: "rgba(0, 0, 0, 0)"` and `bodyDisplay: "block"` for game pages — the games' `style.css` isn't applying in Playwright (computed body bg should be `#0f1116`). CSS file itself is reachable (`HTTP 200`, `content-type: text/css`) — likely a service-worker or HTTP cache issue specific to headless Chromium. Investigate by adding `bypassCSP: true` to the Playwright context and/or sending `Cache-Control: no-cache` headers on the navigation. Until resolved, hand-grabbed PNGs would be a fine workaround.

---

## 5. Mobile device support — remaining bits

The Sept 2026 responsive pass shipped the core fixes (see "Recently shipped"). Home, Projects, the Squanto project page, Resume, and Contact were checked at 375px wide in Chromium's mobile emulation: no sideways scrolling. Left to do:

- Extend `tests/screenshots.spec.ts` to capture each route at one mobile viewport — gives a regression baseline.
- The header hides the `jdilig.me` wordmark below 640px so the three nav links fit. If the nav grows past three links, switch to a menu (Headless UI's `Disclosure` is installed but unused — mind the bundle cost).

---

## Recently shipped

- **City App Framework white paper linked (Sept 28, 2026).** The City App page and pop-up now have a "Read the white paper" button for the new white paper ("Laws and customs: which instructions change what AI coding agents do", a case study from v3 to v4), and its first screen is the project picture. This sandbox can't reach the white paper's vercel.app address, so the screenshot was taken from the framework repo's `site/` files at the deployed commit (`902b096`); the capture spec has the live address for next time.
- **City App Framework back, rewritten for v4 (Sept 28, 2026).** Its project page now describes v4: a Claude Code plugin (setup, hooks, lessons, rule testing, front-end checks) and the test results it was rebuilt from. Every claim comes from the framework repo's README, `docs/findings-2026-09.md`, and decision 001. v4 has no website, so the page links only to the source, the old whitepaper-site screenshot and its capture step are gone, and the featured card shows the starfield placeholder. It's back in the sitemap, and Squanto stays the featured project (John's call, Sept 28, 2026); the site screenshots were retaken.
- **Swipe in the gallery lightbox (Sept 27, 2026).** On touch screens, swipe left / right to page through images; taps, short moves, vertical moves and pinches don't page. The dialog sets `touch-action: pan-y pinch-zoom`: in Chrome's touch emulation, without it a right swipe in the lightbox took the browser back a page (the browser's own history gesture). Tested with emulated touch in headless Chromium, not on a real phone.
- **Link preview image (Sept 27, 2026).** Shared links now show `public/og-image.png` (1200×630: name, role, location, one-line summary, in the site's dark theme and fonts) instead of the small logo; Twitter/X uses the large card. `npm run og:image` regenerates it from `src/data/profile.ts`; a unit test checks `index.html` points at it at the right size.
- **Site screenshots retaken (Sept 27, 2026).** The jdilig.me gallery now shows Squanto as the featured project (City App Framework is hidden) and the refreshed Lighthouse scores. The capture spec now writes each thumbnail right after its capture and captures the two project pages last, so one run is consistent. Also fixed the jdilig.me case study: the light accent is orange-700, not orange-600.
- **Featured card and pop-up use thumbnails too (Sept 2026).** Both now pick the 720 px copy when it's enough for the screen: on regular-resolution screens and 2× phones, the featured card on `/projects` went from 60 KB to 12 KB and the Squanto pop-up image from 43 KB to 21 KB. 2× desktops and 3× phones still get the original. The thumbnail test now covers every project screenshot.
- **Gallery thumbnails (Sept 2026).** Gallery tiles load 720 px-wide copies (`public/screenshots/thumbs/`, made by `npm run thumbnails`) instead of the 1280 px originals; the lightbox still loads the original. Tile images per project page: Squanto 196 → 88 KB, jdilig.me 431 → 177 KB, Coding Interview Reviewer 142 → 56 KB. A unit test fails if a gallery screenshot has no thumbnail.
- **Squanto's Lighthouse scores removed (Sept 2026).** The score panel no longer appears on `/projects/squanto`; `src/data/squanto-lighthouse.json`, the `lighthouse:squanto` script, and its workflow step are gone. The Squanto project page and resume entry are unchanged.
- **Lighthouse fixes (Sept 2026).** `npm run lighthouse` now uses Lighthouse's desktop preset (it had been testing at phone speed). Fonts are self-hosted instead of loaded from Google Fonts. Screenshots are WebP (5.0 MB → 1.3 MB for the set), and the 8 site screenshots were re-captured with the real fonts and the contact card. The light-mode accent went from orange-600 to orange-700 for 4.5:1 contrast. Added the **Lighthouse** workflow. Production now scores 100 in all four categories (Sept 27, 2026).
- **Vitest 5 (Sept 2026).** Also patched `ws` inside Lighthouse (7.5.10 → 7.5.13); `npm audit` reports 0 vulnerabilities.
- **Contact form → contact card (Sept 2026).** John never received emails from the form, so `/contact` now shows a contact card (email, phone, LinkedIn, GitHub, resume download) from `src/data/profile.ts`. Removed `/api/contact`, the shared validation rules and their tests, the `resend` package, `.env.example`, and `docs/contact-form.md`.
- **Sept 2026 review + cleanup.**
  - **Fonts and shadows fixed.** The CSS layer order let Tailwind's `--font-sans: var(--font-sans)` override the tokens, so every font fell back to Times New Roman and every `shadow-*` was empty since launch. Now `@layer theme, tokens, …` (see docs/design-system.md).
  - **Resume updated.** Added the Fox Corporation contract (Jul 2026 – present), closed out Squanto (Jun 2026), rewrote the content, and replaced the 2.3 MB image-only PDF with a 2-page text PDF generated from `src/data/resume.ts` (`npm run resume:pdf`).
  - **Bugs.** Home CTAs did full page reloads (`<a href>` for internal routes); dark-mode visitors saw a light flash on load; scroll position carried over between pages; the contact API crashed on non-string fields; game detail pages showed fake URLs (`running-man.jdilig.me`); raw backticks showed on case studies; the sitemap was missing two projects (now guarded by a test); README claimed "no analytics".
  - **Accessibility.** Native `<dialog>` modals (Tab never reaches the page behind, Esc, focus return, scroll lock), real `<label for>` on the contact form, input focus rings, skip link, `aria-pressed` filter pills, reduced-motion support.
  - **Mobile.** Responsive gutters and headings, header fits at 375px, one-column cards, stacked resume/contact layouts, 16px form inputs, hover effects limited to devices that can hover (`@media (hover: hover)`).
  - **Cleanup.** Shared `Container`, `Modal`, `TagList`, `ProjectTitle`, `ProjectMeta`, and contact rules (client + API); removed JS hover state, inline `<style>`, unused icons, `'—'`/`null` placeholders; `tsc -b` now type-checks `api/`; security updates for React Router, Resend, Vite, and Vitest.

- **SEO score 83 → 100.** Added `<meta name="description">`, canonical link, full Open Graph + Twitter Card meta tags, `public/robots.txt`, and `public/sitemap.xml` covering all routes. Apr 25, 2026.
- **Lighthouse threshold raised 80 → 90.** Anything below 90 in any category is now flagged. Apr 25, 2026.
- **Lighthouse UI rework.** Replaced sidebar pill-style scores with proper Lighthouse-style circular gauges (SVG ring, score in center, label underneath). Moved from sidebar to a dedicated section above the project gallery. Apr 25, 2026.
- **Lighthouse runner + scores on the project page.** `npm run lighthouse` runs Lighthouse against production and writes scores to `src/data/lighthouse.json`. The four scores render on `/projects/jdilig-me`. Apr 25, 2026.
- **Add games to projects.** All four games from `balbonits/ai-browser-game-demos` (Running Man, Neon Tower Defense, Block Arena, Maze Runner) wired in as `Project` entries with kind `'GAME'`, screenshots in the gallery, and `liveLabel` defaulting to "Play". `games.jdilig.me` subsite linked from the footer. Apr 25, 2026.
- **`docs/` folder + BACKLOG hygiene rule.** Created the seven-doc reference set and the rule that every push to `main` updates this file. Apr 25, 2026.
