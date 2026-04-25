# jdilig.me

Personal portfolio site for **John Dilig** — front-end developer.

🌐 **Live:** [www.jdilig.me](https://www.jdilig.me)

## Stack

- **Vite 6** + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, with `@theme inline` token bridge)
- **React Router v7** (library mode, with auto-generated nav from route metadata)
- **Resend** + **Vercel Edge Functions** (contact form)
- **Playwright** (project screenshots + 404 guard)
- **Vercel** (hosting, auto-deploy on push to `main`)

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

## Scripts

| Command                | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Start the Vite dev server                     |
| `npm run build`        | Type-check (`tsc -b`) and build for production|
| `npm run preview`      | Preview the production build locally          |
| `npm run lint`         | Run ESLint                                    |
| `npm run screenshots`  | Capture site + project previews via Playwright|

## Project layout

```
src/
  main.tsx, App.tsx, router.tsx       # entry, app shell, route table
  index.css, styles/tokens.css        # Tailwind v4 + design tokens
  hooks/useTheme.ts                   # light/dark with localStorage
  data/                               # profile, projects, resume content
  layouts/SiteLayout.tsx              # header + <Outlet /> + footer
  components/
    site/{Header,Footer}.tsx
    ui/{Button,Eyebrow}.tsx
    projects/{ProjectCard,ProjectModal,ProjectGallery,ProjectHeroPreview}.tsx
    icons.tsx                         # heroicons + GitHub/LinkedIn marks
  routes/{Home,Projects,ProjectDetail,Resume,Contact,NotFound}.tsx
api/contact.ts                        # Vercel Edge Function (Resend)
public/screenshots/                   # Playwright-captured previews
tests/screenshots.spec.ts             # Playwright spec (with 404 guard)
```

## Contact form

`POST /api/contact` runs as a Vercel Edge Function backed by [Resend](https://resend.com). Requires three env vars in Vercel:

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=onboarding@resend.dev
```

Server-side validation: honeypot, length caps, regex email check, header-injection sanitization. Client-side mirrors the same regex for live validation. See `.env.example`.

## Deployment

Pushed to GitHub → Vercel auto-deploys. The current production deploy serves at both `https://www.jdilig.me/` and (via 307 redirect) `https://jdilig.me/`. SPA routes are preserved through `vercel.json` rewrites; `/api/*` is excluded so the Edge Function still routes correctly.

## More

- Detailed conventions, naming rules, and architecture notes for AI agents and contributors live in [AGENTS.md](./AGENTS.md).
- The design system (tokens, type, motion) was sketched in Claude Design and ported to Tailwind v4 — see `src/styles/tokens.css` and the `@theme inline` block in `src/index.css`.
