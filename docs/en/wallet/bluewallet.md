---
title: BlueWallet watch-only wallet
description: Connect ShieldSigner's public wallet information to BlueWallet
---

# BlueWallet watch-only wallet

Add only **public information (wallet policy, xpub, or descriptor)** to BlueWallet.<br> Never move a SeedKeeper or ShieldSigner seed, PIN, or private key to your phone.

## Prepare

1. On ShieldSigner, choose the Bitcoin network and account type, such as Native SegWit.
2. Open `Wallet info` and show the descriptor or xpub as a QR code or copyable public text.
3. Record the address format and network (mainnet or testnet).

## Import into BlueWallet

1. Open `+` → `Import wallet` in BlueWallet.
2. Scan the QR on the ShieldSigner screen or paste the public descriptor/xpub.<br> Use the value shown in your own buyer environment; do not write keys into this guide.
3. Name the wallet, confirm the Bitcoin network, and save it.
4. Confirm that the wallet is **watch-only**. Do not use a private-key import or seed-entry screen.

## Verify a receiving address

Create a new receiving address in BlueWallet and check the same address and derivation path on ShieldSigner.<br> Compare the complete address as a QR code or string, rather than only a few leading and trailing characters.<br> If they differ, stop and check the app's network and account type.

## Hand off a transaction

BlueWallet can create a transaction and show a PSBT QR.<br> Scan it on ShieldSigner, review the destination, amount, and fee, and sign only after the review.<br> Return the signed PSBT QR to BlueWallet and broadcast only after a final review.

<Callout type="warning" title="Never expose the seed">
If you enter a seed or private key in BlueWallet, it is no longer watch-only.<br> Do not photograph a SeedKeeper card or recovery words with your phone.
</Callout>

<GuideNav prev="/seedkeeper/load" next="/wallet/coconut" prevLabel="Previous: Load a seed from the card" nextLabel="Next: Coconut Wallet watch-only" />

