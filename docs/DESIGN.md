# DESIGN - Site Design Overview

## Design Philosophy
Clean, minimal, and functional design that prioritizes content and user experience over decorative elements.

## Visual Hierarchy
- **Typography-first**: Clear type hierarchy for readability
- **Whitespace**: Generous spacing for breathing room
- **Contrast**: Strong contrast for accessibility
- **Focus states**: Clear interactive element indicators

## Layout System
- **Responsive grid**: Mobile-first approach
- **Container widths**: Consistent max-widths across pages
- **Templates**: Reusable page structures
  - PageTemplate: Standard content pages
  - HeroTemplate: Landing/feature pages
  - GridTemplate: Gallery/portfolio layouts

## Color System
- **Primary**: Blue-600 (#2563eb) - CTAs and primary actions
- **Secondary**: Gray-600 - Secondary actions
- **Background**: White/Gray-50
- **Text**: Gray-900 (primary), Gray-600 (secondary)

## Component Design
- **Modular**: Self-contained, reusable components
- **Variants**: Primary/secondary, sizes (sm/md/lg)
- **States**: Default, hover, active, disabled, loading
- **Accessibility**: ARIA labels, keyboard navigation

## Responsive Strategy
- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+
- Container max-width: 1280px (7xl)

## UX Considerations
See `/docs/ux/` for detailed:
- User research findings
- Style guide specifications
- Design references
- Interaction patterns