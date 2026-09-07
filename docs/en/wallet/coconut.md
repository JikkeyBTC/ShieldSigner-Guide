---
title: Coconut Wallet watch-only wallet
description: Connect ShieldSigner's public information to a Coconut Wallet watch-only wallet
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Coconut Wallet watch-only wallet

Coconut Wallet is a mobile watch-only wallet that imports public information from ShieldSigner to show balances and transactions.<br> Keep the seed and private key on ShieldSigner; connect only public keys and wallet details to Coconut Wallet.

**Overview → Export XPub → Single Sig·Native Segwit → Add a Coconut Wallet watch-only wallet → Scan QR → Compare wallet information**

## Overview {#overview}

Install Coconut Wallet from the App Store or Google Play Store, then display the wallet's public information as a QR code on ShieldSigner.<br> Coconut Wallet reads this QR code to create a watch-only wallet.

- Do not enter a seed, private key, or SeedKeeper PIN in Coconut Wallet.
- The QR code and fingerprint in this guide are examples.<br> Use the values shown in your own buyer environment.
- After connecting, confirm that ShieldSigner and Coconut Wallet show the same wallet information.

<Callout type="info" title="What a watch-only wallet does">

Coconut Wallet shows balances, addresses, and transaction drafts while ShieldSigner keeps the private key and performs signing.

</Callout>

## 1. Open Export XPub on ShieldSigner {#export-xpub}

On ShieldSigner, open **Seeds** and enter the menu for the fingerprint whose public information you want to export.

<GuideFigure screen
  src="/guides/wallet/coconut/01-fingerprint-select.png"
  alt="ShieldSigner In-Memory Seeds screen with fingerprint dfa25f90 selected."
  caption="Choose the fingerprint whose public information you want to export."
/>

Choose **Export Xpub** in the fingerprint menu.

<GuideFigure screen
  src="/guides/wallet/coconut/02-export-xpub.png"
  alt="Fingerprint menu with Export Xpub selected."
  caption="Open Export Xpub to begin exporting the public key."
/>

## 2. Choose Single Sig·Native Segwit {#single-sig-native-segwit}

Choose the wallet format in the following order on the Export Xpub screen.

1. Choose **Single Sig**.

<GuideFigure screen
  src="/guides/wallet/coconut/03-single-sig.png"
  alt="Export Xpub screen with Single Sig selected."
  caption="Choose Single Sig for a single-signature wallet."
/>

2. Choose **Native Segwit** as the address format.

<GuideFigure screen
  src="/guides/wallet/coconut/04-native-segwit.png"
  alt="Export Xpub screen with Native Segwit selected."
  caption="Match the address format with the wallet format used by Coconut Wallet."
/>

3. Choose **BlueWallet** on the wallet-app selection screen.<br> Coconut Wallet uses the same XPub format, so this option exports compatible public information.

<GuideFigure screen
  src="/guides/wallet/coconut/05-wallet-type.png"
  alt="Export Xpub screen with BlueWallet selected."
  caption="Choose BlueWallet as the public-key format to connect to Coconut Wallet."
/>

4. Read the warning that the public key is used to review future transactions and choose **I Understand**.

<GuideFigure screen
  src="/guides/wallet/coconut/06-warning-message.png"
  alt="Export Xpub screen showing the Privacy Leak warning and I Understand button."
  caption="A public key is public information; never share the seed or private key."
/>

5. On **Xpub Details**, check the fingerprint, derivation path, and xpub, then choose **Export Xpub**.

<GuideFigure screen
  src="/guides/wallet/coconut/07-export-xpub-info.png"
  alt="Xpub Details screen showing fingerprint dfa25f90, derivation path m/84'/0'/0', and an Xpub."
  caption="Check the wallet format and derivation path before choosing Export Xpub."
/>

When the QR code appears, leave it on screen ready for Coconut Wallet to scan.

<GuideFigure screen
  src="/guides/wallet/coconut/08-qr-code.gif"
  alt="ShieldSigner showing a public xpub QR code with changing QR frames."
  caption="Keep the QR screen open so Coconut Wallet can scan it."
/>

## 3. Add a watch-only wallet in Coconut Wallet {#add-watch-only}

Open Coconut Wallet and press **Add watch-only wallet** at the upper right of the home screen.

<GuideFigure
  src="/guides/wallet/coconut/09-add-watch-only-wallet.png"
  alt="Coconut Wallet home screen with Add watch-only wallet at the upper right."
  caption="Start adding a watch-only wallet from the home screen."
/>

Choose **SeedSigner** as the wallet type.

<GuideFigure
  src="/guides/wallet/coconut/10-select-seedsigner.png"
  alt="Coconut Wallet wallet-type screen with SeedSigner selected."
  caption="Choose SeedSigner to import the ShieldSigner public key."
/>

## 4. Scan the ShieldSigner QR code {#scan-qr}

When Coconut Wallet opens its camera, point it at the ShieldSigner QR code prepared in step 2.

<GuideFigure
  src="/guides/wallet/coconut/11-scan-qr-code.png"
  alt="Coconut Wallet camera scanning the Xpub QR code on the ShieldSigner screen."
  caption="Fit the entire QR code inside the camera frame."
/>

After scanning, Coconut Wallet imports the public information, creates the watch-only wallet, and starts synchronization.

<GuideFigure
  src="/guides/wallet/coconut/12-wallet-added.png"
  alt="New watch-only wallet added in Coconut Wallet with balance and transaction list."
  caption="The wallet has been added and synchronization has started."
/>

## 5. Compare wallet information {#compare-wallet}

Compare the wallet shown on ShieldSigner with the wallet added to Coconut Wallet.<br> The **wallet ID (master fingerprint)**, wallet format, and derivation path must match.

<GuideFigure
  src="/guides/wallet/coconut/13-wallet-info-compare.png"
  alt="ShieldSigner Xpub Details and Coconut Wallet SeedSigner information shown side by side for comparison."
  caption="Confirm that the public information and wallet ID match."
/>

If the wallet ID differs, stop and recheck the network, wallet format, and derivation path.<br> Use balances and receiving addresses only after the values match.

## Next step

<GuideNav prev="/wallet/bluewallet" next="/transactions/receive-guide" prevLabel="Previous: BlueWallet watch-only" nextLabel="Next: Receive bitcoin" />

</GuideContent>

