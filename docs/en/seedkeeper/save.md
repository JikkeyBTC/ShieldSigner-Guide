---
title: Save a seed to the card
description: Save a seed from ShieldSigner to a prepared SeedKeeper card and confirm the result
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Save a seed to the card

Save a seed loaded in ShieldSigner to a SeedKeeper card.<br> Connect the card, enter its PIN, and keep the backup under an easy-to-recognize name.

**Select seed → Backup seed → To SeedKeeper → Card PIN → Seed Label → Complete**

This guide follows a **standard BIP39 seed on physical ShieldSigner B12 hardware**.<br> The pictures are **interface illustrations, not photographs of physical hardware**. Do not copy the illustrated fingerprints or labels; check the values on your own device.

## Before you start

- Prepare a SeedKeeper card and its PIN after completing [Initialize the card and set a PIN](./initialize).
- Load the seed you want to save into ShieldSigner.<br> If it is not loaded yet, start with step 1 below.
- Keep your existing paper or metal backup when saving for the first time.<br> Decide on your backup arrangement only after loading the seed back and confirming it.

<Callout type="warning" title="Enter seeds and PINs only on the device">

Enter seeds and PINs on your physical ShieldSigner, and do not leave them in photos, chats, or web pages.<br> Keep your existing backup after saving, then load the seed back and verify its fingerprint and addresses.

</Callout>

## 1. Prepare the seed to save {#choose-seed}

Open **Seeds** from the main menu.<br> If a seed is already loaded, choose the fingerprint of the seed to save from **In-Memory Seeds**.

If no seed is loaded, use **Enter 12-word seed** or **Enter 24-word seed** on the **Load a Seed** screen according to the number of words on your paper or metal backup.<br> If you have a SeedQR, you can use **Scan a SeedQR**.<br> To add another seed while one is loaded, choose **Load a seed** from the list.

At **Finalize Seed**, check the fingerprint and choose **Done**.<br> If the wallet uses a passphrase, confirm that the intended passphrase is applied before saving.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/01-seed-ready-screen.png"
  alt="Interface illustration of the fingerprint and Done button on Finalize Seed."
  caption="A fingerprint is a short identifier for a seed. Check your seed's value before choosing Done."
/>

## 2. Open Backup seed {#backup-menu}

Move down in the selected seed's menu and open **Backup seed**.<br> Confirm that the fingerprint at the top of the screen is the seed you intend to save.

<GuideFigure
  src="/guides/seedkeeper/transfer/02-backup-seed-device.png"
  alt="Device illustration showing Backup seed selected and the physical-control layout."
  caption="Choose Backup seed with the left directional button, then press the center button."
/>

## 3. Connect the card and choose To SeedKeeper {#to-card}

Insert the SeedKeeper card into the reader and choose **To SeedKeeper**.<br> This menu writes the seed to the card.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/03-to-seedkeeper-screen.png"
  alt="Backup Seed screen with To SeedKeeper selected."
  caption="Choose To SeedKeeper below View seed words."
/>

Insert **one initialized card into the physical reader**.<br> If you have multiple cards, check its label or UID in Card Info to identify the destination. If it is not detected, check the insertion direction and reader connection.

## 4. Enter the card PIN {#card-pin}

At **Card PIN**, enter the PIN chosen during initialization.<br> Select characters with the device's directional controls and enter them with the center button. Finish using the **physical button** corresponding to the green check mark at the lower right.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/04-card-pin-screen.png"
  alt="Card PIN screen with an empty entry field, keyboard, and green confirm mark at the lower right."
  caption="This is not a new-PIN step. Enter the PIN assigned to the current card."
/>

Depending on settings, PIN entry may be skipped.<br> If **Card Uninitialised** appears instead, complete the new card setup and see the [initialization guide](./initialize#new-card).

## 5. Choose a label {#seed-label}

**Seed Label** is the name shown in the card's list.<br> You can keep the default fingerprint or replace it with a recognizable name.<br> Do not put seed words or a PIN in the label.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/05-seed-label-screen.png"
  alt="Interface illustration of a fingerprint used as the default Seed Label."
  caption="This example keeps the default name. Press the green confirm button to begin saving."
/>

Do not remove the card or turn off the device while the seed is being saved.

## 6. Confirm Secret Saved {#saved}

When **Secret Saved** and **Secret Successfully Saved to Seedkeeper** appear, the seed has been saved to the card.<br> Choose **OK** to return to the seed menu.

<GuideFigure
  src="/guides/seedkeeper/transfer/06-secret-saved-device.png"
  alt="Device illustration showing Secret Saved and Secret Successfully Saved to Seedkeeper."
  caption="Secret Saved confirms completion. Next, load the seed back from the card to check the backup."
/>

Next, use [Load a seed from the card](./load) to confirm that the same seed can be read back.<br> Compare the fingerprint recorded before saving with the loaded fingerprint.

<Callout type="info" title="If you use a passphrase">

This B12 BIP39 save path also stores the passphrase applied to the seed.<br> If you want to keep the passphrase separately from the card, first confirm which passphrase is currently applied.

</Callout>

## If saving fails

| Situation | What to do |
| --- | --- |
| **To SeedKeeper** is not shown | Confirm that the firmware is ShieldSigner and smart-card support is enabled. The menu differs from standard SeedSigner. |
| `Incorrect PIN` appears | Check the card and your PIN record. Do not guess repeatedly because attempts are limited. |
| `Not Enough Space` appears | The card is full. Use another prepared card, or review an independent backup before clearing card contents. |
| An error occurs while saving | Check the connection and first look in the load list for the saved result. Confirm the result before retrying so you do not create duplicates. |

## Next step

[← Initialize the card and set a PIN](./initialize) · [Next: Load a seed from the card →](./load)

Procedure reference: [ShieldSigner B12 seed storage and loading source](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/views/seed_views.py)

</GuideContent>
