# Send/Receive Active Loop Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the Send and Receive cards replay their Bitcoin transfer animation continuously only while the corresponding card is the active route.

**Architecture:** Keep the existing Anime.js card animation mapping in `DemoCards.vue`, add a small lifecycle-managed loop controller for the two transfer cards, and drive it from the reactive `activeCard` state. Direct card clicks and table-of-contents navigation continue to use the existing one-shot animation path; the active-route watcher starts or stops the loop after navigation settles.

**Tech Stack:** Vue 3 `<script setup>`, VitePress theme components, Anime.js, Playwright.

## Global Constraints

- Only Send and Receive use a repeating animation; all other cards keep their current one-shot click animation.
- The loop must stop when the active route changes or the component unmounts.
- `prefers-reduced-motion: reduce` disables the loop and leaves the transfer card static.
- The existing independent card-rail scroll and article navigation behavior must not change.

---

### Task 1: Add the active transfer loop controller

**Files:**
- Modify: `docs/.vitepress/theme/components/DemoCards.vue`

**Interfaces:**
- Consumes: `activeCard`, `current`, `transferDistance`, and the existing `.ss-demo-transfer-bitcoin` nodes.
- Produces: a lifecycle-safe `startTransferLoop(card)` / `stopTransferLoop()` pair used by the route watcher and unmount hook.

- [ ] **Step 1: Add the loop state and cleanup contract**

  Add one Anime.js animation handle and one timer/cleanup callback near the existing rail state. The cleanup must pause or remove the running animation and clear any pending restart timer.

- [ ] **Step 2: Implement the Send/Receive loop direction**

  For `branch-send`, animate Bitcoin from the user-side offset to the destination, then restart from the user-side offset. For `branch-receive`, animate from the destination offset back to the user. Measure the rendered distance with `transferDistance(cardElement)` and use Anime.js `loop: true`/alternating keyframes or an equivalent reset-safe timeline so repeated passes do not accumulate transforms.

- [ ] **Step 3: Start and stop from reactive route state**

  After `nextTick()` in the existing `current` watcher, find the active card and call `startTransferLoop` only when its id is `branch-send` or `branch-receive`. Call `stopTransferLoop` for every other route and in `onBeforeUnmount`. Skip starting when reduced motion is enabled.

### Task 2: Add regression coverage

**Files:**
- Modify: `tests/e2e/guide.spec.ts`

**Interfaces:**
- Consumes: the active Send/Receive card DOM and its Bitcoin node style.
- Produces: a browser assertion that the loop is active only on the matching route and stops after leaving it.

- [ ] **Step 1: Assert Send loop starts after route activation**

  Navigate to `/ko/transactions/send-guide/`, sample the Bitcoin node transform twice over a short interval, and assert that the node has an animation style/active animation state.

- [ ] **Step 2: Assert Receive uses its own route and loop**

  Navigate to `/ko/transactions/receive-guide/`, verify its Bitcoin node is present and animated, then navigate to a non-transfer card and assert no transfer animation remains active.

- [ ] **Step 3: Run focused and full checks**

  Run the focused Playwright test, the full `tests/e2e/guide.spec.ts` suite, `vitepress build docs`, and `git diff --check`.

- [ ] **Step 4: Commit**

  ```bash
  git add docs/.vitepress/theme/components/DemoCards.vue tests/e2e/guide.spec.ts docs/superpowers/plans/2026-08-17-send-receive-loop-animation.md
  git commit -m "feat: loop active send and receive card animations"
  ```
