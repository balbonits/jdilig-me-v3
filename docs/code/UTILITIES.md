# Utilities Documentation

## Overview
Helper functions and utilities for analytics, performance monitoring, and common operations.

## Analytics (`/utils/analytics.ts`)

### Core Functions

#### `initializeAnalytics()`
Initializes analytics and error tracking:
```typescript
import { initializeAnalytics } from '@/utils/analytics';

// Call once in main.tsx
initializeAnalytics();
```

#### `trackEvent()`
Track custom events:
```typescript
trackEvent('button_click', {
  button: 'cta',
  location: 'hero',
  variant: 'primary'
});
```

#### `trackPageView()`
Track page views (for SPAs):
```typescript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
}
```

#### `trackError()`
Track errors with context:
```typescript
try {
  // risky operation
} catch (error) {
  trackError(error as Error, {
    componentStack: 'HomePage > Hero > Button'
  });
}
```

#### `trackExperiment()`
A/B testing support:
```typescript
trackExperiment('homepage_cta', 'variant_b', {
  userId: 'user123'
});
```

#### `measurePerformance()`
Custom performance marks:
```typescript
// Start measurement
measurePerformance('portfolio_load');

// Later in code
const duration = measurePerformance('portfolio_loaded');
console.log(`Portfolio loaded in ${duration}ms`);
```

### Configuration
Environment variables:
```env
VITE_GA_ID=G-XXXXXXXXXX
VITE_ANALYTICS_ENDPOINT=https://api.example.com/analytics
```

---

## Web Vitals (`/utils/webVitals.ts`)

### Core Web Vitals Monitoring

#### `initWebVitals()`
Start monitoring Web Vitals:
```typescript
import { initWebVitals } from '@/utils/webVitals';

// In main.tsx
initWebVitals();
```

#### Metrics Tracked
- **CLS** - Cumulative Layout Shift (< 0.1 good)
- **FCP** - First Contentful Paint (< 1.8s good)
- **FID** - First Input Delay (< 100ms good)
- **LCP** - Largest Contentful Paint (< 2.5s good)
- **TTFB** - Time to First Byte (< 800ms good)
- **INP** - Interaction to Next Paint (< 200ms good)

#### `reportWebVitals()`
Force report all metrics:
```typescript
// Useful after route changes
reportWebVitals();
```

#### `getCurrentWebVitals()`
Get current metrics (debugging):
```typescript
const vitals = await getCurrentWebVitals();
console.log('Current Web Vitals:', vitals);
// { CLS: 0.05, FCP: 1200, LCP: 2100, ... }
```

### Performance Budget
Automatic warnings when thresholds exceeded:
```typescript
// Console warnings when:
// - CLS > 0.25
// - FCP > 3000ms
// - LCP > 4000ms
// etc.
```

---

## Common Utilities (Planned)

### String Utilities
```typescript
// Format utilities
export function formatDate(date: Date): string;
export function truncate(str: string, length: number): string;
export function slugify(str: string): string;
export function capitalize(str: string): string;
```

### Number Utilities
```typescript
// Number formatting
export function formatNumber(num: number): string;
export function formatCurrency(amount: number): string;
export function formatPercentage(value: number): string;
export function clamp(num: number, min: number, max: number): number;
```

### Array Utilities
```typescript
// Array operations
export function unique<T>(arr: T[]): T[];
export function chunk<T>(arr: T[], size: number): T[][];
export function shuffle<T>(arr: T[]): T[];
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>;
```

### Object Utilities
```typescript
// Object operations
export function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
export function deepClone<T>(obj: T): T;
export function deepMerge<T>(target: T, source: Partial<T>): T;
```

### DOM Utilities
```typescript
// DOM helpers
export function scrollToElement(element: HTMLElement): void;
export function copyToClipboard(text: string): Promise<void>;
export function downloadFile(url: string, filename: string): void;
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T;
```

### Validation Utilities
```typescript
// Input validation
export function isEmail(email: string): boolean;
export function isURL(url: string): boolean;
export function isPhone(phone: string): boolean;
export function sanitizeHTML(html: string): string;
```

### Storage Utilities
```typescript
// Local storage with typing
export function getStorageItem<T>(key: string): T | null;
export function setStorageItem<T>(key: string, value: T): void;
export function removeStorageItem(key: string): void;
export function clearStorage(): void;
```

### Async Utilities
```typescript
// Promise helpers
export function sleep(ms: number): Promise<void>;
export function retry<T>(
  fn: () => Promise<T>,
  attempts: number
): Promise<T>;
export function timeout<T>(
  promise: Promise<T>,
  ms: number
): Promise<T>;
```

---

## Custom Hooks (Planned)

### `useDebounce`
```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

### `useLocalStorage`
```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  // Set to local storage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

### `useMediaQuery`
```typescript
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

---

## Testing Utilities

### Mock Functions
```typescript
// Mock analytics in tests
export const mockAnalytics = {
  trackEvent: vi.fn(),
  trackPageView: vi.fn(),
  trackError: vi.fn(),
};
```

### Test Helpers
```typescript
// Render with providers
export function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderOptions
);

// Wait for async updates
export function waitForLoadingToFinish();

// Mock API responses
export function mockApiResponse(endpoint: string, data: any);
```

---

## Environment Detection

```typescript
// Environment checks
export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;
export const isTest = import.meta.env.MODE === 'test';
export const isBrowser = typeof window !== 'undefined';
export const isTouch = isBrowser && 'ontouchstart' in window;
```

---

## Performance Helpers

### Resource Hints
```typescript
// Preload critical resources
export function preloadImage(src: string): void;
export function prefetchRoute(path: string): void;
export function preconnect(origin: string): void;
```

### Optimization
```typescript
// Image optimization
export function getOptimizedImageUrl(
  src: string,
  width: number,
  format?: 'webp' | 'jpg'
): string;

// Lazy loading
export function lazyLoad<T>(
  importFunc: () => Promise<{ default: T }>
): React.LazyExoticComponent<T>;
```

---

## Best Practices

1. **Pure Functions** - Keep utilities pure and side-effect free
2. **Type Safety** - Always provide TypeScript types
3. **Error Handling** - Handle edge cases gracefully
4. **Performance** - Optimize for common use cases
5. **Testing** - Unit test all utilities
6. **Documentation** - Include JSDoc comments

## Future Enhancements

- [ ] Add more string manipulation utilities
- [ ] Create date/time formatting helpers
- [ ] Add animation utilities
- [ ] Implement caching utilities
- [ ] Create API request helpers
- [ ] Add form validation utilities