# Technology Stack

**Project:** Become a Dev -- Portfolio
**Researched:** 2026-03-30

## Recommended Stack

### Core (No Framework -- By Design)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| HTML5 | Current | Semantic structure | Learning exercise -- master fundamentals before frameworks |
| CSS3 | Current | Styling, layout, animations | Custom properties, Grid, Flexbox cover all needs without preprocessors |
| Vanilla JavaScript | ES2022+ | Interactivity, scroll effects | No build step, no dependencies, direct browser execution |

### Design System Tooling

| Technology | Purpose | Why |
|------------|---------|-----|
| CSS Custom Properties | Theming, color palette, spacing scale | Single source of truth for dark theme; change one `--hue` variable to shift the entire palette. No Sass/Less needed |
| CSS Grid + Flexbox | Page layout + component layout | Grid for the overall page sections and project card grid; Flexbox for alignment within cards and nav |
| `backdrop-filter: blur()` | Glassmorphism effect | ~95% browser support as of 2025. Use with `-webkit-` prefix for Safari |
| `@media (prefers-reduced-motion)` | Accessibility | Disable or reduce animations for users who request it |

### Hosting and Deployment

| Technology | Purpose | Why |
|------------|---------|-----|
| GitHub Pages | Static hosting | Free, zero config, demonstrates git workflow, custom domain support |
| GitHub Actions (optional) | Automated deployment | Deploy from `main` branch push; not strictly needed for plain HTML but good practice |
| HTTPS (enforced) | Security | GitHub Pages setting -- toggle on in repo settings |

### Development Tools

| Tool | Purpose | Why |
|------|---------|-----|
| VS Code | Editor | Extensions for HTML/CSS/JS, Live Server for local dev |
| Live Server (VS Code extension) | Local dev server | Hot reload without a build step |
| Google Fonts (self-hosted subset) | Typography | Download and host font files locally to avoid render-blocking external requests |
| Git | Version control | Required for GitHub Pages; commit-per-feature workflow |

### Supporting Libraries

**None.** This is deliberate. The constraint is plain HTML/CSS/JS with zero dependencies. Every effect (glassmorphism, scroll animations, responsive layout) is achievable with modern browser APIs:

| Need | Solution | No Library Needed Because |
|------|----------|--------------------------|
| Scroll animations | Intersection Observer API | Built into all modern browsers, ~15 lines of JS |
| Smooth scrolling | `scroll-behavior: smooth` in CSS | One CSS declaration |
| Dark theme | CSS custom properties + `[data-theme]` attribute | Pure CSS theming, JS only for toggle |
| Responsive layout | CSS Grid + media queries | No Bootstrap or Tailwind needed for a single-page site |
| Glassmorphism cards | `backdrop-filter` + RGBA backgrounds | Pure CSS, well-supported |
| Animations/motion | CSS `@keyframes` + `transition` | CSS handles all visual transitions |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | None (vanilla) | React, Svelte, Astro | Project constraint: learn fundamentals first. A portfolio this size gains nothing from a framework |
| CSS tooling | Custom Properties | Sass/Less | Custom properties are native, dynamic at runtime, and sufficient for a single-page site |
| CSS framework | None | Tailwind, Bootstrap | Adds build complexity and hides the CSS learning. The whole point is to write CSS |
| Animation library | Intersection Observer | AOS, GSAP, Framer Motion | Zero dependencies is a feature. IO API is lightweight and educational |
| Build tool | None | Vite, Webpack, Parcel | No build step needed for plain HTML/CSS/JS. Removes friction, simplifies deployment |
| Font loading | Self-hosted files | Google Fonts CDN | Eliminates render-blocking third-party request; better performance, no privacy concerns |
| Icon library | Inline SVG or CSS | Font Awesome, Heroicons package | A portfolio needs maybe 5-10 icons. Copy SVG markup directly -- no library overhead |

## File Structure

```
become-a-dev/
  index.html          # Single page, all sections
  css/
    reset.css         # Minimal reset (box-sizing, margins)
    tokens.css        # CSS custom properties (colors, spacing, typography)
    layout.css        # Grid, sections, responsive breakpoints
    components.css    # Cards, buttons, nav, glassmorphism
    animations.css    # Keyframes, transitions, scroll-triggered classes
  js/
    main.js           # Scroll observer, nav behavior, theme toggle
  assets/
    fonts/            # Self-hosted font files
    images/           # Project screenshots, profile photo
    icons/            # Inline SVGs or a small sprite
  404.html            # Custom 404 for GitHub Pages
```

## CSS Custom Property Architecture

```css
:root {
  /* Base palette -- HSL for easy manipulation */
  --hue-primary: 270;       /* Purple */
  --hue-accent: 180;        /* Cyan/Teal */

  /* Semantic tokens */
  --color-bg: hsl(var(--hue-primary), 15%, 8%);
  --color-surface: hsla(var(--hue-primary), 20%, 15%, 0.6);
  --color-text: hsl(0, 0%, 92%);
  --color-text-muted: hsl(0, 0%, 60%);
  --color-accent: hsl(var(--hue-accent), 80%, 55%);
  --color-primary: hsl(var(--hue-primary), 60%, 60%);

  /* Glass effect tokens */
  --glass-blur: 12px;
  --glass-bg: hsla(var(--hue-primary), 20%, 15%, 0.25);
  --glass-border: hsla(0, 0%, 100%, 0.08);

  /* Spacing scale (4px base) */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;

  /* Typography */
  --font-body: 'Inter', system-ui, sans-serif;
  --font-heading: 'Space Grotesk', var(--font-body);
}
```

## Browser Support Target

| Browser | Minimum Version | Notes |
|---------|----------------|-------|
| Chrome | 88+ | Full support for all features |
| Firefox | 90+ | Full support |
| Safari | 15+ | Needs `-webkit-backdrop-filter` prefix |
| Edge | 88+ | Chromium-based, matches Chrome |
| Mobile Safari | 15+ | Same as desktop Safari |
| Chrome Android | 88+ | Full support |

**Not supported:** IE11 (dead), Safari < 15 (no `backdrop-filter`). Acceptable tradeoff for a developer portfolio.

## Performance Budget

For a static portfolio on GitHub Pages:

| Metric | Target | How |
|--------|--------|-----|
| First Contentful Paint | < 1.5s | No external requests blocking render; self-hosted fonts |
| Largest Contentful Paint | < 2.5s | Optimize hero image, use `loading="lazy"` on below-fold images |
| Total page weight | < 500KB | No frameworks, no large libraries, compressed images |
| Lighthouse Performance | > 90 | Achievable by default with no-framework approach |

## Installation

```bash
# No installation needed. Clone and open.
git clone https://github.com/[username]/become-a-dev.git
cd become-a-dev

# Local development (pick one):
# Option 1: VS Code Live Server extension (recommended)
# Option 2: Python quick server
python -m http.server 8080

# Option 3: Node quick server (if Node is available)
npx serve .
```

## Sources

- [Glassmorphism Implementation Guide 2025](https://playground.halfaccessible.com/blog/glassmorphism-design-trend-implementation-guide) -- backdrop-filter techniques, performance considerations
- [Dark Glassmorphism UI Trends 2026](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f) -- dark theme glassmorphism patterns
- [Glassmorphism Best Practices - NN/g](https://www.nngroup.com/articles/glassmorphism/) -- accessibility and contrast considerations
- [CSS Custom Properties for Theming](https://ronaldsvilcins.com/2025/03/30/a-practical-guide-to-css-custom-properties-for-theming/) -- HSL-based theming approach
- [CSS Theming in 2025: color-scheme and light-dark()](https://mamutlove.com/en/blog/theming-with-css-in-2025/) -- modern CSS theming techniques
- [Scroll Animations with Intersection Observer](https://cheewebdevelopment.com/vanilla-js-scroll-events-animations-with-intersectionobserver-api/) -- vanilla JS scroll animation patterns
- [GitHub Pages Deployment Guide](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) -- official deployment docs
- [GitHub Pages Best Practices 2025](https://www.theprotec.com/blog/2025/deploying-a-static-site-with-github-pages-best-practices-guide/) -- deployment best practices
