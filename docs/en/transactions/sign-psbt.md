---
title: Review and sign a PSBT
description: Review a PSBT by QR or file and sign it on ShieldSigner
---

# Review and sign a PSBT

A PSBT is an unsigned transaction draft.<br> The watch-only app creates it, and ShieldSigner checks the contents before signing.

## QR flow

1. Create a transaction in BlueWallet or Coconut Wallet and show the PSBT QR code.
2. Open `Sign transaction` on ShieldSigner and scan all QR frames.
3. Carefully compare the input total, every destination address, amount, fee, and change address.
4. Sign only when every value matches, then return the signed PSBT QR to the app.

## File flow

If the app supports file export, move the PSBT file to microSD and read it on ShieldSigner.<br> Confirm that the operating system and app are trusted before opening the file, then import the signed file back into the watch-only app.

## Final check

Open the signed PSBT again in the app and confirm its status.<br> If the destination, amount, fee, or signature state differs from what you expected, discard it instead of broadcasting.<br> Broadcast only after the final review in the network-connected watch-only app.

<Callout type="danger" title="A signature cannot be reversed">Do not approve an address after checking only a few characters. Compare the full address and amount displayed on ShieldSigner with the actual payment details before approving.</Callout>

<GuideNav prev="/transactions/send-guide" next="/reference/security" prevLabel="Previous: Send" nextLabel="Next: Security model" />

