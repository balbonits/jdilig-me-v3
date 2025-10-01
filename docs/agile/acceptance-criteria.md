# Acceptance Criteria

## Global Definition of Done
All work must meet:
- **Code**: TypeScript clean, linted, conventions followed
- **Testing**: Unit tests pass, manual testing complete
- **Performance**: Lighthouse >90, Core Web Vitals pass
- **Accessibility**: WCAG 2.1 AA, keyboard nav, screen reader tested
- **Responsive**: Works 320px+ (mobile/tablet/desktop)
- **Documentation**: Updated as needed

---

## MVP Feature Criteria

### Hero Section (STORY-001)
- Name, title, tagline prominent
- CTAs: View Portfolio, Download Resume
- Responsive, theme-aware, no CLS

### Navigation (STORY-002)
- Mobile hamburger, desktop sticky
- Active state, keyboard accessible
- Skip nav link

### Project Cards (STORY-003)
- Responsive grid, lazy images
- Title, description, tech tags
- Live/GitHub links

### About Page (STORY-005)
- Professional bio, skills matrix
- Education, experience, photo

### Resume (STORY-006)
- PDF download, HTML version
- Analytics tracked

### Contact (STORY-007)
- Email (obfuscated), social links
- Copy email feature

---

## Technical Criteria

### PWA (STORY-011, 012)
- Service worker with offline support
- Manifest with icons, theme colors
- Cache strategies configured

### Performance (STORY-013)
- FCP <1.5s, TTI <3.5s, CLS <0.1
- 3G load <5s, bundle <1MB
- Images optimized (WebP), code split

### Theme Support (STORY-015)
- Dark/light toggle, system preference
- Smooth transitions, saved preference

---

## Enhanced Features

### Search (P1)
- Real-time suggestions, keyboard shortcuts
- Search all content types

### UI Showcase (P1)
- Interactive component demos
- Design system visualization
- Code examples

### Advanced Features (P2-P3)
- Analytics dashboard
- Advanced animations
- Multi-language support

---

## Testing Requirements
- **Browsers**: Chrome, Firefox, Safari, Edge (latest)
- **Devices**: Mobile, tablet, desktop
- **Accessibility**: Screen readers, keyboard nav
- **Performance**: 3G connection, slow devices

---

## Release Checklist

### Pre-Launch
- All P0 complete, no critical bugs
- Performance/accessibility validated
- SEO configured, content reviewed

### Launch
- DNS/SSL configured
- 404 page, monitoring active
- Sitemap submitted

### Post-Launch
- Monitor analytics and performance
- Collect feedback, iterate