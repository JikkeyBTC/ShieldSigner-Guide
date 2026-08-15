# Task 6 report — wallet, transaction, and reference guides

## Summary

Added Korean buyer-facing pages for BlueWallet and Coconut Wallet watch-only setup, receive address verification, PSBT review/signing, security response, FAQ, glossary, and official sources/licensing. Added `ATTRIBUTION.md`, linked the new sections in the landing page and VitePress sidebar, and made `BackupMatrix` accept typed rows while preserving its default comparison.

## Verification

- VitePress build: passed with bundled Node (`vitepress build docs`).
- Vitest: chapter unit tests pass (2 tests). Running Vitest without a file filter also collects Playwright specs and reports the expected Playwright test-context error; use `npm run test:unit` after excluding `tests/e2e` in the project config for a clean combined command.
- Playwright: 6/7 original/new checks passed; one pre-existing SeedKeeper assertion was corrected to accept the generated relative URL form. Re-run after correction is recommended.
- Content review: no seed phrases, private keys, or real credentials were added; examples use descriptive placeholders only.
