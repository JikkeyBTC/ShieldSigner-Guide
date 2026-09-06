---
title: Save a seed to the card
description: Save a BIP39 seed from ShieldSigner to a prepared SeedKeeper card
---

<script setup>
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Save a seed to the card

This guide follows ShieldSigner B12 with a standard BIP39 seed. Prepare a SeedKeeper card using [Initialize the card and set a PIN](./initialize), and keep your existing backup until you have successfully loaded the saved seed back.

**Select seed → Backup seed → To SeedKeeper → Card PIN → Seed Label → Secret Saved**

## 1. Select your seed

Open **Seeds** from the home screen. Select the seed in **In-Memory Seeds**. If no seed is loaded, use **Enter 12-word seed**, **Enter 24-word seed**, or **Scan a SeedQR**. If another seed is already loaded, select **Load a seed** first.

At **Finalize Seed**, check the fingerprint and select **Done**. If your wallet uses a passphrase, apply the intended passphrase before saving.

## 2. Choose To SeedKeeper

Open **Backup seed**, insert the prepared card, and choose **To SeedKeeper**. Check the fingerprint at the top of the seed menu to ensure you selected the intended seed.

## 3. Enter the card PIN

At **Card PIN**, enter the PIN already assigned to this card and confirm with the green check button. A cached PIN may skip this prompt, depending on settings. If **Card Uninitialised** appears, complete the card's first setup.

## 4. Choose a label

At **Seed Label**, keep the default fingerprint or choose a recognizable name. Do not put your seed words or PIN in the label. Confirm with the green check button, then leave the card connected while saving.

## 5. Confirm the result

**Secret Saved** and **Secret Successfully Saved to Seedkeeper** confirm the write. Select **OK**, then follow [Load a seed from the card](./load) to read it back and compare the fingerprint.

This B12 BIP39 save path also stores the passphrase applied to the seed. Check that behavior against your backup plan if you intend to keep the passphrase separate from the card.

## If saving fails

- **Incorrect PIN:** check your PIN record and remaining attempts; do not repeatedly guess.
- **Not Enough Space:** use another prepared card, or review existing backups before removing card contents.
- **Interrupted save:** check the card's load list before retrying to avoid duplicate entries.

The simulator is for practice with public test values only. Never enter a real seed or card PIN into a website. Actual secrets belong on your offline physical device.

[← Initialize the card](./initialize) · [Next: Load a seed from the card →](./load)

Source: [ShieldSigner B12 seed storage and loading implementation](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/views/seed_views.py).

</GuideContent>
