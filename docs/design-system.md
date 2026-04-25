# Design System

How tokens, theme, and Tailwind v4 talk to each other.

## Source of truth

`src/styles/tokens.css` is the canonical token sheet. **Don't redeclare any of these values anywhere else.** Components reference them via Tailwind utilities (preferred) or `var(--token-name)` directly.

The tokens file came from a Claude Design handoff. Editing tokens is fine; restructuring them isn't — Tailwind utilities downstream depend on the names.

## Cascade layer order — **important**

`src/index.css` declares this layer order at the top:

```css
@layer tokens, theme, base, components, utilities;
@import "./styles/tokens.css" layer(tokens);
@import "tailwindcss";
```

This puts `tokens.css`'s base rules (like `a { color: var(--accent) }`) into a *lower-priority* layer than Tailwind utilities. Without it, the un-layered `a {}` rule would win against `text-accent-contrast` and primary buttons would render orange-on-orange (we hit this exact bug — see commit `dee3727`).

**Don't** import `tokens.css` outside its layer or this regression returns.

## Token → Tailwind utility bridge

`src/index.css` has an `@theme inline` block that maps every token to a Tailwind v4 namespace key:

```css
@theme inline {
  --color-bg: var(--bg);
  --color-bg-muted: var(--bg-muted);
  --color-fg: var(--fg);
  --color-fg-strong: var(--fg-strong);
  --color-accent: var(--accent);
  --color-accent-contrast: var(--accent-contrast);
  --color-border-DEFAULT: var(--border);
  /* etc. */

  --font-sans: var(--font-sans);
  --font-serif: var(--font-serif);
  --font-mono: var(--font-mono);
}
```

The result: every token becomes a Tailwind utility. Use `bg-bg`, `bg-surface`, `bg-bg-muted`, `text-fg-strong`, `text-accent`, `border-border-DEFAULT`, `font-mono`, etc.

`inline` (vs. `static`) means Tailwind doesn't mirror the CSS variables — it inlines the `var(...)` references into utilities directly. That keeps the cascade simple and means dark mode just changes the underlying token values without Tailwind needing to regenerate anything.

## Dark mode

Driven by a single attribute: `<html data-theme="dark">`. Set by `useTheme()`. The dark variant is wired into Tailwind via:

```css
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

With that, you can write `dark:bg-bg-muted` in any component and it works.

`tokens.css` flips token values under `[data-theme="dark"] { ... }`:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#fdfcfb` | `#0c0a09` |
| `--fg` | `#1c1917` | `#fafaf9` |
| `--fg-strong` | `#0c0a09` | `#ffffff` |
| `--accent` | `#ea580c` (orange-600) | `#fb923c` (orange-400) |
| `--accent-contrast` | `#ffffff` | `#1c1917` |
| `--border` | `#e7e5e4` | `#292524` |
| `--surface` | `#ffffff` | `#1c1917` |

Note that **accent flips with the theme** — orange-600 on light backgrounds, orange-400 on dark — so contrast ratios stay legible without per-mode color hacks. This is the whole point of `--accent-contrast`: text on top of accent buttons is dark-on-orange in dark mode, white-on-orange in light mode.

## Type scale

| Family | CSS var | Where |
|---|---|---|
| Sans | `--font-sans` → `Geist, ui-sans-serif, …` | Body, UI |
| Serif | `--font-serif` → `Instrument Serif` | Display accents — italic single-word emphasis (`I build`, `marketplace`, `seeds`) |
| Mono | `--font-mono` → `JetBrains Mono` | Eyebrows, code, kbd, meta lines, footer |

Fonts load from Google Fonts — see the `<link>` in `index.html`. Heading sizes are mostly fixed (e.g. `text-[72px]` on the hero) rather than fluid; we'll revisit when adding mobile support (BACKLOG #5).

## Motion

```css
--ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
--dur-fast: 120ms;
--dur-base: 200ms;
--dur-slow: 320ms;
```

Hover transitions are 120ms, layout transitions are 200ms, page reveals are 320ms. **No bounces, no overshoot.** Cards translate `-2px` on hover. Arrows translate `(2px, -2px)`. That's the whole vocabulary.

## Spacing

4px base. The Tailwind utility scale (`gap-2`, `px-4`, etc.) translates directly to those token values via `--spacing` in the theme.

Max content widths:
- 720px — Resume, Contact (narrow, prose-heavy)
- 1120px — Home, Projects, ProjectDetail (gallery layouts)

## Components built on top

The token layer drives a small reusable kit in `src/components/ui/` and `src/components/projects/`. None of them re-declare colors or spacing — they compose Tailwind utilities only.

- **`Button` / `LinkButton`** — three variants (primary, secondary, ghost), two sizes (md, lg). Accent color comes from tokens; hover transforms come from motion tokens.
- **`Eyebrow`** — `§ EYEBROW TEXT` mono-uppercase accent label.
- **`ProjectCard`** — grid card with hover lift; uses `--shadow-xs` → `--shadow-lg` transition.
- **`ProjectGallery`** — thumbnail grid + lightbox. Lightbox keys: Esc / ←  / →.

## Adding a new token

1. Add the variable to `tokens.css` (under both light *and* dark blocks if it's color-related).
2. Add a corresponding `--{namespace}-{name}` line to the `@theme inline` block in `src/index.css` if you want it as a Tailwind utility.
3. Use the new utility in components — *don't* hardcode the value at the call site.

## Anti-patterns

- ❌ Hardcoded colors in components (`#ea580c` in className strings). Use tokens.
- ❌ Importing `tokens.css` outside its cascade layer. Re-introduces the orange-on-orange bug.
- ❌ Adding dark-mode logic per-component. Use `[data-theme="dark"]` selectors at the token level only.
- ❌ Creating new shadow / radius values. Use the existing scale.
