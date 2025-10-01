# Component Documentation

## UI Component Library

### Button
**Location**: `/components/ui/Button/`
**Purpose**: Primary interactive element

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}
```

**Usage**:
```tsx
<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

---

### Card
**Location**: `/components/ui/Card/`
**Purpose**: Content container with optional header/footer

```tsx
interface CardProps {
  className?: string;
  hoverable?: boolean;
  bordered?: boolean;
  children: React.ReactNode;
}
```

**Usage**:
```tsx
<Card hoverable bordered>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

---

### Accordion
**Location**: `/components/ui/Accordion/`
**Purpose**: Collapsible content sections

```tsx
interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
}
```

**Usage**:
```tsx
<Accordion
  items={[
    { id: '1', title: 'Section 1', content: 'Content 1' },
    { id: '2', title: 'Section 2', content: 'Content 2' }
  ]}
  allowMultiple
/>
```

---

### Section
**Location**: `/components/ui/Section/`
**Purpose**: Page section wrapper with consistent spacing

```tsx
interface SectionProps {
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
  children: React.ReactNode;
}
```

**Usage**:
```tsx
<Section fullWidth>
  <h2>Section Title</h2>
  <p>Section content</p>
</Section>
```

---

### Icon
**Location**: `/components/ui/Icon/`
**Purpose**: SVG icon component

```tsx
interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}
```

**Usage**:
```tsx
<Icon name="menu" size="lg" color="primary" />
```

---

### IconButton
**Location**: `/components/ui/IconButton/`
**Purpose**: Icon with button behavior

```tsx
interface IconButtonProps extends ButtonProps {
  icon: string;
  label: string; // For accessibility
}
```

**Usage**:
```tsx
<IconButton
  icon="menu"
  label="Open menu"
  onClick={toggleMenu}
/>
```

---

### Banner
**Location**: `/components/ui/Banner/`
**Purpose**: Notification/alert messages

```tsx
interface BannerProps {
  type: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
}
```

**Usage**:
```tsx
<Banner type="success" dismissible>
  Operation completed successfully!
</Banner>
```

---

## Template Components

### PageTemplate
**Location**: `/templates/PageTemplate/`
**Purpose**: Base wrapper for all pages

**Features**:
- Consistent padding and margins
- SEO meta tags
- Loading states
- Error boundaries

---

### HeroTemplate
**Location**: `/templates/HeroTemplate/`
**Purpose**: Hero sections with CTA

**Props**:
- Title
- Subtitle
- Background image/gradient
- Call-to-action buttons
- Animation options

---

### GridTemplate
**Location**: `/templates/GridTemplate/`
**Purpose**: Responsive grid layouts

**Props**:
- Column count (responsive)
- Gap sizing
- Item alignment
- Auto-flow options

---

## Component Best Practices

### 1. Props Interface
Always define TypeScript interfaces:
```tsx
interface ComponentProps {
  required: string;
  optional?: boolean;
  children?: React.ReactNode;
}
```

### 2. Default Props
Use destructuring with defaults:
```tsx
function Component({
  variant = 'primary',
  size = 'md'
}: ComponentProps) {
  // ...
}
```

### 3. Forwarding Refs
For interactive components:
```tsx
const Component = React.forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, ref) => {
    return <div ref={ref} {...props}>{children}</div>;
  }
);
```

### 4. Composition
Prefer composition over configuration:
```tsx
// Good
<Card>
  <Card.Header />
  <Card.Body />
</Card>

// Avoid
<Card
  headerText="..."
  bodyText="..."
/>
```

### 5. Accessibility
Always include:
- ARIA labels
- Keyboard support
- Focus indicators
- Screen reader text

### 6. Testing
Each component should have:
- Unit tests (logic)
- Render tests (output)
- Interaction tests (user behavior)
- Visual tests (Storybook)

## Styling Guidelines

### Tailwind Classes
```tsx
// Base styles
const baseStyles = 'px-4 py-2 rounded-lg transition-colors';

// Variant styles
const variantStyles = {
  primary: 'bg-blue-500 text-white hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300'
};

// Size styles
const sizeStyles = {
  sm: 'text-sm px-3 py-1',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3'
};
```

### CSS Modules (when needed)
```css
/* Component.module.css */
.component {
  /* Complex styles not suitable for Tailwind */
}
```

## Component Status

### Production Ready ✅
- Button
- Card
- Section

### In Development 🚧
- Accordion
- Banner
- Icon/IconButton

### Planned 📋
- Modal
- Dropdown
- Form elements
- Table
- Tabs
- Toast notifications