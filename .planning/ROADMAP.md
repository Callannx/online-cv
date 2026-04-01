# Roadmap: Become a Dev — Portfolio

## Overview

Build and ship a personal portfolio site from zero: starting with a design system foundation, building out all five content sections, layering in glassmorphism and motion, and deploying to GitHub Pages. Four phases, each delivering a verifiable capability. The site is the portfolio — it grows as the work grows.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Design system tokens, semantic page structure, responsive grid (completed 2026-04-01)
- [ ] **Phase 2: Core Sections** - All five content sections built and readable
- [ ] **Phase 3: Visual Polish** - Glassmorphism cards, scroll animations, micro-interactions
- [ ] **Phase 4: Ship** - GitHub Pages deployment, meta tags, favicon, custom 404

## Phase Details

### Phase 1: Foundation
**Goal**: The design system and page skeleton exist — every future section can be built on a consistent, responsive base
**Depends on**: Nothing (first phase)
**Requirements**: FNDN-01, FNDN-02, FNDN-03
**Success Criteria** (what must be TRUE):
  1. User sees the dark background with purple/cyan color palette applied consistently — no hardcoded colors anywhere in CSS
  2. User can load the page on a phone, tablet, and desktop and content never overflows or breaks layout
  3. User can read all page content with JavaScript disabled — no content is hidden behind JS
**Plans**: 3 plans

Plans:
- [x] 01-01-PLAN.md — CSS design token system (tokens.css) and browser reset (reset.css)
- [ ] 01-02-PLAN.md — Responsive layout (layout.css), component stub, animation gate (animations.css), JS entry point (main.js)
- [ ] 01-03-PLAN.md — HTML semantic skeleton (index.html) wired to all CSS and fonts, self-hosted font download, human verification checkpoint

### Phase 2: Core Sections
**Goal**: All five portfolio sections exist with real content and are readable without any visual effects
**Depends on**: Phase 1
**Requirements**: SECT-01, SECT-02, SECT-03, SECT-04, SECT-05
**Success Criteria** (what must be TRUE):
  1. User sees the hero section and immediately knows the developer's name, role, and value proposition
  2. User sees the skills section and can read the current proficiency level for HTML/CSS, JavaScript, TypeScript, and Python/AI
  3. User sees the projects section as a card grid and can click any card to reach the linked project or repo
  4. User reads the about section and understands the developer's background, career direction, and what they are actively learning
  5. User sees the contact section and can reach at least one way to get in touch
**Plans**: TBD

### Phase 3: Visual Polish
**Goal**: The site looks and feels like the @designmotionhq aesthetic — glassmorphism cards, scroll-triggered reveals, hover interactions throughout
**Depends on**: Phase 2
**Requirements**: VISUL-01, VISUL-02, VISUL-03
**Success Criteria** (what must be TRUE):
  1. User sees project and content cards rendered with frosted-glass appearance — backdrop blur, semi-transparent fill, visible layering against the dark background
  2. User scrolls down the page and content sections animate into view as they enter the viewport
  3. User hovers over buttons, cards, and links and sees a responsive visual change — the UI reacts to cursor position
**Plans**: TBD

### Phase 4: Ship
**Goal**: The site is live at a public GitHub Pages URL, production-ready with correct social previews, a favicon, and a graceful 404
**Depends on**: Phase 3
**Requirements**: DEPL-01, DEPL-02, DEPL-03, DEPL-04
**Success Criteria** (what must be TRUE):
  1. User can visit a real github.io URL and see the live portfolio with HTTPS
  2. User shares the site URL on Twitter or LinkedIn and the preview card shows the correct title, description, and image
  3. User navigates to a non-existent URL on the site and sees a custom 404 page instead of GitHub's default error
  4. User sees a favicon in the browser tab when visiting the site
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 3/3 | Complete   | 2026-04-01 |
| 2. Core Sections | 0/? | Not started | - |
| 3. Visual Polish | 0/? | Not started | - |
| 4. Ship | 0/? | Not started | - |

---
*Roadmap created: 2026-03-31*
*Milestone: v1.0 Portfolio Launch*
