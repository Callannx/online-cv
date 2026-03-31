# Research Summary: Become a Dev -- Portfolio

**Domain:** Personal developer portfolio (static, single-page)
**Researched:** 2026-03-30
**Overall confidence:** HIGH

## Executive Summary

This is a deliberately constrained project: a single-page portfolio built with plain HTML, CSS, and JavaScript, deployed to GitHub Pages. The constraint is the point -- it is both a learning exercise in web fundamentals and a living portfolio that grows as the developer's skills grow.

The technology landscape for this project is refreshingly simple. Modern CSS (custom properties, Grid, Flexbox, `backdrop-filter`) handles everything that once required preprocessors, frameworks, or JavaScript libraries. The Intersection Observer API provides scroll-triggered animations without any dependency. GitHub Pages provides free, zero-config static hosting with HTTPS. There is no build step, no bundler, no package.json.

The main technical challenge is executing the glassmorphism dark theme well. This is an aesthetic that looks stunning when done right but fails badly when contrast and readability are not carefully managed. The research confirms that `backdrop-filter` has strong browser support (~95%), but requires a `-webkit-` prefix for Safari and thoughtful opacity/contrast management for accessibility.

The biggest risk is not technical but behavioral: the temptation to over-engineer. A portfolio this size does not need component libraries, CSS methodologies beyond basic BEM, animation frameworks, or build tools. The architecture should be five CSS files, one JS file, and one HTML file. If it feels like it needs more, the scope has crept.

## Key Findings

**Stack:** Plain HTML5/CSS3/JS with zero dependencies. CSS custom properties for the design system, Intersection Observer for animations, GitHub Pages for hosting. No build tools.

**Architecture:** Single HTML page, modular CSS split by concern (tokens, reset, layout, components, animations), one JS file for scroll observer and interactions. Progressive enhancement ensures content works without JS.

**Critical pitfall:** Glassmorphism contrast failure -- text on semi-transparent cards can become unreadable. Must test contrast ratios on every card and use higher background opacity (0.25-0.4, not 0.1).

## Implications for Roadmap

Based on research, suggested phase structure:

1. **Foundation** - Design system tokens and page structure
   - Addresses: CSS custom properties, reset, responsive grid, semantic HTML
   - Avoids: Pitfall 3 (hardcoded colors) by establishing tokens first
   - This MUST come first because every other phase depends on the token system

2. **Core Sections** - Hero, Projects, Skills, About, Contact
   - Addresses: All table-stakes content sections
   - Avoids: Pitfall 1 (contrast failure) by building with tokens from Phase 1
   - Projects section should come early because it is the portfolio's core value

3. **Polish** - Glassmorphism effects, scroll animations, micro-interactions
   - Addresses: Differentiator features (the visual design that sets this apart)
   - Avoids: Pitfall 2 (animation blocks content) by using progressive enhancement
   - Comes after content exists so there is something to animate

4. **Ship** - Meta tags, favicon, 404 page, GitHub Pages deployment
   - Addresses: Deployment requirements, social sharing, production readiness
   - Avoids: Pitfall 7 (stale cache), Pitfall 9 (broken social previews)
   - Final phase because deployment config should not block development

**Phase ordering rationale:**
- Tokens must exist before any visual component can be built (dependency)
- Content sections before animations (progressive enhancement principle; you need content to animate)
- Polish before ship (deploy a finished product, not a work-in-progress)
- Ship is last but should happen quickly after polish -- do not let it linger

**Research flags for phases:**
- Phase 1 (Foundation): Standard patterns, unlikely to need deeper research
- Phase 2 (Core Sections): Standard patterns, but project card design may benefit from looking at portfolio examples
- Phase 3 (Polish): Glassmorphism accessibility needs careful attention; test-heavy, not research-heavy
- Phase 4 (Ship): Standard GitHub Pages deployment, well-documented

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Zero-dependency approach is well-proven for static portfolios. All browser APIs used have >95% support |
| Features | HIGH | Table stakes are universal for developer portfolios. Differentiators are CSS-achievable |
| Architecture | HIGH | Single-page with modular CSS is the standard pattern for this type of site |
| Pitfalls | HIGH | Glassmorphism contrast issues and progressive enhancement are well-documented concerns |

## Gaps to Address

- **Font selection**: Research did not deeply investigate specific font pairings for the dark/glassmorphism aesthetic. Inter + Space Grotesk is a solid default but could be refined
- **Image optimization workflow**: How to efficiently compress and size project screenshots. Tools like squoosh.app exist but a specific workflow was not defined
- **GitHub Actions vs. direct deploy**: For v1, direct deploy from `main` is fine. If the project grows, a GitHub Action to validate HTML/CSS or run Lighthouse would be valuable -- but that is v2 territory
- **Specific animation timing**: The research covers the pattern (Intersection Observer + CSS transitions) but optimal easing curves and durations are best determined through implementation and testing, not research

## Sources

- [Glassmorphism Implementation Guide 2025](https://playground.halfaccessible.com/blog/glassmorphism-design-trend-implementation-guide)
- [Glassmorphism Best Practices - NN/g](https://www.nngroup.com/articles/glassmorphism/)
- [Dark Glassmorphism UI Trends 2026](https://medium.com/@developer_89726/dark-glassmorphism-the-aesthetic-that-will-define-ui-in-2026-93aa4153088f)
- [CSS Custom Properties for Theming 2025](https://ronaldsvilcins.com/2025/03/30/a-practical-guide-to-css-custom-properties-for-theming/)
- [CSS Theming in 2025](https://mamutlove.com/en/blog/theming-with-css-in-2025/)
- [Scroll Animations with Intersection Observer](https://cheewebdevelopment.com/vanilla-js-scroll-events-animations-with-intersectionobserver-api/)
- [Scroll Animation Techniques 2025](https://mroy.club/articles/scroll-animations-techniques-and-considerations-for-2025)
- [GitHub Pages Docs](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages Best Practices 2025](https://www.theprotec.com/blog/2025/deploying-a-static-site-with-github-pages-best-practices-guide/)
