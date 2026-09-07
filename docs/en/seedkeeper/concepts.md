---
title: Concepts
description: Understand the SeedKeeper card, applet, PIN, and seed flow
---

# Concepts

SeedKeeper stores encrypted secrets in a JavaCard applet and protects access with a PIN.<br> ShieldSigner uses the card as an offline backup for a seed while keeping signing on the device.

## Applet

An applet is the program installed on the card.<br> This guide uses the official `SeedKeeper-0.2-official.cap` applet.

## PIN

The PIN protects card operations.<br> Choose a unique PIN and never share it or store it with the card.

## Seed flow

Initialize the card and set its PIN, save a seed, then load it only when needed.<br> After use, clear the temporary copy from ShieldSigner.

<Callout type="warning" title="A PIN is not a seed backup">
Setting a PIN only prepares the card.<br> Save the seed and keep an independent paper or metal backup.
</Callout>

