# jdilig.me v3 — Documentation

Deeper reference for the v3 portfolio site. For the public-facing project overview, see [`README.md`](../README.md). For agent-specific instructions, see [`AGENTS.md`](../AGENTS.md). For pending work, see [`BACKLOG.md`](../BACKLOG.md).

## Index

| Doc | Purpose |
|-----|---------|
| [`architecture.md`](./architecture.md) | Stack, project layout, routing model, theme system, design-system bridge |
| [`design-system.md`](./design-system.md) | Tokens, Tailwind v4 `@theme` bridge, light/dark mechanics, motion + spacing scale |
| [`contact-form.md`](./contact-form.md) | The `/api/contact` Edge function, Resend integration, validation, security posture, env vars |
| [`deployment.md`](./deployment.md) | Vercel project setup, GoDaddy DNS, custom domain swap, auto-deploy on push, subdomains |
| [`screenshots.md`](./screenshots.md) | Playwright capture spec, the 404 guard, gallery wiring, when / how to re-capture |
| [`workflow.md`](./workflow.md) | Git conventions, commit-message style, BACKLOG hygiene rule, when to update what |

## How these docs differ from each other

- **`README.md`** — shipped to GitHub viewers. Tells someone landing on the repo what the project is, how to run it, and where to look next.
- **`AGENTS.md`** — instructions to AI coding agents. Stack, naming conventions, what *not* to do.
- **`BACKLOG.md`** — the live queue of upcoming and in-progress work.
- **`docs/`** — *how things actually work* in depth. Architecture, integration points, deployment mechanics. The reference shelf.

If you're picking the project up cold, read in this order:
1. `README.md` (5 min)
2. `docs/architecture.md` (15 min)
3. `docs/design-system.md` (10 min)
4. `BACKLOG.md` to see what's pending

## Maintenance

- Update these files **whenever the underlying system changes** in a way that future-you would otherwise have to re-derive from code.
- Don't duplicate `AGENTS.md` content here — link to it. Same with `README.md`.
- Each doc should answer a specific question. If a doc grows beyond ~300 lines or starts answering more than one big question, split it.

**Last reviewed:** April 2026.
