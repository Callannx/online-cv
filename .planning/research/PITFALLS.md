# Domain Pitfalls

**Domain:** Static portfolio website (HTML/CSS/JS, glassmorphism, GitHub Pages)
**Researched:** 2026-03-30

## Critical Pitfalls

Mistakes that cause rewrites or make the site unusable.

### Pitfall 1: Glassmorphism Contrast Failure

**What goes wrong:** Text on semi-transparent glass cards becomes unreadable, especially when the background behind the card changes as user scrolls.
**Why it happens:** `backdrop-filter: blur()` with low-opacity backgrounds means the effective contrast depends on whatever content is behind the card. Designers test with one background and forget it changes.
**Consequences:** WCAG 2.1 failure (4.5:1 contrast required for normal text). Accessibility lawsuit risk for client work, but more practically: some users literally cannot read your content.
**Prevention:**
- Use higher opacity backgrounds: `rgba` alpha of 0.25-0.4, not 0.1
- Add a subtle text shadow: `text-shadow: 0 1px 3px rgba(0,0,0,0.5)` on light text
- Test with the browser's accessibility inspector (Chrome DevTools > Rendering > contrast ratio)
- Set a dark, consistent page background (not a busy image) so glass card contrast is predictable
**Detection:** Run Lighthouse accessibility audit. Check contrast on every section with glass cards.

### Pitfall 2: Animation Blocks Content

**What goes wrong:** Content is invisible until JavaScript loads and triggers animations. If JS fails, the page is blank.
**Why it happens:** Developer sets `opacity: 0` on all animated elements in CSS, then relies on JS Intersection Observer to add `opacity: 1`. If JS is blocked, slow, or errors out, nothing is visible.
**Consequences:** Blank page for users with JS disabled, slow connections, or if your script has a bug. Search engines may not index hidden content.
**Prevention:** Progressive enhancement pattern -- content is visible by default. Only add the hiding class after JS confirms it is running:
```javascript
document.documentElement.classList.add('js-enabled');
```
```css
.js-enabled [data-animate] { opacity: 0; }
```
**Detection:** Disable JavaScript in browser DevTools and reload. Everything should still be readable.

### Pitfall 3: Designing Before Defining Tokens

**What goes wrong:** You start writing component CSS with hardcoded colors (`#7c3aed`, `hsl(270, 60%, 60%)`), then later try to extract a design system. Half the values are slightly different shades of the same color.
**Why it happens:** It is faster to hardcode in the moment. Extracting tokens feels like unnecessary abstraction when you are just getting started.
**Consequences:** Inconsistent visual design. Painful to change the palette later. "Purple" appears in 8 slightly different shades.
**Prevention:** Write `tokens.css` FIRST, before any component CSS. Define your palette, spacing scale, and typography upfront. Reference only custom properties in all other CSS files.
**Detection:** Search your CSS for any hardcoded color value (`#`, `rgb`, `hsl` not inside `var()`). There should be none outside `tokens.css`.

## Moderate Pitfalls

### Pitfall 4: Safari backdrop-filter Without Prefix

**What goes wrong:** Glassmorphism looks perfect in Chrome but shows no blur effect in Safari.
**Prevention:** Always include both:
```css
-webkit-backdrop-filter: blur(12px);
backdrop-filter: blur(12px);
```

### Pitfall 5: Hero Image Tanks Performance

**What goes wrong:** A 3MB hero image or background makes the site take 5+ seconds to load on mobile.
**Prevention:**
- Compress all images (use squoosh.app or similar)
- Use `loading="lazy"` on all images below the fold
- Consider CSS gradients or shapes instead of a background image for the hero
- Target < 500KB total page weight

### Pitfall 6: Anchor Scroll Offset by Fixed Nav

**What goes wrong:** Clicking a nav link scrolls to the section, but the section heading is hidden behind the fixed/sticky navigation bar.
**Prevention:** Use `scroll-margin-top` on sections:
```css
.section {
  scroll-margin-top: 5rem; /* height of your fixed nav + buffer */
}
```

### Pitfall 7: GitHub Pages Caching Stale CSS

**What goes wrong:** You push an update, but visitors (including you) see the old version because the browser cached the CSS/JS files.
**Prevention:** Add a cache-busting query parameter to CSS/JS links:
```html
<link rel="stylesheet" href="css/tokens.css?v=1.1">
```
Or use a content hash if you add a build step later. For v1, manual version bumps are fine.

### Pitfall 8: Over-Engineering the File Structure

**What goes wrong:** Creating a deeply nested folder structure with partials, mixins, utilities -- mimicking a large-scale design system for a single-page site.
**Prevention:** Five CSS files and one JS file is the right level of organization. If you feel the urge to add more structure, the site has probably outgrown vanilla HTML/CSS and should migrate to a generator.

## Minor Pitfalls

### Pitfall 9: Missing Meta Tags

**What goes wrong:** Site preview looks broken when shared on LinkedIn/Twitter (no image, no description).
**Prevention:** Add Open Graph and Twitter Card meta tags in `<head>`:
```html
<meta property="og:title" content="Your Name -- Front End Developer">
<meta property="og:description" content="Portfolio showcasing web and AI projects">
<meta property="og:image" content="https://yourdomain.com/assets/images/og-preview.png">
<meta name="twitter:card" content="summary_large_image">
```

### Pitfall 10: Forgetting the Favicon

**What goes wrong:** Browser tab shows a generic icon or a 404 error in the console for `favicon.ico`.
**Prevention:** Create a simple favicon (even just your initials on a colored background) and add:
```html
<link rel="icon" type="image/svg+xml" href="/assets/icons/favicon.svg">
```

### Pitfall 11: Not Testing on Real Mobile

**What goes wrong:** Responsive layout looks fine in Chrome DevTools device mode but breaks on actual phones (touch targets too small, text too small, horizontal scroll).
**Prevention:** Test on a real phone before deploying. Chrome DevTools device mode does not catch everything (especially touch interaction issues and actual font rendering).

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Design system setup | Hardcoding colors instead of tokens (Pitfall 3) | Write tokens.css first, enforce no hardcoded values |
| Glassmorphism cards | Contrast failure (Pitfall 1) | Test contrast on every card, use higher opacity backgrounds |
| Scroll animations | Content invisible without JS (Pitfall 2) | Progressive enhancement pattern, test with JS disabled |
| Navigation | Scroll offset hidden by nav (Pitfall 6) | Use scroll-margin-top on all sections |
| Hero section | Performance hit from large images (Pitfall 5) | CSS gradients preferred; compress any images |
| Deployment | Cached stale files (Pitfall 7) | Cache-busting query strings on CSS/JS |
| Social sharing | Broken previews (Pitfall 9) | Add OG meta tags before first public share |

## Sources

- [Glassmorphism Accessibility - NN/g](https://www.nngroup.com/articles/glassmorphism/) -- contrast and readability concerns
- [Glassmorphism Implementation Guide](https://playground.halfaccessible.com/blog/glassmorphism-design-trend-implementation-guide) -- Safari prefix requirements, performance
- [Scroll Animation Techniques 2025](https://mroy.club/articles/scroll-animations-techniques-and-considerations-for-2025) -- progressive enhancement for animations
- [GitHub Pages Deployment Best Practices](https://www.theprotec.com/blog/2025/deploying-a-static-site-with-github-pages-best-practices-guide/) -- caching, HTTPS, deployment pitfalls
