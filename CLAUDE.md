# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
React 18 + TypeScript site using Vite 6, React Router v7, and Tailwind CSS v4. Portfolio/personal site deployed to Vercel (jdilig-me). This is a complete redesign/revamp.

## Tech Stack
- **Build Tool**: Vite 6
- **Framework**: React 18 with TypeScript 5.6
- **Routing**: React Router v7 (BrowserRouter)
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite plugin
- **Testing**: Vitest for unit tests
- **PWA**: Configured with service worker and manifest
- **Deployment**: Vercel

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run preview` - Preview production build locally
- `npm run test` - Run Vitest unit tests

## Project Structure
```
src/
├── components/     # Reusable components (use .module.css for styles)
├── pages/         # Page components (mirror route structure)
│   └── docs/          # Docs pages (/docs routes)
│       ├── DocsLandingPage.tsx
│       ├── ProtosLandingPage.tsx
│       ├── ProtosViewerPage.tsx
│       └── DocsViewerPage.tsx
├── router/        # Route configuration
│   └── index.tsx      # All route definitions
├── hooks/         # Custom React hooks
├── styles/        # Centralized theme library
│   ├── theme.css      # Color variables and theme config
│   └── utilities.css  # Reusable utility classes
├── main.tsx       # Entry point
├── App.tsx        # App instance (minimal, imports router)
└── index.css      # Global styles (imports Tailwind + theme)

docs/
├── protos/         # Proto definitions (design assets)
│   ├── home.tsx
│   ├── protos-page.tsx
│   └── docs-content.tsx
└── README.md      # Project documentation

public/            # Static assets
```

## Code Standards & Conventions

### Development Philosophy
- **DRY (Don't Repeat Yourself)**: Avoid code duplication, create reusable utilities and components
- **KISS (Keep It Simple, Stupid)**: Keep everything simple and straightforward
- **Reusability**: Design components and functions to be reusable across the codebase
- **Mobile-First Responsive Design**: Build for mobile screens first, then progressively enhance for larger screens

### CSS & Styling
- **Mobile-First**: Write styles for mobile first, use `sm:`, `md:`, `lg:`, `xl:` prefixes for larger screens
- **Theme System**: Centralized theme library in `src/styles/`
  - `theme.css`: CSS custom properties for primary, secondary, accent colors (50-950 scale)
  - `utilities.css`: Reusable utility classes using `@apply` with theme colors
  - Built on Tailwind CSS v4 as the base layer
- **Color Variables**: Use `--color-primary`, `--color-secondary`, `--color-accent` for theme colors
- **BEM Naming Convention**: Use Block Element Modifier pattern for CSS classes
  - Block: `.card`
  - Element: `.card__title`
  - Modifier: `.card--featured`
- **CSS Modules**: Use `.module.css` files for ALL components AND pages
- **BEM + @apply Pattern**: Avoid long Tailwind classes in JSX
  - ❌ Bad: `<div className="flex flex-col gap-4 md:flex-row md:gap-8 p-4 md:p-8">`
  - ✅ Good: `<div className="card">` + CSS module with `@apply flex flex-col gap-4 p-4;`
  - Keep JSX clean with BEM classnames, use `@apply` in CSS modules for Tailwind utilities
  - Better browser DevTools debugging (see `.card` instead of 15 utility classes)
- **Dark Mode**: Class-based theming using `.light` and `.dark` parent classes
  - **NEVER use Tailwind's `dark:` utilities** - Tailwind v4 alpha only supports OS `prefers-color-scheme`
  - **ALWAYS use `:global(.light)` and `:global(.dark)` in CSS modules** for theme-aware styles
  - Pattern:
    ```css
    .element {
      @apply base-styles;

      :global(.light) & {
        @apply light-theme-styles;
      }

      :global(.dark) & {
        @apply dark-theme-styles;
      }
    }
    ```
  - Theme managed by `useTheme` hook with localStorage persistence
  - Theme toggle in `SiteHeader` component

### Component Patterns
- Components live in `src/components/` with co-located `.module.css` styles
- Pages live in `src/pages/` WITH `.module.css` styles (changed from previous convention)
- **Page Structure Mirrors Routes**: Pages in `src/pages/` follow the route structure
  - `/docs` → `src/pages/docs/DocsLandingPage.tsx` + `DocsLandingPage.module.css`
  - `/docs/protos` → `src/pages/docs/ProtosLandingPage.tsx` + `ProtosLandingPage.module.css`
  - `/docs/protos/:proto` → `src/pages/docs/ProtosViewerPage.tsx` + `ProtosViewerPage.module.css`
- Custom hooks live in `src/hooks/` for reusable logic
- Use TypeScript interfaces for props
- Functional components with hooks
- Keep components simple and focused on single responsibility

### Routing
- **Route Configuration**: All routes defined in `src/router/index.tsx`
- **Separation of Concerns**: App.tsx stays minimal, only renders BrowserRouter + Routes
- **Configuration-Based Routing**: Explicit route config (not file-based routing)
- As routes grow, keep them organized in the router file

### Proto Component Library
- Located in `src/components/proto/`
- Custom lightweight components for building proto diagrams
- Integrates with Heroicons v2.2 for icon protos
- Components:
  - `ProtoBox`: Containers/boxes with labels (solid/dashed/dotted variants)
  - `ProtoText`: Placeholder text lines (heading/paragraph/caption)
  - `ProtoButton`: Button placeholders with optional Heroicon support (primary/secondary/outline, sm/md/lg)
  - `ProtoImage`: Image placeholders with icon and label
  - `ProtoIcon`: Icon protos using Heroicons (sm/md/lg/xl sizes)
  - `ProtoNav`: Navigation bar protos (top/bottom)
  - `ProtoSidebar`: Sidebar protos (left/right)
  - `ProtoCard`: Pre-composed card layout (image + text + optional button)
  - `ProtoViewport`: Responsive viewport switcher (mobile/tablet/desktop views)
  - `ProtoViewer`: Proto display container with viewport controls
- **Proto Definitions**: Stored in `docs/protos/` (design assets)
  - `docs-home.tsx` - Docs homepage/TOC proto
  - `protos-page.tsx` - Proto viewer layout
  - `docs-content.tsx` - Documentation content layout
- **Proto Pages**: Pages in `src/pages/docs/` import and render protos from `docs/protos/`
- Usage: Compose complex protos from primitive components
- AI can generate protos from text descriptions using these components
- **Documentation**: See `docs/PROTO_LIBRARY.md` for complete usage guide

### Testing
- **Vitest** for unit testing (optimized for Vite)
- Only test feature-rich and/or data-driven components & functions
- Test files: `*.test.tsx` or `*.test.ts`

### TypeScript
- Strict mode enabled
- Use `import type` for type-only imports
- Project references configured (tsconfig.json, tsconfig.app.json, tsconfig.node.json)

### Import Aliases
Path aliases configured for cleaner imports:
- `@docs/*` → `docs/*`
- `@docs/protos/*` → `docs/protos/*`
- `@src/*` → `src/*`
- `@components/*` → `src/components/*`
- `@pages/*` → `src/pages/*`
- `@hooks/*` → `src/hooks/*`
- `@styles/*` → `src/styles/*`
- `@router/*` → `src/router/*`

Example: `import { HomeProto } from '@docs/protos/home';`

## Key Technical Details
- React Router v7 uses `react-router` package (not `react-router-dom`)
- Tailwind v4 requires `@import "tailwindcss"` in CSS
- **Tailwind v4 CSS Modules**: MUST include `@import "tailwindcss" reference;` at the top of every `.module.css` file
- **Tailwind v4 Media Queries**: Use `@media (min-width: 768px)` instead of `@screen md`
- **Tailwind v4 Dark Mode Limitation**: Alpha version ONLY supports OS `prefers-color-scheme`, NOT class-based dark mode
  - Solution: Custom `.light`/`.dark` parent classes with `:global()` in CSS Modules
  - NEVER use `dark:` utilities - they won't work with class-based theming
- Vite 6 features: Environment API, modern Sass support, enhanced performance
- PWA configured for offline support and installability

## CRITICAL: Error Resolution Protocol
**NEVER downgrade or change major versions without explicit user permission.**

When encountering build/runtime errors:
1. **Read error messages carefully** - they often contain solution links
2. **Check official documentation FIRST** - especially for post-2025 or beta software
3. **My training data is outdated** - I have NO knowledge of:
   - Tailwind v4 (released after Jan 2025)
   - Vite 6 (released after Jan 2025)
   - React Router v7 (released after Jan 2025)
4. **If my proposed solution breaks project conventions or requires version changes**:
   - STOP immediately
   - Tell the user: "My solution would break convention by [explain issue]"
   - Present options with pros/cons
   - Wait for user decision
5. **Use WebFetch to read documentation** when working with newer technologies
6. **Never "panic" with quick fixes** like downgrading versions or disabling features

The documentation is the source of truth, not my assumptions.

## Git Workflow
- **DO NOT push** without explicit consent/permission
- **DO commit** for major updates, features, and changes to track/save progress
- Keep commits atomic and descriptive
