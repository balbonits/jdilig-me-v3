# WF - Wireframe CSS Framework

A lightweight, utility-first CSS framework designed for rapid wireframing and prototyping. Perfect for creating clean, functional mockups and wireframes with minimal markup.

## Quick Start

1. **Include the CSS file:**
   ```html
   <link rel="stylesheet" href="path/to/wf.css">
   ```

2. **Create a basic wireframe:**
   ```html
   <div class="wf">
     <header class="wf-hdr">
       <div class="wf-ctr">
         <div class="wf-nav">
           <a href="#" class="wf-brand">Brand</a>
           <nav class="wf-menu">
             <a href="#" class="wf-link">Home</a>
             <a href="#" class="wf-link">About</a>
           </nav>
         </div>
       </div>
     </header>

     <main class="wf-ctr">
       <div class="wf-card">
         <div class="wf-card-hdr">Card Title</div>
         <div class="wf-card-body">
           <p class="wf-p">Card content goes here</p>
         </div>
       </div>
     </main>
   </div>
   ```

## Class Naming Conventions

### Prefix System
- All classes use the `wf-` prefix to avoid conflicts
- Format: `wf-{component}` or `wf-{component}-{modifier}`

### Common Abbreviations
- `wf-ctr` - Container
- `wf-hdr` - Header
- `wf-nav` - Navigation
- `wf-btn` - Button
- `wf-inp` - Input
- `wf-sel` - Select
- `wf-txt` - Textarea
- `wf-lbl` - Label
- `wf-grp` - Group
- `wf-img` - Image placeholder
- `wf-pri` - Primary
- `wf-sec` - Secondary
- `wf-tc` - Text center
- `wf-tl` - Text left
- `wf-tr` - Text right
- `wf-mb{1-5}` - Margin bottom (1-5)
- `wf-mt{1-5}` - Margin top (1-5)
- `wf-p{1-5}` - Padding (1-5)
- `wf-flow` - Flowchart container
- `wf-flow-node` - Flowchart node
- `wf-flow-arrow` - Flowchart arrow
- `wf-flow-lane` - Swimlane

## Available Components

### Layout
```html
<!-- Container -->
<div class="wf-ctr">Content</div>
<div class="wf-ctr--sm">Small container</div>
<div class="wf-ctr--full">Full width container</div>

<!-- Grid System -->
<div class="wf-row">
  <div class="wf-col wf-c6">Half width</div>
  <div class="wf-col wf-c6">Half width</div>
</div>

<!-- Column classes: wf-c1 through wf-c12 (1-12 columns) -->
```

### Navigation
```html
<!-- Header with Navigation -->
<header class="wf-hdr">
  <div class="wf-nav">
    <a href="#" class="wf-brand">Brand Name</a>
    <nav class="wf-menu">
      <a href="#" class="wf-link">Home</a>
      <a href="#" class="wf-link wf-link--on">Active Link</a>
    </nav>
  </div>
</header>
```

### Cards
```html
<!-- Basic Card -->
<div class="wf-card">
  <div class="wf-card-hdr">Header</div>
  <div class="wf-card-body">Body content</div>
  <div class="wf-card-ftr">Footer</div>
</div>
```

### Buttons
```html
<!-- Button Variants -->
<button class="wf-btn">Default</button>
<button class="wf-btn wf-btn--pri">Primary</button>
<button class="wf-btn wf-btn--sec">Secondary</button>
<button class="wf-btn wf-btn--out">Outline</button>

<!-- Button Sizes -->
<button class="wf-btn wf-btn--sm">Small</button>
<button class="wf-btn wf-btn--lg">Large</button>
<button class="wf-btn wf-btn--full">Full Width</button>
```

### Forms
```html
<!-- Form Elements -->
<div class="wf-grp">
  <label class="wf-lbl">Label</label>
  <input type="text" class="wf-inp" placeholder="Input field">
</div>

<div class="wf-grp">
  <label class="wf-lbl">Select</label>
  <select class="wf-sel">
    <option>Option 1</option>
  </select>
</div>

<div class="wf-grp">
  <label class="wf-lbl">Textarea</label>
  <textarea class="wf-txt" placeholder="Textarea"></textarea>
</div>
```

### Typography
```html
<!-- Headings -->
<h1 class="wf-h1">Main Heading</h1>
<h2 class="wf-h2">Sub Heading</h2>
<h3 class="wf-h3">Section Heading</h3>

<!-- Text -->
<p class="wf-p">Regular paragraph text</p>
<p class="wf-p wf-mute">Muted text</p>
<p class="wf-p wf-sm">Small text</p>
<p class="wf-p wf-lg">Large text</p>
```

### Placeholder Elements
```html
<!-- Animated Loading Boxes -->
<div class="wf-box wf-box--txt"></div>
<div class="wf-box wf-box--title"></div>
<div class="wf-box wf-box--img"></div>
<div class="wf-box wf-box--btn"></div>

<!-- Image Placeholder -->
<div class="wf-img">Image placeholder</div>
```

### Sidebar Layout
```html
<!-- Sidebar + Main Layout -->
<div class="wf-side">
  <nav>Sidebar content</nav>
</div>
<main class="wf-main">
  Main content area
</main>
```

### Flowchart Components
```html
<!-- Basic Flowchart Container -->
<div class="wf-flow">
  <div class="wf-flow-container">
    <!-- Flow nodes go here -->
  </div>
</div>

<!-- Node Types -->
<!-- Start/End Node -->
<div class="wf-flow-node wf-flow-node--start">Start</div>

<!-- Process Node -->
<div class="wf-flow-node wf-flow-node--process">Process Step</div>

<!-- Decision Node (Diamond) -->
<div class="wf-flow-node wf-flow-node--decision">
  <span>Decision?</span>
</div>

<!-- Data Node (Parallelogram) -->
<div class="wf-flow-node wf-flow-node--data">Input/Output</div>

<!-- Subprocess Node (Double Border) -->
<div class="wf-flow-node wf-flow-node--sub">Subprocess</div>

<!-- Arrows and Connectors -->
<div class="wf-flow-arrow"></div> <!-- Vertical arrow -->
<div class="wf-flow-arrow wf-flow-arrow--horizontal"></div> <!-- Horizontal arrow -->

<!-- Complete Flowchart Example -->
<div class="wf-flow">
  <div class="wf-flow-container">
    <div class="wf-flow-node wf-flow-node--start">Start</div>
    <div class="wf-flow-arrow"></div>

    <div class="wf-flow-node wf-flow-node--data">User Input</div>
    <div class="wf-flow-arrow"></div>

    <div class="wf-flow-node wf-flow-node--process">Process Data</div>
    <div class="wf-flow-arrow"></div>

    <div class="wf-flow-node wf-flow-node--decision">
      <span>Valid?</span>
    </div>

    <!-- Branching -->
    <div class="wf-flow-branch">
      <div class="wf-flow-container">
        <span class="wf-flow-label wf-flow-label--top">Yes</span>
        <div class="wf-flow-arrow"></div>
        <div class="wf-flow-node wf-flow-node--process">Save</div>
      </div>
      <div class="wf-flow-container">
        <span class="wf-flow-label wf-flow-label--top">No</span>
        <div class="wf-flow-arrow"></div>
        <div class="wf-flow-node wf-flow-node--process">Error</div>
      </div>
    </div>

    <div class="wf-flow-arrow"></div>
    <div class="wf-flow-node wf-flow-node--end">End</div>
  </div>
</div>

<!-- Swimlane Diagram -->
<div class="wf-flow-swim">
  <div class="wf-flow-lane">
    <div class="wf-flow-lane-title">User</div>
    <div class="wf-flow-node wf-flow-node--process">Submit Request</div>
  </div>
  <div class="wf-flow-lane">
    <div class="wf-flow-lane-title">System</div>
    <div class="wf-flow-node wf-flow-node--process">Validate</div>
  </div>
  <div class="wf-flow-lane">
    <div class="wf-flow-lane-title">Admin</div>
    <div class="wf-flow-node wf-flow-node--process">Approve</div>
  </div>
</div>

<!-- Flow Labels -->
<div class="wf-flow-label wf-flow-label--top">Above</div>
<div class="wf-flow-label wf-flow-label--left">Left</div>
<div class="wf-flow-label wf-flow-label--right">Right</div>

<!-- Connecting Lines (for complex layouts) -->
<div class="wf-flow-line wf-flow-line--h" style="top: 50%; width: 200px;"></div>
<div class="wf-flow-line wf-flow-line--v" style="left: 50%; height: 100px;"></div>
```

### Flowchart Classes Reference
- **Container:** `wf-flow`, `wf-flow-container`, `wf-flow-row`, `wf-flow-branch`
- **Node Types:**
  - `wf-flow-node` - Base node style
  - `wf-flow-node--start` - Rounded start node
  - `wf-flow-node--end` - Rounded end node
  - `wf-flow-node--process` - Rectangle process node
  - `wf-flow-node--decision` - Diamond decision node
  - `wf-flow-node--data` - Parallelogram data/IO node
  - `wf-flow-node--sub` - Double-bordered subprocess
- **Connectors:**
  - `wf-flow-arrow` - Vertical arrow with head
  - `wf-flow-arrow--horizontal` - Horizontal arrow
  - `wf-flow-line--h` - Horizontal line
  - `wf-flow-line--v` - Vertical line
- **Labels:** `wf-flow-label`, `wf-flow-label--top`, `wf-flow-label--left`, `wf-flow-label--right`
- **Swimlanes:** `wf-flow-swim`, `wf-flow-lane`, `wf-flow-lane-title`

## CSS Variables for Customization

### Colors
```css
:root {
  --wf-bg: #fff;        /* Background */
  --wf-surf: #f8f9fa;   /* Surface */
  --wf-brd: #dee2e6;    /* Border */
  --wf-txt: #212529;    /* Text */
  --wf-mute: #6c757d;   /* Muted text */
  --wf-pri: #0d6efd;    /* Primary */
  --wf-sec: #6c757d;    /* Secondary */
  --wf-ok: #198754;     /* Success */
  --wf-err: #dc3545;    /* Error */
  --wf-warn: #ffc107;   /* Warning */
  --wf-info: #0dcaf0;   /* Info */
}
```

### Spacing
```css
:root {
  --wf-xs: 0.25rem;     /* 4px */
  --wf-sm: 0.5rem;      /* 8px */
  --wf-md: 1rem;        /* 16px */
  --wf-lg: 1.5rem;      /* 24px */
  --wf-xl: 2rem;        /* 32px */
  --wf-xxl: 3rem;       /* 48px */
}
```

### Typography & Sizing
```css
:root {
  --wf-font: system-ui, -apple-system, sans-serif;
  --wf-mono: 'SF Mono', monospace;
  --wf-rad: 0.25rem;    /* Border radius */
  --wf-rad-lg: 0.5rem;  /* Large border radius */
}
```

## Creating New Wireframes

### 1. Basic Page Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wireframe</title>
  <link rel="stylesheet" href="path/to/wf.css">
</head>
<body class="wf">
  <!-- Your wireframe content -->
</body>
</html>
```

### 2. Common Patterns

**Hero Section:**
```html
<section class="wf-p5 wf-tc">
  <div class="wf-ctr">
    <div class="wf-box wf-box--title"></div>
    <div class="wf-box wf-box--txt"></div>
    <div class="wf-mt4">
      <div class="wf-box wf-box--btn"></div>
    </div>
  </div>
</section>
```

**Feature Grid:**
```html
<section class="wf-p4">
  <div class="wf-ctr">
    <div class="wf-row">
      <div class="wf-col wf-c4">
        <div class="wf-card">
          <div class="wf-card-body">
            <div class="wf-box wf-box--img"></div>
            <div class="wf-box wf-box--title"></div>
            <div class="wf-box wf-box--txt"></div>
          </div>
        </div>
      </div>
      <!-- Repeat for more columns -->
    </div>
  </div>
</section>
```

### 3. Utility Classes
- **Flexbox:** `wf-flex`, `wf-col`, `wf-cen`, `wf-btw`
- **Gap:** `wf-g1` through `wf-g4`
- **Spacing:** `wf-mt1` through `wf-mt5`, `wf-mb1` through `wf-mb5`, `wf-p1` through `wf-p5`
- **Text Alignment:** `wf-tc`, `wf-tl`, `wf-tr`
- **Display:** `wf-hide`, `wf-show`, `wf-ib`

### 4. Responsive Design
The framework includes mobile-first responsive design:
- Grid columns stack on mobile (< 768px)
- Sidebar becomes hidden on mobile
- Navigation menu collapses on mobile
- Container padding adjusts for smaller screens

### 5. Customization Tips
- Override CSS variables to match your brand colors
- Use the utility classes for quick spacing adjustments
- Combine placeholder boxes with real content as designs evolve
- Layer multiple `wf-box` elements to create complex loading states

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with CSS variable polyfill if needed)
- Mobile browsers

---

*Built for rapid prototyping and wireframing. Keep it simple, keep it fast.*