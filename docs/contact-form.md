# Contact Form

End-to-end walkthrough of the `/api/contact` Edge Function and the `Contact.tsx` form.

## Architecture

```
                  POST { name, email, message, honeypot }
Browser ─────────────────────────────────────────────► /api/contact (Vercel Edge)
   │                                                          │
   │                                                          │  validate +
   │                                                          │  Resend.emails.send()
   │                                                          ▼
   │                                                   ┌─ Resend API
   │     200 { ok: true } / 4xx { error }              │
   │ ◄───────────────────────────────────────          │
   ▼                                                   ▼
Success state                                  rjdofficemail@gmail.com
```

## Why Edge runtime

`api/contact.ts` declares `export const config = { runtime: 'edge' }` so Vercel routes the request to its Edge runtime, where the function is invoked with Web API semantics (`Request → Response`). On the default Node runtime Vercel passes Express-style `(req, res)` args, which made `await req.json()` blow up silently and the request hung forever — see commit `dee3727` post-mortem in CHANGELOG.

The Resend SDK uses `fetch` under the hood, which works on Edge.

## Server-side validation

Located in `api/contact.ts`. Order of checks:

1. **Method gate** — only `POST`. Anything else returns `405`.
2. **Env gate** — if `RESEND_API_KEY` is missing, returns `500 { error: 'Email service is not configured' }`. (Locally without `vercel dev`, the form will get this; that's fine, the mailto fallback is right there in the UI.)
3. **JSON parse** — `400` if the body isn't JSON.
4. **Honeypot** — if the `honeypot` field is non-empty, return `200 { ok: true }` to fake success. Bots see "great, sent!" and don't retry. No real email is sent.
5. **Required fields** — `email` and `message` must be present.
6. **Email format** — same `EMAIL_RE` regex used client-side: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
7. **Length caps** — `name ≤ 100`, `email ≤ 254`, `message ≤ 2000`.
8. **Header sanitization** — strip `\r\n` from `name` and `email` before they go into the From / Reply-To headers (prevents header injection).
9. **HTML escape** — message content gets `&`, `<`, `>`, `"`, `'` escaped before being interpolated into the HTML body.

The same regex is mirrored client-side in `Contact.tsx` so live validation gives a consistent error message before submit.

## Resend setup

Three env vars in Vercel (Production + Preview):

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | `re_...` (sensitive — added with `--sensitive` flag) |
| `CONTACT_TO_EMAIL` | `rjdofficemail@gmail.com` |
| `CONTACT_FROM_EMAIL` | `onboarding@resend.dev` (Resend's default sandbox sender; no domain verification needed because we only send to the verified inbox) |

A `.env.example` at the repo root shows the same shape for local dev. `.env.local` is gitignored.

### From-address note

`onboarding@resend.dev` is a sandbox sender that **only delivers to the email address verified on the Resend account**. That's exactly our use case — every contact-form submission goes to one inbox. To support sending to other inboxes later, verify a real domain (e.g. `hello@jdilig.me`) in the Resend dashboard and update `CONTACT_FROM_EMAIL`.

## Client-side validation

`src/routes/Contact.tsx` mirrors the server's regex:

```ts
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

UX rules:
- The email field is `type="email"` for mobile keyboard hints and autofill.
- The form has `noValidate` so we don't get inconsistent native browser tooltips. Validation is all in our hands.
- The error only renders **after** the field has been touched (`onBlur`) — no shouting at users while they're typing.
- Once an error is showing, it updates **live** on every keystroke and disappears the moment the address becomes valid.
- Submit button is disabled until email is valid AND message has non-whitespace content.
- Error messages are server-driven for failures past validation (Resend errors, etc.).

## Honeypot

A hidden `<input name="company">` field, off-screen via `absolute left-[-9999px]`. Real users never see it; bots filling out every field will fill this one. The server short-circuits with a fake success response if it's non-empty.

## Privacy posture

Single line under the form:

> Submissions are delivered to my inbox via Resend. I don't store them on this site, share them, or use them for any kind of analytics or marketing.

Backed up by:
- No analytics on the site (no GA, no Plausible, no Pixel — see BACKLOG #3 for the GA4 plan that'll change this).
- Resend stores delivery records on its end (delivery + bounce metadata) — that's their normal product.
- The Edge function logs errors via `console.error()` (visible in Vercel logs) but doesn't log message content.

## Adding new validation

Server first, then client:

1. Add the rule to `api/contact.ts` (the source of truth — clients can be bypassed).
2. Mirror in `Contact.tsx` if it benefits live UX.
3. Pick error messages that match — the form will display whatever the server returns in `res.body.error` if the server rejects.

## Local testing

`vercel dev` runs the Edge function locally. Without it, the form will hit `/api/contact` and get the SPA fallback (Vite serves `index.html` for unmatched paths) — the JSON parse fails and the form shows a generic error. The mailto fallback below the form still works.

To smoke-test in production:
- Open `https://www.jdilig.me/contact`
- Submit a real message
- Confirm it arrives in `rjdofficemail@gmail.com`

(I can't do this myself — it's a real-world side effect that requires explicit authorization.)
