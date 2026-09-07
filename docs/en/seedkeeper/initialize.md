---
title: Initialize the card and set a PIN
description: Install the SeedKeeper applet on a physical ShieldSigner and set a PIN on a new card
verifiedOn: 2026-09-06
verifiedVersion: Based on SeSi-0.8.7+ShSi-B12
estimatedTime: 5–10 minutes
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Initialize the card and set a PIN

Choose **your own PIN** to prepare a new SeedKeeper card.<br> The PIN is the password required to use the card's data.<br> It is separate from seed words and a wallet passphrase.

**Connect card → Install SeedKeeper applet → Card Info → Enter new PIN → Confirm PIN → Setup complete**

This guide follows **ShieldSigner B12**.<br> Menu names are shown exactly as they appear in the device's English interface.

<Callout type="warning" title="Initialization here means first setup of a new card">

This guide creates a PIN on a new card.<br> Do not choose **Factory Reset Card**, which erases existing data.<br> If a card is already in use, confirm its existing PIN and backup status first.

</Callout>

## Before you start

- Prepare ShieldSigner after completing [OS installation](../os/install) and [download verification](../os/verification).
- You need a card **on which to install the SeedKeeper applet**.<br> An applet is a program that runs inside the card.<br> This guide installs `SeedKeeper-0.2-official.cap` on a physical ShieldSigner before setting the PIN.
- If you have several cards, label them A, B, and C and set up **one card at a time**.
- Decide how you will keep the new PIN safe.<br> Do not write it on the card or store the card together with its PIN record.

You do not need to create or save a seed yet.<br> Complete the PIN setup first.

## 1. Connect the card and open Tools {#connect}

Turn on ShieldSigner and wait for the main menu.<br> Insert the SeedKeeper card according to the orientation mark on the smart-card reader connected to the device.

Check the card insertion direction before connecting it.

Insert the card with the gold surface facing down.

After connecting the card, choose **Tools** from the main menu.<br> Move the orange selection with the directional buttons, then press the center button to confirm.

<GuideFigure
  src="/guides/seedkeeper/initialize/03-home-tools-device.png"
  alt="ShieldSigner device on an orange suede background with a smart card protruding on the right and its gold contacts visible."
  caption="Insert the card with the gold surface facing down."
/>

## 2. Install the SeedKeeper applet {#install-applet}

The simulator does not support applet installation.<br> Complete this step on a **physical ShieldSigner**.

### Choose Smartcard Tools

Move down in the Tools list and open **Smartcard Tools**.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/05-smartcard-selected-screen.png"
  alt="Device screen with Smartcard Tools selected in the Tools list."
  caption="Choose Smartcard Tools in Tools."
/>

### Enter DIY Tools

Open **DIY Tools** from **Smartcard Tools**.

### Enter Install Applet

Choose **Install Applet** in **DIY Tools**.

### Choose the SeedKeeper applet file

Choose **SeedKeeper-0.2-official.cap** from the list.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/15-select-applet-screen.png"
  alt="Select Applet screen with SeedKeeper-0.2-official.cap selected."
  caption="Choose the SeedKeeper-0.2-official.cap file."
/>

### Choose the default 8 KB storage

In **Select Storage**, choose **8 KB (default)**.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/16-select-storage-screen.png"
  alt="Select Storage screen with 8 KB (default) selected."
  caption="Choose the default 8 KB (default) storage."
/>

### Confirm installation

When the **Success** screen shows **Applet Installed**, the SeedKeeper applet has been installed on the card.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/17-applet-installed-screen.png"
  alt="Success screen showing Applet Installed."
  caption="Confirm that the SeedKeeper applet was installed successfully."
/>

## 3. Open Card Info {#card-info-menu}

After the applet installation finishes, open **Tools → Smartcard Tools → Common Functions → Card Info**.

### Choose Common Functions

Open the top item, **Common Functions**.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/06-smartcard-menu-screen.png"
  alt="Smartcard Tools screen with Common Functions selected at the top."
  caption="The card's first setup starts in Common Functions."
/>

### Choose Card Info

When the title changes to **Common Tools**, open its second item, **Card Info**.<br> A new card asks you to set a PIN before showing its card information.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/08-card-info-selected-screen.png"
  alt="Common Tools screen with Card Info selected as the second item."
  caption="Choose Card Info below Device Filter."
/>

## 4. Confirm that this is a new card {#new-card}

If **Card Uninitialised** appears, the card has not completed its first setup.<br> The message means that you must set a PIN to complete card setup.

Choose **I Understand** to continue.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/09-card-uninitialised-screen.png"
  alt="Card Uninitialised screen showing Set a device PIN to complete Card Setup and an I Understand button."
  caption="This is the first setup message for a new card. Continue with I Understand."
/>

If `Card Info` immediately shows **Setup: Done** instead, the card is already initialized.<br> Do not initialize it again; confirm that you know the existing PIN.

## 5. Enter a new PIN {#new-pin}

Choose the PIN for this card in **New Card PIN**.<br> The B12 SeedKeeper PIN is **4–16 characters** and may contain letters as well as numbers.<br> Avoid short repeated characters and values that are easy to guess, such as a birthday.

<GuideFigure
  src="/guides/seedkeeper/initialize/10-new-pin-device.png"
  alt="Full device showing the New Card PIN entry screen with directional buttons, ABC, 123, and a green check mark."
  caption="Choose characters with the directional buttons and enter them one at a time with the center button."
/>

| Task | Control |
| --- | --- |
| Choose and enter a character | Move with the directional buttons, then press the center button |
| Switch upper/lower case | The button corresponding to `ABC` or `abc` at the upper right |
| Switch to the number keyboard | The button corresponding to `123` at the right center |
| Delete a character | The delete symbol `⌫` below the keyboard |
| Finish entering the PIN | The button corresponding to the **green check mark** at the lower right |

When you finish, press the green **confirm button** at the lower right.

Entered characters may be visible on the screen.<br> Take care that nobody can watch or record you when choosing a real PIN.

<details>
<summary>View only the PIN entry screen at a larger size</summary>

<GuideFigure screen
  src="/guides/seedkeeper/initialize/10-new-pin-screen.png"
  alt="Enlarged New Card PIN entry window with an alphabet keyboard, ABC and 123 switches, and a green check mark."
  caption="After entering the characters, confirm with the green check mark at the lower right."
/>

</details>

## 6. Enter the same PIN again {#confirm-pin}

When **Confirm Card PIN** appears, enter the PIN you just chose again and press the green **confirm button**.<br> The case and number of characters must match exactly.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/12-confirm-pin-screen.png"
  alt="Confirm Card PIN screen with an empty keyboard for entering the same PIN again."
  caption="This screen confirms the PIN you entered; it does not create a new PIN."
/>

`PIN Mismatch` means the two entries differed.<br> Read the message and start again from the new PIN entry screen.

## 7. Confirm setup is complete {#complete}

When **Card Setup**, a green check mark, and **PIN set.<br> Import seed next.** appear, PIN setup is complete.<br> Press **OK** to continue to card information.

<GuideFigure
  src="/guides/seedkeeper/initialize/13-card-setup-complete-device.png"
  alt="Full ShieldSigner device showing the successful Card Setup screen with PIN set. Import seed next. and an OK button."
  caption="PIN setup succeeded. The card is ready to use."
/>

In the following **Card Info** screen, check these items.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/14-card-info-done-screen.png"
  alt="Card screen showing Type: SeedKeeper, Remaining PIN tries, and Setup: Done in Card Info."
  caption="Setup: Done means the first setup is complete. UID and version differ by card."
/>

| Screen item | What to check |
| --- | --- |
| `Type` | Confirm that it says **SeedKeeper**. |
| `UID` | The card identifier. You can record it to distinguish cards A, B, and C. |
| `Version` | The protocol or applet version reported by the card. It is separate from the ShieldSigner OS B12 version. |
| `Remaining PIN tries` | The number of PIN attempts remaining. It depends on the card's setup and use. |
| `Setup` | **Done** means the card's first setup is complete. |

If you are preparing cards B and C, finish the current card, replace it, and follow the same order one card at a time.

<Callout type="success" title="The card is ready to use">

So far you have **only set the PIN**.<br> No seed has been backed up to the card yet.<br> Continue with [Save a seed to the card](./save) to create the backup.

</Callout>

## If the screen looks different {#troubleshooting}

| Screen or situation | What to do |
| --- | --- |
| The card is not detected | Check the card type, insertion direction, and reader connection, then confirm that ShieldSigner detects the card. |
| `Card Uninitialised` does not appear | Check `Setup` in `Card Info`. `Done` means the card is already initialized. Do not choose Factory Reset just to start over. |
| `Invalid PIN` appears | Confirm that the SeedKeeper PIN is 4–16 characters for this guide and enter it again. Other cards may use different rules. |
| `PIN Mismatch` appears | The new and confirmation PINs differ. Check case and typing, then enter both again. |
| `Incorrect PIN` or a remaining-attempt warning appears | Authentication for an existing card failed. Do not guess repeatedly; check your stored PIN record. |
| You forgot the PIN | Do not assume that resetting the PIN preserves the existing seed. Check an independently stored backup first. Factory Reset does not recover data. |

## Next step

[← What is SeedKeeper?](./what-is-seedkeeper) · [Next: Save a seed to the card →](./save)

Procedure references: [ShieldSigner B12 release](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12) · [B12 card menu source](https://github.com/3rdIteration/seedsigner/blob/SeSi-0.8.7%2BShSi-B12/src/seedsigner/views/smartcard_views.py) · [B12 PIN setup source](https://github.com/3rdIteration/seedsigner/blob/SeSi-0.8.7%2BShSi-B12/src/seedsigner/helpers/seedkeeper_utils.py)

</GuideContent>

