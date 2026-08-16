---
title: Verification
description: Verify ShieldSigner image integrity and release authenticity
---

# Verification

SHA-256 answers “was this file changed?” PGP answers “was it signed by the expected maintainer?” Both checks must pass.

## SHA-256

Use `Get-FileHash`, `shasum -a 256`, or `sha256sum` and compare the result character by character with the release file.

## PGP

Import the maintainer key from an independent official source, confirm its fingerprint, then run `gpg --verify image.asc image.img`.

Stop immediately on any mismatch. Do not flash, boot, or “fix” a failed verification by editing the expected value.

