---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-31
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — no build tools or test runner. Manual browser checks + CLI linting (ad hoc, no install) |
| **Config file** | None — Wave 0 creates all source files |
| **Quick run command** | `grep -rn "#[0-9a-fA-F]\{3,6\}\|rgb(\|hsl(" css/layout.css css/components.css css/animations.css` |
| **Full suite command** | Quick grep + `npx html-validate index.html` + browser DevTools manual checks |
| **Estimated runtime** | ~2 minutes (mostly manual) |

---

## Sampling Rate

- **After every task commit:** Run quick grep (hardcoded color check)
- **After every plan wave:** Run full suite (HTML validate + manual browser checks)
- **Before `/gsd:verify-work`:** All three FNDN requirements manually verified green
- **Max feedback latency:** ~2 minutes

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 0 | FNDN-01 | lint | `grep -rn "#[0-9a-fA-F]" css/layout.css css/components.css css/animations.css` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01 | 0 | FNDN-01 | manual-smoke | Open index.html in browser — confirm dark purple background | ❌ W0 | ⬜ pending |
| 1-01-03 | 01 | 0 | FNDN-02 | manual-smoke | Chrome DevTools mobile emulation at 375px, 820px, 1440px — no horizontal scroll | ❌ W0 | ⬜ pending |
| 1-01-04 | 01 | 0 | FNDN-03 | manual-smoke | Chrome DevTools > Disable JavaScript > reload — confirm all sections visible | ❌ W0 | ⬜ pending |
| 1-01-05 | 01 | 0 | FNDN-03 | lint | `npx html-validate index.html` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `index.html` — does not exist; Wave 0 creates it
- [ ] `css/reset.css` — does not exist; Wave 0 creates it
- [ ] `css/tokens.css` — does not exist; Wave 0 creates it
- [ ] `css/layout.css` — does not exist; Wave 0 creates it
- [ ] `css/components.css` — stub only; Wave 0 creates it
- [ ] `css/animations.css` — stub only (js-enabled gate); Wave 0 creates it
- [ ] `js/main.js` — stub only (js-enabled class addition); Wave 0 creates it
- [ ] `assets/fonts/` — directory + downloaded font files; Wave 0 creates it

*All files are new — there is no existing infrastructure to inherit.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Dark background visible | FNDN-01 | No browser-automated color check without a test runner | Open `index.html` locally, confirm dark purple/near-black background renders |
| No layout overflow at 375px | FNDN-02 | Requires visual/DevTools check | Chrome DevTools > iPhone SE (375px) — confirm no horizontal scrollbar |
| No layout overflow at 820px | FNDN-02 | Requires visual/DevTools check | Chrome DevTools > iPad Air (820px) — confirm no overflow |
| No layout overflow at 1440px | FNDN-02 | Requires visual/DevTools check | Chrome DevTools > Laptop L (1440px) — confirm no overflow |
| All content visible with JS disabled | FNDN-03 | Requires browser JS toggle | Chrome DevTools > Settings > Disable JavaScript > reload — all sections must be readable |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 2 minutes
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
