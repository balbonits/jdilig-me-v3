# CLAUDE.md

This project uses [AGENTS.md](./AGENTS.md) as the single source of truth for agent instructions. Claude Code: read that file.

Quick pointers (full detail in AGENTS.md):

- **Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4 + React Router v7. Deployed on Vercel.
- **Build:** `npm run build` runs `tsc -b && vite build` — type errors fail the build.
- **Routes** live in `src/routes/`, one file per route.
- **Tailwind UI** components are supported via `@headlessui/react` and `@heroicons/react`.
- **Not** Create React App. CRA was deprecated by Meta in Feb 2025; Vite is the modern replacement.
