# Task 5 report — SeedKeeper backup and recovery guides

## Summary

Added a first-class Korean SeedKeeper chapter for ShieldSigner buyers. The chapter distinguishes JavaCard, the SeedKeeper applet, and the ShieldSigner microSD; covers card initialization and PIN handling; documents encrypted backup, secure card-to-card cloning, restore testing, and loss/recovery planning; and keeps all screenshots and identifiers as placeholders rather than exposing seed material.

## Changed files

- `docs/seedkeeper/javacard.md`
- `docs/seedkeeper/what-is-seedkeeper.md`
- `docs/seedkeeper/initialize.md`
- `docs/seedkeeper/backup.md`
- `docs/seedkeeper/clone.md`
- `docs/seedkeeper/restore.md`
- `docs/seedkeeper/recovery.md`
- `docs/index.md`
- `docs/.vitepress/config.ts`
- `tests/e2e/guide.spec.ts`

## Verification

- Unit: `node node_modules/vitest/vitest.mjs run` — the existing chapter unit suite passed (2 tests); the command also attempted to collect Playwright specs, which is expected to fail when Vitest is pointed at `tests/e2e`.
- Build: `node node_modules/vitepress/bin/vitepress.js build docs` — passed with VitePress 1.6.4.
- E2E: `node node_modules/@playwright/test/cli.js test tests/e2e/guide.spec.ts` — 6 passed, including the new route/heading/link checks.

## Safety notes

The copy avoids vendor-specific UI labels where they are not guaranteed, recommends encrypted export and secure pairing, warns that plaintext export removes protection, and states that a single card is not a complete backup strategy. It never requests or displays real PINs, seeds, or private keys.

## Review follow-up

Added `BackupMatrix.vue` for paper/metal and one/multiple backup comparisons, explicit previous/next navigation across every SeedKeeper page, official SeedKeeper Applet and seedkeeper.io links, and a clearly labeled plaintext-versus-encrypted import section on the restore page. Rebuilt and reran E2E checks: 6 passed.
