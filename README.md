# jdilig.me

Personal portfolio site for **John Dilig** — front-end developer.

🌐 **Live:** [www.jdilig.me](https://www.jdilig.me)

## Stack

- **Vite 6** + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, with `@theme inline` token bridge)
- **React Router v7** (library mode, with auto-generated nav from route metadata)
- **Vitest** (unit tests) + **Playwright** (project screenshots, resume PDF)
- **Vercel** (hosting, auto-deploy on push to `main`, Web Analytics + Speed Insights)

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
| `npm test`             | Run the Vitest unit tests                     |
| `npm run screenshots`  | Capture site + project previews via Playwright|
| `npm run thumbnails`   | Make the 720 px screenshot thumbnails in `public/screenshots/thumbs/` |
| `npm run resume:pdf`   | Render `public/Reuel_John_Dilig_Resume.pdf` from `src/data/resume.ts` |
| `npm run og:image`     | Render `public/og-image.png`, the link-preview image, from `src/data/profile.ts` |
| `npm run lighthouse`   | Score the live site; writes `src/data/lighthouse.json` |

To score the live site without running anything locally, use the **Lighthouse** workflow on GitHub (Actions tab → Lighthouse → Run workflow). It also runs on any push that changes `scripts/lighthouse.mjs` or the workflow file. It prints the updated JSON file and attaches it to the run.

Playwright uses its own Chromium (`npx playwright install chromium`), or set `CHROMIUM_PATH` to use one you already have.

## Project layout

```
src/
  main.tsx, App.tsx, router.tsx       # entry, app shell, route table
  index.css, styles/tokens.css        # Tailwind v4 + design tokens
  hooks/useTheme.ts                   # light/dark with localStorage
  data/                               # profile, projects, resume content
  lib/                                # shared helpers (contact rules, URLs)
  layouts/SiteLayout.tsx              # header + <Outlet /> + footer
  components/
    site/{Header,Footer}.tsx
    ui/{Button,Container,Eyebrow,Modal,RichText}.tsx
    projects/                         # cards, modal, gallery, meta/title/tag bits
    icons.tsx                         # heroicons + GitHub/LinkedIn marks
  routes/{Home,Projects,ProjectDetail,Resume,Contact,NotFound}.tsx
public/screenshots/                   # Playwright-captured previews
tests/screenshots.spec.ts             # Playwright spec (with 404 guard)
tests/resume-pdf.spec.ts              # renders the resume PDF
```

## Contact

`/contact` shows a contact card (email, phone, LinkedIn, GitHub, resume download) built from `src/data/profile.ts`. The site has no form and no backend functions. (A Resend-backed contact form was removed in Sept 2026.)

## Deployment

Pushed to GitHub → Vercel auto-deploys. The current production deploy serves at both `https://www.jdilig.me/` and (via 307 redirect) `https://jdilig.me/`. SPA routes are preserved through `vercel.json` rewrites.

## More

- Detailed conventions, naming rules, and architecture notes for AI agents and contributors live in [AGENTS.md](./AGENTS.md).
- The design system (tokens, type, motion) was sketched in Claude Design and ported to Tailwind v4 — see `src/styles/tokens.css` and the `@theme inline` block in `src/index.css`.

## License

The **source code** in this repository is released under the [MIT License](./LICENSE) — feel free to fork it as a starting point for your own portfolio.

The following are **NOT** covered by that license and remain © John Dilig (all rights reserved):

- Personal copy, bio, and resume content (`src/data/profile.ts`, `src/data/resume.ts`, route page text)
- The resume PDF in `public/`
- The avatar / profile photo (`public/logo.png`)
- Project case-study text in `src/data/projects.ts`
- Screenshots in `public/screenshots/`, including those of `squanto.app` — which depict UI co-developed during paid employment and remain property of Squanto and its operators

If you fork this for your own site, please replace the personal content with your own.

## Privacy

The site uses Vercel Web Analytics (page views) and Vercel Speed Insights (performance). Per [Vercel's Web Analytics privacy page](https://vercel.com/docs/analytics/privacy-policy), Web Analytics uses no cookies and can't track visitors across days or websites; see the [Speed Insights privacy page](https://vercel.com/docs/concepts/analytics/privacy) for what it collects. Fonts are self-hosted, so pages make no requests to Google. There are no ad or social trackers.
