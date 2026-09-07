---
title: Send
description: Build a transaction and verify the recipient and amount before signing
---

# Send

In the Send step, review and sign the transaction draft created by the watch-only wallet on ShieldSigner.<br> Follow the request as it moves toward the Bitcoin transaction shown on the right of the animated cards.

## Flow

1. Open `Send` in BlueWallet or Coconut Wallet.
2. Enter or load the recipient address, amount, network fee, and change address.
3. Transfer the PSBT to ShieldSigner by QR or file.
4. Compare the recipient, amount, fee, and number of inputs and outputs on screen.
5. Sign only when every value matches, then return the signed PSBT to the watch-only wallet and broadcast while online.

<Callout type="warning" title="Stop if the recipient or amount differs">
Do not sign if the address, amount, or fee differs from what you expected.<br> Trust only the value independently confirmed on ShieldSigner, not a value copied from the original request or a seller.
</Callout>

## Final check

Recheck the complete address and network before signing.<br> When scanning a QR or moving a file, never create a file containing a private key or seed; return only the signed PSBT to the watch-only wallet.

<GuideNav prev="/transactions/receive-guide" next="/transactions/sign-psbt" prevLabel="Previous: Receive" nextLabel="Next: Signing" />

