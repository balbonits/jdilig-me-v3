# UI Component Library

Bootstrap-inspired React components built with TypeScript, Tailwind CSS v4, and modern best practices.

## Overview

A complete set of production-ready UI components following our project conventions:
- **TypeScript** - Full type safety with exported interfaces
- **Tailwind CSS v4** - Modern utility-first styling
- **BEM Naming** - Clean, maintainable CSS architecture
- **CSS Modules** - Scoped styles with `@apply` pattern
- **Mobile-First** - Responsive design from the ground up
- **Dark Mode** - Automatic theme support
- **Accessibility** - Semantic HTML and ARIA attributes

## Installation

All components are available from `@components/ui`:

```tsx
import { Button, Card, Modal } from '@components/ui';
```

## Components

### Button & ButtonGroup

Interactive button component with multiple variants and sizes.

**Props:**
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  outline?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}
```

**Usage:**
```tsx
<Button variant="primary" size="md">Click Me</Button>
<Button variant="danger" outline>Delete</Button>
<Button variant="success" disabled>Processing...</Button>

<ButtonGroup>
  <Button variant="primary">Left</Button>
  <Button variant="primary">Middle</Button>
  <Button variant="primary">Right</Button>
</ButtonGroup>
```

---

### Badge

Small status indicators and labels.

**Props:**
```tsx
interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  pill?: boolean;
  children: ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
<Badge variant="primary">New</Badge>
<Badge variant="success" pill>Active</Badge>
<Badge variant="warning">⚠️ Beta</Badge>
```

---

### Alert

Contextual feedback messages.

**Props:**
```tsx
interface AlertProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  dismissible?: boolean;
  onDismiss?: () => void;
  children: ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
<Alert variant="success">Operation completed successfully!</Alert>
<Alert variant="danger" dismissible onDismiss={() => console.log('dismissed')}>
  An error occurred. Please try again.
</Alert>
```

---

### Card

Flexible content container with header and footer.

**Props:**
```tsx
interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
<Card
  header={<h2>Card Title</h2>}
  footer={<Button variant="primary">Action</Button>}
>
  <p>Card content goes here...</p>
</Card>
```

---

### Modal

Dialog overlay with backdrop and controls.

**Props:**
```tsx
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  footer?: ReactNode;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
```

**Usage:**
```tsx
const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="My Modal"
  size="md"
  footer={
    <>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="primary">Save</Button>
    </>
  }
>
  <p>Modal content...</p>
</Modal>
```

**Features:**
- ESC key to close
- Click outside to close
- Scrollable body
- Size variants: sm (384px), md (512px), lg (640px), xl (768px)

---

### Nav & Navbar

Navigation components for tabs, pills, and top bars.

**Nav Props:**
```tsx
interface NavProps {
  variant?: 'tabs' | 'pills';
  items: NavItem[];
  vertical?: boolean;
  className?: string;
}

interface NavItem {
  label: string;
  active?: boolean;
  onClick?: () => void;
  href?: string;
}
```

**Navbar Props:**
```tsx
interface NavbarProps {
  brand?: ReactNode;
  children: ReactNode;
  fixed?: 'top' | 'bottom';
  dark?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
// Tabs navigation
<Nav
  variant="tabs"
  items={[
    { label: 'Home', active: true, href: '/' },
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
  ]}
/>

// Top navbar
<Navbar brand={<img src="/logo.png" alt="Logo" />} dark>
  <Button variant="light">Login</Button>
</Navbar>
```

---

### Pagination

Page navigation with customizable options.

**Props:**
```tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisible?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Usage:**
```tsx
const [page, setPage] = useState(1);

<Pagination
  currentPage={page}
  totalPages={20}
  onPageChange={setPage}
  showFirstLast
  maxVisible={5}
  size="md"
/>
```

**Features:**
- Smart ellipsis truncation
- First/Last buttons (optional)
- Prev/Next navigation
- Disabled states

---

### Tooltip

Hoverable tooltip with directional placement.

**Props:**
```tsx
interface TooltipProps {
  content: string | ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactNode;
  className?: string;
}
```

**Usage:**
```tsx
<Tooltip content="This is a tooltip" placement="top">
  <button>Hover me</button>
</Tooltip>

<Tooltip content={<span>Custom <strong>content</strong></span>} placement="right">
  <span>Info</span>
</Tooltip>
```

---

### ListGroup

Styled list with active states and badges.

**Props:**
```tsx
interface ListGroupProps {
  items: ListGroupItem[];
  flush?: boolean;
  className?: string;
}

interface ListGroupItem {
  label: string | ReactNode;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: () => void;
  badge?: string | ReactNode;
}
```

**Usage:**
```tsx
<ListGroup
  items={[
    { label: 'Home', href: '/', active: true },
    { label: 'Projects', href: '/projects', badge: '12' },
    { label: 'Settings', onClick: () => console.log('clicked') },
    { label: 'Disabled', disabled: true },
  ]}
/>
```

---

### Dropdown

Toggleable dropdown menu.

**Props:**
```tsx
interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  className?: string;
}

interface DropdownItem {
  label: string | ReactNode;
  onClick?: () => void;
  href?: string;
  divider?: boolean;
  disabled?: boolean;
}
```

**Usage:**
```tsx
<Dropdown
  trigger={<Button variant="primary">Menu</Button>}
  items={[
    { label: 'Profile', onClick: () => console.log('Profile') },
    { label: 'Settings', href: '/settings' },
    { divider: true },
    { label: 'Logout', onClick: () => console.log('Logout') },
  ]}
  placement="bottom-end"
/>
```

**Features:**
- Click outside to close
- ESC key to close
- Divider support
- Disabled items

---

### InputGroup

Input with prepend/append addons.

**Props:**
```tsx
interface InputGroupProps {
  prepend?: ReactNode;
  append?: ReactNode;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Usage:**
```tsx
<InputGroup prepend="$" size="md">
  <input type="number" placeholder="0.00" />
</InputGroup>

<InputGroup append={<Button variant="primary">Search</Button>}>
  <input type="text" placeholder="Search..." />
</InputGroup>

<InputGroup prepend={<MagnifyingGlassIcon />} append=".com">
  <input type="text" placeholder="domain" />
</InputGroup>
```

---

### Section

Layout container for organizing page sections.

**Props:**
```tsx
interface SectionProps {
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  children: ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'dark';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  containerWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  centered?: boolean;
  className?: string;
}
```

**Usage:**
```tsx
<Section
  title="Features"
  subtitle="What makes us different"
  variant="primary"
  spacing="lg"
  containerWidth="lg"
  centered
>
  <div>Section content...</div>
</Section>
```

**Features:**
- Background variants: default (white), primary (blue), secondary (gray), dark
- Spacing variants: none, sm, md, lg, xl
- Container widths: sm (640px), md (768px), lg (1024px), xl (1280px), full
- Optional centered headers
- Semantic `<section>` element

---

## Design Principles

### BEM Naming
All components use BEM (Block Element Modifier) naming:
```css
.component { }
.component__element { }
.component__element--modifier { }
```

### CSS Modules with @apply
Clean JSX with utility classes in CSS:
```tsx
// ✅ Good
<div className={styles['card']}>

// ❌ Bad
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
```

### Mobile-First
Base styles for mobile, progressive enhancement:
```css
.component {
  @apply p-4; /* mobile */
}

@media (min-width: 768px) {
  .component {
    @apply p-6; /* tablet+ */
  }
}
```

### Dark Mode
Automatic theme switching:
```css
.component {
  @apply bg-white text-gray-900;
}

@media (prefers-color-scheme: dark) {
  .component {
    @apply bg-gray-800 text-gray-100;
  }
}
```

## TypeScript Support

All components export their prop interfaces:

```tsx
import { ButtonProps, CardProps, ModalProps } from '@components/ui';

// Use types in your components
const MyButton: React.FC<ButtonProps> = (props) => <Button {...props} />;
```

## Customization

All components accept a `className` prop for custom styling:

```tsx
<Button variant="primary" className="custom-button">
  Custom Styled
</Button>
```

---

**Built with ❤️ using React 18, TypeScript 5.6, Tailwind CSS v4, and Vite 6**
