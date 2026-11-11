# JDM-VT motion spec: page transitions on jdilig.me

Status: v0.2 SIGNED by Chief Architect, 2026-11-10 (D1, D2 and D3 approved; v0.2 conditions in section 10). Build findings are marked **[v0.2]**. Author: Front End Developer, 2026-11-10.
Repo: balbonits/jdilig-me-v3 at main 6019094 (react-router 7.18.4, Vite, prerendered with StaticRouter).
Scope: polish only. The look, sections, nav, ids and copy stay the same, and nothing is renamed or removed. No new dependencies.

## 1. Mechanism (decision needed: D1)
The same-document View Transitions API, through React Router's own `viewTransition` support.

- **Problem:** the app uses `<BrowserRouter>` (declarative mode). RR7's `viewTransition` prop and `useViewTransitionState` only work in data mode, and a hand-rolled `document.startViewTransition` wrapper can't capture the old frame on Back/Forward, because React has already re-rendered by the time a popstate listener runs.
- **Proposal:** on the client, switch `App.tsx` from `<BrowserRouter>` + `useRoutes(routeTree)` to `createBrowserRouter(routeTree)` + `<RouterProvider>`, imported from `react-router/dom` so it gets `flushSync`. It uses the same `routeTree`, so the DOM is identical.
  - `entry-server.tsx` and the prerender don't change, because `main.tsx` uses `createRoot`, not hydrate, so there's no hydration mismatch risk.
  - `<Analytics/>` and `<SpeedInsights/>` stay siblings.
  - RR then wraps PUSH navigations in `startViewTransition`, and replays the transition for the matching Back/Forward (POP) pair automatically.
- **Link wrapper:** `src/components/ui/Link.tsx` re-exports `Link` and `NavLink` with `viewTransition` defaulting to `!prefersReducedMotion()`. The ~25 internal `Link`/`NavLink` imports switch to it. An ESLint `no-restricted-imports` rule keeps future code from importing `Link` from `react-router` directly.
- Plain `<a href>` links (the /ux/* static sub-apps, the résumé PDF, mailto, external links and `#hash` links) are untouched, so they stay normal full navigations. That keeps the /ux/* sub-apps out of scope by construction.
- **[v0.2]** The server side moves to the matching data API too: `createStaticHandler` + `StaticRouterProvider hydrate={false}`, because `useViewTransitionState` needs a data router even at render time. `render()` becomes async and `prerender.mjs` awaits it. The prerendered HTML is otherwise unchanged (no hydration script).
- Alternative if CA rejects the router-mode switch: a capture-phase click interceptor plus `startViewTransition(() => flushSync(navigate))` on PUSH only. Back/Forward would then be instant.

## 2. Default transition (every internal route change)
| Part | Old page | New page |
|---|---|---|
| `main` content (`view-transition-name: page`) | opacity 1 to 0, 160ms, `--ease-out` | opacity 0 to 1 plus translateY(8px) to 0, 240ms, `--ease-out`, 40ms delay |
| Header (`view-transition-name: site-header`) | stays put: `animation: none` on its group, old and new | same |
| Footer | inside root; fades with the root crossfade | same |
| Root (`::view-transition-*(root)`) | 0ms (no animation), so the page background never flashes | same |

- Easing is the site's existing `--ease-out: cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Total ≤ 280ms. Durations are new tokens `--dur-page-out: 160ms` and `--dur-page-in: 240ms` in tokens.css, next to `--dur-*`.
- Back/Forward use the same values. The slide stays upward, with no direction-aware reverse, which keeps it calm.

## 3. Shared-element morphs (only the clicked card)
| From | To | Morphs |
|---|---|---|
| Project card title (`ProjectCard` h3 link text, `FeaturedProjectCard` h2), on /, /projects | `ProjectDetail` h1 | `view-transition-name: project-title` |
| /ux card name (`Ux.tsx`, the 20px name span) | `UxCaseStudy` h1 | `view-transition-name: ux-title` |

- The name is set only on the card whose `to` matches `useViewTransitionState(to)`, so it's unique per page and never on more than one element.
- The detail page always carries the name on its h1 (one per page).
- Morph: group duration 280ms `--ease-out`. Old and new text crossfade inside the group with the default `mix-blend-mode: plus-lighter`.
- The name sits on the card's heading block (h3 or h2), not on the inline link. An inline element that wraps across lines would make the browser abort the transition.
- **[v0.2]** There's no image morph. Only the featured card has a preview image, and the detail page shows a gallery rather than the same hero, so an image morph would change the look, which is out of scope.
- **Back from detail to list:** a crossfade only, with no reverse morph. The list card can't know it's the target on POP, and forcing it would need extra state for little gain. Decision needed: D2, OK to ship forward-only?
- If the clicked card is off-screen or clipped at the target, the browser skips the morph and the page crossfade still runs. No special case is needed.

## 4. Reduced motion
- JS: `prefersReducedMotion()` (`matchMedia('(prefers-reduced-motion: reduce)')`, read at click time) means `viewTransition: false`, so navigation is instant: no crossfade, slide or morph.
- CSS belt-and-braces: `@media (prefers-reduced-motion: reduce) { ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; } }`. The existing `*` rule doesn't match these pseudo-elements.
- Choice: none rather than a 150ms crossfade, because it's the simplest and the most respectful of the setting.

## 5. Fallback
- Browsers without `document.startViewTransition` get an instant navigation. RR checks for the API itself, so there's no polyfill and no JS error.
- A Playwright test deletes `document.startViewTransition` before the app loads and asserts that navigation works with no page errors.

## 6. Focus, title and announcement
- On every client route change (not the first load), `SiteLayout` focuses `#main h1`. The h1 gets `tabIndex={-1}`, set by the layout at focus time so page components don't change.
- Focus uses `{ preventScroll: true }`, so PUSH stays at the top and POP keeps the restored scroll position.
- Mouse users get no outline, because programmatic focus after a pointer click doesn't match `:focus-visible` in Chromium, WebKit or Gecko. An extra `h1[tabindex="-1"]:focus:not(:focus-visible){outline:none}` makes sure of it. Keyboard users keep the existing teal ring.
- `document.title` is already set per page by `usePageMeta`, and that stays.
- **D3 (approved):** the `role="status"` title announcement is removed, because it doubled up with the h1 focus. The focused h1 is now the only page-change announcement, so it must identify the page: its accessible name starts with the page's name from `document.title`. A test checks this on every route.
- The skip link (`href="#main"`) works on every route. A test tabs to it after a client navigation and checks focus lands in `#main`.
- **[v0.2] Scroll:** React Router's `<ScrollRestoration/>` replaces the manual `scrollTo(0,0)` effect. It gives the same behavior: new pages open at the top and Back/Forward return to the old position. It's needed because, with a transition running, the browser restored Back too early and clamped it to the shorter page (measured: 1989 instead of 2166 px). A test covers it.
- **[v0.2]** Focus fires when the pathname changes, including Back to the first page, which the old key check missed. They don't fire on in-page `#hash` jumps, which keep normal browser focus.

## 7. CLS and performance
- View Transitions paint snapshots on a top layer without changing layout, so CLS isn't affected.
- No new dependencies. The JS is a wrapper of a few lines plus the router-mode switch, which adds no package. CSS is about 40 lines.
- Lighthouse runs on /, /projects/squanto, /ux and /ux/design-system. All four categories must be 100.

## 8. Frames per breakpoint
The motion is the same at every width; only what morphs differs by layout.
| Width | List layout | Morph path |
|---|---|---|
| 320 | one column; card title 17px, detail h1 38px | title travels mostly vertically |
| 375 | one column; same sizes as 320 | as at 320 |
| 768 | 2 columns (/ux md grid); detail h1 56px (sm+) | diagonal from the left or right column |
| 1280 | 2 or 3 columns; featured card h2 32px | diagonal, the largest scale change (17px to 56px) |

**[v0.2] Captured:** 24 frames in /workspace/ux-projects/jdm-vt-frames/ (project and ux flows × 320/375/768/1280 × 0/140/280ms). Mid-transition frames at each width are captured with Playwright, using `document.getAnimations()` paused at the midpoint, and attached to the PR as annotated PNGs.

## 9. Tests (DONE gate)
- Playwright:
  - Reduced-motion test (`emulateMedia({reducedMotion:'reduce'})`): no `::view-transition` animations run and navigation completes.
  - The fallback test with the API stubbed out.
  - h1 focus after navigation.
  - Skip link after navigation.
  - Back keeps the scroll position.
  - Unique `view-transition-name` per page (no duplicates in the DOM).
- `npm run test:e2e`, Vitest, typecheck and lint all green.
- axe: 0 serious or critical.
- Manual checks at 320, 375 and 1280.

## Decisions for CA
- D1: switch the client to the data router (createBrowserRouter + RouterProvider), with the same routeTree and the server untouched?
- D2: forward-only title morph, with Back as a crossfade?
- D3: remove the duplicate role=status title announcement now that focus moves to the h1?

## 10. CA conditions (v0.2 sign-off)
1. Focus moves to the h1 after React has committed the new page and the navigation has settled (`useNavigation().state === 'idle'`), so it never lands on a node a transition is replacing. It fires on pathname changes, including Back, and not on `#hash` jumps. Tests: morph + focus, Back replay + focus, hash jump.
2. Interruption: a second navigation mid-transition skips the running one (React Router's RouterProvider calls `skipTransition()`), so input is never blocked over 280ms. Test: click a card, click a header link 40ms later, and the second page is live in under 280ms with no `::view-transition` animations left.
3. Reduced motion means instant navigation (stricter than a 150ms crossfade; accepted). Test: reduced-motion.
4. No morph when the source title is inside a closed or hidden region. Test: hide the card, click its link, and no `::view-transition-old(project-title)` is created.
5. ScrollRestoration restores Back to the exact saved position on a long page (the 2166px case). Test: the home page at 375px, deep link, Back, `scrollY` equals the saved value and stays there after the transition.
6. D1 keeps the prerender working: tests/prerender.spec.ts loads every prerendered page in dist/ in a real browser and expects 0 console errors.
7. D3: every route's h1 starts with the page's name (test on every route).

## [v0.2] Measured on the branch (local `vite preview`)
- e2e: 33 passed. That's the 23 existing tests plus 10 new ones in tests/transitions.spec.ts: morph and focus at 320/375/1280, UX morph plus header link, reduced motion, no-API fallback, skip link after navigation, Back scroll, Back replay plus focus, and the hash jump.
- Vitest 160/160, typecheck and lint clean. ESLint now blocks `Link`/`NavLink` imports straight from react-router.
- axe: 0 violations of any impact on /, /projects/squanto, /ux and /ux/design-system, and after client navigations, at 320/375/1280 in light and dark (36 runs).
- Lighthouse locally: a11y and SEO 100 on all four pages; performance 100 except / at 97. Best practices was 96 only because the Vercel analytics scripts 404 locally. Main measures exactly the same locally (/ at 97, CLS 0.10), so neither gap comes from this change; live main is 100 across the board with CLS 0. The final 100s get verified on the Vercel preview and on live.
