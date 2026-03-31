# Architecture Patterns

**Domain:** Static single-page portfolio (HTML/CSS/JS, no build tools)
**Researched:** 2026-03-30

## Recommended Architecture

Single HTML file with modular CSS and minimal JavaScript. No build step, no bundler, no framework abstraction.

```
index.html
  |-- <link> css/reset.css       (normalize baseline)
  |-- <link> css/tokens.css      (design system custom properties)
  |-- <link> css/layout.css      (grid, sections, responsive)
  |-- <link> css/components.css  (cards, buttons, nav, glass)
  |-- <link> css/animations.css  (keyframes, transitions)
  |-- <script defer> js/main.js  (scroll observer, nav, interactions)
```

### Why Multiple CSS Files (Not One Monolith)

- **Separation of concerns**: tokens vs. layout vs. components is a real architectural boundary
- **Maintainability**: change the color palette without touching layout code
- **Learning value**: demonstrates CSS architecture thinking to anyone reviewing the code
- **No performance penalty**: for a 5-file CSS setup on HTTP/2 (which GitHub Pages uses), the overhead is negligible

### Component Boundaries

| Component | Responsibility | File(s) | Communicates With |
|-----------|---------------|---------|-------------------|
| Design tokens | Color palette, spacing, typography, glass effect values | `tokens.css` | Every other CSS file reads these variables |
| Reset | Normalize browser defaults | `reset.css` | None -- runs first, affects everything |
| Layout | Page grid, section spacing, responsive breakpoints | `layout.css` | Reads tokens for spacing values |
| Components | Cards, buttons, navigation, glassmorphism panels | `components.css` | Reads tokens for colors, spacing, glass values |
| Animations | Keyframes, transitions, scroll-triggered class definitions | `animations.css` | Defines `.visible` class styles; JS adds the class |
| Main script | Intersection Observer, smooth scroll, nav active state | `main.js` | Adds/removes CSS classes on DOM elements |

### Data Flow

```
Page Load:
  Browser loads index.html
    --> Parses CSS files in order (reset -> tokens -> layout -> components -> animations)
    --> Renders initial page (all sections visible, no animations yet)
    --> Loads main.js (deferred -- runs after DOM ready)
    --> main.js sets up Intersection Observer on all [data-animate] elements
    --> As user scrolls, Observer fires --> adds .visible class --> CSS transition plays

User Interaction:
  Click nav link --> smooth scroll to anchor (CSS scroll-behavior: smooth)
  Scroll past section --> Intersection Observer adds .visible class
  Resize window --> CSS media queries handle responsive layout (no JS needed)
```

## Patterns to Follow

### Pattern 1: Token-Driven Design System

**What:** All visual values come from CSS custom properties. No magic numbers in component CSS.
**When:** Always. This is the foundation.

```css
/* tokens.css -- the single source of truth */
:root {
  --color-bg: hsl(270, 15%, 8%);
  --color-surface: hsla(270, 20%, 15%, 0.6);
  --color-accent: hsl(180, 80%, 55%);
  --space-md: 1rem;
  --radius-md: 0.75rem;
  --glass-blur: 12px;
}

/* components.css -- consumes tokens, never hardcodes values */
.card {
  background: var(--color-surface);
  backdrop-filter: blur(var(--glass-blur));
  border-radius: var(--radius-md);
  padding: var(--space-md);
}
```

### Pattern 2: Progressive Enhancement for Animations

**What:** Content is fully visible without JS. Animations are layered on top.
**When:** All scroll-triggered animations.

```css
/* animations.css */
[data-animate] {
  opacity: 1; /* DEFAULT: visible */
}

.js-enabled [data-animate] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.js-enabled [data-animate].visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
// main.js -- only hide elements if JS is running
document.documentElement.classList.add('js-enabled');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### Pattern 3: Semantic Section Structure

**What:** Each portfolio section is a `<section>` with an `id` for anchor navigation.
**When:** Every section on the page.

```html
<header class="site-header">
  <nav>...</nav>
</header>

<main>
  <section id="hero" class="section section--hero">...</section>
  <section id="projects" class="section" data-animate>...</section>
  <section id="skills" class="section" data-animate>...</section>
  <section id="about" class="section" data-animate>...</section>
  <section id="contact" class="section" data-animate>...</section>
</main>

<footer class="site-footer">...</footer>
```

### Pattern 4: BEM-Lite Naming Convention

**What:** Use Block-Element naming for CSS classes, but skip the full BEM modifier syntax in favor of CSS custom properties for variations.
**When:** All CSS class names.

```css
/* Block */
.card { ... }

/* Element */
.card__title { ... }
.card__tags { ... }
.card__link { ... }

/* Variation via custom property override, not BEM modifier */
.card--featured {
  --card-border-color: var(--color-accent);
}
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: ID Selectors for Styling

**What:** Using `#hero { color: red; }` in CSS
**Why bad:** IDs have extremely high specificity, making overrides painful. IDs are fine in HTML for anchor links, but CSS should use classes.
**Instead:** `<section id="hero" class="section section--hero">` -- id for anchors, class for styling.

### Anti-Pattern 2: Inline Styles for Theming

**What:** `style="color: #7c3aed;"` scattered across HTML
**Why bad:** Impossible to maintain, defeats the design system, highest specificity
**Instead:** Use CSS custom properties consumed by classes.

### Anti-Pattern 3: JS-Dependent Content Visibility

**What:** Content hidden by default, only shown when JS runs
**Why bad:** If JS fails to load, users see a blank page. Search engines may not index content.
**Instead:** Progressive enhancement -- content visible by default, JS adds animation layer.

### Anti-Pattern 4: Over-Animating

**What:** Every element has a different animation with staggered delays
**Why bad:** Feels chaotic, hurts performance, annoys repeat visitors
**Instead:** One consistent animation pattern (fade-up) applied uniformly. Let the glassmorphism design carry the visual interest.

### Anti-Pattern 5: CSS File Monolith

**What:** All CSS in one `style.css` file
**Why bad:** At ~500+ lines, becomes hard to navigate and maintain. Changes to colors risk breaking layout rules.
**Instead:** Split by concern: tokens, layout, components, animations. Each file under 200 lines.

## Scalability Considerations

This is a personal portfolio, not a SaaS product. "Scale" here means content growth, not traffic.

| Concern | Now (v1, 3 projects) | Later (v2, 10+ projects) | Much Later (v3) |
|---------|----------------------|--------------------------|-----------------|
| Project cards | Hardcoded HTML cards | Still HTML, but consider a JSON data file + JS templating | Migrate to a static site generator (11ty) if managing 20+ projects |
| Page weight | < 300KB | < 500KB with more images | Paginate or lazy-load project grid |
| CSS complexity | ~5 files, ~400 lines total | ~600 lines, still manageable | Consider CSS layers (`@layer`) for specificity management |
| Navigation | Simple anchor scroll | May need section indicators | Still a single page unless blog is added |
| Maintenance | Edit HTML directly | Edit HTML directly | If editing becomes painful, that is the signal to add a build step |

## Sources

- [CSS Custom Properties Complete Guide](https://devtoolbox.dedyn.io/blog/css-custom-properties-complete-guide) -- token architecture patterns
- [Vanilla JS Scroll Animations with Intersection Observer](https://cheewebdevelopment.com/vanilla-js-scroll-events-animations-with-intersectionobserver-api/) -- progressive enhancement pattern
- [Scroll Animation Techniques 2025](https://mroy.club/articles/scroll-animations-techniques-and-considerations-for-2025) -- performance considerations
- [GitHub Pages Deployment](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) -- hosting architecture
