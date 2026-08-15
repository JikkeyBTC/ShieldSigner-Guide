# ShieldSigner Guide Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** GitHub Pages에서 동작하는 한국어 ShieldSigner 구매자용 가이드 사이트를 구축한다.

**Architecture:** VitePress가 Markdown 문서와 정적 사이트 빌드를 담당하고, 커스텀 Vue 레이아웃이 Anime.js 기반의 3열 목차·챕터 카드·본문 전환을 제공한다. 문서 콘텐츠는 `docs/`에 두고, 브랜드 자산은 `public/`에 두며, GitHub Actions가 프로젝트 base path를 포함한 정적 결과를 Pages에 배포한다.

**Tech Stack:** VitePress, Vue 3, TypeScript, Anime.js, npm, Playwright, GitHub Actions, GitHub Pages

## Global Constraints

- ShieldSigner는 공식 SeedSigner 펌웨어와 OS를 수정 없이 사용하는 독립 DIY 하드웨어 키트다.
- 조립 방법과 OS 설치·검증은 별도 페이지로 제공한다.
- SeedKeeper는 JavaCard, SeedKeeper, PIN, 시드 백업, 카드 복제, 복구, plaintext/encrypted export를 포함한 별도 핵심 카테고리다.
- 보기 전용 지갑 대상은 BlueWallet과 코코넛 월렛이다.
- 사이트는 공개 URL이며 구매자에게 안내하는 정적 가이드다. 로그인·결제·시드 업로드를 구현하지 않는다.
- 제품 이미지는 교체 가능한 플레이스홀더를 사용한다.
- 로고 파일은 `public/brand/shieldsigner.svg`이며 글자까지 path로 변환해 외부 폰트에 의존하지 않는다.
- 색상 토큰은 배경 `#252423`, 패널 `#2A2928`, 강조 `#FD6D02`, 본문 `#FDFDFD`를 사용한다.
- 1200px 이상은 3열, 760–1199px은 2열, 760px 미만은 모바일 단일 열과 가로 챕터 탐색을 사용한다.
- Anime.js 모션은 opacity·transform 중심의 250–650ms 전환으로 제한하며 `prefers-reduced-motion: reduce`에서 비활성화한다.
- GitHub Pages 프로젝트 base path는 `/ShieldSigner-Guide/`다.
- JavaCard·SeedKeeper 동작과 라이선스는 [Seedkeeper Applet](https://github.com/Toporin/Seedkeeper-Applet), [SeedKeeper 공식 빠른 시작](https://seedkeeper.io/quick-start/), [Oracle JavaCard 문서](https://docs.oracle.com/en/java/javacard/)를 검증 출처로 기록한다.

---

## File Map

- `package.json`, `package-lock.json`: VitePress, Vue, Anime.js, Vitest, Playwright scripts and locked dependencies.
- `.gitignore`: `node_modules`, VitePress output, Playwright artifacts, local brainstorming files.
- `.vitepress/config.ts`: site title, base path, markdown, sidebar, navigation metadata, and clean URLs.
- `playwright.config.ts`: local preview base URL, Chromium project, and test artifact settings.
- `.vitepress/theme/index.ts`: custom VitePress theme registration.
- `.vitepress/theme/Layout.vue`: global docs shell and route slot.
- `.vitepress/theme/components/GuideNav.vue`: category navigation, chapter rail, mobile tabs, active route state.
- `.vitepress/theme/components/AnimatedChapter.vue`: Anime.js enter/transition behavior and reduced-motion guard.
- `.vitepress/theme/components/Callout.vue`: safety, info, and verification callouts with accessible labels.
- `.vitepress/theme/components/MediaPlaceholder.vue`: fixed-ratio product image placeholder with replacement contract.
- `.vitepress/theme/custom.css`: exact palette, typography, 3-column/tablet/mobile breakpoints, focus states, and code/overflow styling.
- `public/brand/shieldsigner.svg`: outlined ShieldSigner logo with no font dependency.
- `src/guide/chapters.ts`: typed route metadata consumed by navigation and tests.
- `src/guide/animation.ts`: Anime.js wrappers with duration constants and reduced-motion behavior.
- `docs/index.md`: documentation landing page and first-run route map.
- `docs/build/assembly.md`: physical kit assembly.
- `docs/os/install.md`, `docs/os/verify.md`: image installation and PGP/SHA-256 verification as separate pages.
- `docs/seedkeeper/javacard.md`, `what-is-seedkeeper.md`, `initialize.md`, `backup.md`, `clone.md`, `restore.md`, `recovery.md`: SeedKeeper glossary and end-to-end backup/recovery flows.
- `docs/wallet/bluewallet.md`, `docs/wallet/coconut.md`: watch-only wallet integrations.
- `docs/transactions/receive.md`, `docs/transactions/sign-psbt.md`: address verification and PSBT review/sign/return.
- `docs/reference/security.md`, `faq.md`, `glossary.md`, `sources.md`: safety, troubleshooting, terms, attribution, and non-affiliation notes.
- `tests/guide/chapters.spec.ts`: route metadata and navigation invariants.
- `tests/e2e/guide.spec.ts`: desktop/mobile smoke, direct links, reduced motion, and key content checks.
- `.github/workflows/deploy-pages.yml`: build and deploy the VitePress output to GitHub Pages.
- `ATTRIBUTION.md`: Anime.js, SeedSigner, SeedKeeper Applet, and external wallet source/license notices.
- `README.md`: local preview, build, Pages deployment, source attribution, and public-site warning.

---

## Task 1: Scaffold VitePress and GitHub Pages Build

**Files:**
- Create: `package.json`
- Create: `package-lock.json`
- Create: `.gitignore`
- Create: `.vitepress/config.ts`
- Create: `playwright.config.ts`
- Create: `docs/index.md`
- Create: `.github/workflows/deploy-pages.yml`
- Create: `README.md`
- Test: `tests/e2e/guide.spec.ts`

**Interfaces:**
- Produces `npm run dev`, `npm run build`, `npm run preview`, and `npm run test:e2e` scripts.
- Produces a VitePress output directory at `.vitepress/dist` with base path `/ShieldSigner-Guide/`.

- [ ] **Step 1: Write the failing build smoke test**

  Create `tests/e2e/guide.spec.ts` with a test that starts from the built preview URL and asserts the document title, `main`, and a link to `/build/assembly`.

  ```ts
  import { test, expect } from '@playwright/test';

  test('landing page exposes the first-run route map', async ({ page }) => {
    await page.goto('/ShieldSigner-Guide/');
    await expect(page).toHaveTitle(/ShieldSigner/);
    await expect(page.locator('main')).toContainText('조립 방법');
    await expect(page.getByRole('link', { name: /조립 방법/ })).toHaveAttribute('href', /\/build\/assembly/);
  });
  ```

- [ ] **Step 2: Run the test before scaffolding**

  Run `npm run test:e2e -- tests/e2e/guide.spec.ts`.

  Expected: FAIL because `package.json`, the VitePress site, and the preview server do not exist.

- [ ] **Step 3: Create the minimal VitePress project**

  Add `vitepress`, `vue`, `animejs`, `vitest`, `@playwright/test`, and `typescript` dependencies. Create `playwright.config.ts` with a preview `baseURL` and Chromium project. Define scripts:

  ```json
  {
    "scripts": {
      "dev": "vitepress dev docs",
      "build": "vitepress build docs",
      "preview": "vitepress preview docs",
      "test:unit": "vitest run",
      "test:e2e": "playwright test"
    }
  }
  ```

  Configure `base: '/ShieldSigner-Guide/'`, `cleanUrls: true`, Korean metadata, and a temporary landing page with explicit route links.

- [ ] **Step 4: Add the Pages workflow**

  Configure `.github/workflows/deploy-pages.yml` to install with `npm ci`, run `npm run build`, upload `.vitepress/dist`, and deploy with the official Pages actions on `main`. Set `contents: read`, `pages: write`, and `id-token: write` permissions.

- [ ] **Step 5: Run the build and smoke test**

  Run `npm run build`, then `npm run preview -- --host 127.0.0.1` and `npm run test:e2e -- tests/e2e/guide.spec.ts`.

  Expected: build succeeds; the landing page test passes at `/ShieldSigner-Guide/`.

- [ ] **Step 6: Commit**

  ```bash
  git add package.json package-lock.json .gitignore .vitepress/config.ts docs/index.md .github/workflows/deploy-pages.yml README.md tests/e2e/guide.spec.ts
  git commit -m "chore: scaffold ShieldSigner Pages guide"
  ```

## Task 2: Implement Logo, Tokens, and Responsive Docs Shell

**Files:**
- Create: `public/brand/shieldsigner.svg`
- Create: `.vitepress/theme/index.ts`
- Create: `.vitepress/theme/Layout.vue`
- Create: `.vitepress/theme/custom.css`
- Create: `.vitepress/theme/components/MediaPlaceholder.vue`
- Modify: `.vitepress/config.ts`
- Test: `tests/e2e/guide.spec.ts`

**Interfaces:**
- `Layout.vue` renders VitePress content inside `.ss-docs-shell` and exposes the route to `GuideNav`.
- `MediaPlaceholder.vue` accepts `{ label?: string; aspect?: string }` and renders a fixed-ratio, accessible replacement region.

- [ ] **Step 1: Add SVG logo and token assertions**

  Create `public/brand/shieldsigner.svg` with the 1214×389 aspect ratio, orange outer shape, white left panel, yellow chip, and outlined text paths. Add an e2e assertion that `img[alt="ShieldSigner"]` resolves to `/ShieldSigner-Guide/brand/shieldsigner.svg`.

- [ ] **Step 2: Implement the shell structure**

  Build `Layout.vue` with this DOM contract: `.ss-topbar`, `.ss-category-nav`, `.ss-chapter-rail`, `.ss-article`, `.ss-mobile-tabs`, and the VitePress content slot. Keep all content available without JavaScript.

- [ ] **Step 3: Implement responsive styles**

  Add `#252423`, `#2A2928`, `#FD6D02`, and `#FDFDFD` tokens, the 3-column layout at `min-width: 1200px`, 2-column layout from `760px` to `1199px`, and mobile single-column layout below `760px`. Add `:focus-visible`, `aria-current`, code overflow, table overflow, and touch-size rules.

- [ ] **Step 4: Run desktop and mobile smoke checks**

  Run `npm run build` and `npm run test:e2e -- tests/e2e/guide.spec.ts --project=chromium` with viewport assertions at `{ width: 1440, height: 980 }` and `{ width: 390, height: 844 }`.

  Expected: desktop exposes all three columns; mobile hides desktop rails, exposes `.ss-mobile-tabs`, and has no horizontal document overflow.

- [ ] **Step 5: Commit**

  ```bash
  git add public/brand/shieldsigner.svg .vitepress/theme .vitepress/config.ts tests/e2e/guide.spec.ts
  git commit -m "feat: add ShieldSigner responsive docs shell"
  ```

## Task 3: Add Typed Navigation and Anime.js Motion

**Files:**
- Create: `src/guide/chapters.ts`
- Create: `src/guide/animation.ts`
- Create: `.vitepress/theme/components/GuideNav.vue`
- Create: `.vitepress/theme/components/AnimatedChapter.vue`
- Modify: `.vitepress/theme/Layout.vue`
- Modify: `.vitepress/theme/custom.css`
- Create: `tests/guide/chapters.spec.ts`
- Modify: `tests/e2e/guide.spec.ts`

**Interfaces:**
- `ChapterMeta` is `{ id: string; label: string; href: string; group: string; order: number }`.
- `chapters` is a readonly `ChapterMeta[]` containing every route in the File Map.
- `getChapterByPath(pathname: string): ChapterMeta | undefined` resolves a normalized route.
- `animateEnter(targets: Element | Element[], options?: { reducedMotion?: boolean }): void` and `animateSwap(targets: Element | Element[], options?: { reducedMotion?: boolean }): void` are the only components’ Anime.js entry points.

- [ ] **Step 1: Write navigation unit tests**

  Test that every chapter has a unique `id`, an absolute site-relative `href`, and that `/seedkeeper/backup/` resolves to the SeedKeeper backup chapter.

  ```ts
  import { describe, expect, it } from 'vitest';
  import { chapters, getChapterByPath } from '../../src/guide/chapters';

  describe('guide chapters', () => {
    it('contains unique routes', () => {
      expect(new Set(chapters.map((chapter) => chapter.href)).size).toBe(chapters.length);
    });

    it('resolves the SeedKeeper backup route', () => {
      expect(getChapterByPath('/seedkeeper/backup/')?.label).toBe('시드를 카드에 백업하기');
    });
  });
  ```

- [ ] **Step 2: Run the unit test before implementation**

  Run `npm run test:unit -- chapters.spec.ts`.

  Expected: FAIL because `chapters.ts` and `getChapterByPath` do not exist.

- [ ] **Step 3: Implement chapter metadata and nav**

  Add all routes from the spec, with SeedKeeper as a first-class group between OS and wallet sections. `GuideNav.vue` renders desktop category buttons, chapter cards, and mobile tabs; it sets `aria-current="page"` on the active route and updates the URL through normal links.

- [ ] **Step 4: Implement the motion wrapper**

  Import only `animate` and `stagger` from `animejs`. Use 250–650ms opacity/transform transitions for chapter entry and swap. Return immediately when `matchMedia('(prefers-reduced-motion: reduce)').matches` and never make content depend on animation completion.

- [ ] **Step 5: Run unit, build, and interaction tests**

  Run `npm run test:unit -- chapters.spec.ts`, `npm run build`, and the e2e test that clicks `SeedKeeper 백업`, checks the URL, checks the active navigation state, and repeats at mobile width.

  Expected: all pass; reduced-motion test sees the same text and links without waiting for an animation.

- [ ] **Step 6: Commit**

  ```bash
  git add src/guide .vitepress/theme tests/guide/chapters.spec.ts tests/e2e/guide.spec.ts
  git commit -m "feat: add animated guide navigation"
  ```

## Task 4: Build Introduction, Assembly, OS Install, and Verification Content

**Files:**
- Create: `.vitepress/theme/components/Callout.vue`
- Create: `docs/build/assembly.md`
- Create: `docs/os/install.md`
- Create: `docs/os/verify.md`
- Modify: `docs/index.md`
- Modify: `.vitepress/config.ts`
- Modify: `tests/e2e/guide.spec.ts`

**Interfaces:**
- `Callout.vue` accepts `{ type: 'info' | 'warning' | 'danger' | 'success'; title: string }` and a slot body.
- Each Markdown page exposes frontmatter keys `title`, `description`, `verifiedOn`, `verifiedVersion`, and `estimatedTime`.

- [ ] **Step 1: Write content/link tests**

  Add e2e assertions for `/build/assembly/`, `/os/install/`, and `/os/verify/`: each page shows its version badge, preparation list, checklist, and a visible stop condition.

- [ ] **Step 2: Implement the callout and page frontmatter**

  Render callouts with text labels in addition to color, and render frontmatter metadata in the page header.

- [ ] **Step 3: Write the assembly page**

  Cover component inventory, camera/display/button orientation, cable locking, case closure, first boot test, common assembly mistakes, and a completion checklist. Use `MediaPlaceholder` for every future product photo.

- [ ] **Step 4: Write OS install and verification as separate pages**

  The install page covers the correct hardware image, microSD writing, and first boot. The verification page separates publisher fingerprint, PGP signature, SHA-256 digest, mismatch stop conditions, and verified recording before the image is opened or flashed.

- [ ] **Step 5: Run content tests and build**

  Run `npm run build` and `npm run test:e2e -- tests/e2e/guide.spec.ts`.

  Expected: all three routes load directly under `/ShieldSigner-Guide/`, metadata is visible, and no page contains `undefined-*` links.

- [ ] **Step 6: Commit**

  ```bash
  git add docs/build docs/os docs/index.md .vitepress/theme/components/Callout.vue .vitepress/config.ts tests/e2e/guide.spec.ts
  git commit -m "feat: add assembly and OS verification guides"
  ```

## Task 5: Build the SeedKeeper Backup and Recovery Section

**Files:**
- Create: `docs/seedkeeper/javacard.md`
- Create: `docs/seedkeeper/what-is-seedkeeper.md`
- Create: `docs/seedkeeper/initialize.md`
- Create: `docs/seedkeeper/backup.md`
- Create: `docs/seedkeeper/clone.md`
- Create: `docs/seedkeeper/restore.md`
- Create: `docs/seedkeeper/recovery.md`
- Create: `.vitepress/theme/components/BackupMatrix.vue`
- Modify: `src/guide/chapters.ts`
- Modify: `tests/e2e/guide.spec.ts`

**Interfaces:**
- `BackupMatrix.vue` accepts rows `{ medium: string; protects: string; recovery: string; tradeoff: string }[]` and renders a captioned, mobile-scrollable table.
- SeedKeeper pages link to each other through explicit previous/next links and to `sources.md`.

- [ ] **Step 1: Write SeedKeeper route and safety tests**

  Assert the seven routes exist, `/seedkeeper/backup/` contains `plaintext export` and `encrypted export` warnings, `/seedkeeper/restore/` contains a first-address verification step, and all pages link to the official applet source.

- [ ] **Step 2: Write the JavaCard and SeedKeeper conceptual pages**

  Explain the layers: smart card → secure element → JavaCard platform → applet → SeedKeeper Applet. Separately explain SeedKeeper-Tool, mobile NFC, desktop card reader, PIN, seed, masterseed, authentikey, and truststore without claiming that the card is unbreakable.

- [ ] **Step 3: Write initialize, backup, and clone flows**

  Document card detection, label, PIN setup, ShieldSigner seed selection, card transfer, label confirmation, backup listing, secure pairing where required, and verification on the destination card. Put plaintext exposure in a danger callout and distinguish encrypted export compatibility.

- [ ] **Step 4: Write restore and recovery flows**

  Separate plaintext and encrypted import, describe compatible-device constraints, require a testnet or first-address check after restore, and document card loss, multiple physical copies, PIN loss, and periodic recovery rehearsal.

- [ ] **Step 5: Add the backup comparison matrix**

  Compare paper, metal, one SeedKeeper card, and multiple SeedKeeper cards by what is protected, physical risk, recovery path, and operational tradeoff. Do not prescribe a fixed number of copies.

- [ ] **Step 6: Run content tests and build**

  Run `npm run build` and `npm run test:e2e -- tests/e2e/guide.spec.ts`.

  Expected: all SeedKeeper routes load at direct URLs, long tables scroll on mobile, and no security warning is conveyed by color alone.

- [ ] **Step 7: Commit**

  ```bash
  git add docs/seedkeeper src/guide/chapters.ts .vitepress/theme/components/BackupMatrix.vue tests/e2e/guide.spec.ts
  git commit -m "feat: add SeedKeeper backup and recovery guides"
  ```

## Task 6: Add Wallet, Transaction, Reference, and Attribution Content

**Files:**
- Create: `docs/wallet/bluewallet.md`
- Create: `docs/wallet/coconut.md`
- Create: `docs/transactions/receive.md`
- Create: `docs/transactions/sign-psbt.md`
- Create: `docs/reference/security.md`
- Create: `docs/reference/faq.md`
- Create: `docs/reference/glossary.md`
- Create: `docs/reference/sources.md`
- Create: `ATTRIBUTION.md`
- Modify: `.vitepress/config.ts`
- Modify: `tests/e2e/guide.spec.ts`

**Interfaces:**
- Every external integration page includes `VersionBadge`, official link, network/script policy check, first-address verification, and a next-step link.
- `sources.md` and `ATTRIBUTION.md` are linked from the global footer and reference page.

- [ ] **Step 1: Write integration and transaction tests**

  Assert BlueWallet and 코코넛 월렛 pages mention watch-only, XPUB, derivation path, and first-address comparison. Assert PSBT page mentions recipient, amount, fee, change, sign, return, and broadcast.

- [ ] **Step 2: Write both watch-only wallet pages**

  Cover XPUB export, network and script type, account/derivation path, descriptor or policy where applicable, adding the wallet, and verifying the first receive address on ShieldSigner.

- [ ] **Step 3: Write receive and PSBT pages**

  Cover receive-address verification, coordinator-generated PSBT QR, on-device review, refusal conditions, signed PSBT return, and coordinator broadcast. State that a QR transport is not a trust guarantee.

- [ ] **Step 4: Write security, FAQ, glossary, and sources**

  Include non-affiliation wording, absolute-claim replacements, testnet-first practice, SeedKeeper terms, PGP/hash terms, PSBT terms, version verification fields, and official upstream links.

- [ ] **Step 5: Add attribution**

  Record Anime.js MIT, SeedSigner MIT, SeedKeeper Applet AGPL-3.0, and external wallet references separately. Do not imply that SeedSigner or SeedKeeper endorses ShieldSigner.

- [ ] **Step 6: Run content tests and build**

  Run `npm run build` and `npm run test:e2e -- tests/e2e/guide.spec.ts`.

  Expected: all links resolve under the project base path and the attribution page is reachable from every route.

- [ ] **Step 7: Commit**

  ```bash
  git add docs/wallet docs/transactions docs/reference ATTRIBUTION.md .vitepress/config.ts tests/e2e/guide.spec.ts
  git commit -m "feat: add wallet transaction and reference guides"
  ```

## Task 7: Full Accessibility, Responsive, and Deployment Verification

**Files:**
- Modify: `tests/e2e/guide.spec.ts`
- Modify: `.github/workflows/deploy-pages.yml`
- Modify: `README.md`
- Modify: `.gitignore`

**Interfaces:**
- The final e2e suite covers desktop, tablet, mobile, keyboard focus, reduced motion, direct route loading, and no horizontal overflow.

- [ ] **Step 1: Add responsive and accessibility tests**

  Test viewports `{ width: 1440, height: 980 }`, `{ width: 900, height: 900 }`, and `{ width: 390, height: 844 }`. Tab through the header and chapter links, assert visible focus, assert `aria-current`, and check `document.documentElement.scrollWidth <= window.innerWidth` on mobile.

- [ ] **Step 2: Add reduced-motion test**

  Emulate `prefers-reduced-motion: reduce`, open `/seedkeeper/backup/`, and assert the same headings, warning text, and links are visible without waiting for animation events.

- [ ] **Step 3: Verify the production build and Pages artifact**

  Run `npm ci`, `npm run build`, inspect `.vitepress/dist/index.html`, `.vitepress/dist/brand/shieldsigner.svg`, and each direct route, then run the preview smoke suite.

- [ ] **Step 4: Verify attribution and public-site warnings**

  Confirm README and footer state that GitHub Pages is public, no secrets or seed data are accepted, and the site is an independent ShieldSigner guide.

- [ ] **Step 5: Commit and prepare deployment**

  ```bash
  git add tests/e2e/guide.spec.ts .github/workflows/deploy-pages.yml README.md .gitignore
  git commit -m "test: verify responsive guide and Pages deployment"
  ```

- [ ] **Step 6: Push and confirm Pages**

  Rename the local branch to `main` when needed, push `main` to the configured `JikkeyBTC/ShieldSigner-Guide` remote, enable GitHub Pages with the Actions source, and open `https://jikkeybtc.github.io/ShieldSigner-Guide/` to confirm the logo, navigation, SeedKeeper routes, and mobile layout.

## Verification Summary

Before declaring the site complete, run:

```bash
npm ci
npm run test:unit
npm run build
npm run test:e2e
```

The final suite must verify the full path: browser → navigation → Markdown page → SeedKeeper safety content → static asset and attribution. No task is complete if the VitePress build passes while a direct GitHub Pages route, mobile layout, SVG logo, PGP verification page, or SeedKeeper backup flow is broken.
