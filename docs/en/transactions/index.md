---
title: Transactions
description: Use a physical ShieldSigner and an online watch-only wallet to verify addresses, review and sign transactions, and check broadcast and confirmations
---

<script setup>
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Transactions

**Verify your address before receiving, and review the transaction before signing a payment.**<br> This guide uses a **physical ShieldSigner built on Raspberry Pi Zero v1.3 and an online watch-only wallet**.

## What each device does

| Stage | Online watch-only wallet | ShieldSigner |
| --- | --- | --- |
| Receive | Displays a receiving address and checks deposits. | Verifies that the address belongs to the loaded seed. |
| Send | Creates a PSBT with recipients, amounts, and fees. | Reviews the destination, amount, fee, and change, then signs. |
| After signing | Broadcasts the signed transaction and checks confirmations. | Does not connect to the network or query balances. |

Bitcoin does not move into the device or card.<br> SeedKeeper stores the seed; ShieldSigner uses a loaded seed to verify addresses or sign transactions. Check balances and transaction status in the online wallet.

**Verify address → Check deposit → Create PSBT → Review and sign on device → Return to online wallet → Broadcast → Check confirmations**

## Before you start {#preparation}

- Complete [OS installation](../os/install) and [download verification](../os/verification).
- Confirm your seed backup and any required passphrase. If you use SeedKeeper, follow [Load a seed from the card](../seedkeeper/load).
- Prepare an online wallet supporting **public-key import, PSBT QR export, and signed PSBT QR scanning**. An app that only displays balances cannot complete the sending flow.
- Match the network, address type, and account on both sides. These instructions cover a **Bitcoin mainnet single-signature wallet**. Multisig requires its wallet policy and additional signers; do not substitute this procedure unchanged.

Menu names vary by app.<br> **Receive**, **Send**, **Export PSBT**, and **Import signature** below describe functions, not universal button labels. Confirm that your installed wallet supports QR formats compatible with ShieldSigner.

<Callout type="danger" title="Keep seeds separate from public keys">
Connect the online wallet using <strong>public-key information (xpub) and wallet settings</strong>. Never enter seed words, a SeedQR, a passphrase, private keys, or a card PIN into the online wallet or a website.<br> An xpub can reveal wallet addresses and activity, so do not share it publicly either.
</Callout>

## Follow the steps

1. [Receive BTC](./receive-guide): connect the wallet using public keys and verify the actual deposit address on the device.
2. [Send BTC](./send-guide): choose the destination, amount, and fee, then pass the PSBT to ShieldSigner.
3. [Review and sign a PSBT](./sign-psbt): review and sign on the device, then broadcast and check confirmations in the online wallet.

## Signing, broadcasting, and confirmation are different

- **Signing:** the device authorizes the transaction. Signing alone does not send it to the network.
- **Broadcasting:** the online wallet submits the signed transaction to the Bitcoin network.
- **Confirmation:** the transaction has been included in a block. Check how many confirmations the recipient or service requires.

Someone who holds a signed transaction can broadcast it.<br> Finish reviewing before signing, and do not publicly share signed transaction QR codes or files.

[Next: Receive BTC →](./receive-guide)

</GuideContent>
