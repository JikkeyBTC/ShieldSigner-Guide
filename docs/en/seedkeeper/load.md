---
title: Load a seed from the card
description: Authenticate with the card PIN and load a saved seed into ShieldSigner
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Load a seed from the card

Read a seed stored on a SeedKeeper card back into ShieldSigner.<br> You can use the loaded seed to check addresses or sign a transaction.<br> **The original stored on the card remains available.**

**Seeds → From SeedKeeper → Card PIN → Select saved seed → Check fingerprint → Done**

This guide follows a **standard BIP39 seed on ShieldSigner B12**.<br> The screenshots show the normal flow for loading a seed saved on the card.

## Before you start

- Prepare the SeedKeeper card and its PIN after completing [Save a seed](./save).<br> A blank card with only a PIN has no seed to load.
- Have the seed fingerprint and card label you recorded while saving.
- Load a real seed only on a physical ShieldSigner.

## 1. Connect the card and open Seeds {#open-seeds}

Turn on ShieldSigner and insert the card containing the saved seed into the reader.<br> Choose **Seeds** from the main menu.

<GuideFigure
  src="/guides/seedkeeper/transfer/09-home-seeds-device.png"
  alt="Full ShieldSigner device with Seeds selected in orange on the main menu."
  caption="Start from Seeds in the main menu when loading a seed."
/>

If another seed is already on the device, **In-Memory Seeds** appears first.<br> Choose **Load a seed** to open the loading screen.

## 2. Choose From SeedKeeper {#from-card}

Open **From SeedKeeper** in the **Load a Seed** list.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/10-from-seedkeeper-screen.png"
  alt="Load a Seed screen with From SeedKeeper selected."
  caption="From SeedKeeper reads a seed from the card into the device."
/>

Connect the **same card** you used when saving the seed.<br> A different blank card will not show the saved seed.

## 3. Enter the card PIN {#card-pin}

At **Card PIN**, enter the current card's PIN and press the green **confirm button** at the lower right.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/11-load-pin-screen.png"
  alt="Card PIN entry screen shown before loading a seed from the card."
  caption="PIN authentication allows ShieldSigner to read the saved seed list."
/>

Depending on settings, the PIN may not be requested again.<br> If the PIN is rejected, check the remaining attempts and your PIN record instead of guessing repeatedly.

## 4. Select the saved seed {#select-secret}

The card entries appear under **Select Secret**.<br> Choose the **Seed Label** you assigned while saving.<br> If there are several entries, move to the intended one and confirm.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/12-select-secret-screen.png"
  alt="Select Secret list showing the previously saved name b2269592."
  caption="This example keeps the default name, so the seed fingerprint appears in the list."
/>

The list name is only a label chosen by the user.<br> Even when it looks correct, check the loaded seed's actual fingerprint on the next screen.

## 5. Check the fingerprint and choose Done {#fingerprint}

At **Finalize Seed**, compare the fingerprint with the value recorded before saving.<br> This example shows **b2269592** both before saving and after loading.<br> On your card, compare your own seed's fingerprint.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/13-loaded-fingerprint-screen.png"
  alt="Finalize Seed screen for a loaded seed, showing the same fingerprint b2269592 and a Done button."
  caption="Compare the value before saving with the value after loading, then choose Done."
/>

If the wallet uses a passphrase, confirm that it is applied correctly.<br> B12 reads a passphrase saved with the seed; if your backup keeps it separately, apply it before comparing the wallet fingerprint.

When the fingerprint matches, choose **Done**.<br> A seed menu with the fingerprint at the top means loading is complete.

<GuideFigure
  src="/guides/seedkeeper/transfer/14-seed-loaded-device.png"
  alt="ShieldSigner seed menu after loading a seed from the card, with fingerprint b2269592 at the top."
  caption="The loaded seed is ready to use on the device. The copy stored on the card is not deleted."
/>

For a first backup check, open **Address explorer** and choose the same network, script type, account, and address index as the existing wallet.<br> Compare the first receiving address too.<br> If the fingerprint or address differs, stop and review the seed and wallet settings before transacting.

## 6. Clear device memory after use {#discard}

After checking addresses or completing signing, choose **Discard seed** near the bottom of the seed menu.<br> This clears the temporary seed loaded into device memory.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/07-discard-seed-screen.png"
  alt="Seed menu with Discard seed selected near the bottom."
  caption="Choose Discard seed to clear a seed after you finish using it."
/>

On the **Discard Seed?** screen, check the fingerprint again.<br> If your backup is ready and you are finished, choose **Discard**.<br> Choose **Keep seed** to return without clearing it.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/08-discard-confirm-screen.png"
  alt="Discard Seed? confirmation screen with Wipe seed b2269592 from the device?, Keep seed, and Discard buttons."
  caption="From the device means that only device memory is cleared; card storage is not deleted."
/>

<Callout type="warning" title="Removing the card alone does not clear the device seed">

The loaded seed remains in device memory.<br> After use, clear it with **Discard seed** or turn off the physical device.<br> **Factory Reset Card** is a different operation and is not part of this process.

</Callout>

## If loading fails

| Situation | What to do |
| --- | --- |
| `No Secrets to Load` appears | The connected card has no seed that this menu can load. Confirm that you used the right card and completed the save operation. |
| `Card Uninitialised` appears | The card has not completed PIN setup. Confirm that it is the card containing the saved seed. |
| The desired name is missing | Check the selected card and the label used while saving. Entries saved by another app may use an unsupported format or export policy. |
| The fingerprint differs | Check the selected seed and passphrase. Do not confuse a label or card UID with the wallet fingerprint. |
| You forgot the PIN | Stop entering guesses and check your stored record or an independent backup. Card initialization cannot recover existing data. |

## Next step

[← Save a seed to the card](./save) · [Next: Connect a watch-only wallet →](../wallet/)

Procedure reference: [ShieldSigner B12 seed storage and loading source](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/views/seed_views.py)

</GuideContent>
