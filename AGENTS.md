# AGENTS.md

Instructions for AI coding agents working in this repository.

## Project

**John Dilig's portfolio site (v3)** — deployed at www.jdilig.me.

Repo: https://github.com/balbonits/jdilig-me-v3

## Stack

| Component   | Technology                                  |
|-------------|---------------------------------------------|
| Build tool  | Vite 6                                      |
| Framework   | React 19 (client-side SPA)                  |
| Language    | TypeScript 5.7 (strict)                     |
| Routing     | React Router v7 (library mode)              |
| Styling     | Tailwind CSS v4 (via `@tailwindcss/vite`)   |
| UI kit      | Tailwind UI components + Headless UI + Heroicons |
| Linting     | ESLint 9 (flat config) + typescript-eslint  |
| E2E / shots | Playwright                                  |
| Hosting     | Vercel                                      |

> Note: this project intentionally uses **Vite**, not Create React App. CRA was deprecated by Meta in February 2025; the React docs now point to Vite as the recommended SPA tooling.

## Commands

| Command              | What it does                                 |
|----------------------|----------------------------------------------|
| `npm run dev`        | Start the Vite dev server (`localhost:5173`) |
| `npm run build`      | Type-check (`tsc -b`) and build for production |
| `npm run preview`    | Preview the production build locally         |
| `npm run lint`       | Run ESLint over the project                  |
| `npm run screenshots`| Capture preview screenshots with Playwright  |

The build runs `tsc -b` before `vite build`, so type errors fail the build.

## Project layout

```
src/
  main.tsx                       # entry; mounts <App /> into #root
  App.tsx                        # <BrowserRouter> + useRoutes(routeTree)
  router.tsx                     # route table + nav metadata (handle.showInNav)
  index.css                      # Tailwind v4 entry + @theme token bridge
  vite-env.d.ts
  styles/
    tokens.css                   # design system CSS variables (colors, type, spacing, motion)
  hooks/
    useTheme.ts                  # localStorage-persisted light/dark theme
  data/
    profile.ts                   # name, email, links, location
    projects.ts                  # Project type + PROJECTS seed data + helpers
  layouts/
    SiteLayout.tsx               # header + <Outlet /> + footer
  components/
    icons.tsx                    # Heroicons wrappers + GitHubIcon + LinkedInIcon
    site/
      Header.tsx                 # logo, nav (auto-reads router), theme toggle
      Footer.tsx
    ui/
      Button.tsx                 # <Button> + <LinkButton> with variants
      Eyebrow.tsx                # § accent label
    projects/
      ProjectCard.tsx            # grid card with hover lift
      ProjectModal.tsx           # Esc-closable preview overlay
      ProjectHeroPreview.tsx     # screenshot or starfield fallback
  routes/
    Home.tsx
    Projects.tsx                 # filters + grid + modal
    ProjectDetail.tsx            # /projects/:slug full case study
    Resume.tsx
    Contact.tsx                  # secure (mailto + honeypot + length caps)
    NotFound.tsx

public/
  logo.png                       # GitHub avatar, used as header logo + favicon
  screenshots/                   # Playwright-captured previews (committed)

tests/
  screenshots.spec.ts            # Playwright spec that writes to public/screenshots/

playwright.config.ts             # chromium project, auto-starts dev server
index.html                       # Vite HTML entry, data-theme="light" default
vercel.json                      # SPA rewrite (all paths → /)
```

## File & folder naming

One rule — apply it everywhere:

| Kind                                          | Style                                | Example                  |
|-----------------------------------------------|--------------------------------------|--------------------------|
| Folders                                       | `lowercase`                          | `components/`, `routes/` |
| Files that default-export a React component   | `PascalCase.tsx`                     | `Button.tsx`, `Home.tsx` |
| Hook files                                    | `useFoo.ts` (camelCase, `use` prefix)| `useTheme.ts`            |
| Data / config / utility modules               | `lowercase.ts` or `camelCase.ts`     | `router.tsx`, `projects.ts` |
| Stylesheets                                   | `lowercase.css`                      | `tokens.css`, `index.css`|
| Multi-export icon / util modules              | `lowercase.tsx`                      | `icons.tsx`              |

If a new file default-exports a React component, name it after that component in PascalCase. If it exports multiple things (hooks aside) or is a config / data module, name it in lowercase.

## Imports

Use the `@/` path alias — don't use long relative paths.

- `@/components/ui/Button`
- `@/data/projects`
- `@/hooks/useTheme`
- `@/router`

Configured in `tsconfig.app.json` (`paths`) and `vite.config.ts` (`resolve.alias`).

## Styling

- **Tokens** live in `src/styles/tokens.css` and are exposed to Tailwind v4 via `@theme inline { ... }` in `src/index.css`.
- **Dark mode** is driven by `data-theme="dark"` on `<html>`; a `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *))` declaration wires it into Tailwind utilities.
- **Token imports go first, in a lower cascade layer** — `@layer tokens, theme, base, components, utilities;` — so Tailwind utilities win over tokens.css' `a { color: var(--accent) }` base styles.
- Utilities available from tokens: `bg-bg`, `bg-surface`, `bg-bg-muted`, `text-fg`, `text-fg-strong`, `text-fg-muted`, `text-fg-subtle`, `text-fg-faint`, `text-accent`, `text-accent-contrast`, `border-border-DEFAULT`, `border-border-strong`, `border-border-faint`, `font-sans`, `font-serif`, `font-mono`.

## Routing

- All routes live in `src/router.tsx` as a single `RouteObject[]`. Add a route by adding a row — no string paths scattered across the app.
- Nav items are generated automatically: set `handle: { label: 'Foo', showInNav: true }` on a route and `Header.tsx` will render it. `showInNav: false` (or omitted) keeps it out of the nav.
- Always use `<Link>` / `<NavLink>` from `react-router` for internal links — never `<a href>`.

## Theme

- `useTheme()` returns `[theme, toggle]`.
- On first load: reads `localStorage.theme`, else `prefers-color-scheme`.
- Writes `document.documentElement.dataset.theme` + `localStorage.theme` on change.

## Deployment (Vercel)

- Vercel auto-detects Vite. No build/output overrides needed.
- `vercel.json` rewrites all paths to `/` so React Router handles client-side routes on direct visits and refreshes.
- The production domain is www.jdilig.me. Preview deploys come from PRs.

## Screenshots

- `npm run screenshots` runs `tests/screenshots.spec.ts`, which walks a list of routes in both themes and writes `public/screenshots/<slug>.png`.
- Playwright will auto-start `npm run dev` if nothing is listening on `:5173`.
- Projects in `src/data/projects.ts` can reference a screenshot via `previewImage: '/screenshots/...png'`. `ProjectHeroPreview` uses the image when provided and falls back to a starfield placeholder.

## Testing

No unit test runner yet. When added:
- Use Vitest (matches the Vite toolchain) for unit tests.
- Use Playwright for E2E (already set up for screenshots).
- Per project rule: **don't write tests for trivial UI components.** Test data-driven components, custom hooks, utilities, and complex business logic.

## What not to do

- Don't reintroduce CRA, Next.js, or any other framework.
- Don't add a CSS-in-JS library — Tailwind + tokens is the styling system.
- Don't commit `.env*` files or anything in `.vercel/`.
- Don't downgrade React or React Router; both are intentionally on the latest majors.
- Don't put tokens.css content outside its cascade layer — utilities will stop overriding it.
