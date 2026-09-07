---
title: Frequently asked questions
description: Common questions about using ShieldSigner and SeedKeeper
---

# Frequently asked questions

## Can I enter a seed on my phone?

No.<br> Watch-only wallets use only public information such as a descriptor or xpub.<br> Keep the seed and private key inside ShieldSigner and SeedKeeper.

## The address differs between the app and device

Check the network, account type, and derivation path, then stop receiving or signing.<br> Never send even a small test amount to an address that does not match.

## Why does a PSBT QR use several frames?

The transaction data does not fit on one screen.<br> Scan every frame in order and confirm that no missing-frame warning appears.

## I forgot the PIN

Stop guessing.<br> Check SeedKeeper's lock policy and first see whether recovery is possible from a separate card or metal backup.

## Can the signing device connect to the internet?

Keep the signing device offline by default.<br> Create and broadcast transactions in the watch-only app, and send ShieldSigner only the PSBT it needs.

<GuideNav prev="/reference/security" next="/reference/glossary" prevLabel="Previous: Security model" nextLabel="Next: Glossary" />

