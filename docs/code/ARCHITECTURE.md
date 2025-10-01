# Architecture Documentation

## Overview
Modern React application built with TypeScript, featuring a component-driven architecture with clear separation of concerns.

## Tech Stack
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router v6** - Routing
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Vitest** - Unit testing
- **Storybook** - Component development

## Directory Structure

```
src/
├── components/      # Reusable UI components
│   └── ui/         # Base UI components
├── layouts/        # Page layouts
├── pages/          # Route pages
├── router/         # Routing configuration
├── store/          # Global state (Zustand)
├── templates/      # Page templates
├── utils/          # Helper functions
├── stories/        # Storybook stories
└── test/          # Test configuration
```

## Core Principles

### 1. Component Organization
Each component follows this structure:
```
ComponentName/
├── ComponentName.tsx       # Component logic
├── ComponentName.test.tsx  # Unit tests
├── ComponentName.stories.tsx # Storybook stories
├── index.ts               # Public exports
└── types.ts              # TypeScript types (if needed)
```

### 2. Import Aliases
- `@/` - src root
- `@components` - components folder
- `@pages` - pages folder
- `@utils` - utilities

### 3. Data Flow
```
App.tsx
  └── AppRouter
      └── RootLayout
          └── Pages
              └── Templates
                  └── Components
```

## Component Architecture

### UI Components (`/components/ui/`)
Base building blocks:
- **Button** - Primary interactive element
- **Card** - Content container
- **Section** - Layout section
- **Accordion** - Collapsible content
- **Banner** - Notification/alert
- **Icon** - SVG icons
- **IconButton** - Icon with button behavior

### Layouts (`/layouts/`)
- **RootLayout** - Main app layout with navigation

### Templates (`/templates/`)
- **PageTemplate** - Base page wrapper
- **HeroTemplate** - Hero sections
- **GridTemplate** - Grid layouts

### Pages (`/pages/`)
- **HomePage** - Landing page
- **AboutPage** - About section
- **NotFoundPage** - 404 handler

## State Management

Using Zustand for global state:

```typescript
interface AppState {
  // Theme management
  theme: 'light' | 'dark' | 'system';

  // Notifications
  notifications: Notification[];

  // UI State
  sidebarOpen: boolean;

  // Accordion tracking
  accordionGroups: Record<string, string>;
}
```

## Routing Structure

React Router v6 with nested routes:

```typescript
/                    # HomePage
/about              # AboutPage
/portfolio          # (planned)
/contact            # (planned)
/ui                 # (planned)
/code               # (planned)
```

## Component Patterns

### 1. Composition Pattern
```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### 2. Variant Pattern
```tsx
<Button variant="primary" size="lg">
  Click Me
</Button>
```

### 3. Context Pattern
Used in Accordion for managing state:
```tsx
<Accordion>
  <AccordionItem>Content</AccordionItem>
</Accordion>
```

## Performance Optimizations

1. **Lazy Loading** - Routes loaded on demand
2. **Code Splitting** - Components bundled separately
3. **Image Optimization** - WebP with fallbacks
4. **CSS Purging** - Unused Tailwind classes removed

## Testing Strategy

### Unit Tests (Vitest)
- Component logic
- Utility functions
- Store actions

### Integration Tests
- User flows
- Route navigation
- State management

### Visual Tests (Storybook)
- Component variations
- Responsive behavior
- Theme switching

## Build Configuration

### Development
```bash
npm run dev        # Start dev server
npm run storybook  # Component development
```

### Production
```bash
npm run build      # Production build
npm run preview    # Preview build
```

### Testing
```bash
npm run test       # Run tests
npm run test:ui    # Test UI
npm run coverage   # Coverage report
```

## Security Considerations

1. **XSS Protection** - React's built-in escaping
2. **CSP Headers** - Content Security Policy
3. **Dependency Auditing** - Regular npm audit
4. **Environment Variables** - Sensitive data in .env

## Accessibility

- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Focus management
- Screen reader optimization

## Future Architecture Plans

1. **Micro-frontends** - If scaling needed
2. **Server Components** - When React 19 stable
3. **Edge Functions** - For API routes
4. **WebAssembly** - For performance-critical features