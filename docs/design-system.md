# Design System

How tokens, theme, and Tailwind v4 talk to each other.

## Source of truth

`src/styles/tokens.css` is the canonical token sheet. **Don't redeclare any of these values anywhere else.** Components reference them via Tailwind utilities (preferred) or `var(--token-name)` directly.

The tokens file came from a Claude Design handoff. Editing tokens is fine; restructuring them isn't — Tailwind utilities downstream depend on the names.

## Cascade layer order — **important**

`src/index.css` declares this layer order at the top:

```css
@layer theme, tokens, base, components, utilities;
@import "./styles/tokens.css" layer(tokens);
@import "tailwindcss";
```

Two rules fall out of it:

1. **`tokens` beats Tailwind's `theme` layer.** Tailwind emits its theme variables into `@layer theme` (e.g. `--font-sans`, `--shadow-xs`). Our `@theme inline` block registers the same names as `--font-sans: var(--font-sans)` so utilities read the token at runtime. If `theme` came after `tokens`, that self-reference would win the cascade, become a cycle, and resolve to nothing — which is exactly what happened from launch until Sept 2026: every font fell back to Times New Roman and every `shadow-*` utility was empty.
2. **utilities beat `tokens`.** tokens.css' element rules (like `a { color: var(--accent) }`) sit below `base`, `components`, and `utilities`, so a utility such as `text-accent-contrast` always wins. Without the layer, primary buttons rendered orange-on-orange (commit `dee3727`).

**Don't** import `tokens.css` outside its layer, and don't move `tokens` below `theme`.

## Token → Tailwind utility bridge

`src/index.css` has an `@theme inline` block that maps every token to a Tailwind v4 namespace key:

```css
@theme inline {
  --color-bg: var(--bg);
  --color-fg-strong: var(--fg-strong);
  --color-accent: var(--accent);
  --color-border-DEFAULT: var(--border);
  /* etc. */

  /* Same name on both sides: registers the utility, tokens.css owns the value. */
  --font-sans: var(--font-sans);
  --radius-md: var(--radius-md);
  --shadow-xs: var(--shadow-xs);
  --ease-out: var(--ease-out);
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
| `--accent` | `#c2410c` (orange-700) | `#fb923c` (orange-400) |
| `--accent-contrast` | `#ffffff` | `#1c1917` |
| `--border` | `#e7e5e4` | `#292524` |
| `--surface` | `#ffffff` | `#1c1917` |

Note that **accent flips with the theme** — orange-700 on light backgrounds, orange-400 on dark — so accent text and accent buttons meet WCAG AA (4.5:1) in both themes. This is the whole point of `--accent-contrast`: text on top of accent buttons is dark-on-orange in dark mode, white-on-orange in light mode. (Until Sept 2026 the light accent was orange-600, which measured only 3.5:1.)

Keep `--fg-faint` for decorative icons; it's too light for text (2.5:1 in light mode). In light mode, `--fg-subtle` text passes on `--bg` and `--surface` but not on `--bg-subtle` / `--bg-muted`; use `--fg-muted` there.

## Type scale

| Family | CSS var | Where |
|---|---|---|
| Sans | `--font-sans` → `Geist Variable, ui-sans-serif, …` | Body, UI |
| Serif | `--font-serif` → `Instrument Serif` | Display accents — italic single-word emphasis (`I build`, `marketplace`, `seeds`) |
| Mono | `--font-mono` → `JetBrains Mono Variable` | Eyebrows, code, kbd, meta lines, footer |

Fonts are self-hosted with Fontsource packages (`@fontsource-variable/geist`, `@fontsource-variable/jetbrains-mono`, `@fontsource/instrument-serif`), imported at the top of `src/main.tsx`. Headings step down at breakpoints (e.g. the hero is `text-[44px] sm:text-[60px] md:text-[72px]`).

## Motion

```css
--ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
--dur-fast: 120ms;
--dur-base: 200ms;
--dur-slow: 320ms;
```

Hover transitions are 120ms, layout transitions are 200ms, page reveals are 320ms. **No bounces, no overshoot.** Cards translate `-2px` on hover. Arrows translate `(2px, -2px)`. That's the whole vocabulary. Use the `ease-out` utility (it maps to the token) rather than an arbitrary `ease-[cubic-bezier(...)]`. With `prefers-reduced-motion` on, animation and transition durations drop to near zero site-wide (`src/index.css`).

## Spacing

4px base. The Tailwind utility scale (`gap-2`, `px-4`, etc.) translates directly to those token values via `--spacing` in the theme.

Max content widths:
- 720px — Resume, Contact (narrow, prose-heavy)
- 1120px — Home, Projects, ProjectDetail (gallery layouts)

## Components built on top

The token layer drives a small reusable kit in `src/components/ui/` and `src/components/projects/`. None of them re-declare colors or spacing — they compose Tailwind utilities only.

- **`Button` / `LinkButton`** — three variants (primary, secondary, ghost), two sizes (md, lg). Accent color comes from tokens; hover transforms come from motion tokens.
- **`Eyebrow`** — `§ EYEBROW TEXT` mono-uppercase accent label.
- **`Container`** — the page column: `max-w-[1120px]` (wide) or `max-w-[720px]` (narrow) with `px-5 sm:px-10` gutters.
- **`ProjectCard`** — `<article>` with a stretched title button; CSS-only hover lift (`shadow-xs` → `shadow-lg`), wrapped in `@media (hover: hover)` so it only applies on devices that can hover.
- **`Modal`** — native `<dialog>`; used by `ProjectModal` and the `ProjectGallery` lightbox. Lightbox keys: Esc / ← / →.

## Adding a new token

1. Add the variable to `tokens.css` (under both light *and* dark blocks if it's color-related).
2. Add a corresponding `--{namespace}-{name}` line to the `@theme inline` block in `src/index.css` if you want it as a Tailwind utility.
3. Use the new utility in components — *don't* hardcode the value at the call site.

## Anti-patterns

- ❌ Hardcoded colors in components (`#ea580c` in className strings). Use tokens.
- ❌ Importing `tokens.css` outside its cascade layer. Re-introduces the orange-on-orange bug.
- ❌ Adding dark-mode logic per-component. Use `[data-theme="dark"]` selectors at the token level only.
- ❌ Creating new shadow / radius values. Use the existing scale.
