# Code Documentation

## Overview
Technical documentation for the portfolio site's codebase, architecture, and development practices.

## Contents

### Core Documentation
- [`ARCHITECTURE.md`](./ARCHITECTURE.md) - System architecture and tech stack
- [`COMPONENTS.md`](./COMPONENTS.md) - UI component library documentation
- [`STATE_MANAGEMENT.md`](./STATE_MANAGEMENT.md) - Zustand state management
- [`ROUTING.md`](./ROUTING.md) - React Router v6 configuration
- [`CONVENTIONS.md`](./CONVENTIONS.md) - Code style guide and conventions
- [`UTILITIES.md`](./UTILITIES.md) - Helper functions and utilities
- [`CODE_REVIEW.md`](./CODE_REVIEW.md) - Code review checklist

## Quick Start

### Development
```bash
npm run dev        # Start dev server (http://localhost:5173)
npm run storybook  # Component development
npm run test       # Run tests
npm run lint       # Lint code
```

### Building
```bash
npm run build      # Production build
npm run preview    # Preview production build
```

## Project Structure
```
src/
├── components/    # Reusable UI components
├── layouts/       # Page layouts
├── pages/         # Route pages
├── router/        # Routing configuration
├── store/         # Global state (Zustand)
├── templates/     # Page templates
├── utils/         # Helper functions
└── test/          # Test configuration
```

## Key Technologies
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tooling
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **React Router v6** - Routing
- **Vitest** - Testing
- **Storybook** - Component development

## Component Architecture

### Component Structure
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.stories.tsx
├── index.ts
└── types.ts (if needed)
```

### Import Aliases
- `@/` - src directory
- `@components` - components folder
- `@pages` - pages folder
- `@utils` - utilities folder

## State Management
Using Zustand for lightweight global state:
- Theme management
- Notifications
- UI state
- Accordion groups

## Performance Targets
- Lighthouse score >95 all metrics
- FCP <1.5s, TTI <3.5s
- Core Web Vitals: Good rating
- Bundle size <200KB JS

## Testing Strategy
- **Unit Tests** - Component logic (Vitest)
- **Integration** - User flows
- **Visual** - Storybook stories
- **E2E** - Critical paths (Playwright)

## Code Quality
- TypeScript strict mode
- ESLint + Prettier
- Pre-commit hooks
- Code review process
- 80%+ test coverage goal

## Accessibility Standards
- WCAG 2.1 AA compliance
- Semantic HTML
- ARIA attributes
- Keyboard navigation
- Screen reader support

## Security
- XSS protection (React)
- CSP headers
- Environment variables
- Regular dependency updates
- Input sanitization

## Contributing Guidelines
1. Follow conventions in [`CONVENTIONS.md`](./CONVENTIONS.md)
2. Write tests for new features
3. Update documentation
4. Pass linting and tests
5. Use conventional commits

## Resources
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Router](https://reactrouter.com)
- [Vite](https://vitejs.dev)

## Support
For questions or issues, check:
1. This documentation
2. Code comments
3. Storybook examples
4. Test files for usage patterns