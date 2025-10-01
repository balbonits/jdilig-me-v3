# Testing & Performance Monitoring Stack

## Overview
Our comprehensive testing stack ensures code quality, accessibility compliance, and optimal performance.

## Testing Stack Architecture

```
┌─────────────────────────────────────────────────┐
│                   STATIC ANALYSIS                │
├─────────────────────────────────────────────────┤
│  • ESLint (with jsx-a11y)                       │
│  • TypeScript Compiler (tsc)                     │
│  • axe-core static analysis                      │
└─────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────┐
│                  UNIT TESTING                    │
├─────────────────────────────────────────────────┤
│  • Vitest (Jest-compatible)                      │
│  • React Testing Library                         │
│  • vitest-axe (accessibility)                    │
└─────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────┐
│              COMPONENT DEVELOPMENT               │
├─────────────────────────────────────────────────┤
│  • Storybook                                     │
│  • @storybook/addon-a11y                        │
│  • Visual regression testing                     │
└─────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────┐
│                  E2E TESTING                     │
├─────────────────────────────────────────────────┤
│  • Playwright                                    │
│  • Accessibility testing (@axe-core/playwright)  │
│  • Cross-browser testing                         │
└─────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────┐
│            PERFORMANCE MONITORING                │
├─────────────────────────────────────────────────┤
│  • Core Web Vitals (web-vitals)                 │
│  • Lighthouse CI                                 │
│  • Vercel Analytics                              │
│  • Vercel Speed Insights                         │
└─────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────┐
│               A/B TESTING                        │
├─────────────────────────────────────────────────┤
│  • Feature flags                                 │
│  • Split testing                                 │
│  • Analytics integration                         │
└─────────────────────────────────────────────────┘
```

## 1. Static Analysis

### ESLint with jsx-a11y
Catches accessibility issues at the code level:

```bash
npm run lint
```

Configuration includes comprehensive WCAG 2.1 AA compliance rules.

### TypeScript
Type safety and compile-time error checking:

```bash
npm run typecheck
```

## 2. Unit Testing

### Vitest with axe-core
Fast unit testing with accessibility validation:

```bash
npm test
npm test:ui  # Interactive UI
npm test:coverage  # Coverage report
```

Example test with accessibility:
```tsx
import { axe } from 'vitest-axe';

it('should have no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 3. Storybook

### Public Deployment
Storybook can be built and deployed publicly for showcasing components:

```bash
# Build Storybook
npm run build-storybook

# Serve locally
npm run storybook

# Deploy to Vercel (automatic with push)
# Or deploy to Chromatic for visual testing
npx chromatic --project-token=<token>
```

### Accessibility Addon
The a11y addon provides:
- Real-time accessibility testing
- WCAG violation detection
- Color blindness simulation
- Contrast checking

## 4. E2E Testing with Playwright

### Setup
```bash
npm run test:e2e
npm run test:e2e:ui  # Interactive mode
```

### Accessibility Testing in E2E
```typescript
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page);
});
```

## 5. Core Web Vitals Monitoring

### Implementation
```tsx
// src/main.tsx
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

onCLS(console.log);  // Cumulative Layout Shift
onFID(console.log);  // First Input Delay
onFCP(console.log);  // First Contentful Paint
onLCP(console.log);  // Largest Contentful Paint
onTTFB(console.log); // Time to First Byte
```

## 6. Lighthouse CI

### Configuration
```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:5173/"],
      "numberOfRuns": 3
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.9 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

### Running Lighthouse
```bash
npm run lighthouse
# Or in CI/CD pipeline
npx lighthouse-ci autorun
```

## 7. Vercel Analytics & Speed Insights

### Setup
```tsx
// src/main.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
```

## 8. A/B Testing

### Recommended Approaches

#### 1. Feature Flags (Recommended for Development)
**Packages:**
- `@vercel/flags` - Vercel's native feature flags
- `unleash-client` - Open source feature toggles
- `launchdarkly-react-client-sdk` - Enterprise feature management

Example implementation:
```tsx
import { useFlag } from '@vercel/flags/react';

function Component() {
  const showNewFeature = useFlag('new-feature');

  return showNewFeature ? <NewVersion /> : <OldVersion />;
}
```

#### 2. Split Testing (Recommended for Marketing)
**Packages:**
- `@splitsoftware/splitio-react` - Split.io SDK
- `react-ab-test` - Simple A/B testing
- `@optimizely/react-sdk` - Optimizely platform

Example:
```tsx
import { Experiment, Variant } from 'react-ab-test';

function HomePage() {
  return (
    <Experiment name="homepage-hero">
      <Variant name="control">
        <HeroA />
      </Variant>
      <Variant name="variant">
        <HeroB />
      </Variant>
    </Experiment>
  );
}
```

#### 3. Vercel Edge Config (Recommended for Edge)
```tsx
import { get } from '@vercel/edge-config';

export async function getServerSideProps() {
  const treatment = await get('homepage-experiment');
  return { props: { treatment } };
}
```

#### 4. Custom Implementation with Zustand
```tsx
// stores/abTestStore.ts
import { create } from 'zustand';

interface ABTestStore {
  experiments: Record<string, string>;
  setVariant: (experiment: string, variant: string) => void;
}

export const useABTestStore = create<ABTestStore>((set) => ({
  experiments: {},
  setVariant: (experiment, variant) =>
    set((state) => ({
      experiments: { ...state.experiments, [experiment]: variant }
    }))
}));
```

### Analytics Integration
All A/B tests should track:
- Variant exposure
- User interactions
- Conversion events
- Performance metrics

```tsx
import { track } from '@vercel/analytics';

track('experiment-viewed', {
  experiment: 'homepage-hero',
  variant: 'variant-b'
});
```

## Testing Commands

```bash
# Static Analysis
npm run lint          # ESLint + jsx-a11y
npm run typecheck     # TypeScript

# Unit Testing
npm test              # Run tests
npm run test:ui       # Interactive UI
npm run test:coverage # Coverage report

# E2E Testing
npm run test:e2e      # Playwright tests
npm run test:e2e:ui   # Interactive Playwright

# Component Development
npm run storybook     # Start Storybook
npm run build-storybook # Build for deployment

# Performance
npm run lighthouse    # Lighthouse audit
npm run analyze       # Bundle analysis
```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Testing Pipeline

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npm run typecheck

      - name: Unit tests
        run: npm test -- --coverage

      - name: Build
        run: npm run build

      - name: E2E tests
        run: npm run test:e2e

      - name: Lighthouse CI
        run: npx lighthouse-ci autorun
```

## Best Practices

1. **Test Pyramid**: More unit tests, fewer E2E tests
2. **Accessibility First**: Include a11y tests in every component test
3. **Performance Budget**: Set and enforce Web Vitals thresholds
4. **Visual Regression**: Use Storybook + Chromatic for UI consistency
5. **Cross-browser Testing**: Test on Chrome, Firefox, Safari, Edge
6. **Mobile First**: Always test responsive behavior
7. **A/B Test Wisely**: Test one change at a time with clear metrics

## Resources

- [ESLint jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)
- [Vitest Documentation](https://vitest.dev)
- [Playwright Documentation](https://playwright.dev)
- [Storybook Documentation](https://storybook.js.org)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Vercel Analytics](https://vercel.com/analytics)