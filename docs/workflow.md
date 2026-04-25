# Workflow

Git, commits, BACKLOG hygiene, and the deploy pipeline.

## Branching

- `main` is the production branch. Every push triggers a Vercel production deploy.
- Feature work either commits directly to `main` (small, low-risk changes) or goes through a PR (larger or shared work).
- For now this is a solo project, so direct-to-`main` is the default. PRs are reserved for things that warrant a preview deploy + sanity check.

## Commit messages

Format:

```
<short imperative subject under 72 chars>

<one or more paragraphs explaining the why and the what — wrap at 80 cols>

Co-Authored-By: <agent or collaborator>
```

Examples (real, from this repo):

- `Add MIT LICENSE, package metadata, and contact-form privacy disclosure`
- `Use dedicated Playwright port so dev server ports don't collide`
- `Fix Squanto screenshot URLs and add 404 guard to capture spec`

The body explains *why* the change exists and any non-obvious consequences. If a commit fixes a bug we hit during development, name the bug. If a commit closes a `BACKLOG.md` item, say so.

We don't use Conventional Commits prefixes (`feat:`, `fix:`, etc.) — they don't add value when the PR description / commit body already conveys intent.

## BACKLOG hygiene

`BACKLOG.md` is the live queue. **Update it whenever you push or merge to `main`.**

Concrete rule: if a commit completes, partially completes, or invalidates a backlog item, the same commit (or one immediately after) should update `BACKLOG.md`.

| Situation | Action |
|---|---|
| Item shipped fully | Remove the section from `BACKLOG.md` and reference it in the next commit message ("closes BACKLOG item #N: ..."). |
| Item shipped partially | Update the item's scope — leave the not-yet-done bullets, prefix done bullets with `~~strikethrough~~` or move them to a "Shipped" sub-bullet. |
| New work emerged mid-task | Add a new item or add a sub-bullet under the relevant existing item. Don't let TODOs accumulate in code or commit messages. |
| Item turned out to be wrong / obsolete | Remove it and explain why in the commit body ("dropped BACKLOG item #N — turned out to be …"). |

This keeps `BACKLOG.md` reflecting reality at every commit, instead of drifting until someone does an audit.

## Deploy pipeline

```
git commit                                  # local
git push origin main                        # to GitHub
       │
       └─► GitHub webhook fires
              │
              └─► Vercel pulls main, runs `npm run build`
                     ├─ tsc -b           (type-check; failures block)
                     └─ vite build       (output to dist/)
                            │
                            └─► Edge functions in api/ packaged separately
                                   │
                                   └─► deployment promoted to Production
                                          │
                                          └─► https://www.jdilig.me serves new version
```

Typical end-to-end time: **~30s** from `git push` to live.

## What goes in a "good" commit

- ✅ Compiles. (`npm run build` succeeds locally before pushing.)
- ✅ Lint passes. (Not enforced by CI yet, but `npm run lint` is cheap.)
- ✅ Screenshots regenerated if UI changed visibly.
- ✅ `BACKLOG.md` updated if the change affects any backlog item.
- ✅ Body explains *why* the change exists.

## What doesn't need to be a commit

- Small drafts you're not confident in — keep them in your working tree until they're real.
- "Save points" mid-task — squash them before pushing if you can; otherwise let them ride and clean up via `git rebase -i` *if* you know what you're doing.

## Rolling back

Vercel:
1. Vercel UI → Deployments → find a known-good deploy → ⋯ → Promote to Production.

Git:
1. `git revert <bad-sha>` to get a forward-only undo. Push the revert; Vercel auto-deploys.
2. Don't `git reset --hard` and force-push to main — we did that *once* during the v3 rebuild (commit `7ff6fdf`) and it required explicit user authorization. Don't make it routine.

## When in doubt

- If a commit feels risky, push to a branch first. Vercel will create a preview deploy with its own URL. Test there before merging to `main`.
- If you're not sure whether to update `BACKLOG.md`, update it. Over-tracking is cheaper than the next person digging through commit history.
- If `tsc -b` is slow or noisy, fix the underlying type — don't disable strict mode.

## Related

- [`deployment.md`](./deployment.md) — Vercel + DNS specifics
- [`screenshots.md`](./screenshots.md) — when to re-capture after UI changes
- [`../BACKLOG.md`](../BACKLOG.md) — the live queue itself
