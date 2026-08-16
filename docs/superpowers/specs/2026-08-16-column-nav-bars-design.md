# Column Navigation Bars Design

## Goal

Match the supplied Anime.js documentation composition by giving the table of contents and the visual card rail their own aligned navigation bars while keeping the article column independent. The card rail search must have exactly the same computed width and horizontal start as the cards below it.

## Layout

- Keep the existing global ShieldSigner topbar for brand, language switch, and GitHub.
- Add a desktop-only left column toolbar immediately above the table of contents. It presents the `GUIDE` eyebrow and the active top-level category, using the current route's localized label and accent.
- Add a desktop-only card-rail toolbar immediately above `.ss-demo-rail`. It contains the search field, keyboard hint, and compact previous/next controls. It uses the same `354px` width as the card rail and shares its calculated left edge.
- Keep the article in the third column and reserve normal flow height for both toolbars; no toolbar may overlap the article title.
- Preserve the mobile `docs-nav-menu` and icon-only `search-nav` controls. On mobile, hide the desktop column toolbars and keep the existing stacked document navigation.

## Components and data flow

- `Layout.vue` renders the new `GuideNavBar` before `GuideNav` and `CardRailNav` immediately before `DemoCards`.
- Both bars consume the same reactive VitePress `page.value.relativePath` and locale helpers already used by `GuideNav`/`DemoCards`.
- `CardRailNav` binds its search input to `guideSearchQuery` and dispatches existing previous/next navigation without introducing a second card order.
- Accent variables come from the same `getChapterAccent(currentChapter)` resolver as the article, cards, and document nav.

## Styling invariants

- Desktop shell remains `220px 354px minmax(0, 1fr)` with `28px` gaps and the canonical `--ss-layout-max`/`--ss-shell-pad` geometry.
- `.ss-card-rail-nav` and `.ss-demo-rail` both use `width: 354px`; the nav's left edge is calculated from the same shell formula as the fixed rail.
- Toolbars use the dark Anime.js-style panel, 1px border, compact radius, and muted labels; active/hover accents stay category-specific.
- The card rail remains independently scrollable with hidden scrollbar chrome. Search is sticky/pinned at the rail top, while card click scroll behavior is unchanged.
- At tablet/mobile breakpoints, the desktop card rail and its toolbar collapse as they do today; no duplicate search field is rendered.

## Accessibility and behavior

- Each toolbar has an accessible `aria-label`; search keeps its existing label and `/` shortcut.
- Previous/next buttons expose disabled state and route-relative labels.
- Focus styles use the current category accent; keyboard navigation does not alter card scroll unexpectedly.

## Search interaction

- The rail search field is rendered inside the card-column bar, so its left edge and width are inherited directly from the card rail rather than independently positioned.
- Typing filters the shared card sequence immediately. The result status shows the active match and total matches; up/down buttons, Enter, and ArrowUp/ArrowDown cycle through matches and reveal the selected card inside the rail.
- `/` focuses the search field when the user is not already typing, while `Esc` clears the query and removes the temporary match highlight.

## Validation

- Build VitePress output.
- Unit-check route/card order and active accent synchronization.
- Playwright-check desktop alignment: toolbar and cards have equal width and shared left edge; left toolbar appears only on desktop.
- Playwright-check mobile: no horizontal overflow, desktop bars hidden, mobile menu/search controls visible.
- Run `git diff --check`.
