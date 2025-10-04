# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project setup with Vite 6, React 18, TypeScript 5.6
- React Router v7 for routing with BrowserRouter
- Tailwind CSS v4 with @tailwindcss/vite plugin
- Basic project structure with `src/components/`, `src/pages/`, `src/hooks/`
- Centralized theme library in `src/styles/`
  - `theme.css`: CSS custom properties for primary, secondary, accent colors (50-950 scale)
  - `utilities.css`: Reusable utility classes using `@apply` with theme colors
  - Dark mode support via `prefers-color-scheme`
- Wireframe component library in `src/components/wireframe/`
  - WireBox, WireText, WireButton, WireImage, WireIcon components (primitives)
  - WireNav, WireSidebar, WireCard components (layouts)
  - WireViewport component for responsive preview (mobile/tablet/desktop)
  - Heroicons integration for icon wireframes
  - WireButton supports optional icons with configurable position
  - Custom lightweight components with minimal dependencies
  - BEM + @apply pattern for clean JSX and better debugging
  - Complete documentation in `docs/WIREFRAME_LIBRARY.md`
- Router configuration separation (`src/router/index.tsx`)
  - All routes centralized in `AppRoutes` component
  - Clean separation from `App.tsx` for better scalability
- Docs subsite wireframes (`docs/wires/`)
  - `home.tsx`: TOC/Glossary wireframe (Drawing #3)
  - `wireframes-page.tsx`: Wireframe viewer with viewport buttons (Drawing #1)
  - `docs-content.tsx`: Markdown content layout (Drawing #2)
  - `index.ts`: Wireframe registry for dynamic loading
- Docs pages (`src/pages/docs/`)
  - `DocsLandingPage.tsx`: Renders HomeWireframe at `/docs`
  - `WiresLandingPage.tsx`: Lists available wireframes at `/docs/wires`
  - `WiresViewerPage.tsx`: Dynamic wireframe viewer at `/docs/wires/:wireframe`
  - `DocsViewerPage.tsx`: Documentation viewer at `/docs/:documentation`
- Import aliases for major folders
  - `@docs/*`: docs folder
  - `@docs/wires/*`: docs/wires folder
  - `@src/*`: src folder
  - `@components/*`: src/components folder
  - `@pages/*`: src/pages folder
  - `@hooks/*`: src/hooks folder
  - `@styles/*`: src/styles folder
  - `@router/*`: src/router folder
- Documentation structure in `./docs/`
- CLAUDE.md for AI development context
- BEM CSS naming convention with @apply pattern
- CSS Modules support (`.module.css`) for components
- Vitest configuration for unit testing with @testing-library/react
- PWA support with vite-plugin-pwa, service worker, and manifest
- Vercel deployment configuration with SPA routing and security headers
- DRY & KISS development philosophy
- Mobile-first responsive design approach
- Git workflow guidelines (commit major changes, no pushing without consent)
- Heroicons v2.2 for SVG icons (official Tailwind companion library)
- MIT License with All Rights Reserved for content/design

### Changed
- Migrated from previous project structure to clean redesign

### Documentation
- Created `./docs/README.md` as documentation overview
- Created `CHANGELOG.md` for tracking project changes
- Updated `CLAUDE.md` with:
  - Code standards, conventions, theme system, and git workflow
  - BEM + @apply pattern (clean JSX, avoid long Tailwind class strings)
  - Wireframe component library documentation
  - Mobile-first responsive design approach
- Documented theme-based CSS architecture with color variables
