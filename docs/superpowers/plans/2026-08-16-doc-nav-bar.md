# Documentation Navigation Bar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dedicated navigation bar below the brand header with previous/next controls driven by the existing visual card order, without overlapping article titles.

**Architecture:** Extract the card route sequence into a shared guide navigation data module consumed by `DemoCards` and a new `DocNavBar` component. `Layout.vue` renders the bar between the top header and docs shell; the component derives the current index from the reactive VitePress route and navigates with `useRouter`, preserving the current card-scroll behavior.

**Tech Stack:** VitePress, Vue 3 `<script setup>`, TypeScript, Anime.js existing card navigation, Playwright.

## Global Constraints

- Keep the existing dark Anime.js-inspired visual language and chapter accent colors.
- Use the current card order exactly; do not invent a separate article order.
- Preserve mobile `docs-nav-menu` and `search-nav` controls while placing them inside the new nav bar.
- Previous/next controls must be keyboard accessible and disabled at the first/last card.
- Article headings must begin below the nav bar at all viewport sizes.

---

### Task 1: Share the card route sequence

**Files:**
- Create: `src/guide/card-order.ts`
- Modify: `docs/.vitepress/theme/components/DemoCards.vue`

**Interfaces:**
- Produces `GuideCardOrderItem` with `kind: 'section' | 'branch' | 'chapter'` and `id: string`.
- Produces `guideCardOrder: readonly GuideCardOrderItem[]` in the exact order currently used by `DemoCards`.

- [ ] **Step 1: Add the shared ordered route data**

  Move the current `cardOrder` literal from `DemoCards.vue` into `src/guide/card-order.ts`, export the type and constant, and retain all existing IDs including section, branch, and chapter landing entries.

- [ ] **Step 2: Replace the local card-order literal**

  Import `guideCardOrder` in `DemoCards.vue` and map it to the existing `sectionCardById`, `branchCardById`, and `chapterCardById` maps without changing card rendering or click animation behavior.

- [ ] **Step 3: Run the route/unit checks**

  Run `node node_modules/vitest/vitest.mjs run tests/guide/chapters.spec.ts`.
  Expected: all existing chapter tests pass.

### Task 2: Build the dedicated nav bar

**Files:**
- Create: `docs/.vitepress/theme/components/DocNavBar.vue`
- Modify: `docs/.vitepress/theme/Layout.vue`

**Interfaces:**
- `DocNavBar` consumes VitePress `page`, `useRouter`, `withBase`, the shared card order, and the same section/branch/chapter lookup helpers used by `DemoCards`.
- Renders `nav.ss-doc-nav-bar`, `a.ss-doc-nav-prev`, and `a.ss-doc-nav-next` with `aria-label`, disabled state, and current position text.

- [ ] **Step 1: Derive current/previous/next cards from the reactive route**

  Normalize `page.value.relativePath`, resolve the current section/branch/chapter href, find its index in the shared card list, and expose previous/next hrefs. Landing cards and chapter cards must all participate in the same sequence.

- [ ] **Step 2: Add accessible controls and route navigation**

  Render left context text and right arrow buttons using `↑` and `↓` glyphs. Use `aria-label="Previous card"` / `aria-label="Next card"`, `aria-disabled`, and prevent navigation when no adjacent item exists. Use `withBase()` for hrefs and `router.go()` for SPA navigation.

- [ ] **Step 3: Mount the bar below the brand header**

  Insert `<DocNavBar />` between `.ss-topbar` and `.ss-docs-shell` in `Layout.vue`, keeping the docs shell below it so article headings cannot overlap the controls.

### Task 3: Style desktop/mobile layout and integrate controls

**Files:**
- Modify: `docs/.vitepress/theme/custom.css`
- Modify: `docs/.vitepress/theme/components/GuideNav.vue`

- [ ] **Step 1: Add nav-bar spacing and visual treatment**

  Give `.ss-doc-nav-bar` a non-overlapping block height, border, sticky backdrop, and max-width aligned with `.ss-docs-shell`. Add compact previous/next button styling with chapter accent hover/focus states.

- [ ] **Step 2: Move mobile controls into the nav bar flow**

  Remove fixed positioning from `.ss-mobile-toolbar` and position it inside `.ss-doc-nav-bar` on mobile. Keep `docs-nav-menu` left and `search-nav` right, with the search panel anchored below the bar. Preserve drawer/scrim z-index ordering.

- [ ] **Step 3: Add responsive title offset and reduced-motion-safe transitions**

  Ensure mobile `.ss-docs-shell` starts after the bar, article headings remain visible, and `prefers-reduced-motion` disables nav transitions without hiding content.

### Task 4: Add end-to-end coverage

**Files:**
- Modify: `tests/e2e/guide.spec.ts`

- [ ] **Step 1: Add desktop nav-bar assertions**

  Assert the bar is visible, the title is below its bottom edge, and the current card position is shown.

- [ ] **Step 2: Verify previous/next route movement**

  Start from a middle card, click the next control, assert the URL and `aria-current` card change, then click previous and assert the original route returns.

- [ ] **Step 3: Verify mobile controls remain usable**

  At 390px, assert the nav bar, `docs-nav-menu`, and `search-nav` are visible, the drawer/search panel open correctly, and document `scrollWidth` does not exceed `clientWidth`.

- [ ] **Step 4: Run build and browser tests**

  Run `node node_modules/vitepress/bin/vitepress.js build docs` and the focused Playwright guide suite against a fresh preview. Expected: build succeeds and all responsive/navigation tests pass.

### Task 5: Commit the completed feature

- [ ] **Step 1: Review the diff**

  Run `git diff --check` and inspect changed files for accidental generated artifacts.

- [ ] **Step 2: Commit**

  Commit with `git add src/guide/card-order.ts docs/.vitepress/theme/components/DocNavBar.vue docs/.vitepress/theme/components/DemoCards.vue docs/.vitepress/theme/components/GuideNav.vue docs/.vitepress/theme/Layout.vue docs/.vitepress/theme/custom.css tests/e2e/guide.spec.ts docs/superpowers/plans/2026-08-16-doc-nav-bar.md` followed by `git commit -m "feat: add card-order documentation nav bar"`.
