---
title: Receive
description: Verify a receiving address on ShieldSigner and check a deposit in the Bitsaga Signet practice wallet
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Receive

Before receiving BTC, **verify that the address belongs to your wallet**.<br> Receiving does not require a transaction signature. Verify the address, share it with the sender, and use the online wallet to check the incoming transaction and its confirmations.

## Receive with a physical device

1. Load the seed you want to use on ShieldSigner. If the wallet uses a passphrase, apply that same passphrase.
2. Open **Receive** in the watch-only wallet created from that seed's public keys.
3. Use **Scan** on ShieldSigner to read the receiving-address QR code, then select the matching seed to verify it. Alternatively, use **Address explorer** to compare the address with the same network, account, script type, and receiving-address index.
4. Check that the **entire address** verified on the device matches the address in the online wallet.
5. Share only that verified address with the sender, then check the transaction history and confirmation count in the online wallet.

<Callout type="warning" title="Stop if the addresses do not match">
Recheck the network, seed and passphrase, account number, address type, and address index.<br> Matching only the first and last few characters is not enough. When pasting a previously verified address, check that the entire address is still unchanged.
</Callout>

## Practice in the simulator {#practice}

Read the [practice setup and safety guidance](./#practice) first.<br> This walkthrough uses **Single Sig · Native Segwit · Testnet · account 0**. The account derivation path is `m/84h/1h/0h`, with the Testnet coin type `1h`.

### 1. Load a test-only seed

Open the [simulator](https://bitsaga.be/seedsigner-simulator/wallet.html?firmware=smartcard&wallet=1) and check that the firmware is **ShieldSigner** and the network is **Testnet**.<br> Use the arrow keys and Enter, or the device buttons shown on screen.

If you do not have a test seed, choose **Seeds → Enter 12-word seed** and enter this public test seed.<br> The fingerprint on the final confirmation screen is **b2269592**. Do not add a passphrase for this example.

```text
army van defense carry jealous true garbage claim echo media make crunch
```

<Callout type="danger" title="This test seed is known to everyone">
This seed is a public BIP39 test vector. Anyone can access the same wallet. Use it only for this practice with valueless Bitsaga Signet coins, and never send real BTC to it.<br> Do not copy an example address from a screenshot. Use the address displayed in the built-in wallet during your practice session.
</Callout>

<GuideFigure screen
  src="/guides/transactions/02-seed-screen.png"
  alt="Finalize Seed showing the public test fingerprint b2269592."
  caption="Check the test fingerprint, then select Done."
/>

### 2. Connect the built-in wallet with the public key

Open **Simulator wallet**, then follow this sequence in the device's seed menu:

**Export Xpub → Single Sig → Native Segwit → Static**

Check the public-key information and derivation path, then leave the QR code displayed while the built-in wallet reads it and connects.<br> You are exporting an **xpub QR code, not a seed QR code**. An xpub cannot sign transactions, but it can reveal your wallet's addresses and transaction history, so do not share it publicly.

<GuideFigure screen
  src="/guides/transactions/03-wallet-connected-screen.png"
  alt="ShieldSigner displaying the test account xpub QR."
  caption="The built-in wallet connects by reading this public-key QR."
/>

### 3. Verify the wallet import with its first address

If the device offers **Verify Address** after the public-key export, select **Show it to the device** in the built-in wallet, then choose **Scan** on the device.<br> The built-in wallet passes the address QR code to the virtual camera. The device derives the address from the seed and checks for a match.

Check the **successful address-verification screen**, then return to the home screen.<br> On physical hardware, this is the step where you use the real camera to scan the online wallet's address QR code.

This verifies **receiving address 0 as a wallet-import check**.<br> The faucet uses the next unused address. In a previously used wallet, its actual funding destination can differ from index 0. Verifying index 0 does not mean you have individually checked every later receiving address.

**To verify the actual funding address**, open **Receive** in the built-in wallet and note the entire address and the stated index, such as `address 19`.<br> Open **Address explorer** from the device's seed menu. Use the same Testnet, Single Sig, Native Segwit, account 0 settings, then compare the full address at that **receiving** index, not a change index.<br> If a new wallet does not yet offer Receive, check that its displayed first address matches the index-0 address you just verified.

To fund that exact checked address, paste it into the **separate faucet page** below and compare it again before submitting. The built-in **Get test bitcoin** shortcut chooses the next unused address at request time.

In this practice, **Address explorer → Native Segwit → Receive addresses** lists ten addresses at a time. Use **Next 10** for later indices.<br> We also located receiving index 19 shown by the practice wallet and decoded the device's QR to confirm that both addresses matched.

<GuideFigure screen
  src="/guides/transactions/27-explorer-index19-screen.png"
  alt="Receiving address 19 selected in the device's Receive Addrs list."
  caption="Match the receiving-address index shown by the wallet with the same index on the device."
/>

<GuideFigure screen
  src="/guides/transactions/05-address-verified-screen.png"
  alt="Address Verified success with receiving index 0 and a Testnet derivation path."
  caption="The device verified this address against the public test seed."
/>

### 4. Receive test coins from the faucet

Select **Get test bitcoin** in the built-in wallet.<br> A faucet distributes coins for testing. After requesting coins, wait for the deposit status to update instead of repeatedly pressing the button.

The wallet first shows that the transaction is **waiting to be included in a block**, then updates the balance and transaction history.<br> Faucet amounts may vary with the service's current conditions; check the amount shown on screen.

If you use the separate faucet page, copy the address shown under **Receive** in the built-in wallet and enter it at the [Bitsaga faucet](https://bitsaga.be/signet).<br> Follow any daily-limit or waiting-period instructions. An ordinary Testnet faucet will not produce a deposit on this wallet's custom chain.

<GuideFigure
  src="/guides/transactions/08-receive-panel.png"
  alt="Receive screen of the built-in Simulator wallet showing a test address and QR."
  caption="For the separate faucet, use your current Receive address, not this example image."
/>

### 5. Distinguish an incoming transaction from a confirmation

**Pending** means the wallet knows about the transaction, but it has not yet been included in a block.<br> **Confirmed** means it has been included in a block. The transaction identifier, or **TXID**, identifies the specific deposit.

If the deposit does not appear, recheck the entire address and network first, then refresh the practice wallet's transaction status.<br> A physical ShieldSigner does not display network balances. Check those in the online wallet.

<GuideFigure
  src="/guides/transactions/07-deposit-row.png"
  alt="A faucet deposit of 1,000,000 sats confirmed in block 104773."
  caption="This is the confirmed faucet deposit from the recorded practice run."
/>

[Previous: Transactions](./) · [Next: Send →](./send-guide)

</GuideContent>
