# BACKLOG

Upcoming features and tasks for jdilig.me v3. Loosely ordered by priority. Each item should leave enough context that we can pick it up cold.

> Hygiene: when a commit/merge to `main` completes or invalidates an item, the same commit (or one immediately after) should update this file. See [`docs/workflow.md`](./docs/workflow.md) for the rule.

---

## 1. Lighthouse follow-ups

**Production scores** (Sept 27, 2026 — desktop, Lighthouse 13.5.0, measured by the **Lighthouse** workflow). April 2026 scores in parentheses.

| Site | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `www.jdilig.me` | 100 (82) | 100 (95) | 100 (100) | 100 (100) |
| `squanto.app` | 70 (16) | 93 (100) | 77 (81) | 92 (92) |

Squanto's code isn't in this repo, so its scores are shown as measured.

**Why the April scores were low.** Until Sept 2026, `npm run lighthouse` set `formFactor: 'desktop'` without Lighthouse's desktop preset. So it tested at phone speed (4× slower CPU, 1.6 Mbps, 150 ms latency, phone user agent) and then graded the result against the stricter desktop thresholds. On the same local build, the old settings scored Performance 82 and the desktop preset scored 100.

**Fixed in Sept 2026**
- **Fonts** are self-hosted (Fontsource), so there's no render-blocking Google Fonts stylesheet.
- **Screenshots** are WebP: 5.0 MB → 1.3 MB for the set. Images on the Squanto project page went from 2.3 MB to 0.2 MB.
- **Color contrast.** The light-mode accent is now orange-700, and informational text no longer uses `--fg-faint`. axe reports 0 issues on every route in both themes.

**Optional next steps**
- Smaller gallery thumbnails. Thumbnails load the full 1280 px WebP; Lighthouse estimates 50–350 KB of savings per project page from `srcset` variants. It doesn't affect the score.
- About 45 KB of the JS bundle goes unused on any given page, because the whole app ships as one file. Route-level code splitting would fix that, but Total Blocking Time is already 0 ms on desktop.
- Move the workflow's `actions/checkout`, `actions/setup-node` and `actions/upload-artifact` past `@v4`. GitHub warns that v4 targets Node 20 and forces it onto Node 24; the run still passes.

---

## 2. Lighthouse automation

The **Lighthouse** workflow (`.github/workflows/lighthouse.yml`) scores both live sites from a GitHub runner. It runs when started by hand, or on a push that changes `scripts/lighthouse.mjs` or the workflow file. It prints the new JSON files and attaches them to the run; committing them is still manual. Possible next steps:
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

- **Clean up the old contact form's Resend setup.** The form and `/api/contact` were removed in Sept 2026, so the Resend key is no longer needed. Revoke it in the Resend dashboard (API Keys). If `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` are still set in Vercel (Settings → Environment Variables), delete them. Whether they're still set is unverified: the token used in Sept 2026 couldn't list env vars.
- **Archive or delete the old `jdilig-me` Vercel project.** It's orphaned now that `jdilig.me` / `www.jdilig.me` moved to `jdilig-me-v3`. Confirm v3 has been stable for a few days, then in Vercel: open the old project → Settings → bottom of page → "Delete Project" (or just leave it parked at its `*.vercel.app` URL).
- **Improve game canvas screenshots.** Per-game previews still capture only the HUD overlay. The capture spec now clicks the canvas, sends a key, waits for `networkidle`, and probes computed styles. Diagnostic shows `bodyBg: "rgba(0, 0, 0, 0)"` and `bodyDisplay: "block"` for game pages — the games' `style.css` isn't applying in Playwright (computed body bg should be `#0f1116`). CSS file itself is reachable (`HTTP 200`, `content-type: text/css`) — likely a service-worker or HTTP cache issue specific to headless Chromium. Investigate by adding `bypassCSP: true` to the Playwright context and/or sending `Cache-Control: no-cache` headers on the navigation. Until resolved, hand-grabbed PNGs would be a fine workaround.

---

## 5. Mobile device support — remaining bits

The Sept 2026 responsive pass shipped the core fixes (see "Recently shipped"). Home, Projects, the Squanto project page, Resume, and Contact were checked at 375px wide in Chromium's mobile emulation: no sideways scrolling. Left to do:

- Extend `tests/screenshots.spec.ts` to capture each route at one mobile viewport — gives a regression baseline.
- Gallery lightbox: add swipe gestures (tap targets for prev / next already exist).
- Spot-check on a real iPhone (Safari) and Android (Chrome) — everything so far was verified in desktop Chromium's mobile emulation.
- The header hides the `jdilig.me` wordmark below 640px so the three nav links fit. If the nav grows past three links, switch to a menu (Headless UI's `Disclosure` is installed but unused — mind the bundle cost).

---

## Recently shipped

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
