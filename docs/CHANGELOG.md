# CHANGELOG

## [Unreleased]

### Added
- Initial project setup with Vite + React + TypeScript
- Component folder structure with categories (ui, forms, layout, feedback, data-display)
- Page templates system (PageTemplate, HeroTemplate, GridTemplate)
- Layout system with RootLayout
- React Router v6 integration
- PWA configuration with Vite PWA plugin
- Storybook setup for component development
- Testing setup with Vitest and Playwright
- Tailwind CSS v4 integration
- Documentation structure in `/docs/` folder

### Changed
- Restructured components from flat to folder-based organization
- Moved from single-file components to co-located structure (component + test + stories)
- Updated Button component from TailwindButton to Button
- Cleaned up sample code and assets

### Technical
- Fixed TypeScript import issues with `import type` for type-only imports
- Configured strict TypeScript settings
- Set up ESLint with React and TypeScript plugins
- Configured PWA manifest and service worker

## [0.0.0] - 2024-09-30

### Added
- Initial commit
- Basic Vite React TypeScript template