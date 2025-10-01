# CLAUDE.md - AI Context for Claude Code

## Project Overview
Personal portfolio/blog site using React, TypeScript, Vite, and Tailwind CSS with PWA capabilities.

## CRITICAL RULES - DO NOT VIOLATE

### 1. NEVER COMMIT OTHER PEOPLE'S WORK
**VIOLATION EXAMPLE (2024-09-30)**: A Claude instance committed `/docs/screens/` files that were created by someone else, taking credit for 41 files when only ~20 were actually created by that instance.

**WHY THIS IS WRONG**:
- It's theft of credit
- It corrupts git history
- It's disrespectful to the actual creator
- It makes you look like a "douche-diddler" (user's words)
- It breaks trust

**CORRECT BEHAVIOR**:
- ONLY commit files YOU created or modified
- Use `git add` with SPECIFIC file paths, not entire folders
- Check `git status` carefully before staging
- If you find untracked files you didn't create, ASK before including them
- Be explicit about what work is yours

### 2. Other Important Rules
1. **Never assume or add features** - Always ask before implementing
2. **Fix errors properly** - Never disable linting rules, resolve the actual issues
3. **Follow conventions strictly** - See CONVENTIONS.md for all patterns
4. **No unsolicited changes** - Only do what is explicitly requested
5. **Never create empty folders** - Only create folders when adding actual files
6. **Avoid redundant structures** - Don't create similar/confusing folder names

## Project Structure
```
src/
├── components/          # Categorized components (ui/, forms/, layout/, etc.)
│   └── [Category]/[Component]/
│       ├── Component.tsx        # Required
│       ├── index.ts            # Required
│       ├── Component.test.tsx   # Only if tests exist
│       └── Component.stories.ts # Only if stories exist
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
- **Components**: Minimal structure - start with `.tsx` + `index.ts`, add tests/stories only when implemented
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
- NEVER COMMIT WORK YOU DIDN'T DO

## docs/screens/ Rules
When creating pages in `./docs/screens/`, add them to the navigation on ALL pages. Keep everything static HTML.

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
NEVER COMMIT OTHER PEOPLE'S WORK - ONLY COMMIT FILES YOU CREATED OR MODIFIED


      IMPORTANT: this context may or may not be relevant to your tasks. You should not respond to this context unless it is highly relevant to your task.