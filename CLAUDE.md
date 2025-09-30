# CLAUDE.md - AI Context for Claude Code

## Project Overview
Personal portfolio/blog site using React, TypeScript, Vite, and Tailwind CSS with PWA capabilities.

## Important Rules
1. **Never assume or add features** - Always ask before implementing
2. **Fix errors properly** - Never disable linting rules, resolve the actual issues
3. **Follow conventions strictly** - See CONVENTIONS.md for all patterns
4. **No unsolicited changes** - Only do what is explicitly requested

## Project Structure
```
src/
├── components/          # Categorized components (ui/, forms/, layout/, etc.)
│   └── [Category]/[Component]/
│       ├── Component.tsx
│       ├── Component.test.tsx
│       ├── Component.stories.ts
│       └── index.ts
├── layouts/            # Site layouts (RootLayout)
├── templates/          # Page templates
├── pages/             # Route pages
├── router/            # Routing configuration (React Router v6, not Next.js)
└── assets/

docs/
├── screens/           # Wireframes & screens
├── flows/            # Workflows & flowcharts
├── code/             # Code conventions, patterns, architecture, API docs
├── agile/            # Agile methodology, tickets, sprints
├── ux/               # UX research, style guide, design references
├── roadmap/          # Feature roadmap, milestones
├── testing/          # Test documentation (not test files)
├── PROJECT.md        # Technical project documentation
├── AI.md            # AI integration documentation
├── DESIGN.md        # Design overview
├── GLOSSARY.md      # Terms and definitions
└── CHANGELOG.md     # Version history

public/
├── images/              # Image files
├── fonts/               # Web fonts
├── icons/               # Icon files and PWA icons
├── John_Dilig_resume.pdf # Downloadable resume
├── favicon.ico          # Site favicon
└── manifest.json        # PWA manifest
```

## Key Conventions
- **Components**: Folder-based with co-located tests and stories
- **Styling**: Tailwind utilities first, CSS modules when needed
- **TypeScript**: Use `import type` for type-only imports
- **Testing**: Vitest for unit tests, Playwright for E2E
- **Routing**: React Router v6 (not Next.js App Router)

## Current State
- Basic architecture established
- Component structure reorganized
- PWA configured
- Routing implemented with React Router v6
- Documentation structure created

## Commands
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run test` - Unit tests
- `npm run lint` - Linting
- `npm run storybook` - Component development

## Remember
- This is a personal site - no external contributions
- Always read files before editing
- Use TodoWrite for task tracking
- Ask for confirmation before adding features