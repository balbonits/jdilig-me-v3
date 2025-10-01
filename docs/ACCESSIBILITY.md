# Accessibility Guidelines & Implementation

## WCAG 2.1 AA Compliance

This project follows **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** standards to ensure the application is usable by all users, including those with disabilities.

## Core Principles (POUR)

### 1. Perceivable
Information and UI components must be presentable to users in ways they can perceive.
- **Text alternatives** for non-text content
- **Captions and transcripts** for multimedia
- **Sufficient color contrast** (4.5:1 for normal text, 3:1 for large text)
- **Responsive design** that works with zoom up to 200%

### 2. Operable
UI components and navigation must be operable.
- **Keyboard accessible** - all functionality available via keyboard
- **No keyboard traps** - users can navigate away from any component
- **Sufficient time** - users have enough time to read and use content
- **Skip links** - bypass repetitive content
- **Focus indicators** - visible focus states for keyboard navigation

### 3. Understandable
Information and UI operation must be understandable.
- **Readable** - clear language and structure
- **Predictable** - consistent navigation and functionality
- **Input assistance** - help users avoid and correct mistakes
- **Error identification** - clear error messages with suggestions

### 4. Robust
Content must be robust enough to be interpreted by a wide variety of user agents.
- **Valid HTML** - proper semantic markup
- **ARIA support** - appropriate use of ARIA attributes
- **Progressive enhancement** - basic functionality works without JavaScript

## Implementation Standards

### Semantic HTML
```tsx
// ✅ Good: Semantic HTML
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li><a href="/home">Home</a></li>
  </ul>
</nav>

// ❌ Bad: Non-semantic markup
<div class="navigation">
  <div class="nav-item">Home</div>
</div>
```

### ARIA Attributes
- **aria-label**: Provides accessible name when visible label is not present
- **aria-labelledby**: References visible label element
- **aria-describedby**: References descriptive text
- **aria-live**: Announces dynamic content changes
- **aria-expanded**: Indicates expanded/collapsed state
- **role**: Defines element's purpose when semantic HTML insufficient

### Keyboard Navigation
```tsx
// All interactive elements must support keyboard interaction
const handleKeyDown = (event: React.KeyboardEvent) => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      handleAction();
      break;
    case 'Escape':
      handleClose();
      break;
    case 'Tab':
      // Allow default tab navigation
      break;
  }
};
```

### Focus Management
```tsx
// Visible focus indicators
.interactive-element:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

// Focus trap for modals
useEffect(() => {
  if (isOpen) {
    modalRef.current?.focus();
    return () => {
      triggerRef.current?.focus(); // Return focus on close
    };
  }
}, [isOpen]);
```

### Color Contrast
- **Normal text**: 4.5:1 contrast ratio minimum
- **Large text** (18pt/24px or 14pt/18.5px bold): 3:1 minimum
- **UI components**: 3:1 minimum for boundaries
- **Never rely solely on color** to convey information

### Screen Reader Support
```tsx
// Visually hidden but available to screen readers
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// Usage
<span className="sr-only">Loading results...</span>
```

### Form Accessibility
```tsx
// Every input needs a label
<label htmlFor="email">
  Email Address
  <input
    id="email"
    type="email"
    required
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
</label>
{hasError && (
  <span id="email-error" role="alert">
    Please enter a valid email address
  </span>
)}
```

## Component-Specific Implementation

### Accordion Component
- **ARIA expanded/collapsed states**: Proper `aria-expanded` attributes
- **Keyboard navigation**: Enter/Space to toggle, arrow keys for navigation
- **Focus management**: Maintains focus on active item
- **Proper heading hierarchy**: Uses semantic heading elements (h1-h6)
- **Screen reader announcements**: State changes are announced
- **Group behavior**: Auto-collapse siblings when group is specified

### Banner Component
- **Landmark role**: `banner`, `region`, or `complementary`
- **Heading hierarchy**: Configurable heading level
- **Keyboard support**: Enter/Space for actions, Escape to dismiss
- **Live regions**: Announcements for dynamic content

### Card Component
- **Article role**: Semantic grouping of related content
- **Alt text**: Required for images, decorative images marked appropriately
- **Interactive states**: Focus, hover, active clearly indicated
- **Heading hierarchy**: Proper nesting within page structure

### Section Component
- **Landmark roles**: Define page regions
- **Toggleable sections**: Proper ARIA attributes for expandable content
- **Skip links**: Navigate between sections
- **Focus management**: Programmatic focus for dynamic content
- **Grid navigation**: Arrow keys for grid layouts

## Testing Checklist

### Manual Testing
- [ ] **Keyboard only**: Navigate entire app without mouse
- [ ] **Screen reader**: Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] **Color contrast**: Use browser DevTools or contrast checker
- [ ] **Zoom to 200%**: Content remains usable and readable
- [ ] **Focus indicators**: Visible for all interactive elements

### Automated Testing

#### ESLint jsx-a11y Rules
```bash
# Run accessibility linting
npm run lint
```

Our ESLint configuration includes comprehensive jsx-a11y rules:
- `jsx-a11y/alt-text`: Ensures images have alt text
- `jsx-a11y/aria-props`: Validates ARIA properties
- `jsx-a11y/aria-role`: Ensures valid ARIA roles
- `jsx-a11y/heading-has-content`: Headings must have content
- `jsx-a11y/role-has-required-aria-props`: Required ARIA props for roles

#### Automated Testing with axe-core
```bash
# Run all tests including accessibility validation
npm run test
```

We use **axe-core** and **vitest-axe** for comprehensive accessibility testing:

```tsx
// Example accessibility test
import { axe } from 'vitest-axe';

it('should have no accessibility violations', async () => {
  const { container } = render(
    <Component title="Accessible Component">
      Content with proper semantic structure
    </Component>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### axe-core Integration Details

**Installation:**
```bash
npm install --save-dev vitest-axe
```

**Setup (src/test/setup.ts):**
```tsx
import { expect } from 'vitest';
import * as matchers from 'vitest-axe/matchers';

expect.extend(matchers);
```

**Component Test Coverage:**
All UI components include axe accessibility validation:
- Button: Interactive element accessibility
- Banner: Landmark and content structure
- Card: Image alt text and heading hierarchy
- Section: Toggleable content and ARIA states
- Accordion: Complex widget accessibility

**Automated Violation Detection:**
- **Color contrast**: Insufficient contrast ratios
- **ARIA usage**: Invalid roles, missing properties
- **Keyboard accessibility**: Missing focus management
- **Image alt text**: Missing or inappropriate descriptions
- **Form labeling**: Unlabeled or improperly labeled inputs
- **Heading structure**: Skipped levels or missing content

#### Browser Testing Tools
- **axe DevTools**: Browser extension for real-time accessibility testing
- **Lighthouse**: Chrome DevTools accessibility audit
- **Microsoft Edge**: Built-in accessibility tools with axe integration
- **WAVE**: Web accessibility evaluation overlay

### Screen Reader Testing
1. **Enable screen reader**
   - Windows: NVDA (free) or JAWS
   - Mac: VoiceOver (Cmd+F5)
   - Mobile: TalkBack (Android) or VoiceOver (iOS)

2. **Test navigation**
   - Tab through interactive elements
   - Use heading navigation (H key)
   - Use landmark navigation
   - Test form completion

3. **Verify announcements**
   - Page title announced on route change
   - Dynamic content updates announced
   - Error messages read immediately
   - Loading states communicated

## Common Patterns

### Skip Links
```tsx
<a href="#main-content" className="sr-only-focusable">
  Skip to main content
</a>
```

### Loading States
```tsx
<div aria-live="polite" aria-busy={isLoading}>
  {isLoading ? (
    <span className="sr-only">Loading content...</span>
  ) : (
    <Content />
  )}
</div>
```

### Error Messages
```tsx
<div role="alert" aria-live="assertive">
  {error && <p>{error.message}</p>}
</div>
```

### Modals/Dialogs
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirm Action</h2>
  <p id="dialog-description">Are you sure you want to proceed?</p>
</div>
```

## Resources

### Tools
- **axe DevTools**: Browser extension for accessibility testing
- **WAVE**: Web accessibility evaluation tool
- **Lighthouse**: Chrome DevTools accessibility audit
- **NVDA**: Free Windows screen reader
- **Contrast Checker**: WebAIM contrast ratio tool

### References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/resources/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

## Continuous Improvement

Accessibility is not a one-time implementation but an ongoing commitment:

1. **Regular audits**: Test with each feature addition
2. **User feedback**: Engage with users who rely on assistive technologies
3. **Stay updated**: Follow WCAG updates and best practices
4. **Team training**: Ensure all contributors understand accessibility
5. **Design first**: Consider accessibility in design phase, not as afterthought

## Development Workflow

1. **Design Phase**: Consider accessibility requirements
2. **Implementation**: Follow semantic HTML and ARIA guidelines
3. **Testing**: Run automated tests and manual checks
4. **Review**: Include accessibility in code reviews
5. **Documentation**: Update this guide with new patterns
6. **Monitoring**: Track and fix accessibility issues in production