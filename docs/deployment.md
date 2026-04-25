# Deployment

Vercel + GoDaddy DNS + GitHub auto-deploy.

## TL;DR

- **Push to `main`** → Vercel auto-deploys to production at `https://www.jdilig.me`.
- **Open a PR** → Vercel creates a preview deploy at a `*.vercel.app` URL.
- **DNS** lives at GoDaddy. Records point to Vercel's anycast IPs / CNAME targets. Don't touch unless Vercel's Domains tab shows "DNS misconfigured."

## Vercel project

| Field | Value |
|---|---|
| Project name | `jdilig-me-v3` |
| Team | `john-diligs-projects` (Hobby tier) |
| Framework preset | Vite (auto-detected) |
| Build command | `npm run build` (default) |
| Output directory | `dist` (default) |
| Node version | 22.x |
| GitHub repo | `balbonits/jdilig-me-v3` (connected April 2026) |

Connection lives in the Vercel Settings → Git tab. Once connected, every push to `main` triggers a production build; every PR triggers a preview build with the PR head as `git ref`.

## DNS — current state

Domain registrar is **GoDaddy**. Nameservers are GoDaddy's (`ns09.domaincontrol.com`, `ns10.domaincontrol.com`) — *not* Vercel's. We use option (a) from Vercel's docs (custom A / CNAME records pointing to Vercel infra) instead of option (b) (delegate nameservers to Vercel).

Active records:

| Host | Type | Value | Purpose |
|---|---|---|---|
| `@` (apex) | A | `216.198.79.1` | Apex `jdilig.me` → Vercel |
| `www` | CNAME | `0ac6141abecb9410.vercel-dns-017.com.` | `www.jdilig.me` → Vercel |
| `games` | A | `76.76.21.21` | `games.jdilig.me` → Vercel (subsite, separate project) |

The apex (`jdilig.me`) currently 307-redirects to `https://www.jdilig.me/`. That's a Vercel-managed redirect set in the project's Domains tab.

## Custom domain swap (history)

The migration from v2 (old Vercel project `jdilig-me`) to v3 (`jdilig-me-v3`) was a domain move *within* Vercel:

1. **Old project** `jdilig-me` → Settings → Domains → remove `jdilig.me` and `www.jdilig.me`.
2. **New project** `jdilig-me-v3` → Settings → Domains → add `jdilig.me` (set as primary) + `www.jdilig.me`.
3. Wait 30–120s for cert provisioning.
4. **No GoDaddy changes were needed** — the existing records still pointed at Vercel's anycast IPs, and Vercel re-routed internally.

Total downtime: under a minute. Rollback would be remove-from-new + re-add-to-old in the same UI.

## SPA rewrites

`vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

Catch-all rewrite so React Router handles client-side routes on direct visits and refreshes (e.g. `https://www.jdilig.me/projects/squanto` returns `index.html` and the SPA hydrates the right route).

**Why this doesn't break `/api/contact`:** Vercel's request pipeline runs in this order:

1. Static files in `dist/`
2. Serverless / Edge functions in `api/`
3. Rewrites

`/api/contact` matches the function in step 2 *before* the rewrite catches it. So the catch-all rule is safe.

## Subdomains

`games.jdilig.me` is a separate Vercel project (`balbonits/ai-browser-game-demos`). Setup:

1. In Vercel → games project → Settings → Domains → add `games.jdilig.me`.
2. In GoDaddy → DNS → add `A games 76.76.21.21`.
3. Wait 1–5 min for DNS + cert.

The footer of jdilig.me v3 links to it — see `src/components/site/Footer.tsx`.

## Env vars

Set via `vercel env add VARNAME [environment]` (CLI) or the Vercel Settings → Environment Variables tab. Sensitive values use `--sensitive` (encrypts at rest, doesn't show in CLI listing).

| Variable | Production | Preview | Development |
|---|---|---|---|
| `RESEND_API_KEY` | ✅ sensitive | ✅ sensitive | ❌ (use `.env.local`) |
| `CONTACT_TO_EMAIL` | ✅ | ✅ | `.env.local` |
| `CONTACT_FROM_EMAIL` | ✅ | ✅ | `.env.local` |

Vercel disallows `--sensitive` env vars in the `development` environment (you'd just see a warning). For local development with the Edge function, run `vercel dev` — it pulls from `.env.local`.

## Deploys via CLI (rare — auto-deploy is the norm)

When the GitHub webhook fails or you want to ship without a commit:

```sh
npx vercel@latest --prod --yes
```

Pinning `@latest` matters — the system-installed `vercel` CLI may be too old for newer endpoints. We hit this on the first deploy ("Your Vercel CLI version is outdated. Requires 47.2.2 or later" in commit `dee3727`).

## Rotating the Resend API key

The current key was pasted into a chat transcript and should be considered exposed. Process to rotate:

1. Resend dashboard → API Keys → revoke the existing key
2. Generate a new key
3. `npx vercel@latest env rm RESEND_API_KEY production` (and `preview`)
4. `printf '%s' '<new-key>' | npx vercel@latest env add RESEND_API_KEY production --sensitive`
5. Repeat for `preview`
6. Update `.env.local`
7. Push any commit (or `vercel --prod --yes`) so the new env var takes effect on next deploy

## Common ops

| Task | How |
|---|---|
| Promote a preview to production | Vercel UI → Deployments → ⋯ menu → Promote to Production |
| Rollback to a previous deploy | Vercel UI → Deployments → ⋯ menu → Promote (on the older deploy) |
| Inspect a single deployment | `npx vercel@latest inspect <deployment-url>` |
| Tail logs | `npx vercel@latest logs --since 1h` |
| List all deployments | `npx vercel@latest ls` |
| Re-link the local dir | `npx vercel@latest link --yes --project jdilig-me-v3` |

## Troubleshooting

**Symptom:** push to main, no deploy.
- Check GitHub → Settings → Webhooks for the Vercel hook. Recent deliveries should be 200.
- Check Vercel → Settings → Git that the repo is still connected.

**Symptom:** deploy succeeded but production URL serves the old version.
- Check Vercel → Deployments — was the new deploy promoted to Production? If "Preview" only, manually promote.

**Symptom:** `/api/contact` returns 500.
- Check Vercel → Logs for the function's runtime errors.
- Most common cause: env var typo. Verify with `vercel env ls`.

**Symptom:** custom domain shows cert warning.
- Vercel → Domains tab usually shows the exact DNS record to fix.
- Run `dig <domain> +short` from the command line to compare against the expected target.
- Cert provisioning takes 1–30 min for a new subdomain. Just wait.
