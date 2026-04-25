# BACKLOG

Upcoming features and tasks for jdilig.me v3. Loosely ordered by priority. Each item should leave enough context that we can pick it up cold.

> Hygiene: when a commit/merge to `main` completes or invalidates an item, the same commit (or one immediately after) should update this file. See [`docs/workflow.md`](./docs/workflow.md) for the rule.

---

## 1. Bring Performance score above 90

Lighthouse currently scores `https://www.jdilig.me/` at **74 / 100** for Performance (desktop, headless). Below the **90** threshold (raised from 80 in commit `c5c42f9`).

**Likely culprits (to investigate)**
- **LCP** — `public/logo.png` is the hero `<img>` on the home page; not pre-loaded, not sized, served as PNG (could be SVG / WebP).
- **Render-blocking CSS** — Google Fonts (`Geist`, `Instrument Serif`, `JetBrains Mono`) are loaded via `<link rel="stylesheet">` from `fonts.googleapis.com`. `display=swap` is set, which helps with FOIT but can still flash. Consider self-hosting via `@fontsource/*` or moving the link to `rel="preload"` + `media="print"` swap trick.
- **JavaScript bundle** — currently 291 kB minified / 92 kB gzip. Acceptable but not great for a static portfolio. React + ReactDOM + react-router-dom + headlessui together account for most of it. Probably not the LCP killer but worth a tree-shake check.
- **No image optimization** — `logo.png` and the screenshots in `public/screenshots/` are committed at 2× retina resolution, served as PNG. Vercel auto-converts on the edge for Next.js but not for plain Vite. Consider running them through `oxipng` / `pngquant` once.

**How to investigate**
```sh
npx lighthouse https://www.jdilig.me/ --view --form-factor=desktop
```
That opens the full HTML report with per-audit explanations and the "Opportunities" section.

**Scope when picking this up**
- Inspect the Lighthouse HTML report and pick the top 2–3 wins.
- Apply fixes one at a time. Re-run `npm run lighthouse` after each to measure delta.
- Update `src/data/lighthouse.json` (script writes it automatically) and re-deploy.
- Aim for ≥ 90 across the board on a static SPA this small. 100 is plausible.

---

## 2. Lighthouse automation

The current `npm run lighthouse` is manual — run it locally, commit the JSON. Once Performance is above threshold, consider automating:
- A Vercel Deploy Hook that triggers a post-deploy Lighthouse run.
- Or a GitHub Action that runs Lighthouse on every push to `main`, opens a PR with the updated JSON if scores changed.

Low priority — manual is fine for now since the score doesn't change often.

---

## 3. Add GA4 / Google Analytics

Add page-view + basic event tracking via Google Analytics 4.

**Scope**
- Provision a GA4 property and measurement ID (`G-XXXXXXXXXX`); store as `VITE_GA_MEASUREMENT_ID` in Vercel env (Production + Preview).
- Inject `gtag.js` (lazy / consent-gated, not blocking initial render) and fire a page view on every React Router navigation.
- Track explicit events worth measuring: contact-form submit success, project-card click, resume PDF download, theme toggle.
- Add a **cookie / consent banner** (GA sets `_ga` cookies, so this is required for EU/CA visitors). Headless UI dialog or a small inline strip — match the design tokens.
- **Update privacy disclosure**: the current line in `Contact.tsx` says "no analytics" and the README's Privacy section says "no third-party trackers". Both must change when GA goes live.

**Notes**
- Keep the bar low: page views + 4–5 events. Don't add a full analytics layer or event taxonomy.
- Honor `Do Not Track` and `prefers-reduced-data` if it's cheap; otherwise just respect the consent choice.

---

## 4. Operational follow-ups (do soon, not features)

Loose ends from the launch session that don't fit into a feature ticket.

- **Rotate the Resend API key.** The current key was pasted into a chat transcript and should be treated as exposed. Resend dashboard → API Keys → revoke the existing one + generate a new one → update `RESEND_API_KEY` in Vercel (Production + Preview) → trigger a redeploy. Don't forget to update `.env.local` if you still use `vercel dev` locally.
- **Live-fire the contact form.** Visit `https://www.jdilig.me/contact`, send a real message, confirm it lands in `rjdofficemail@gmail.com`. We never tested production end-to-end (the API was confirmed reachable via GET → 405, but no real send was attempted, since that would email the user in the middle of the build session).
- **Archive or delete the old `jdilig-me` Vercel project.** It's orphaned now that `jdilig.me` / `www.jdilig.me` moved to `jdilig-me-v3`. Confirm v3 has been stable for a few days, then in Vercel: open the old project → Settings → bottom of page → "Delete Project" (or just leave it parked at its `*.vercel.app` URL).
- **Improve game canvas screenshots.** Current per-game previews capture only the HUD overlay because canvas first-paint is gated on user gesture. The capture spec already sends a `Space` keypress, but the game's canvas still appears blank in screenshots — likely a layout-timing issue. Worth a follow-up to inspect why and fix, or replace the per-game previews with curated GIFs / hand-grabbed shots.

---

## 5. Check for mobile device support

Audit and fix mobile responsiveness across all routes.

**Scope**
- Walk every route at common viewports (375 × 812 iPhone SE/12, 390 × 844 iPhone 14, 412 × 915 Pixel 7, 768 × 1024 iPad).
- Things to specifically check:
  - Home hero: 72px headline likely overflows narrow screens — needs fluid type or a smaller mobile size.
  - Header nav: currently a flat row of links — needs a hamburger / drawer at `< md`.
  - Project cards grid: already `grid-cols-1 md:grid-cols-2`, looks OK; verify card hover effects don't get stuck on touch.
  - Project detail two-column layout (`md:grid-cols-[1fr_240px]`): sidebar collapses on mobile — verify ordering still makes sense.
  - Project gallery lightbox: confirm Esc / arrow-keys aren't the only navigation; add swipe gestures or visible tap zones.
  - Contact form: ensure the field-input styles look OK on iOS Safari (no zoom-on-focus from font-size < 16px).
  - Resume page max-width: 720px → already narrow, mostly OK; verify the header/buttons row stacks gracefully.
- Extend `tests/screenshots.spec.ts` to capture each route at one mobile viewport — gives a regression baseline.

**Notes**
- Tailwind breakpoints in use: `md:` (768) and that's it. May need to introduce `sm:` (640) tweaks for some layouts.
- The hamburger menu is the most likely net-new component this introduces. Headless UI's `Menu` or `Disclosure` is fine.

---

## Recently shipped

- **Lighthouse runner + scores on the project page.** `npm run lighthouse` runs Lighthouse against production and writes scores to `src/data/lighthouse.json`. The four scores render as colored pills in the sidebar of `/projects/jdilig-me`. Threshold is 80; anything below opens a BACKLOG item. Apr 25, 2026.
- **Add games to projects.** All four games from `balbonits/ai-browser-game-demos` (Running Man, Neon Tower Defense, Block Arena, Maze Runner) wired in as `Project` entries with kind `'GAME'`, screenshots in the gallery, and `liveLabel` defaulting to "Play". `games.jdilig.me` subsite linked from the footer. Apr 25, 2026.
- **`docs/` folder + BACKLOG hygiene rule.** Created the seven-doc reference set and the rule that every push to `main` updates this file. Apr 25, 2026.
