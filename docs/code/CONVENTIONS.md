# Code Conventions & Style Guide

## TypeScript Conventions

### Type Definitions
```typescript
// ✅ Use interface for object shapes
interface UserProps {
  name: string;
  age: number;
  email?: string; // Optional properties
}

// ✅ Use type for unions, intersections, primitives
type Status = 'idle' | 'loading' | 'success' | 'error';
type ID = string | number;

// ✅ Use const assertions for literals
const ROUTES = {
  HOME: '/',
  ABOUT: '/about'
} as const;
```

### Import Types
```typescript
// ✅ Use import type for type-only imports
import type { ReactNode, FC } from 'react';
import { useState } from 'react';
```

### Naming Conventions
- **Interfaces**: PascalCase with "Props" suffix for component props
- **Types**: PascalCase
- **Enums**: PascalCase with UPPER_CASE values
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase
- **Components**: PascalCase

## React Conventions

### Component Structure
```tsx
// 1. Imports
import type { FC, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useAppStore } from '@/store';
import styles from './Component.module.css';

// 2. Types
interface ComponentProps {
  children: ReactNode;
  title: string;
  onAction?: () => void;
}

// 3. Component
export const Component: FC<ComponentProps> = ({
  children,
  title,
  onAction
}) => {
  // 4. Hooks
  const [state, setState] = useState(false);
  const theme = useAppStore((state) => state.theme);

  // 5. Effects
  useEffect(() => {
    // effect logic
  }, []);

  // 6. Handlers
  const handleClick = () => {
    onAction?.();
  };

  // 7. Render
  return (
    <div className="component">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

// 8. Display name (for debugging)
Component.displayName = 'Component';
```

### Hooks Rules
```tsx
// ✅ Custom hooks start with "use"
function useCustomHook() {
  // hook logic
}

// ✅ Call hooks at top level
function Component() {
  const [state, setState] = useState();
  // NOT inside conditions or loops
}
```

## File Organization

### Component Files
```
ComponentName/
├── ComponentName.tsx       # Main component
├── ComponentName.test.tsx  # Tests
├── ComponentName.stories.tsx # Storybook
├── ComponentName.module.css # Styles (if needed)
├── types.ts               # Types (if complex)
├── utils.ts               # Helper functions
└── index.ts              # Public exports
```

### Barrel Exports
```typescript
// index.ts
export { Component } from './Component';
export type { ComponentProps } from './types';
```

## Styling Conventions

### Tailwind Classes
```tsx
// ✅ Group related utilities
<div className="
  flex items-center justify-between
  px-4 py-2
  bg-white dark:bg-gray-800
  border border-gray-200
  rounded-lg
">

// ✅ Extract complex styles
const buttonStyles = cn(
  'px-4 py-2 rounded-lg',
  'transition-colors duration-200',
  {
    'bg-blue-500 text-white': variant === 'primary',
    'bg-gray-200 text-gray-800': variant === 'secondary'
  }
);
```

### CSS Modules (when needed)
```css
/* Use camelCase for classes */
.componentWrapper {
  /* Complex animations or styles */
}

.isActive {
  /* State modifiers */
}
```

## State Management

### Local State
```tsx
// ✅ Use for UI-only state
const [isOpen, setIsOpen] = useState(false);
```

### Global State
```tsx
// ✅ Use Zustand for shared state
const theme = useAppStore((state) => state.theme);
```

### Derived State
```tsx
// ✅ Calculate from existing state
const isComplete = todos.every(todo => todo.done);
```

## Error Handling

### Try-Catch
```tsx
try {
  const data = await fetchData();
  setData(data);
} catch (error) {
  console.error('Failed to fetch:', error);
  setError(error.message);
}
```

### Error Boundaries
```tsx
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

## Performance

### Memoization
```tsx
// ✅ Memoize expensive calculations
const expensiveValue = useMemo(
  () => computeExpensive(data),
  [data]
);

// ✅ Memoize callbacks passed to children
const handleClick = useCallback(
  () => doSomething(id),
  [id]
);

// ✅ Memoize components when needed
const MemoizedComponent = memo(Component);
```

### Code Splitting
```tsx
// ✅ Lazy load routes
const About = lazy(() => import('./pages/About'));

// ✅ Lazy load heavy components
const Chart = lazy(() => import('./components/Chart'));
```

## Testing Conventions

### Test Structure
```tsx
describe('Component', () => {
  it('should render correctly', () => {
    // Arrange
    const props = { title: 'Test' };

    // Act
    render(<Component {...props} />);

    // Assert
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### Testing Priorities
1. User interactions
2. Props and state changes
3. Edge cases
4. Accessibility

## Comments & Documentation

### JSDoc Comments
```tsx
/**
 * Button component with multiple variants
 * @param variant - Visual style variant
 * @param size - Button size
 * @param onClick - Click handler
 */
```

### Inline Comments
```tsx
// TODO: Implement feature
// FIXME: Known bug
// NOTE: Important information
// HACK: Temporary workaround
```

## Git Conventions

### Branch Names
- `feature/add-portfolio`
- `fix/navigation-bug`
- `chore/update-deps`

### Commit Messages
```
feat: add portfolio page
fix: resolve navigation issue
docs: update README
style: format code
refactor: simplify component logic
test: add unit tests
chore: update dependencies
```

## Import Order
```tsx
// 1. React/Node modules
import React from 'react';
import { useState } from 'react';

// 2. External packages
import { motion } from 'framer-motion';
import cn from 'clsx';

// 3. Internal aliases
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks';

// 4. Relative imports
import { localFunction } from './utils';
import styles from './styles.module.css';

// 5. Types
import type { ComponentProps } from './types';
```

## Accessibility

### ARIA Attributes
```tsx
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  aria-expanded={isOpen}
>
```

### Semantic HTML
```tsx
// ✅ Use semantic elements
<nav> <main> <article> <section>

// ❌ Avoid div soup
<div> <div> <div>
```

## Security

### Input Sanitization
```tsx
// ✅ Sanitize user input
const sanitized = DOMPurify.sanitize(userInput);
```

### Environment Variables
```tsx
// ✅ Use env variables for sensitive data
const apiKey = import.meta.env.VITE_API_KEY;
```

## Do's and Don'ts

### Do's ✅
- Use TypeScript strictly
- Write tests for critical paths
- Optimize images and bundles
- Handle loading and error states
- Make components accessible
- Document complex logic

### Don'ts ❌
- Don't use `any` type
- Don't ignore ESLint warnings
- Don't commit console.logs
- Don't hardcode values
- Don't skip error handling
- Don't forget accessibility