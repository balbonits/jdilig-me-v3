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
  - Every component/page folder contains: `ComponentName.tsx`, `ComponentName.module.css`, `index.ts`
  - Barrel exports via `index.ts`: `export { ComponentName } from './ComponentName';`
- **BEM + @apply Pattern**: Avoid long Tailwind classes in JSX
  - ❌ Bad: `<div className="flex flex-col gap-4 md:flex-row md:gap-8 p-4 md:p-8">`
  - ✅ Good: `<div className="card">` + CSS module with `@apply flex flex-col gap-4 p-4;`
  - Keep JSX clean with BEM classnames, use `@apply` in CSS modules for Tailwind utilities
  - Better browser DevTools debugging (see `.card` instead of 15 utility classes)
- **Dark Mode**: Class-based theming using `.light` and `.dark` parent classes
  - **Default Theme**: Light mode (configured in `useTheme` hook)
  - **NEVER use Tailwind's `dark:` utilities** - Tailwind v4 alpha only supports OS `prefers-color-scheme`
  - **CRITICAL PATTERN**: Light theme styles are DEFAULT, dark theme is OVERRIDE
  - **CORRECT Pattern**:
    ```css
    .element {
      @apply bg-white text-gray-900;  /* Light theme as DEFAULT */

      :global(.dark) & {
        @apply bg-gray-800 text-gray-100;  /* Dark theme OVERRIDE */
      }
    }
    ```
  - **INCORRECT Pattern** (DO NOT USE):
    ```css
    .element {
      :global(.light) & {
        @apply bg-white text-gray-900;  /* ❌ WRONG - don't wrap light theme */
      }

      :global(.dark) & {
        @apply bg-gray-800 text-gray-100;
      }
    }
    ```
  - **Why**: Light theme should be the failover/default styles that work without any parent class
  - **Only use** `:global(.dark) &` for dark mode overrides
  - Theme managed by `useTheme` hook with localStorage persistence
  - Theme toggle in `SiteHeader` component
  - Theme class applied to root div in `App.tsx`

### Component Patterns
- **Folder Structure**: All components and pages use folder-based organization
  - Each component/page has its own folder containing:
    - `ComponentName.tsx` - Component implementation
    - `ComponentName.module.css` - Component styles
    - `index.ts` - Barrel export: `export { ComponentName } from './ComponentName';`
  - Example: `src/components/ui/Button/` contains `Button.tsx`, `Button.module.css`, `index.ts`
  - Import via: `import { Button } from '@components/ui/Button';`
- Components live in `src/components/` with two main categories:
  - `src/components/ui/` - UI component library (Bootstrap-inspired)
  - `src/components/proto/` - Proto component library (design mockups)
- Pages live in `src/pages/` with co-located styles
- **Page Structure Mirrors Routes**: Pages in `src/pages/` follow the route structure
  - `/docs` → `src/pages/docs/DocsLandingPage/`
  - `/docs/protos` → `src/pages/docs/ProtosLandingPage/`
  - `/docs/protos/:proto` → `src/pages/docs/ProtosViewerPage/`
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
**CRITICAL: NO RAW HTML IN PROTO FILES**
- **All proto files MUST use only Proto components - NO `<div>`, `<span>`, or any raw HTML elements**
- Located in `src/components/proto/`
- Custom lightweight components for building proto diagrams
- Integrates with Heroicons v2.2 for icon protos

#### Proto Component Organization:
Components organized in **`src/components/proto/`** by category:

**base/** - Root container
- `Proto`: Root container for all proto files (replaces `<div>`)
  - Only accepts Proto* components as children
  - Props: `direction` (column/row), `className`

**layout/** - Layout & structure
- `ProtoBox`: Labeled containers (solid/dashed/dotted variants)
- `ProtoSection`: Flex layout sections (alignment/justification/padding/gap)
- `ProtoGrid`: Grid layouts (1/2/3/4 cols, mobile-first responsive)
- `ProtoFlex`: Flexbox layouts (row/col, wrap, alignment, gap)
- `ProtoList`: List containers (unordered/ordered/plain, disc/decimal/alpha/roman)
- `ProtoListItem`: List items

**content/** - Content & form elements
- `ProtoText`: Placeholder text lines (heading/paragraph/caption)
- `ProtoButton`: Button placeholders with Heroicon support
- `ProtoImage`: Image placeholders with icon and label
- `ProtoIcon`: Icon components (sm/md/lg/xl)
- `ProtoBadge`: Badges (primary/secondary/info/success/warning/error)
- `ProtoAvatar`: Avatar placeholders with initials/labels
- `ProtoMedia`: Video/audio/embed players (16:9, 4:3, 1:1, 21:9 aspect ratios)
- `ProtoInput`: All HTML input types (text, email, password, number, tel, url, search, date, time, file, color, range, checkbox, textarea)
- `ProtoRadio`: Radio buttons (sm/md/lg)
- `ProtoRadioGroup`: Radio button groups with legend
- `ProtoLoadingSpinner`: Loading states (spin/pulse/bounce/dots animations)

**composed/** - Complex composed components
- `ProtoCard`: Card layouts (image + title + description + button)
- `ProtoHero`: Hero/media banners (sm/md/lg/full height, gradient/solid/image backgrounds)
- `ProtoTooltip`: Tooltips (top/bottom/left/right positions)
- `ProtoNav`: Navigation bars (top/bottom)
- `ProtoSidebar`: Sidebars (left/right)
- `ProtoTable`: Table wireframes
- `ProtoForm`: Form wireframes
- `ProtoModal`: Modal overlays
- `ProtoTabs`: Tabbed interfaces
- `ProtoViewport`: Responsive viewport switcher (mobile/tablet/desktop)
- `ProtoViewer`: Proto display container with viewport controls

#### className Prop Pattern:
- All Proto components accept `className` as **string OR array of strings**
- Uses `cn()` utility from `@src/utils` for className handling
- Examples:
  ```tsx
  // String format (standard Tailwind)
  <ProtoBox className="mt-4 bg-gray-100" />

  // Array format (BEM pattern)
  <ProtoBox className={['block', 'element', 'modifier']} />

  // Mixed
  <ProtoBox className={['base-class', 'extra-class']} />
  ```

#### Proto File Structure:
- **Proto Definitions**: Stored in `docs/protos/` (design assets)
  - `homepage.tsx` - Homepage proto
  - `docs-home.tsx` - Docs homepage/TOC proto
  - `protos-page.tsx` - Proto viewer layout
  - `docs-content.tsx` - Documentation content layout
- **Proto Pages**: Pages in `src/pages/docs/` import and render protos from `docs/protos/`
- **Always wrap in `<Proto>` component** - never use raw `<div>` as root
- **Replace ALL HTML elements** with Proto components:
  - ❌ `<div className="flex gap-4">`
  - ✅ `<ProtoFlex gap="md">`
  - ❌ `<div className="grid grid-cols-3">`
  - ✅ `<ProtoGrid cols="3">`

#### Usage:
- Compose complex protos from primitive components
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
