# Task 4 implementation report

- Commit: `4803d17 feat: add assembly and OS verification guides`
- Added Korean buyer pages for DIY assembly, ShieldSigner OS installation, and GitHub release verification.
- Assembly includes parts, orientation/connector checks, power and microSD safety, first boot, stop conditions, checklist, and replaceable `MediaPlaceholder` blocks.
- OS install separates official SeedSigner firmware reference, GitHub download, PGP/SHA-256 prerequisite, imaging, safe eject, first boot, and recovery.
- Verification includes Windows PowerShell, macOS, and Linux SHA-256 commands; PGP fingerprint replacement field; `gpg --verify`; authenticity vs integrity; mismatch stop procedure.
- Added accessible `Callout` component with text labels and frontmatter metadata chips in the page layout; registered components globally.
- Added Playwright assertions for all three routes, Korean headings, safety text, and verification commands.

## Checks

- `npm run build`: could not run because standalone npm is unavailable in this environment. Direct bundled Node invocation reached VitePress but its worktree dependency symlinks resolve outside the sandbox and esbuild returned `Access is denied`.
- UTF-8 content checked with `Get-Content -Encoding utf8`; Korean text renders correctly. (Default PowerShell/Python console output can display CP949 mojibake, but file bytes are valid UTF-8.)
- Playwright/unit tests: not run because npm/dependency execution is unavailable in this environment.
