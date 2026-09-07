---
title: Security model
description: Threats and response steps for ShieldSigner buyers
---

# Security model

ShieldSigner separates seeds and signing keys from network-connected devices.<br> Safety depends on checking the device, protecting backups, and reviewing transactions together.

## Risks we reduce

- Keep private keys away from watch-only apps and online computers.
- Review the destination, amount, and fee on an independent PSBT screen.
- Store an encrypted backup on a SeedKeeper card.

## Risks that remain

Malicious or modified OS images, incorrect address checks, exposed PINs, phishing apps, and lost backups remain within the user's responsibility.<br> Check official releases and signatures, and test recovery with a small amount before adding real funds.

## Respond to a mismatch or suspected tampering

If an image hash or signature fails, packaging or parts look different, the screen differs from this guide, or an address differs between the app and ShieldSigner, turn off the device and stop using it immediately.<br> Never send a seed or PIN; give the seller only the symptoms and verification results.<br> Do not sign a new transaction on a device you suspect.

<Callout type="warning" title="If you think a seed was exposed">Treat the seed as no longer safe and plan to move funds to a trusted new wallet. Do not keep reusing the existing card.</Callout>

<GuideNav prev="/transactions/sign-psbt" next="/reference/faq" prevLabel="Previous: Review and sign a PSBT" nextLabel="Next: FAQ" />

