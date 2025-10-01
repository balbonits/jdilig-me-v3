# Shared Wireframe Components Library

This directory contains reusable components for all wireframe pages, ensuring consistency across the site.

## Quick Start

To create a new wireframe page:

1. Copy `template.html` to `/docs/screens/wires/[pagename].html`
2. Replace all `[PAGE TITLE]`, `[PAGE_NAME]` placeholders
3. Add your page-specific content
4. The header and footer will load automatically

## Files

### Core Components

- **`components.css`** - Shared styles for header, footer, and responsive layouts
- **`components.js`** - JavaScript for mobile menu and navigation
- **`header.html`** - Site header with responsive navigation
- **`footer.html`** - Site footer with links
- **`template.html`** - Starter template for new pages

### CSS Classes

#### Layout Classes

- `.content-row` - Responsive row container
- `.content-col` - Column within a row
- `.col-3` - 25% width (desktop)
- `.col-4` - 33.33% width (desktop)
- `.col-6` - 50% width (desktop)
- `.col-8` - 66.66% width (desktop)

#### Responsive Utilities

**Mobile (< 768px)**
- `.mobile-hide` - Hide on mobile
- `.mobile-full` - Full width on mobile
- `.mobile-center` - Center text on mobile

**Tablet (768px - 1023px)**
- `.tablet-hide` - Hide on tablet
- `.tablet-full` - Full width on tablet

**Desktop (≥ 1024px)**
- `.desktop-show` - Show only on desktop
- `.desktop-inline` - Inline buttons on desktop

## Usage Examples

### Basic Page Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Page - jdilig.me</title>
    <link rel="stylesheet" href="../libs/wf.css">
    <link rel="stylesheet" href="../shared/components.css">
</head>
<body class="wf">
    <!-- Header loads here -->
    <div id="site-header"></div>

    <!-- Your content -->
    <main class="page-content">
        <div class="wf-ctr">
            <!-- Page content -->
        </div>
    </main>

    <!-- Footer loads here -->
    <div id="site-footer"></div>

    <script src="../shared/components.js"></script>
    <script>
        // Load components
        fetch('../shared/header.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('site-header').innerHTML = html;
                initMobileMenu();
            });

        fetch('../shared/footer.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('site-footer').innerHTML = html;
            });
    </script>
</body>
</html>
```

### Responsive Content Layout

```html
<!-- Single column on mobile/tablet, two columns on desktop -->
<div class="content-row">
    <div class="content-col col-8">
        <!-- Main content -->
    </div>
    <div class="content-col col-4 tablet-hide desktop-show">
        <!-- Sidebar (hidden on tablet) -->
    </div>
</div>
```

### Setting Active Navigation

```javascript
// Set which nav item is active
WireframeComponents.setActiveNavItem('About');
```

## Responsive Behavior

### Mobile (< 768px)
- Hamburger menu navigation
- Single column layout
- Full-width buttons
- Stacked footer

### Tablet (768px - 1023px)
- Horizontal navigation (like desktop)
- Single column content (like mobile)
- Multi-column footer (like desktop)
- Full-width buttons for touch

### Desktop (≥ 1024px)
- Horizontal navigation
- Multi-column layouts
- Inline buttons
- Full feature display

## JavaScript API

The `WireframeComponents` object provides:

- `openMobileMenu()` - Open mobile navigation
- `closeMobileMenu()` - Close mobile navigation
- `setActiveNavItem(pageName)` - Set active nav item
- `isMobile()` - Check if mobile viewport
- `isTablet()` - Check if tablet viewport
- `isDesktop()` - Check if desktop viewport

## Creating New Pages

1. **Start with the template:**
   ```bash
   cp shared/template.html wires/newpage.html
   ```

2. **Update placeholders:**
   - Replace `[PAGE TITLE]` with your page title
   - Replace `[PAGE_NAME]` with nav item name
   - Update meta description

3. **Add content:**
   - Use `.content-row` and `.content-col` for layouts
   - Apply responsive utilities as needed
   - Keep mobile-first approach

4. **Test responsiveness:**
   - Check all three viewports
   - Verify navigation works
   - Test mobile menu

## Best Practices

1. **Mobile-First:** Design for mobile, enhance for larger screens
2. **Consistent Spacing:** Use wf utility classes (`.wf-p4`, `.wf-mt3`, etc.)
3. **Semantic HTML:** Use proper heading hierarchy and landmarks
4. **Accessibility:** Include ARIA labels and keyboard navigation
5. **Performance:** Keep it simple - these are wireframes, not final designs

## Component Updates

When updating shared components:

1. Test changes across all existing wireframes
2. Update this documentation
3. Verify all responsive breakpoints
4. Check mobile menu functionality

## Need Help?

- Check existing wireframes for examples
- Review the wf.css documentation
- Test in the viewer at different viewport sizes