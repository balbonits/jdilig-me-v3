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
│       ├── WiresLandingPage.tsx
│       ├── WiresViewerPage.tsx
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
├── wires/         # Wireframe definitions (design assets)
│   ├── home.tsx
│   ├── wireframes-page.tsx
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
- **CSS Modules**: Use `.module.css` files for components (NOT for pages)
- **BEM + @apply Pattern**: Avoid long Tailwind classes in JSX
  - ❌ Bad: `<div className="flex flex-col gap-4 md:flex-row md:gap-8 p-4 md:p-8">`
  - ✅ Good: `<div className="card">` + CSS module with `@apply flex flex-col gap-4 p-4;`
  - Keep JSX clean with BEM classnames, use `@apply` in CSS modules for Tailwind utilities
  - Better browser DevTools debugging (see `.card` instead of 15 utility classes)
- **Pages**: Use Tailwind utility classes directly in JSX (no CSS modules)
- **Dark Mode**: Automatic theme color adjustments via `prefers-color-scheme`

### Component Patterns
- Components live in `src/components/` with co-located styles
- Pages live in `src/pages/` without CSS modules
- **Page Structure Mirrors Routes**: Pages in `src/pages/` follow the route structure
  - `/docs` → `src/pages/docs/DocsLandingPage.tsx`
  - `/docs/wires` → `src/pages/docs/WiresLandingPage.tsx`
  - `/docs/wires/:wireframe` → `src/pages/docs/WiresViewerPage.tsx`
- Custom hooks live in `src/hooks/` for reusable logic
- Use TypeScript interfaces for props
- Functional components with hooks
- Keep components simple and focused on single responsibility

### Routing
- **Route Configuration**: All routes defined in `src/router/index.tsx`
- **Separation of Concerns**: App.tsx stays minimal, only renders BrowserRouter + Routes
- **Configuration-Based Routing**: Explicit route config (not file-based routing)
- As routes grow, keep them organized in the router file

### Wireframe Component Library
- Located in `src/components/wireframe/`
- Custom lightweight components for building wireframe diagrams
- Integrates with Heroicons v2.2 for icon wireframes
- Components:
  - `WireBox`: Containers/boxes with labels (solid/dashed/dotted variants)
  - `WireText`: Placeholder text lines (heading/paragraph/caption)
  - `WireButton`: Button placeholders with optional Heroicon support (primary/secondary/outline, sm/md/lg)
  - `WireImage`: Image placeholders with icon and label
  - `WireIcon`: Icon wireframes using Heroicons (sm/md/lg/xl sizes)
  - `WireNav`: Navigation bar wireframes (top/bottom)
  - `WireSidebar`: Sidebar wireframes (left/right)
  - `WireCard`: Pre-composed card layout (image + text + optional button)
  - `WireViewport`: Responsive viewport switcher (mobile/tablet/desktop views)
- **Wireframe Definitions**: Stored in `docs/wires/` (design assets)
  - `home.tsx` - Docs homepage/TOC wireframe
  - `wireframes-page.tsx` - Wireframe viewer layout
  - `docs-content.tsx` - Documentation content layout
- **Wireframe Pages**: Pages in `src/pages/docs/` import and render wireframes from `docs/wires/`
- Usage: Compose complex wireframes from primitive components
- AI can generate wireframes from text descriptions using these components
- **Documentation**: See `docs/WIREFRAME_LIBRARY.md` for complete usage guide

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
- `@docs/wires/*` → `docs/wires/*`
- `@src/*` → `src/*`
- `@components/*` → `src/components/*`
- `@pages/*` → `src/pages/*`
- `@hooks/*` → `src/hooks/*`
- `@styles/*` → `src/styles/*`
- `@router/*` → `src/router/*`

Example: `import { HomeWireframe } from '@docs/wires/home';`

## Key Technical Details
- React Router v7 uses `react-router` package (not `react-router-dom`)
- Tailwind v4 requires `@import "tailwindcss"` in CSS
- Vite 6 features: Environment API, modern Sass support, enhanced performance
- PWA configured for offline support and installability

## Git Workflow
- **DO NOT push** without explicit consent/permission
- **DO commit** for major updates, features, and changes to track/save progress
- Keep commits atomic and descriptive
