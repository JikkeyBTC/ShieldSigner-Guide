---
title: Send BTC
description: Review the recipient, amount, and fee in an online watch-only wallet and pass a PSBT QR to physical ShieldSigner hardware
---

<script setup>
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Send BTC

**Create the transaction in the online watch-only wallet, then review and sign it on ShieldSigner.**<br> This page covers preparing the PSBT. The [next page](./sign-psbt) continues through device review, signing, broadcast, and confirmation.

## Before you start

- Follow [Receive BTC](./receive-guide) to connect the wallet and verify your address.
- Check that the online wallet is synchronized and has spendable funds.
- Load that wallet's seed and any required passphrase on ShieldSigner.
- Confirm the recipient's **full address, amount, and network** through a separate trusted channel.
- Confirm that the app can **export an unsigned PSBT as QR and read the device's signed QR**.

## 1. Open Send {#open-send}

Open **Send** in the online wallet.<br> If several wallets are registered, select the one connected using ShieldSigner's public-key information.

A watch-only wallet can construct a transaction but has no private key to sign it independently.<br> Do not proceed through a flow asking you to enter seed words or private keys into the online app to send funds.

## 2. Enter the address and amount {#recipient}

Enter the address confirmed by the recipient and compare the **entire string**.<br> Check again after pasting or scanning that the address has not changed.

Enter the amount in the unit shown by the app.<br> **1 BTC = 100,000,000 sats**. For example, **20,000 sats equals 0.0002 BTC**; this illustrates units and is not a recommended payment amount.

<Callout type="warning" title="Check the network and amount unit">
Use the Bitcoin mainnet address confirmed with the recipient. Address format alone is not a complete check of the payment network.<br> <strong>Max / Send all</strong> may spend all available funds after fees. Select it only when that is your intention.
</Callout>

## 3. Check the fee and change {#fee}

A transaction spends previously unspent outputs, called **UTXOs**, as inputs.<br> The amount left after paying the recipient and fee normally returns to a **change address** belonging to your wallet.

**Total inputs = total recipient amounts + your change + network fee**

For example, with a 100,000 sat input and a 20,000 sat payment, change is **80,000 sats minus the fee**.<br> Check the actual inputs and fee for your transaction. A transaction does not necessarily use your entire wallet balance as inputs.

| Item | What to check |
| --- | --- |
| Fee rate (sat/vB) | The fee per unit of transaction size. Consider the wallet's current estimates and your desired waiting time. |
| Total fee (sats or BTC) | The actual amount paid. Do not confuse it with the fee rate. |
| Change | Confirm that remaining funds return to your wallet. The device also verifies the change address. |
| Selected inputs | If using coin control, confirm that you selected the intended UTXOs. |

Do not apply a fixed fee rate to every transaction.<br> If the fee is unexpectedly high or funds are insufficient, recheck the amount and input selection before proceeding. A fee estimate does not guarantee a confirmation time.

## 4. Display the unsigned PSBT {#create-psbt}

Check the **recipient, amount, and total fee** in the online wallet's transaction preview.<br> Choose its **unsigned transaction export / PSBT QR display** function. Creating and exporting may be separate steps.

A **PSBT (Partially Signed Bitcoin Transaction)** carries transaction information and information needed for signing.<br> Creating it does not complete a payment, and at this stage ShieldSigner has not signed it.

Confirm that the exported QR contains a **transaction PSBT**.<br> Address QR codes, public-key QR codes, and SeedQRs have different purposes. If an app only exports files, check for a compatible QR workflow instead of uploading the file to an arbitrary web converter.

## 5. Scan the transaction with the device camera {#scan}

1. Open **Scan** on ShieldSigner's home screen.
2. Adjust the distance and angle so the online wallet's PSBT QR is visible to the camera.
3. For animated QR codes, keep the screen in place until all required frames have been read.
4. Reading is complete when the seed-selection or transaction-overview screen appears.

If scanning is difficult, reduce glare and adjust QR size, screen brightness, and distance.<br> If it still fails, check the QR format and device compatibility. Never transfer a SeedQR or private key to the online wallet to solve a transfer problem.

**Do not approve yet.** Continue to the next page and compare the values shown on the device.

[Previous: Receive BTC](./receive-guide) · [Next: Review and sign a PSBT →](./sign-psbt)

</GuideContent>
