/**
 * main.js — JavaScript entry point.
 *
 * Phase 1 responsibility: Add js-enabled class to <html>.
 * This activates CSS-gated animations in animations.css.
 * Without this class, all [data-animate] content is fully visible.
 *
 * Phase 3 will add: Intersection Observer for scroll-triggered .visible class.
 */

// Signal that JS is available — unlocks CSS animation gate
document.documentElement.classList.add('js-enabled');

// Phase 3: Intersection Observer will be added below this line
