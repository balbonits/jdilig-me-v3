# Proto Component Library

A lightweight, custom proto component library for building "proto" diagrams and mockups.

## Overview

The proto library provides reusable React components for creating protos without external dependencies. Built with TypeScript, Tailwind CSS v4, and following BEM + @apply patterns.

**Location:** `src/components/proto/`

## Installation

Components are already installed. Import from the proto barrel:

```tsx
import { WireBox, WireButton, WireIcon } from '@/components/proto';
import { HomeIcon } from '@heroicons/react/24/outline';
```

## Components

### WireBox

Container component for boxes and sections.

**Props:**
- `width?: string` - Width (default: `'100%'`)
- `height?: string` - Height (default: `'200px'`)
- `label?: string` - Label text displayed in top-left corner
- `variant?: 'solid' | 'dashed' | 'dotted'` - Border style (default: `'dashed'`)
- `children?: ReactNode` - Child components
- `className?: string` - Additional CSS classes

**Example:**
```tsx
<WireBox width="400px" height="300px" label="Hero Section" variant="dashed">
  <WireText lines={2} variant="heading" />
</WireBox>
```

---

### WireText

Placeholder text lines for paragraphs and headings.

**Props:**
- `lines?: number` - Number of text lines (default: `3`)
- `variant?: 'heading' | 'paragraph' | 'caption'` - Text style (default: `'paragraph'`)
- `width?: string` - Width (default: auto)
- `className?: string` - Additional CSS classes

**Example:**
```tsx
<WireText lines={1} variant="heading" />
<WireText lines={5} variant="paragraph" />
<WireText lines={1} variant="caption" width="60%" />
```

---

### WireButton

Button placeholder with optional icons.

**Props:**
- `label?: string` - Button text (default: `'Button'`)
- `variant?: 'primary' | 'secondary' | 'outline'` - Button style (default: `'primary'`)
- `size?: 'sm' | 'md' | 'lg'` - Button size (default: `'md'`)
- `icon?: ComponentType<SVGProps<SVGSVGElement>>` - Heroicon component
- `iconPosition?: 'left' | 'right'` - Icon placement (default: `'left'`)
- `className?: string` - Additional CSS classes

**Example:**
```tsx
import { HomeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

<WireButton label="Home" icon={HomeIcon} variant="primary" size="md" />
<WireButton label="Next" icon={ArrowRightIcon} iconPosition="right" variant="outline" />
```

---

### WireImage

Image placeholder with icon and optional label.

**Props:**
- `width?: string` - Width (default: `'100%'`)
- `height?: string` - Height (default: `'300px'`)
- `label?: string` - Label text displayed at bottom
- `className?: string` - Additional CSS classes

**Example:**
```tsx
<WireImage width="600px" height="400px" label="Hero Image" />
```

---

### WireIcon

Icon proto component using Heroicons.

**Props:**
- `icon: ComponentType<SVGProps<SVGSVGElement>>` - Heroicon component (required)
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Icon size (default: `'md'`)
- `label?: string` - Label text below icon
- `className?: string` - Additional CSS classes

**Example:**
```tsx
import { Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';

<WireIcon icon={Cog6ToothIcon} size="lg" label="Settings" />
<WireIcon icon={UserIcon} size="md" />
```

---

### WireNav

Navigation bar proto.

**Props:**
- `items?: string[]` - Nav item labels (default: `['Item 1', 'Item 2', 'Item 3']`)
- `position?: 'top' | 'bottom'` - Nav position (default: `'top'`)
- `className?: string` - Additional CSS classes

**Example:**
```tsx
<WireNav items={['Home', 'About', 'Projects', 'Contact']} position="top" />
```

---

### WireSidebar

Sidebar proto.

**Props:**
- `items?: string[]` - Sidebar item labels (default: `['Item 1', 'Item 2', 'Item 3']`)
- `position?: 'left' | 'right'` - Sidebar position (default: `'left'`)
- `width?: string` - Sidebar width (default: `'200px'`)
- `className?: string` - Additional CSS classes

**Example:**
```tsx
<WireSidebar
  items={['Dashboard', 'Settings', 'Profile']}
  position="left"
  width="250px"
/>
```

---

### WireCard

Pre-composed card layout with image, text, and optional button.

**Props:**
- `title?: string` - Card title (shown on image)
- `imageHeight?: string` - Image height (default: `'150px'`)
- `textLines?: number` - Number of text lines (default: `3`)
- `hasButton?: boolean` - Show action button (default: `false`)
- `className?: string` - Additional CSS classes

**Example:**
```tsx
<WireCard
  title="Blog Post"
  imageHeight="200px"
  textLines={4}
  hasButton={true}
/>
```

---

### WireViewport

Responsive viewport switcher for previewing protos at different screen sizes.

**Props:**
- `children: ReactNode` - Proto content (required)
- `defaultView?: 'mobile' | 'tablet' | 'desktop'` - Initial viewport (default: `'desktop'`)
- `className?: string` - Additional CSS classes

**Viewport Sizes:**
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

**Example:**
```tsx
<WireViewport defaultView="mobile">
  <WireNav items={['Home', 'About']} />
  <WireBox height="500px" label="Main Content" />
</WireViewport>
```

---

## Usage Patterns

### Basic Page Proto

```tsx
import { WireNav, WireSidebar, WireBox, WireText } from '@/components/proto';

function PageProto() {
  return (
    <>
      <WireNav items={['Home', 'Docs', 'About']} />
      <div className="flex">
        <WireSidebar items={['Section 1', 'Section 2']} width="200px" />
        <WireBox width="100%" height="600px" label="Main Content">
          <WireText lines={1} variant="heading" />
          <WireText lines={5} variant="paragraph" />
        </WireBox>
      </div>
    </>
  );
}
```

### Responsive Proto

```tsx
import { WireViewport, WireNav, WireBox } from '@/components/proto';

function ResponsiveWire() {
  return (
    <WireViewport defaultView="mobile">
      <WireNav items={['Home', 'About', 'Contact']} />
      <WireBox height="400px" label="Hero Section" />
    </WireViewport>
  );
}
```

### With Icons

```tsx
import { WireButton, WireIcon } from '@/components/proto';
import { HomeIcon, Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';

function IconProto() {
  return (
    <div className="flex gap-4">
      <WireIcon icon={HomeIcon} size="lg" label="Home" />
      <WireIcon icon={Cog6ToothIcon} size="lg" label="Settings" />
      <WireButton label="Profile" icon={UserIcon} variant="outline" />
    </div>
  );
}
```

---

## Features

- ✅ **TypeScript Support**: Full type definitions for all props
- ✅ **Mobile-First**: Responsive design built-in
- ✅ **Dark Mode**: Automatic theme switching via `prefers-color-scheme`
- ✅ **BEM + @apply**: Clean JSX with Tailwind utilities in CSS modules
- ✅ **Heroicons Integration**: Easy icon usage with Tailwind's official icon library
- ✅ **No Dependencies**: Pure React + CSS (except Heroicons for icons)
- ✅ **Composable**: Build complex protos from simple primitives

---

## Design Patterns

### Composition

Build complex protos by composing simple components:

```tsx
// Simple primitives
<WireBox>
  <WireText />
  <WireButton />
</WireBox>

// Complex composition
<WireViewport>
  <WireNav />
  <div className="flex">
    <WireSidebar />
    <WireBox>
      <WireImage />
      <WireText />
      <WireButton />
    </WireBox>
  </div>
</WireViewport>
```

### Reusability

Create reusable proto patterns:

```tsx
// Reusable header pattern
function WireHeader() {
  return (
    <WireBox height="80px" variant="solid">
      <WireNav items={['Logo', 'Home', 'About', 'Contact']} />
    </WireBox>
  );
}

// Use in multiple protos
<WireHeader />
```

---

## Tips

1. **Start Simple**: Use primitives (WireBox, WireText) before composed components
2. **Use WireViewport**: Always wrap protos in WireViewport for responsive preview
3. **Label Everything**: Use `label` prop to annotate sections for clarity
4. **Compose Freely**: Mix and match components to build complex layouts
5. **Match Icons**: Use Heroicons that match your intended final design

---

## Integration with Heroicons

All proto components support Heroicons (v2.2). Import from `@heroicons/react`:

```tsx
// Outline icons (24x24)
import { HomeIcon } from '@heroicons/react/24/outline';

// Solid icons (24x24)
import { HomeIcon } from '@heroicons/react/24/solid';

// Small icons (20x20)
import { HomeIcon } from '@heroicons/react/20/solid';

// Micro icons (16x16)
import { HomeIcon } from '@heroicons/react/16/solid';
```

Browse all icons: [heroicons.com](https://heroicons.com)

---

## Component Reference

| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `WireBox` | Containers, sections | `width`, `height`, `label`, `variant` |
| `WireText` | Placeholder text | `lines`, `variant` |
| `WireButton` | Buttons | `label`, `variant`, `size`, `icon` |
| `WireImage` | Image placeholders | `width`, `height`, `label` |
| `WireIcon` | Icons | `icon`, `size`, `label` |
| `WireNav` | Navigation bars | `items`, `position` |
| `WireSidebar` | Sidebars | `items`, `position`, `width` |
| `WireCard` | Cards | `title`, `imageHeight`, `textLines`, `hasButton` |
| `WireViewport` | Responsive preview | `defaultView` |

---

## Next Steps

- See example protos in `/docs/protos/`
- Browse Heroicons at [heroicons.com](https://heroicons.com)
- Check `CLAUDE.md` for coding standards and patterns
