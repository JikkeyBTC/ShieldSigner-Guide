# Anime-style Top Navigation Design

## Goal

Match the supplied Anime.js documentation composition by placing the card search directly in the global top navigation, above the visual card rail, while keeping the table of contents and article column independent. The search must have exactly the same computed width and horizontal start as the cards below it.

## Layout

- Keep the global ShieldSigner topbar for brand, language switch, GitHub, and the Anime-style search control.
- Place `CardRailNav` inside `.ss-topbar-inner`, between the brand and right-side actions. On desktop it is positioned above the card rail with the same `354px` width and computed left edge.
- Start the table of contents and `.ss-demo-rail` immediately below the topbar. Keep the article in the third column; no search or navigation control may overlap the article title.
- Preserve the mobile `docs-nav-menu` and icon-only `search-nav` controls. On mobile, hide the desktop column toolbars and keep the existing stacked document navigation.

## Components and data flow

- `Layout.vue` renders `CardRailNav` inside the global topbar, followed by direct `GuideNav` and `DemoCards` columns.
- The search consumes the shared reactive card query and the existing card order; `GuideNav`/`DemoCards` continue to consume the reactive VitePress `page.value.relativePath` and locale helpers.
- `CardRailNav` binds its search input to `guideSearchQuery` and dispatches existing previous/next navigation without introducing a second card order.
- Accent variables come from the same `getChapterAccent(currentChapter)` resolver as the article, cards, and document nav.

## Styling invariants

- Desktop shell remains `220px 354px minmax(0, 1fr)` with `28px` gaps and the canonical `--ss-layout-max`/`--ss-shell-pad` geometry.
- `.ss-topbar-search-nav` and `.ss-demo-rail` both use `width: 354px`; the search's left edge is calculated from the same shell formula as the fixed rail.
- The topbar search uses the dark Anime.js-style panel, 1px border, compact radius, and muted labels; active/hover accents stay category-specific.
- The card rail remains independently scrollable with hidden scrollbar chrome. Search is sticky/pinned at the rail top, while card click scroll behavior is unchanged.
- At tablet/mobile breakpoints, the desktop card rail and its toolbar collapse as they do today; no duplicate search field is rendered.

## Accessibility and behavior

- Each toolbar has an accessible `aria-label`; search keeps its existing label and `/` shortcut.
- Previous/next buttons expose disabled state and route-relative labels.
- Focus styles use the current category accent; keyboard navigation does not alter card scroll unexpectedly.

## Search interaction

- The search field is rendered inside the global topbar, with its left edge and width calculated from the same card-rail geometry rather than independently positioned.
- Typing filters the shared card sequence immediately. The result status shows the active match and total matches; up/down buttons, Enter, and ArrowUp/ArrowDown cycle through matches and reveal the selected card inside the rail.
- `/` focuses the search field when the user is not already typing, while `Esc` clears the query and removes the temporary match highlight.

## Validation

- Build VitePress output.
- Unit-check route/card order and active accent synchronization.
- Playwright-check desktop alignment: topbar search and cards have equal width and shared left edge; no duplicate column toolbar appears.
- Playwright-check mobile: no horizontal overflow, desktop bars hidden, mobile menu/search controls visible.
- Run `git diff --check`.
