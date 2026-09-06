---
title: Load a seed from the card
description: Authenticate with the card PIN and load a saved BIP39 seed into ShieldSigner
---

<script setup>
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Load a seed from the card

Read a saved seed from SeedKeeper into ShieldSigner. The copy stored on the card remains available. This guide follows ShieldSigner B12 with a standard BIP39 seed.

**Seeds → From SeedKeeper → Card PIN → Select Secret → Finalize Seed → Done**

## 1. Open Seeds

Insert the card you used in [Save a seed to the card](./save), then open **Seeds** from the home menu. If **In-Memory Seeds** appears, choose **Load a seed**.

## 2. Select From SeedKeeper

In **Load a Seed**, choose **From SeedKeeper**. In the simulator, select the same demo card A, B, or C that you saved to. Use public practice values only; never enter a real seed or card PIN into the simulator.

## 3. Enter the PIN

At **Card PIN**, enter this card's PIN and confirm with the green check button. Depending on settings, a cached PIN may skip the prompt. If authentication fails, check your PIN record rather than guessing repeatedly.

## 4. Choose the saved seed

Select the label you assigned in **Select Secret**. A label is only a name; confirm the actual fingerprint on the next screen.

## 5. Confirm the fingerprint

At **Finalize Seed**, compare the fingerprint with the one recorded before saving. The illustrated Korean walkthrough uses the public test fingerprint **b2269592** before and after loading.

B12 also reads the passphrase saved with a BIP39 seed. If your backup requires a separately held passphrase, apply it before comparing the intended wallet fingerprint. Select **Done** to open the seed's menu.

For a first backup check, also compare the first receive address with your existing wallet using the same network, script type, account, and address index. Resolve any mismatch before transacting.

## 6. Clear the device after use

After finishing, select **Discard seed** from the seed menu. At **Discard Seed?**, check the fingerprint and choose **Discard** if you have a backup and no longer need the seed in memory. **Keep seed** returns without clearing it.

This removes the temporary copy from ShieldSigner, not the stored copy on the card. Removing the card alone does not clear the device's memory. Clear the seed or power off the physical device after use. Do not use **Factory Reset Card** for this task.

## If loading fails

- **No Secrets to Load:** check that this is the card you saved to and that it contains a compatible seed.
- **Card Uninitialised:** check your card selection; a card with only first setup completed still has no seed to load.
- **Missing label:** check the selected card and the name used when saving. Entries from other apps may have an unsupported format or export policy.
- **Different fingerprint:** check the selected seed and passphrase; do not confuse a label or card UID with the wallet fingerprint.
- **Forgotten PIN:** stop guessing and check your records or separate backup. A factory reset does not recover stored data.

[← Save a seed to the card](./save) · [Next: Watch-only wallets →](../wallet/)

Source: [ShieldSigner B12 seed storage and loading implementation](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/views/seed_views.py).

</GuideContent>
