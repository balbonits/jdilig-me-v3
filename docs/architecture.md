# Architecture

How the v3 portfolio site is organized and why.

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Build tool | **Vite 6** | Fastest start-up, native ESM, Tailwind v4 plugin, zero-config TypeScript. CRA was deprecated by Meta in Feb 2025; React docs now point to Vite. |
| Framework | **React 19** | Latest stable; concurrent features and `useTransition` available if needed. |
| Language | **TypeScript 5.7** (strict) | `strict: true`. No `any`. Enforced by `tsc -b` running before `vite build`. |
| Routing | **React Router v7** library mode | Single source of truth for routes via a `RouteObject[]`; nav metadata lives on each route. |
| Styling | **Tailwind CSS v4** via `@tailwindcss/vite` | Tokens-first via `@theme inline`; `@custom-variant dark`. |
| Hosting | **Vercel** | Auto-deploys from `balbonits/jdilig-me-v3` on push to `main`. |
| Mail | **Resend** + **Vercel Edge Function** | `/api/contact.ts` runs on Edge runtime; Resend SDK calls fetch under the hood. |
| Test / capture | **Playwright** | Site screenshots for project gallery; 404 guard catches bad route URLs. |

## Source layout

```
src/
  main.tsx                       # entry — mounts <App /> into #root
  App.tsx                        # <BrowserRouter> + useRoutes(routeTree)
  router.tsx                     # route table + NavMeta + getNavItems()
  index.css                      # Tailwind v4 entry + @theme bridge + cascade-layer order
  vite-env.d.ts

  styles/
    tokens.css                   # design system CSS variables (colors, type, motion, shadows)

  hooks/
    useTheme.ts                  # localStorage-persisted light/dark theme

  data/
    profile.ts                   # name, email, links, location
    projects.ts                  # Project type + PROJECTS seed + helpers (getProject, liveLinkLabel)
    resume.ts                    # SKILLS, EXPERIENCE, EDUCATION, SUMMARY
    # data files are lowercase — they're modules, not components

  layouts/
    SiteLayout.tsx               # header + <Outlet /> + footer

  components/
    icons.tsx                    # heroicons + GitHub/LinkedIn marks (lowercase: multi-export module)
    site/Header.tsx              # logo + auto-generated nav + theme toggle
    site/Footer.tsx              # copyright + sub-site link
    ui/Button.tsx                # <Button> + <LinkButton> with primary/secondary/ghost variants
    ui/Eyebrow.tsx               # § accent label
    projects/ProjectCard.tsx     # grid card with hover lift
    projects/ProjectModal.tsx    # Esc-closable preview overlay
    projects/ProjectGallery.tsx  # thumbnail grid + lightbox with arrow-key nav
    projects/ProjectHeroPreview.tsx  # screenshot or starfield fallback

  routes/
    Home.tsx                     # hero + selected work strip
    Projects.tsx                 # filter pills + card grid + modal
    ProjectDetail.tsx            # /projects/:slug — gallery, sidebar, prev/next
    Resume.tsx                   # narrow column, mono section headers
    Contact.tsx                  # secure form (POST /api/contact)
    NotFound.tsx                 # 404

api/
  contact.ts                     # Vercel Edge Function (export const config = { runtime: 'edge' })
  tsconfig.json                  # local tsconfig with @types/node so process.env type-checks

public/
  logo.png                       # GitHub avatar — header logo + favicon
  Reuel_John_Dilig_Resume.pdf    # resume PDF for "Download PDF" button
  screenshots/                   # Playwright-captured previews (committed)

tests/
  screenshots.spec.ts            # Playwright spec — captures site + external project sites

playwright.config.ts             # chromium project; auto-starts vite via webServer
index.html                       # Vite HTML entry; data-theme="light" default
vercel.json                      # SPA rewrite (all paths → /, except /api/* which Vercel handles first)
```

## Routing model

- All routes live in `src/router.tsx` as a single `RouteObject[]`.
- Each route can carry metadata via the `handle` field: `handle: { label, showInNav }`.
- `Header.tsx` calls `getNavItems()` which filters the routes table to only those with `showInNav: true` — adding a route to the nav is a one-line change.
- The whole route table is wrapped in a `SiteLayout` parent route so every page gets header + footer automatically.

```ts
// src/router.tsx (sketch)
export const routes: RouteObject[] = [
  { path: '/',         element: <Home />,         handle: { label: 'Home' } },
  { path: '/projects', element: <Projects />,     handle: { label: 'Projects', showInNav: true } },
  { path: '/projects/:slug', element: <ProjectDetail /> }, // no showInNav
  { path: '*',         element: <NotFound /> },
];

export const routeTree: RouteObject[] = [
  { element: <SiteLayout />, children: routes },
];
```

`App.tsx` is just `<BrowserRouter><AppRoutes /></BrowserRouter>` where `AppRoutes` calls `useRoutes(routeTree)`.

## Theme system

`useTheme()` returns `[theme, toggle]`:

- **First load:** reads `localStorage.theme`, falls back to `window.matchMedia('(prefers-color-scheme: dark)')`.
- **On change:** writes `localStorage.theme` and sets `document.documentElement.dataset.theme = theme`.

The dark variant is wired into Tailwind utilities via `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));` in `src/index.css`. So `dark:bg-bg-muted` works without any provider.

## Path aliases

`@/` maps to `src/` in two places:

- `tsconfig.app.json` — `paths: { "@/*": ["./src/*"] }` for the type checker
- `vite.config.ts` — `resolve.alias: { '@': '/src' }` for the bundler

Use it everywhere: `@/components/ui/Button`, `@/data/projects`, `@/hooks/useTheme`. Never use long `../../../` imports.

## File & folder naming

One rule, applied uniformly:

| Kind | Style | Example |
|---|---|---|
| Folders | `lowercase` | `components/`, `routes/` |
| Files that default-export a React component | `PascalCase.tsx` | `Button.tsx`, `Home.tsx` |
| Hook files | `useFoo.ts` | `useTheme.ts` |
| Data / config / utility modules | `lowercase.ts` or `camelCase.ts` | `router.tsx`, `projects.ts` |
| Stylesheets | `lowercase.css` | `tokens.css`, `index.css` |
| Multi-export icon / util modules | `lowercase.tsx` | `icons.tsx` |

If a new file default-exports a React component, name it after that component in PascalCase. Otherwise lowercase.

## Build pipeline

```
npm run build
  ├─ tsc -b           # type-check (strict; api/ checked via api/tsconfig.json)
  └─ vite build       # bundle to dist/
```

Type errors fail the build. Vercel's auto-deploy runs the same `npm run build`.

## What's *not* in this stack (and why)

- **No Next.js / SSR.** This is a personal SPA — no need for server components or ISR.
- **No CSS-in-JS.** Tailwind + tokens cover everything.
- **No state library.** Routes manage their own state; useTheme is the only cross-cutting concern.
- **No test runner yet.** Playwright handles screenshots; unit tests aren't worth the overhead for a portfolio. Add Vitest only when something genuinely needs it.

## Related docs

- [`design-system.md`](./design-system.md) — tokens + theme deep dive
- [`contact-form.md`](./contact-form.md) — `/api/contact` walkthrough
- [`deployment.md`](./deployment.md) — Vercel + DNS + auto-deploy
- [`screenshots.md`](./screenshots.md) — Playwright spec details
