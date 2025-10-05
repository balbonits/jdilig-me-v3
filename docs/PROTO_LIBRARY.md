# Proto Component Library

A lightweight, custom proto component library for building wireframe diagrams and mockups.

## Overview

The proto library provides reusable React components for creating prototypes without external dependencies. Built with TypeScript, Tailwind CSS v4, and following BEM + @apply patterns.

**Location:** `src/components/proto/`

**Organization:**
- `base/` - Root container components
- `layout/` - Layout and structure components
- `content/` - Content and UI element components
- `composed/` - Complex pre-composed components

## Installation

Components are already installed. Import from the proto barrel:

```tsx
import { ProtoBox, ProtoButton, ProtoIcon } from '@components/proto';
import { HomeIcon } from '@heroicons/react/24/outline';
```

## Component Categories

### Base Components

#### Proto

Root container for all proto files. Provides base structure for prototypes.

**Props:**
- `children?: ReactNode` - Child components
- `direction?: 'column' | 'row'` - Layout direction (default: `'column'`)
- `className?: string | string[]` - Additional CSS classes (supports BEM array pattern)

**Example:**
```tsx
import { Proto, ProtoSection } from '@components/proto';

<Proto direction="column">
  <ProtoSection>Content here</ProtoSection>
</Proto>
```

---

### Layout Components

#### ProtoBox

Container component for boxes and sections.

**Props:**
- `width?: string` - Width (default: `'100%'`)
- `height?: string` - Height (default: `'200px'`)
- `label?: string` - Label text displayed in top-left corner
- `variant?: 'solid' | 'dashed' | 'dotted'` - Border style (default: `'dashed'`)
- `children?: ReactNode` - Child components
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoBox width="400px" height="300px" label="Hero Section" variant="dashed">
  <ProtoText lines={2} variant="heading" />
</ProtoBox>
```

---

#### ProtoSection

Flex layout sections for organizing proto content.

**Props:**
- `children?: ReactNode` - Child components
- `layout?: 'center' | 'left' | 'right' | 'grid' | 'flex'` - Layout type (default: `'flex'`)
- `align?: 'start' | 'center' | 'end'` - Align items (default: `'start'`)
- `justify?: 'start' | 'center' | 'end' | 'between'` - Justify content (default: `'start'`)
- `gap?: 'sm' | 'md' | 'lg'` - Gap between items (default: `'md'`)
- `padding?: 'sm' | 'md' | 'lg'` - Padding (default: `'md'`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoSection layout="center" padding="lg" gap="md">
  <ProtoText lines={1} variant="heading" />
  <ProtoButton label="Click me" />
</ProtoSection>
```

---

#### ProtoGrid

Grid layout component with mobile-first responsive columns.

**Props:**
- `children?: ReactNode` - Child components
- `cols?: '1' | '2' | '3' | '4'` - Number of columns (default: `'1'`)
- `gap?: 'sm' | 'md' | 'lg'` - Gap between items (default: `'md'`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoGrid cols="3" gap="lg">
  <ProtoCard title="Card 1" />
  <ProtoCard title="Card 2" />
  <ProtoCard title="Card 3" />
</ProtoGrid>
```

---

#### ProtoFlex

Flexbox layout component for flexible arrangements.

**Props:**
- `children?: ReactNode` - Child components
- `direction?: 'row' | 'col'` - Flex direction (default: `'row'`)
- `align?: 'start' | 'center' | 'end'` - Align items (default: `'start'`)
- `justify?: 'start' | 'center' | 'end' | 'between'` - Justify content (default: `'start'`)
- `wrap?: boolean` - Enable flex wrap (default: `false`)
- `gap?: 'sm' | 'md' | 'lg'` - Gap between items (default: `'md'`)
- `shrink?: boolean` - Allow flex shrink (default: `false`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoFlex direction="row" justify="between" align="center" gap="md">
  <ProtoButton label="Cancel" variant="outline" />
  <ProtoButton label="Submit" variant="primary" />
</ProtoFlex>
```

---

#### ProtoList

List container with type and variant options.

**Props:**
- `children?: ReactNode` - ProtoListItem components
- `type?: 'unordered' | 'ordered' | 'plain'` - List type (default: `'unordered'`)
- `variant?: 'default' | 'disc' | 'decimal' | 'alpha' | 'roman' | 'none'` - List style (default: `'default'`)
- `gap?: 'sm' | 'md' | 'lg'` - Gap between items (default: `'sm'`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoList type="ordered" variant="decimal">
  <ProtoListItem>First item</ProtoListItem>
  <ProtoListItem>Second item</ProtoListItem>
</ProtoList>
```

---

#### ProtoListItem

Individual list item component.

**Props:**
- `children?: ReactNode` - Item content
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoList type="unordered">
  <ProtoListItem>Dashboard</ProtoListItem>
  <ProtoListItem>Settings</ProtoListItem>
  <ProtoListItem>Profile</ProtoListItem>
</ProtoList>
```

---

### Content Components

#### ProtoText

Placeholder text lines for paragraphs and headings.

**Props:**
- `lines?: number` - Number of text lines (default: `3`)
- `variant?: 'heading' | 'paragraph' | 'caption'` - Text style (default: `'paragraph'`)
- `width?: string` - Width (default: auto)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoText lines={1} variant="heading" />
<ProtoText lines={5} variant="paragraph" />
<ProtoText lines={1} variant="caption" width="60%" />
```

---

#### ProtoButton

Button placeholder with optional icons.

**Props:**
- `label?: string` - Button text (default: `'Button'`)
- `variant?: 'primary' | 'secondary' | 'outline'` - Button style (default: `'primary'`)
- `size?: 'sm' | 'md' | 'lg'` - Button size (default: `'md'`)
- `icon?: ComponentType<SVGProps<SVGSVGElement>>` - Heroicon component
- `iconPosition?: 'left' | 'right'` - Icon placement (default: `'left'`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
import { HomeIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

<ProtoButton label="Home" icon={HomeIcon} variant="primary" size="md" />
<ProtoButton label="Next" icon={ArrowRightIcon} iconPosition="right" variant="outline" />
```

---

#### ProtoImage

Image placeholder with icon and optional label.

**Props:**
- `width?: string` - Width (default: `'100%'`)
- `height?: string` - Height (default: `'300px'`)
- `label?: string` - Label text displayed at bottom
- `icon?: ComponentType<SVGProps<SVGSVGElement>>` - Heroicon to display in center
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
import { PhotoIcon } from '@heroicons/react/24/outline';

<ProtoImage width="600px" height="400px" label="Hero Image" icon={PhotoIcon} />
```

---

#### ProtoIcon

Icon proto component using Heroicons.

**Props:**
- `icon: ComponentType<SVGProps<SVGSVGElement>>` - Heroicon component (required)
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Icon size (default: `'md'`)
- `label?: string` - Label text below icon
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
import { Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';

<ProtoIcon icon={Cog6ToothIcon} size="lg" label="Settings" />
<ProtoIcon icon={UserIcon} size="md" />
```

---

#### ProtoBadge

Badge component for labels and tags.

**Props:**
- `text?: string` - Badge text content
- `label?: string` - Alternative to text prop
- `variant?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'` - Badge style (default: `'default'`)
- `size?: 'sm' | 'md' | 'lg'` - Badge size (default: `'md'`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoBadge text="New" variant="primary" size="sm" />
<ProtoBadge label="Beta" variant="info" />
```

---

#### ProtoAvatar

Avatar placeholder component.

**Props:**
- `size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'` - Avatar size (default: `'md'`)
- `shape?: 'circle' | 'square'` - Avatar shape (default: `'circle'`)
- `hasStatus?: boolean` - Show status indicator (default: `false`)
- `label?: string` - Initials to display
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoAvatar size="lg" shape="circle" hasStatus={true} label="JD" />
```

---

#### ProtoMedia

Media player placeholder for video/audio/embed content.

**Props:**
- `type?: 'video' | 'audio' | 'embed'` - Media type (default: `'video'`)
- `aspect?: '16:9' | '4:3' | '1:1' | '21:9'` - Aspect ratio (default: `'16:9'`)
- `controls?: boolean` - Show controls (default: `true`)
- `icon?: ComponentType<SVGProps<SVGSVGElement>>` - Custom icon
- `label?: string` - Label text
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
import { PlayIcon } from '@heroicons/react/24/outline';

<ProtoMedia type="video" aspect="16:9" controls={true} icon={PlayIcon} />
<ProtoMedia type="audio" label="Podcast Episode" />
```

---

#### ProtoInput

Form input placeholder covering all HTML input types.

**Props:**
- `type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time' | 'datetime-local' | 'file' | 'color' | 'range' | 'checkbox' | 'textarea'` - Input type (default: `'text'`)
- `size?: 'sm' | 'md' | 'lg'` - Input size (default: `'md'`)
- `placeholder?: string` - Placeholder text
- `label?: string` - Input label
- `disabled?: boolean` - Disabled state (default: `false`)
- `error?: boolean` - Error state (default: `false`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoInput type="email" label="Email Address" placeholder="john@example.com" />
<ProtoInput type="password" label="Password" />
<ProtoInput type="textarea" label="Message" />
```

---

#### ProtoRadio & ProtoRadioGroup

Radio button components for form selections.

**ProtoRadioGroup Props:**
- `children?: ReactNode` - ProtoRadio components
- `label?: string` - Group label
- `className?: string | string[]` - Additional CSS classes

**ProtoRadio Props:**
- `label?: string` - Radio label
- `checked?: boolean` - Checked state (default: `false`)
- `disabled?: boolean` - Disabled state (default: `false`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoRadioGroup label="Choose an option">
  <ProtoRadio label="Option 1" checked={true} />
  <ProtoRadio label="Option 2" />
  <ProtoRadio label="Option 3" disabled={true} />
</ProtoRadioGroup>
```

---

#### ProtoLoadingSpinner

Loading state component with multiple animation variants.

**Props:**
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Spinner size (default: `'md'`)
- `variant?: 'spin' | 'pulse' | 'bounce' | 'dots'` - Animation style (default: `'spin'`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoLoadingSpinner size="lg" variant="spin" />
<ProtoLoadingSpinner variant="dots" />
```

---

### Composed Components

#### ProtoNav

Navigation bar proto.

**Props:**
- `items?: string[]` - Nav item labels (default: `['Item 1', 'Item 2', 'Item 3']`)
- `position?: 'top' | 'bottom'` - Nav position (default: `'top'`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoNav items={['Home', 'About', 'Projects', 'Contact']} position="top" />
```

---

#### ProtoSidebar

Sidebar proto.

**Props:**
- `items?: string[]` - Sidebar item labels (default: `['Item 1', 'Item 2', 'Item 3']`)
- `position?: 'left' | 'right'` - Sidebar position (default: `'left'`)
- `width?: string` - Sidebar width (default: `'200px'`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoSidebar
  items={['Dashboard', 'Settings', 'Profile']}
  position="left"
  width="250px"
/>
```

---

#### ProtoCard

Pre-composed card layout with image, text, and optional button.

**Props:**
- `title?: string` - Card title (shown on image)
- `image?: ReactNode` - Custom image element
- `imageHeight?: string` - Image height (default: `'150px'`)
- `description?: ReactNode` - Custom description element
- `textLines?: number` - Number of text lines (default: `3`)
- `button?: ReactNode` - Custom button element
- `hasButton?: boolean` - Show action button (default: `false`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoCard
  title="Blog Post"
  imageHeight="200px"
  textLines={4}
  hasButton={true}
/>
```

---

#### ProtoHero

Hero/media banner component for prominent page sections.

**Props:**
- `children?: ReactNode` - Hero content
- `height?: 'sm' | 'md' | 'lg' | 'full'` - Hero height (default: `'md'`)
- `background?: 'solid' | 'gradient' | 'image'` - Background style (default: `'solid'`)
- `align?: 'left' | 'center' | 'right'` - Content alignment (default: `'center'`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoHero height="lg" background="gradient" align="center">
  <ProtoText lines={1} variant="heading" />
  <ProtoButton label="Get Started" variant="primary" />
</ProtoHero>
```

---

#### ProtoTooltip

Tooltip component with multiple positioning options.

**Props:**
- `content?: string | ReactNode` - Tooltip content
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Tooltip position (default: `'top'`)
- `children?: ReactNode` - Trigger element
- `show?: boolean` - Force show/hide (default: auto on hover)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoTooltip content="Click to save" position="top">
  <ProtoButton label="Save" />
</ProtoTooltip>
```

---

#### ProtoTable

Table proto component.

**Props:**
- `rows?: number` - Number of rows (default: `5`)
- `cols?: number` - Number of columns (default: `4`)
- `hasHeader?: boolean` - Show header row (default: `true`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoTable rows={6} cols={5} hasHeader={true} />
```

---

#### ProtoForm

Form proto component.

**Props:**
- `fields?: number` - Number of form fields (default: `3`)
- `hasSubmit?: boolean` - Show submit button (default: `true`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoForm fields={5} hasSubmit={true} />
```

---

#### ProtoModal

Modal dialog proto.

**Props:**
- `isOpen?: boolean` - Modal visibility (default: `false`)
- `title?: string` - Modal title
- `children?: ReactNode` - Modal content
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoModal isOpen={true} title="Confirm Action">
  <ProtoText lines={2} variant="paragraph" />
  <ProtoButton label="Confirm" variant="primary" />
</ProtoModal>
```

---

#### ProtoTabs

Tabbed interface proto.

**Props:**
- `tabs?: string[]` - Tab labels (default: `['Tab 1', 'Tab 2', 'Tab 3']`)
- `activeTab?: number` - Active tab index (default: `0`)
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
<ProtoTabs tabs={['Overview', 'Details', 'Settings']} activeTab={0} />
```

---

#### ProtoViewport

Responsive viewport switcher for previewing protos at different screen sizes.

**Props:**
- `children: ReactNode` - Proto content (required)
- `defaultView?: 'mobile' | 'tablet' | 'desktop'` - Initial viewport (default: `'desktop'`)
- `className?: string | string[]` - Additional CSS classes

**Viewport Sizes:**
- Mobile: 375px
- Tablet: 768px
- Desktop: 1440px

**Example:**
```tsx
<ProtoViewport defaultView="mobile">
  <ProtoNav items={['Home', 'About']} />
  <ProtoBox height="500px" label="Main Content" />
</ProtoViewport>
```

---

#### ProtoViewer

Proto display container with viewport controls.

**Props:**
- `proto: ReactNode` - Proto component to display (required)
- `title?: string` - Proto title
- `description?: string` - Proto description
- `className?: string | string[]` - Additional CSS classes

**Example:**
```tsx
import { HomepageProto } from '@docs/protos/homepage';

<ProtoViewer
  proto={<HomepageProto />}
  title="Homepage Design"
  description="Main landing page layout"
/>
```

---

## Usage Patterns

### Basic Page Proto

```tsx
import { Proto, ProtoNav, ProtoSidebar, ProtoBox, ProtoText } from '@components/proto';

function PageProto() {
  return (
    <Proto>
      <ProtoNav items={['Home', 'Docs', 'About']} />
      <ProtoFlex direction="row">
        <ProtoSidebar items={['Section 1', 'Section 2']} width="200px" />
        <ProtoBox width="100%" height="600px" label="Main Content">
          <ProtoText lines={1} variant="heading" />
          <ProtoText lines={5} variant="paragraph" />
        </ProtoBox>
      </ProtoFlex>
    </Proto>
  );
}
```

### Responsive Proto

```tsx
import { ProtoViewport, ProtoNav, ProtoBox } from '@components/proto';

function ResponsiveProto() {
  return (
    <ProtoViewport defaultView="mobile">
      <ProtoNav items={['Home', 'About', 'Contact']} />
      <ProtoBox height="400px" label="Hero Section" />
    </ProtoViewport>
  );
}
```

### With Icons and Loading States

```tsx
import { ProtoButton, ProtoIcon, ProtoLoadingSpinner } from '@components/proto';
import { HomeIcon, Cog6ToothIcon, UserIcon } from '@heroicons/react/24/outline';

function IconProto() {
  return (
    <ProtoFlex direction="row" gap="md">
      <ProtoIcon icon={HomeIcon} size="lg" label="Home" />
      <ProtoIcon icon={Cog6ToothIcon} size="lg" label="Settings" />
      <ProtoButton label="Profile" icon={UserIcon} variant="outline" />
      <ProtoLoadingSpinner variant="spin" />
    </ProtoFlex>
  );
}
```

### Complex Form Proto

```tsx
import { Proto, ProtoSection, ProtoInput, ProtoRadioGroup, ProtoRadio, ProtoButton } from '@components/proto';

function FormProto() {
  return (
    <Proto>
      <ProtoSection layout="flex" gap="lg" padding="lg">
        <ProtoInput type="text" label="Full Name" />
        <ProtoInput type="email" label="Email Address" />
        <ProtoRadioGroup label="Subscription Type">
          <ProtoRadio label="Free" checked={true} />
          <ProtoRadio label="Pro" />
          <ProtoRadio label="Enterprise" />
        </ProtoRadioGroup>
        <ProtoButton label="Subscribe" variant="primary" />
      </ProtoSection>
    </Proto>
  );
}
```

---

## BEM Array Pattern

All Proto components support the BEM array pattern for className:

```tsx
// String (traditional)
<ProtoButton className="custom-button" />

// Array (BEM pattern)
<ProtoButton className={['button', 'button--primary', 'button--large']} />

// Mixed with conditionals
<ProtoButton className={[
  'button',
  isActive && 'button--active',
  isPrimary ? 'button--primary' : 'button--secondary'
]} />
```

---

## Features

- ✅ **TypeScript Support**: Full type definitions for all props
- ✅ **Mobile-First**: Responsive design built-in
- ✅ **Dark Mode**: Class-based theming via `.light` and `.dark` parent classes
- ✅ **BEM + @apply**: Clean JSX with Tailwind utilities in CSS modules
- ✅ **BEM Array Pattern**: className accepts both string and string[] formats
- ✅ **Heroicons Integration**: Easy icon usage with Tailwind's official icon library
- ✅ **No Dependencies**: Pure React + CSS (except Heroicons for icons)
- ✅ **Composable**: Build complex protos from simple primitives
- ✅ **Comprehensive**: Covers most HTML elements with Proto equivalents
- ✅ **NO RAW HTML**: All proto files use only Proto components

---

## Design Patterns

### Composition

Build complex protos by composing simple components:

```tsx
// Simple primitives
<ProtoBox>
  <ProtoText />
  <ProtoButton />
</ProtoBox>

// Complex composition
<ProtoViewport>
  <ProtoNav />
  <ProtoFlex direction="row">
    <ProtoSidebar />
    <ProtoBox>
      <ProtoImage />
      <ProtoText />
      <ProtoButton />
    </ProtoBox>
  </ProtoFlex>
</ProtoViewport>
```

### Reusability

Create reusable proto patterns:

```tsx
// Reusable header pattern
function ProtoHeader() {
  return (
    <ProtoBox height="80px" variant="solid">
      <ProtoNav items={['Logo', 'Home', 'About', 'Contact']} />
    </ProtoBox>
  );
}

// Use in multiple protos
<ProtoHeader />
```

### Layout Patterns

Use layout components for structure:

```tsx
// Grid layout
<ProtoGrid cols="3" gap="lg">
  <ProtoCard title="Feature 1" />
  <ProtoCard title="Feature 2" />
  <ProtoCard title="Feature 3" />
</ProtoGrid>

// Flex layout
<ProtoFlex direction="row" justify="between" align="center">
  <ProtoText lines={1} variant="heading" />
  <ProtoButton label="Action" />
</ProtoFlex>

// Section layout
<ProtoSection layout="center" padding="lg">
  <ProtoHero height="lg" background="gradient">
    <ProtoText lines={1} variant="heading" />
  </ProtoHero>
</ProtoSection>
```

---

## Tips

1. **Start with Proto Base**: Always wrap proto files in `<Proto>` component
2. **Use Layout Components**: ProtoSection, ProtoGrid, ProtoFlex replace raw HTML
3. **NO RAW HTML**: Never use `<div>`, `<span>`, etc. in proto files - only Proto components
4. **Use ProtoViewport**: Always wrap protos in ProtoViewport for responsive preview
5. **Label Everything**: Use `label` prop to annotate sections for clarity
6. **Compose Freely**: Mix and match components to build complex layouts
7. **Match Icons**: Use Heroicons that match your intended final design
8. **BEM Array Pattern**: Use array format for className when working with dynamic classes

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

### Base
| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `Proto` | Root container | `direction`, `className` |

### Layout
| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `ProtoBox` | Containers, sections | `width`, `height`, `label`, `variant` |
| `ProtoSection` | Flex sections | `layout`, `align`, `justify`, `gap`, `padding` |
| `ProtoGrid` | Grid layout | `cols`, `gap` |
| `ProtoFlex` | Flexbox layout | `direction`, `align`, `justify`, `wrap`, `gap` |
| `ProtoList` | List container | `type`, `variant`, `gap` |
| `ProtoListItem` | List item | `children` |

### Content
| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `ProtoText` | Placeholder text | `lines`, `variant` |
| `ProtoButton` | Buttons | `label`, `variant`, `size`, `icon` |
| `ProtoImage` | Image placeholders | `width`, `height`, `label`, `icon` |
| `ProtoIcon` | Icons | `icon`, `size`, `label` |
| `ProtoBadge` | Badges/tags | `text`, `variant`, `size` |
| `ProtoAvatar` | Avatars | `size`, `shape`, `hasStatus`, `label` |
| `ProtoMedia` | Media players | `type`, `aspect`, `controls`, `icon` |
| `ProtoInput` | Form inputs | `type`, `size`, `placeholder`, `label` |
| `ProtoRadio` | Radio buttons | `label`, `checked`, `disabled` |
| `ProtoRadioGroup` | Radio groups | `label`, `children` |
| `ProtoLoadingSpinner` | Loading states | `size`, `variant` |

### Composed
| Component | Purpose | Key Props |
|-----------|---------|-----------|
| `ProtoNav` | Navigation bars | `items`, `position` |
| `ProtoSidebar` | Sidebars | `items`, `position`, `width` |
| `ProtoCard` | Cards | `title`, `imageHeight`, `textLines`, `hasButton` |
| `ProtoHero` | Hero sections | `height`, `background`, `align` |
| `ProtoTooltip` | Tooltips | `content`, `position`, `show` |
| `ProtoTable` | Tables | `rows`, `cols`, `hasHeader` |
| `ProtoForm` | Forms | `fields`, `hasSubmit` |
| `ProtoModal` | Modals | `isOpen`, `title` |
| `ProtoTabs` | Tabbed interfaces | `tabs`, `activeTab` |
| `ProtoViewport` | Responsive preview | `defaultView` |
| `ProtoViewer` | Proto display | `proto`, `title`, `description` |

---

## Next Steps

- See example protos in `docs/protos/`
- Browse Heroicons at [heroicons.com](https://heroicons.com)
- Check `CLAUDE.md` for coding standards and patterns
- Review `docs/protos/homepage.tsx` for a complete example
