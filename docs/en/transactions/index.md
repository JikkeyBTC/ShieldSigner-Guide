---
title: Transactions
description: Verify receiving addresses, review and sign transactions with ShieldSigner, and check broadcast and confirmation
---

<script setup>
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Transactions

When you **receive bitcoin, verify that the address belongs to your wallet**. When you **send bitcoin, review the transaction before signing**.<br> ShieldSigner and the online wallet have different roles.

| Step | Online wallet | ShieldSigner |
| --- | --- | --- |
| Receive | Displays a receiving address and checks for incoming payments. | Verifies that the address is derived from your seed. |
| Send | Creates a transaction draft, called a PSBT, with the recipient, amount, and fee. | Reviews the PSBT's destination, amount, fee, and change, then signs it. |
| After signing | Broadcasts the signed transaction to the network and checks confirmations. | Does not connect to the network or look up balances. |

**Verify the receiving address → receive funds → create a PSBT → review and sign on the device → return it to the online wallet → broadcast → check confirmations**

Bitcoin does not move into the device or card.<br> Transactions and balances are recorded on the network. ShieldSigner uses your selected seed to verify addresses or sign transactions.

## Follow the guides in order

1. [Receive](./receive-guide): connect a wallet, verify an address, and receive test coins.
2. [Send](./send-guide): enter the recipient and amount, then create a transaction draft.
3. [Review and sign a PSBT](./sign-psbt): check every value on the device before signing, then check broadcast and confirmation.

The physical-device instructions cover **ShieldSigner built on a Raspberry Pi Zero v1.3**.<br> If you use SeedKeeper, first complete [Load a seed from the card](../seedkeeper/load).

## Practice without real BTC {#practice}

This walkthrough uses the **ShieldSigner simulator, its built-in Simulator wallet, and Bitsaga Signet**.<br> It follows a local simulator based on ShieldSigner B12. Menu labels and layout may differ slightly in other versions of the public simulator.

- [Open the practice simulator](https://bitsaga.be/seedsigner-simulator/wallet.html?firmware=smartcard&wallet=1)
- [Bitsaga Signet information and faucet](https://bitsaga.be/signet)

Bitsaga Signet is a **custom test network, separate from ordinary Testnet and public Signet**.<br> Its coins have no monetary value. The walkthrough uses the device's **Testnet** setting and `tb1…` addresses, but those settings do not make it the same network as ordinary Testnet.

External wallets cannot sync with this custom chain, so use the **built-in Simulator wallet** to check incoming and outgoing transactions.<br> Importing the address into BlueWallet, Coconut, or Sparrow will not make the same deposits appear there. Practice history may also disappear if the network is reset.

<Callout type="danger" title="Never enter a real wallet's secrets in the simulator">
The simulator is a browser-based practice tool. Never enter a seed, passphrase, or private key that holds real BTC or that you intend to use for real funds.<br> Use only the public test seed on the next page or a seed reserved for testing. Enter real wallet secrets only on physical hardware, and manage real funds with that device and an online wallet you have verified.
</Callout>

## Signing and broadcasting are different steps

**Signing** produces proof that you authorized the transaction. **Broadcasting** sends the signed transaction to the network.<br> A signed transaction is not necessarily in a block, and a broadcast transaction is not necessarily confirmed yet.

The practice wallet **automatically broadcasts after reading the device's signed QR code**.<br> Complete your review before pressing the device's final signing button. Anyone who receives a fully signed transaction may also be able to broadcast it.

[Next: Receive →](./receive-guide)

</GuideContent>
