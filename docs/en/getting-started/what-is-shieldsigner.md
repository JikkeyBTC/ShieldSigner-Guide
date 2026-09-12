---
title: What is ShieldSigner?
description: Learn about the SeedSigner-based ShieldSigner and the SeedKeeper features supported by this device.
---

<script setup>
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# What is ShieldSigner?

**ShieldSigner is a fork of SeedSigner that extends its smartcard and backup features.**<br>
A fork builds on an existing open-source project and develops it with additional capabilities.

It keeps SeedSigner's offline Bitcoin signing workflow and adds ways to **store seeds and passphrases on a PIN-protected card and load them when needed**.<br>
This guide covers ShieldSigner built with a **Raspberry Pi Zero v1.3**.

## The role it inherits from SeedSigner

ShieldSigner is not a box that holds bitcoin. It is a device for **reviewing and signing transactions**.<br>
An online wallet creates an unsigned transaction, or PSBT. You review the recipient, amount and fee on ShieldSigner, sign it, and return the result to the online wallet for broadcast.

In ordinary seed-based use, the device loads the seed into working memory.<br>
You need to load it again after powering off, so keep a **recoverable backup separate from the device**. SeedKeeper provides one way to store and reload that information.

## What does SeedKeeper add?

SeedKeeper is a **secret-storage applet** that runs on a JavaCard.<br>
After PIN authentication, you can load the information stored on the card into ShieldSigner.

- **Seeds and passphrases:** load a seed alone, a seed and passphrase together, or a passphrase separately.
- **Wallet configuration:** save and load single-signature or multisignature descriptors. A descriptor records information such as the public keys and rules needed to generate the wallet's addresses.
- **Other secrets:** store supported text secrets and display them as text or a QR code when needed.

The card does not contain a bitcoin balance.<br>
It holds the seed, passphrase and wallet configuration that help you access the same wallet again.

## This device supports SeedKeeper only

**Smartcard support on the ShieldSigner device covered by this guide is limited to SeedKeeper.**<br>
Store seeds, passphrases and wallet configuration on SeedKeeper, then load the information into the device after PIN authentication.

Bitcoin transactions are **signed by ShieldSigner using the loaded seed**, not inside the SeedKeeper card.

Follow [card initialization and PIN](../seedkeeper/initialize) → [save a seed](../seedkeeper/save) → [load a seed](../seedkeeper/load) to get started.

</GuideContent>
