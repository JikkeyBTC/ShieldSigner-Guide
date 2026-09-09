---
title: Send
description: Create a transaction draft in the online wallet and transfer it to ShieldSigner
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Send

**Create the transaction in the online wallet, then review and sign it on ShieldSigner**.<br> This page takes you through creating and transferring the transaction draft, called a PSBT. The [next page](./sign-psbt) covers device review, signing, broadcast, and confirmation.

## Before you start

- Follow [Receive](./receive-guide) to verify your wallet's address and incoming funds.
- On physical hardware, load the wallet's seed and any required passphrase.
- Independently confirm the recipient's **entire address**, the **amount**, and the **network**.
- For practice, use **only the built-in Simulator wallet and Bitsaga Signet test coins**.

## 1. Open Send {#open-send}

Open **Send** in the online wallet.<br> A watch-only wallet can create a transaction, but it has no private keys and cannot sign it on its own. ShieldSigner handles signing.

In the practice wallet, check the deposited balance, then select **Send**.<br> If you use the public test seed, you may see earlier test transactions from other people. The total balance may include more than your own faucet request.

## 2. Enter the recipient and amount {#recipient}

Enter the receiving address in **To** and the amount to send in **Amount**.<br> The practice wallet uses **sats**. `1 BTC = 100,000,000 sats`; this example sends **20,000 sats = 0.0002 BTC**.

For practice, select **Use one of my addresses** to use an address from the same test wallet as the recipient.<br> This is a **self-transfer**: you are sending coins back to your own wallet, so the overall balance should decrease mainly by the fee after confirmation. This option does not supply the recipient's address for a real payment.

<Callout type="warning" title="Check the network and amount units">
The practice address belongs to Bitsaga Signet. Even if it starts with <code>tb1…</code>, an ordinary Testnet faucet or a transfer on another chain will not create the same deposit in this practice wallet.<br> For real BTC, use the Bitcoin mainnet address you confirmed with the recipient, and take care not to confuse BTC with sats.
</Callout>

<GuideFigure
  src="/guides/transactions/09-send-form-panel.png"
  alt="Simulator wallet send form with 20000 sats and a test self-transfer address."
  caption="The recorded example sends 20,000 sats to another address in the same test wallet."
/>

## 3. Understand fees and change {#fee}

The transaction uses **UTXOs**, or unspent transaction outputs available to your wallet, as inputs.<br> After subtracting the payment and fee from the input total, the remainder usually returns to a **change address** in your wallet.

**Input total = amount sent to the recipient + your change + network fee**

For example, if the transaction spends an input worth 100,000 sats and sends 20,000 sats, the change is **80,000 sats minus the fee**.<br> These numbers are illustrative. The selected inputs and fee depend on the wallet, transaction size, and network conditions.

**sat/vB** expresses a fee rate per unit of transaction size; a fee shown in **sats** is the total amount you will pay.<br> Do not use the practice wallet's fixed fee rate as a recommendation for Bitcoin mainnet. For a real transaction, check the current fee rate and total fee in the online wallet.

This practice wallet estimates fees at **2 sat/vB**, but does not separately display the total fee in its online send form.<br> During this practice, check the total on the device's **Transaction Math** screen in the next step. The recorded example pays **282 sats**.

## 4. Create the PSBT {#create-psbt}

Select **Create transaction** in the practice wallet.<br> The wallet moves to **Show it to your signer** and displays the **transaction QR code** for the device to read. Nothing has been signed or broadcast at this point.

PSBT stands for **Partially Signed Bitcoin Transaction**.<br> The format can carry an unsigned transaction for review or return a transaction with some or all of the required signatures. Never put your seed or private keys in a PSBT or send them to the online wallet.

<GuideFigure
  src="/guides/transactions/10-psbt-qr-panel.png"
  alt="The built-in wallet showing a PSBT as two cycling QR frames."
  caption="At Show it to your signer, open Scan on ShieldSigner."
/>

## 5. Scan the transaction QR code with ShieldSigner {#scan}

Return to ShieldSigner's home screen and choose **Scan**.<br> In the simulator, the built-in wallet passes the transaction QR code to the virtual camera. On physical hardware, use the camera to scan the PSBT QR code displayed by the online wallet.

For an animated QR code, keep the same screen open until the device has read every frame.<br> If scanning fails, never send a seed QR code or private key to the online wallet as a workaround.

After reading the transaction, the device opens **seed selection or the transaction overview**.<br> Before approving anything, work through the checks on the next page.

[Previous: Receive](./receive-guide) · [Next: Signing →](./sign-psbt)

</GuideContent>
