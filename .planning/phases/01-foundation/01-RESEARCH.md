# Phase 1: Foundation - Research

**Researched:** 2026-03-31
**Domain:** CSS design token architecture, semantic HTML structure, responsive layout (plain HTML/CSS/JS, no build tools)
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FNDN-01 | User sees a dark-themed page with purple/cyan color palette applied consistently via CSS custom properties | Token architecture section covers two-tier token system (primitive + semantic), HSL palette construction, and the `:root` property block that all other CSS consumes |
| FNDN-02 | User sees the page render correctly on mobile, tablet, and desktop viewports | Responsive layout section covers viewport meta tag, mobile-first min-width breakpoints, and CSS Grid `auto-fit/minmax` for framework-free responsiveness |
| FNDN-03 | Page content is readable and accessible without JavaScript (progressive enhancement) | Progressive enhancement section covers the `js-enabled` class gating pattern that keeps all content visible by default and only hides/animates elements once JS confirms it is running |
</phase_requirements>

---

## Summary

Phase 1 is purely infrastructure — no content, no visual effects. The output is a file system, a design token set, a semantic HTML skeleton, and a responsive grid that every subsequent phase builds on. Getting this right is more important than speed: any hardcoded color or structural anti-pattern introduced now will need to be unwound across all later phases.

The technology is well-understood and the prior project research already produced a complete token architecture (`tokens.css`), file split strategy, and progressive enhancement pattern. This phase research validates and extends those findings with specific, implementation-ready detail. There are no surprises here — the main discipline is following the patterns precisely rather than taking shortcuts.

The single most important constraint for this phase: all color values MUST live in `tokens.css` as custom properties. Not a single hex, rgb, or hsl value belongs in `layout.css`, `components.css`, or any HTML attribute. This is the rule FNDN-01 tests, and it is binary — either true or not.

**Primary recommendation:** Write `tokens.css` first, commit it, then build every other file that references it. Tokens are load-bearing; nothing else can be correct without them.

---

## Standard Stack

### Core

| Technology | Version | Purpose | Why Standard |
|------------|---------|---------|--------------|
| HTML5 | Current (living standard) | Semantic page skeleton | Native browser, no dependencies, screen-reader and SEO friendly |
| CSS3 / CSS Custom Properties | Current (widely supported) | Design token system, layout, responsive grid | Replaces Sass/Less for theming; dynamic at runtime; zero build step |
| CSS Grid | Current (full browser support) | Section layout and card grids | `auto-fit/minmax` handles responsive columns with no media queries |
| CSS Flexbox | Current (full browser support) | Within-component alignment (nav, card internals) | Complementary to Grid; Grid for page layout, Flex for component alignment |
| Vanilla JS (ES2022+) | Current | `js-enabled` class, future scroll observer | No build step, direct browser execution |

### Supporting

| Technology | Version | Purpose | When to Use |
|------------|---------|---------|-------------|
| Google Fonts (self-hosted) | Inter + Space Grotesk | Body and heading typography | Download and serve from `/assets/fonts/` — no external request, no render blocking |
| `@media (prefers-reduced-motion)` | CSS standard | Accessibility | Wrap all transition/animation declarations; respects OS-level motion preferences |
| `viewport` meta tag | HTML standard | Responsive rendering on mobile | Required in `<head>` — without it, mobile browsers render at 980px desktop width |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Custom Properties | Sass variables | Sass requires a build step, variables are static at runtime. Custom properties are dynamic and native. |
| Separate CSS files (5 files) | Single `style.css` | A monolith becomes unmaintainable at 400+ lines. Split by concern is the documented architecture. |
| Self-hosted fonts | Google Fonts CDN | CDN adds a render-blocking third-party request and a privacy concern. Self-hosting is faster and cleaner. |
| Mobile-first min-width breakpoints | Desktop-first max-width | Mobile-first forces better defaults and smaller base CSS payload. Industry standard since 2012. |

**Installation:** None. No `npm install`. Clone and open. For local dev:

```bash
# Option 1: Python (no dependencies)
python -m http.server 8080

# Option 2: Node quick server (if Node available)
npx serve .
```

---

## Architecture Patterns

### Recommended Project Structure

```
become-a-dev/
  index.html            # Single HTML file — all sections as <section id="...">
  css/
    reset.css           # Browser default normalization (box-sizing, margins, padding)
    tokens.css          # ALL custom properties — colors, spacing, typography, radius
    layout.css          # Page grid, section spacing, responsive breakpoints
    components.css      # Placeholder stubs for Phase 2+ (nav, card, button)
    animations.css      # Placeholder stubs for Phase 3+ (keyframes, .visible class)
  js/
    main.js             # js-enabled class addition; Intersection Observer in Phase 3
  assets/
    fonts/              # Self-hosted Inter + Space Grotesk WOFF2 files
    images/             # (empty for Phase 1)
    icons/              # (empty for Phase 1)
  404.html              # (empty for Phase 4)
```

**Phase 1 creates:** `index.html`, `css/reset.css`, `css/tokens.css`, `css/layout.css`, `css/components.css` (stub), `css/animations.css` (stub), `js/main.js` (stub with `js-enabled` class), `assets/fonts/`.

**Phase 1 does NOT create:** Real card components, section content, glassmorphism effects, animations, 404.html, deployment config.

### Pattern 1: Two-Tier Token Architecture

**What:** Separate primitive tokens (raw values) from semantic tokens (role-based aliases). Primitives define the palette; semantics define usage.
**When to use:** Always. This is the foundation of FNDN-01.

```css
/* tokens.css */
:root {
  /* === PRIMITIVES: raw palette values === */
  --hue-primary: 270;         /* Purple base hue */
  --hue-accent: 180;          /* Cyan/teal base hue */

  --purple-600: hsl(270, 60%, 60%);
  --purple-900: hsl(270, 15%, 8%);
  --cyan-500: hsl(180, 80%, 55%);
  --white: hsl(0, 0%, 92%);
  --white-muted: hsl(0, 0%, 60%);

  /* === SEMANTIC TOKENS: role-based aliases === */
  /* Colors */
  --color-bg: var(--purple-900);
  --color-surface: hsla(270, 20%, 15%, 0.6);
  --color-text: var(--white);
  --color-text-muted: var(--white-muted);
  --color-primary: var(--purple-600);
  --color-accent: var(--cyan-500);

  /* Glass effect (used in Phase 3, defined here) */
  --glass-blur: 12px;
  --glass-bg: hsla(270, 20%, 15%, 0.25);
  --glass-border: hsla(0, 0%, 100%, 0.08);

  /* Spacing scale (4px base, rem units) */
  --space-xs: 0.25rem;   /*  4px */
  --space-sm: 0.5rem;    /*  8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 2rem;      /* 32px */
  --space-xl: 4rem;      /* 64px */
  --space-2xl: 8rem;     /* 128px */

  /* Typography */
  --font-body: 'Inter', system-ui, sans-serif;
  --font-heading: 'Space Grotesk', var(--font-body);
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-4xl: 2.25rem;
  --leading-tight: 1.2;
  --leading-normal: 1.6;

  /* Border radii */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;
  --radius-full: 9999px;
}
```

**Enforcement rule:** `layout.css`, `components.css`, and `animations.css` MUST reference only `var(--*)` tokens. No hex values, no raw hsl() calls outside `tokens.css`. Grep for `#[0-9a-fA-F]` and raw `hsl(` in non-token files as a verification step.

### Pattern 2: Semantic HTML Page Skeleton

**What:** Single `<main>` element wrapping all `<section>` elements, each with an `id` for anchor navigation and a `class` for styling.
**When to use:** `index.html` structure.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Become a Dev — Portfolio</title>
  <meta name="description" content="[developer name] — learning in public, building in the open" />

  <!-- CSS load order: reset → tokens → layout → components → animations -->
  <link rel="stylesheet" href="css/reset.css" />
  <link rel="stylesheet" href="css/tokens.css" />
  <link rel="stylesheet" href="css/layout.css" />
  <link rel="stylesheet" href="css/components.css" />
  <link rel="stylesheet" href="css/animations.css" />
</head>
<body>

  <header class="site-header">
    <nav class="site-nav" aria-label="Main navigation">
      <!-- Phase 2: nav links -->
    </nav>
  </header>

  <main id="main-content">
    <section id="hero"     class="section section--hero">
      <h1><!-- Phase 2 --></h1>
    </section>
    <section id="projects" class="section" data-animate>
      <h2>Projects</h2>
    </section>
    <section id="skills"   class="section" data-animate>
      <h2>Skills</h2>
    </section>
    <section id="about"    class="section" data-animate>
      <h2>About</h2>
    </section>
    <section id="contact"  class="section" data-animate>
      <h2>Contact</h2>
    </section>
  </main>

  <footer class="site-footer">
    <!-- Phase 2 -->
  </footer>

  <script defer src="js/main.js"></script>
</body>
</html>
```

**Key rules:**
- One `<h1>` per page (in the hero section)
- Section headings are `<h2>` — never skip heading levels
- `id` attributes on sections are for anchor links only; never use `#id` selectors in CSS
- `data-animate` attribute is the JS hook — added now so Phase 3 can target it without touching HTML

### Pattern 3: Mobile-First Responsive Layout

**What:** Base styles target mobile, `min-width` media queries layer on complexity for larger screens.
**When to use:** All layout rules in `layout.css`.

```css
/* layout.css — consumes tokens, never hardcodes values */

/* === Page structure === */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  min-height: 100vh;
}

/* === Section spacing === */
.section {
  padding-block: var(--space-xl);
  padding-inline: var(--space-md);
  max-width: 1200px;
  margin-inline: auto;
}

/* === Responsive grid (used in Phase 2 for cards) === */
/* auto-fit/minmax creates columns automatically — no media queries needed */
.grid {
  display: grid;
  gap: var(--space-lg);
  grid-template-columns: 1fr; /* mobile: single column by default */
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  .section {
    padding-inline: var(--space-lg);
  }
}

@media (min-width: 1024px) {
  .section {
    padding-inline: var(--space-xl);
  }
}
```

**Breakpoints:**
| Name | Min-Width | Targets |
|------|-----------|---------|
| mobile (default) | 0 | Phones, small screens |
| tablet | 640px | Tablets, large phones |
| desktop | 1024px | Laptops, desktops |

### Pattern 4: Progressive Enhancement — js-enabled Gate

**What:** All content visible by default. JS adds a `js-enabled` class to `<html>`, enabling CSS transitions. Without JS, users see everything normally.
**When to use:** `main.js` and `animations.css`.

```javascript
// js/main.js — Phase 1 responsibility: just add the class
document.documentElement.classList.add('js-enabled');

// Phase 3 will add Intersection Observer below this line
```

```css
/* animations.css — Phase 1 creates stub; Phase 3 fills in */

/* Default: everything visible (no JS) */
[data-animate] {
  opacity: 1;
}

/* With JS: hide elements initially, then reveal via .visible class */
.js-enabled [data-animate] {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.js-enabled [data-animate].visible {
  opacity: 1;
  transform: translateY(0);
}

/* Always respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .js-enabled [data-animate] {
    transition: none;
    opacity: 1;
    transform: none;
  }
}
```

**Why this matters for FNDN-03:** If `main.js` fails to load, elements with `data-animate` are fully visible because the `js-enabled` class never gets added. No blank page, no hidden content.

### Pattern 5: Minimal CSS Reset

**What:** A targeted reset that normalizes box-sizing, removes default margins, and ensures images are responsive. Not a full normalize.css.
**When to use:** `reset.css`, first CSS file loaded.

```css
/* reset.css */
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

body {
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* Smooth scrolling (CSS-only, no JS) */
html {
  scroll-behavior: smooth;
}

/* Reduce motion if user prefers */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

### Anti-Patterns to Avoid

- **Hardcoded colors in layout/component CSS:** Any `#7c3aed`, `rgb(`, or `hsl(` outside `tokens.css` fails FNDN-01. Grep for these before committing.
- **ID selectors in CSS:** `#hero { ... }` creates specificity problems. Use `#hero` in HTML for anchors, `.section--hero` in CSS for styling.
- **Inline styles in HTML:** `style="color: purple"` is impossible to maintain and bypasses the token system entirely.
- **Content hidden by default:** Never `display: none` or `opacity: 0` on content outside the `js-enabled` gate pattern. Violates FNDN-03.
- **Missing viewport meta tag:** Without `<meta name="viewport" ...>`, all mobile testing is invalid. This must be in `<head>` before any CSS.
- **CSS load order scrambled:** Reset must load before tokens; tokens before layout; layout before components. Wrong order produces cascade failures that are hard to debug.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Browser default normalization | Custom reset from scratch | The minimal reset pattern above (Pattern 5) | Proven, covers all the real edge cases (box-sizing, image overflow, font inheritance) |
| Responsive columns | JavaScript resize listener | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` | CSS Grid handles this natively with zero JS |
| Smooth scroll | JS scroll handler | `scroll-behavior: smooth` in `reset.css` | One line of CSS, automatically respects `prefers-reduced-motion` |
| Font loading | @import in CSS | `<link>` tag in HTML head with self-hosted WOFF2 | `@import` is render-blocking; `<link>` is non-blocking |
| Theme color propagation | Updating dozens of color declarations | CSS custom properties with semantic tokens | Change one `--hue-primary` value, entire palette updates |

**Key insight:** Modern CSS eliminates the "I need a library for that" problem for layout, theming, and responsive behavior at this project's scale. Every shortcut invites a dependency.

---

## Common Pitfalls

### Pitfall 1: Hardcoded Colors Slipping Through

**What goes wrong:** Developer writes `color: #7c3aed` in `components.css` during a quick fix. Later, the palette changes and that component is missed.
**Why it happens:** It's faster to type a hex value than look up the token name.
**How to avoid:** Define all tokens before writing any other CSS. Run `grep -r "#[0-9a-fA-F]\{3,6\}" css/` (excluding `tokens.css`) as a verification step.
**Warning signs:** Any color value in `layout.css`, `components.css`, or `animations.css` that is not wrapped in `var()`.

### Pitfall 2: Wrong CSS Load Order

**What goes wrong:** `components.css` loaded before `tokens.css` — custom properties are undefined, components render with no color/spacing.
**Why it happens:** Links added in wrong order in `<head>`.
**How to avoid:** The order is fixed: `reset.css → tokens.css → layout.css → components.css → animations.css`. Comment this in `index.html`.
**Warning signs:** Browser shows `var(--color-bg)` literally in DevTools computed styles (indicates unresolved property).

### Pitfall 3: Viewport Meta Tag Missing

**What goes wrong:** Mobile browsers render the page at 980px viewport width, then scale it down. Everything looks tiny and pinched.
**Why it happens:** Forgotten or omitted from `<head>`.
**How to avoid:** `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is the first meta tag after charset. Verify in Chrome DevTools mobile emulation.
**Warning signs:** Phone view shows desktop layout at tiny scale; horizontal scroll appears on mobile.

### Pitfall 4: Heading Hierarchy Skip

**What goes wrong:** Hero has `<h1>`, skills section jumps to `<h3>` because it "looks better." Screen reader navigation is broken.
**Why it happens:** Heading levels chosen for visual size, not semantic meaning.
**How to avoid:** `<h1>` in hero, `<h2>` for all section headings, `<h3>` for subsections within a section. Style with `font-size` tokens, not by choosing a different heading level.
**Warning signs:** Browser accessibility tree (DevTools > Accessibility) shows non-sequential heading levels.

### Pitfall 5: Content Hidden Without JS Gate

**What goes wrong:** Developer adds `opacity: 0` to `.section` in `layout.css` intending to animate it. With JS disabled, all sections are invisible.
**Why it happens:** Animation CSS written without the `js-enabled` gate.
**How to avoid:** All hide/show rules in `animations.css` MUST be scoped to `.js-enabled [data-animate]`. Verify by disabling JS in browser DevTools.
**Warning signs:** Page appears blank with JS disabled (test in Chrome DevTools > Settings > Disable JavaScript).

### Pitfall 6: `<script>` Without `defer`

**What goes wrong:** `<script src="js/main.js">` in `<head>` without `defer` blocks HTML parsing. Page renders slowly.
**Why it happens:** Script tag placed in `<head>` as a habit without the `defer` attribute.
**How to avoid:** Always `<script defer src="js/main.js">`. Either in `<head>` with defer or at end of `<body>`.
**Warning signs:** Chrome DevTools Performance tab shows HTML parsing paused while JS loads.

---

## Code Examples

Verified patterns from the project's prior research and MDN:

### Font Loading (Self-Hosted WOFF2)

```html
<!-- index.html <head> — preload key fonts to reduce FOUT -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<!-- If self-hosting, no preconnect needed. Use: -->
<style>
@font-face {
  font-family: 'Inter';
  src: url('assets/fonts/inter-variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Space Grotesk';
  src: url('assets/fonts/space-grotesk-variable.woff2') format('woff2');
  font-weight: 300 700;
  font-style: normal;
  font-display: swap;
}
</style>
```

Note: Variable fonts (single WOFF2 covering all weights) are strongly preferred — one file, full weight range, better performance. Google Fonts allows downloading variable font subsets via their API.

### Typography Baseline

```css
/* layout.css — sets type scale from tokens */
h1, h2, h3 {
  font-family: var(--font-heading);
  line-height: var(--leading-tight);
  color: var(--color-text);
}

h1 { font-size: clamp(2.5rem, 5vw + 1rem, 4.5rem); }
h2 { font-size: clamp(1.75rem, 3vw + 0.5rem, 2.5rem); }
h3 { font-size: var(--text-xl); }

p {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text-muted);
  max-width: 65ch; /* optimal reading line length */
}
```

`clamp()` for headings eliminates the need for media queries on font sizes — they scale fluidly between mobile and desktop bounds.

### Section Dark Background Application

```css
/* layout.css — confirms FNDN-01 at the page level */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
}

/* Alternate section tinting without hardcoded colors */
.section--alt {
  background-color: hsla(var(--hue-primary), 20%, 12%, 1);
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Sass/Less variables | CSS Custom Properties | CSS3 (widely available since 2017, mature by 2020) | No build step needed for theming |
| Bootstrap grid | CSS Grid + Flexbox | CSS Grid widely supported since 2017 | No framework dependency for responsive layout |
| Google Fonts CDN `<link>` | Self-hosted variable WOFF2 + `@font-face` | 2020-2022 (performance awareness) | Eliminates render-blocking third-party request |
| `normalize.css` (full) | Minimal targeted reset | 2019-2021 | Smaller, predictable, no specificity surprise |
| Fixed px breakpoints | `clamp()` + `auto-fit/minmax` | CSS4 (available 2020+, widespread 2022+) | Fluid scaling between breakpoints without JS |

**Deprecated/outdated:**
- `@import url()` for fonts: render-blocking, replaced by `<link rel="stylesheet">` or `@font-face` in `<head>`
- `normalize.css` full library: overkill for a new project; minimal reset is preferred
- Fixed-width `px` font sizes: `clamp()` and `rem` units are the modern standard
- `float`-based layouts: replaced by Grid/Flexbox entirely

---

## Open Questions

1. **Which specific font subset to download**
   - What we know: Inter + Space Grotesk are the specified fonts; variable font WOFF2 format is best
   - What's unclear: Whether to download all glyphs or subset to Latin only (Latin subset is ~30% smaller)
   - Recommendation: Download Latin subset only from Google Fonts' subsetting API; portfolio is English-only

2. **Heading color variation — should accent color be used on any `<h2>` elements?**
   - What we know: Tokens define both `--color-text` (near-white) and `--color-accent` (cyan)
   - What's unclear: Design calls for "bold typography" but doesn't specify if headings use accent
   - Recommendation: Default all headings to `--color-text` in Phase 1; Phase 2 can override per-section using token overrides, not hardcoded values

3. **`<main>` skip-nav link**
   - What we know: Accessibility best practice is a "skip to main content" link for keyboard/screen reader users
   - What's unclear: Not in requirements, but affects accessibility score
   - Recommendation: Add a visually hidden skip link in Phase 1 (`<a href="#main-content" class="skip-link">Skip to content</a>`) — zero cost, high accessibility value, does not affect visual design

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None — no build tools or test runner. Validation is manual browser checks + CLI linting. |
| Config file | None — see Wave 0 |
| Quick run command | `npx html-validate index.html` (HTML) + `npx stylelint css/*.css` (CSS) |
| Full suite command | Same + browser DevTools manual checks (mobile emulation, JS disabled, accessibility tree) |

No automated test framework exists or is appropriate for this project. Validation is done through:
1. CLI HTML/CSS linters (installed on demand, not as project deps)
2. Browser DevTools manual checks
3. Phase success criteria verification

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FNDN-01 | No hardcoded colors outside `tokens.css` | Lint/grep | `grep -rn "#[0-9a-fA-F]\{3,6\}\|rgb(\|hsl(" css/layout.css css/components.css css/animations.css` | Wave 0: creates CSS files |
| FNDN-01 | Dark background visible in browser | Manual-smoke | Open `index.html` in browser, confirm dark purple background | Wave 0: creates `index.html` |
| FNDN-02 | No layout overflow on mobile (375px) | Manual-smoke | Chrome DevTools > Toggle Device Toolbar > iPhone SE (375px) — no horizontal scroll | Wave 0: creates HTML |
| FNDN-02 | No layout overflow on tablet (768px) | Manual-smoke | Chrome DevTools > iPad Air (820px) | Wave 0: creates HTML |
| FNDN-02 | No layout overflow on desktop (1440px) | Manual-smoke | Chrome DevTools > Laptop L (1440px) | Wave 0: creates HTML |
| FNDN-03 | All content visible with JS disabled | Manual-smoke | Chrome DevTools > Settings > Preferences > Debugger > Disable JavaScript — reload — confirm all sections visible | Wave 0: creates `main.js` with js-enabled gate |
| FNDN-03 | HTML validates (structure correct) | Lint | `npx html-validate index.html` | Wave 0: creates `index.html` |

### Sampling Rate

- **Per task commit:** `grep -rn "#[0-9a-fA-F]\{3,6\}" css/layout.css css/components.css css/animations.css` (hardcoded color check)
- **Per wave merge:** All manual browser checks above
- **Phase gate:** All three FNDN requirements manually verified before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `index.html` — does not exist; Wave 0 creates it
- [ ] `css/reset.css` — does not exist; Wave 0 creates it
- [ ] `css/tokens.css` — does not exist; Wave 0 creates it
- [ ] `css/layout.css` — does not exist; Wave 0 creates it
- [ ] `css/components.css` — stub only; Wave 0 creates it
- [ ] `css/animations.css` — stub only (js-enabled gate); Wave 0 creates it
- [ ] `js/main.js` — stub only (js-enabled class addition); Wave 0 creates it
- [ ] `assets/fonts/` — directory + downloaded font files; Wave 0 creates it
- [ ] Linting install (no persistent dep): `npx html-validate` and `npx stylelint` used ad hoc

---

## Sources

### Primary (HIGH confidence)

- `.planning/research/STACK.md` — Token architecture, file split, browser support table, CSS custom properties example
- `.planning/research/ARCHITECTURE.md` — Pattern 1 (token-driven), Pattern 2 (progressive enhancement), Pattern 3 (semantic structure), Pattern 4 (BEM-lite), anti-patterns
- `.planning/research/SUMMARY.md` — Phase 1 scope rationale, critical pitfalls, risk register

### Secondary (MEDIUM confidence — WebSearch verified against MDN and dev community sources)

- [CSS Custom Properties Complete Guide — DevToolbox](https://devtoolbox.dedyn.io/blog/css-custom-properties-complete-guide) — two-tier token architecture pattern
- [CSS Variables Guide: Design Tokens & Theming — FrontendTools](https://www.frontendtools.tech/blog/css-variables-guide-design-tokens-theming-2025) — primitive + semantic token separation
- [CSS Grid Responsive Design — CodeToDeploy](https://medium.com/codetodeploy/css-grid-responsive-design-the-mobile-first-approach-that-actually-works-194bdab9bc52) — `auto-fit/minmax` mobile-first pattern
- [Responsive Web Design 2025 — M&M Communications](https://mmcommunications.vn/en/responsive-web-design-guide-n589) — breakpoint standards and viewport meta
- [Progressive Enhancement 2025 — DEV Community](https://dev.to/dct_technology/progressive-enhancement-in-2025-is-it-still-relevant-5mo) — `js-enabled` gating pattern relevance
- [Semantic HTML in 2025 — DEV Community](https://dev.to/gerryleonugroho/semantic-html-in-2025-the-bedrock-of-accessible-seo-ready-and-future-proof-web-experiences-2k01) — heading hierarchy and landmark usage
- [Progressive Enhancement — MDN Glossary](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) — authoritative definition

### Tertiary (LOW confidence — not independently verified)

None identified. All claims in this document are backed by prior project research or the sources above.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero-dependency approach verified across multiple sources and prior project research
- Token architecture: HIGH — confirmed by prior research; two-tier pattern verified by current sources
- Responsive layout: HIGH — CSS Grid `auto-fit/minmax` is a well-documented, universally supported pattern
- Progressive enhancement: HIGH — `js-enabled` gate pattern is documented in prior research and confirmed by current sources
- Pitfalls: HIGH — all pitfalls come from prior research or are common knowledge in web fundamentals

**Research date:** 2026-03-31
**Valid until:** 2026-09-30 (CSS fundamentals are stable; custom properties and Grid API will not change)
