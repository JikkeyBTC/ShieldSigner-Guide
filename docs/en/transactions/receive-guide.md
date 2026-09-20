---
title: Receive BTC
description: Connect a watch-only wallet using public keys, verify its receiving address on physical ShieldSigner hardware, and check a deposit and confirmations
---

<script setup>
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Receive BTC

**Display a receiving address in the online wallet and verify on ShieldSigner that it belongs to your wallet.**<br> Share the verified address with the sender, then check the deposit online. Receiving does not require signing a transaction.

## Before you start

- Read the [preparation checklist](./#preparation) and prepare your physical ShieldSigner and a compatible online watch-only wallet.
- Load the seed only on the device. For SeedKeeper, follow [Load a seed](../seedkeeper/load).
- Apply the exact passphrase if your wallet uses one. A different passphrase produces a different wallet.
- If the wallet is already connected, check its settings and continue with [Display a receiving address](#receive-address).

## 1. Connect the watch-only wallet with public keys {#connect-wallet}

On ShieldSigner, open **Seeds → your seed → Export xpub**.<br> Match the signature type, address type, and account to the online wallet, and select a public-key QR format the app can read.

In the online wallet, use its **watch-only import / hardware wallet connection** function to scan the device's **xpub QR**.<br> Check that the account public key, fingerprint, and derivation path were imported correctly. This is not the process for creating a software wallet by entering seed words.

| Setting | What to check |
| --- | --- |
| Network | Both sides should use Bitcoin Mainnet. |
| Seed and passphrase | Check the intended wallet fingerprint. A matching fingerprint does not replace address verification. |
| Wallet type | This guide uses Single Sig. |
| Address type | Match the existing wallet. Native Segwit is an example, not a requirement for every wallet. |
| Account and derivation | Use the same account's public key. Do not arbitrarily change an existing wallet's path. |

If an option is missing or import fails, check the app's hardware-wallet and QR support documentation.<br> Do not solve an import problem by sending a **SeedQR or private key to the online app**.

## 2. Display the address for this deposit {#receive-address}

Open **Receive** in the online wallet.<br> Keep the **full address and its QR code** visible, and note the receiving-address index if the app provides it.

Verify **the actual address you will use for this deposit**.<br> Checking the first address when importing a wallet does not verify every different address generated later.

## 3. Verify the address on ShieldSigner {#verify-address}

1. Open **Scan** from the device home screen and use its camera to read the online wallet's **receiving-address QR**.
2. If prompted, select the seed connected to this wallet, with the correct passphrase applied.
3. If asked for wallet type or derivation information, use the same settings as the online wallet.
4. Confirm that address verification completes, and compare the **entire address** being verified with the online wallet's address.

The device derives addresses from your seed to check for a match.<br> Successfully reading a QR code is not the same as **successfully verifying an address**. Do not use an address for a deposit if verification has not completed.

### Compare using Address explorer

Open **Address explorer** from the seed menu, choose the matching address type and account settings, and open the **receiving-address list**.<br> Find the same address index as the online wallet and compare the full string. Do not confuse receiving addresses with change addresses.

Do not compare only the first address when the wallet shows a later one, or compare only the first and last few characters.<br> If the address cannot be found, check the seed, passphrase, account, and address type instead of bypassing verification.

<Callout type="warning" title="Stop if the addresses differ">
Verification checks that the address belongs to your wallet. After copying and pasting, check again that the entire address you will share has not changed.<br> Never use an example address from a guide or another person's screenshot as your deposit address.
</Callout>

## 4. Share the verified address {#share-address}

Send only the verified address or its address QR to the sender.<br> For an exchange withdrawal, confirm both the destination and **Bitcoin mainnet**. Do not select a BTC token on another chain or a different payment network.

Before moving a large amount to a newly connected wallet, check the address and deposit process with a small amount.<br> Once the address has been verified, ShieldSigner does not need to stay powered on to receive funds.

## 5. Check the deposit and confirmations {#confirmation}

In the online wallet's transaction history, check the **receiving address, amount, TXID, and confirmation count**.

| Status | Meaning |
| --- | --- |
| Pending / Unconfirmed | The transaction is visible but has not yet been included in a block. |
| Confirmed | The transaction has been included in a block. Further blocks increase its confirmation count. |

The TXID identifies the transaction.<br> Check the actual deposit and confirmations in your own wallet, not just the sender's completion screen. The required confirmation count depends on the recipient or service.

### If the deposit is not visible

- Ask whether the sender actually broadcast the transaction and has its TXID.
- Recheck the **full destination address, network, and amount**.
- Check the online wallet's server connection and synchronization.
- If you have a TXID, check it with a transaction lookup tool for the same network. An external service can learn which addresses or transactions you query.
- Do not look for a balance on ShieldSigner or enter your seed online to troubleshoot.

[Previous: Transactions](./) · [Next: Send BTC →](./send-guide)

Procedure reference: [ShieldSigner B12 public-key export and address verification code](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/views/seed_views.py). Menu labels and screen order may vary with the installed firmware.

</GuideContent>
