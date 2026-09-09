---
title: Review and sign a PSBT
description: Check recipients, amounts, fees, and change on ShieldSigner, then verify broadcast and confirmation
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Review and sign a PSBT

Once the device has read the PSBT created in [Send](./send-guide), **check the details on its screen yourself before signing**.<br> Signing, broadcasting, and confirmation are separate steps. This page takes you through checking the final confirmation.

## 1. Check the seed and transaction overview {#overview}

If the device asks you to select a seed, choose the seed for the wallet used to create this transaction.<br> If that wallet uses a passphrase, the same passphrase must be applied.

Review the **number of inputs, recipients, and change outputs** in the transaction overview.<br> If there is an unfamiliar recipient or change is unexpectedly missing, stop and check the wallet that created the transaction before continuing.

<GuideFigure screen
  src="/guides/transactions/12-overview-screen.png"
  alt="Review Transaction showing 20,000 tSats, one input, recipient, fee and change."
  caption="Select Review details. tSats indicates an amount on the test network."
/>

## 2. Compare destinations, amounts, and fees {#review}

Move through the device's review screens and check every item below.

| Item | What to check |
| --- | --- |
| Input total | The total value of the coins this transaction spends. It may differ from your entire wallet balance. |
| Receiving address | Compare the **entire address** with the one you independently confirmed with the recipient. Check every recipient if there is more than one. |
| Amount to send | Compare the requested amount and its units. The practice example sends **20,000 sats**. |
| Network fee | With physical hardware, compare against the total checked in the online wallet. The practice wallet does not display a separate total, so check it on the device's Transaction Math screen. Stop if it is unexpectedly high. |
| Change | Check the amount, address, and derivation details for funds returning to your wallet, as well as the device's address-verification result. |

Also check that **input total − amount sent − change = fee**.<br> In the practice self-transfer, both the payment and change can return to the same wallet. You still need to review every item on screen.

<Callout type="danger" title="Do not dismiss unexpected warnings">
Do not sign if <strong>Full Spend / No change</strong> appears when you expected change, if the device cannot verify the change address, or if there is an unfamiliar output.<br> A transaction with no change can be valid, such as an intentional full-balance payment, but it must match your intent. This walkthrough practices with a transaction that includes change.
</Callout>

<GuideFigure screen
  src="/guides/transactions/13-math-screen.png"
  alt="Transaction Math: input 1,000,000, recipient 20,000, fee 282 and change 979,718 sats."
  caption="Recorded example: 1,000,000 − 20,000 − 979,718 = 282 sats."
/>

<GuideFigure screen
  src="/guides/transactions/14-recipient-screen.png"
  alt="Will Send showing the full recipient address and 20,000 tSats."
  caption="Compare the entire destination and amount against the independently checked request."
/>

<GuideFigure screen
  src="/guides/transactions/15-change-screen.png"
  alt="Your Change showing 979,718 tSats and Address verified."
  caption="The device verified change address #17 in this example. Your address index may differ."
/>

## 3. Make the final check and sign {#sign}

When every value matches, press the signing button on the final approval screen.<br> ShieldSigner creates the signature and displays a **signed PSBT QR code**. Keep it displayed until the receiving wallet confirms it has finished reading it.

<Callout type="warning" title="The practice wallet broadcasts automatically after reading the signed QR code">
The built-in Simulator wallet reads the returned signature, completes the transaction, and automatically broadcasts it to Bitsaga Signet.<br> Finish every check before signing on the device. Do not expect another broadcast confirmation dialog in the simulator.
</Callout>

<GuideFigure screen
  src="/guides/transactions/16-finalize-screen.png"
  alt="Sign Transaction screen with Approve transaction."
  caption="Select Approve transaction only after all values match."
/>

<GuideFigure screen
  src="/guides/transactions/17-signed-qr-screen.png"
  alt="Signed PSBT QR displayed by the device after approval."
  caption="The signed test transaction being returned. Keep it displayed until the wallet finishes reading."
/>

## 4. On physical hardware: return and broadcast the signed transaction {#broadcast}

For a physical device, use the online wallet's **Import signed transaction / Scan signed transaction** function to scan the device's QR code.<br> You are not handing over a seed QR code, private key, or card PIN. If you use a wallet that supports file exchange, follow the PSBT file procedure supported by both that wallet and your device. This practice walkthrough uses QR codes only.

Check that the online wallet has all required signatures, make a final comparison of the **destination, amount, and fee**, then select **Broadcast**.<br> Check your app's behavior beforehand: some apps automatically broadcast after importing signatures. Do not casually share a signed transaction; a third party may also be able to broadcast it.

<GuideFigure
  src="/guides/transactions/18-broadcast-panel.png"
  alt="The practice wallet showing a broadcast TXID while waiting for a block."
  caption="The transaction has been sent, but confirmation is still pending."
/>

## 5. Check the TXID and confirmations {#confirmation}

After broadcast, the wallet displays a **TXID**, a 64-character hexadecimal transaction identifier.<br> Copy it into a transaction lookup for the same network to check the transaction.

In the practice wallet, **Finish it here** is the broadcast-processing stage, and **In a block** means the transaction has been included in a block.<br> A successful broadcast message or a TXID alone does not establish confirmation. Check that the transaction has actually been included in a block.

On the [Bitsaga transaction verification page](https://bitsaga.be/signet), enter the TXID under **A transaction, and the block it landed in**, then select **Check it**.<br> The result concerns inclusion on Bitsaga's custom test chain. It does not confirm a Bitcoin mainnet payment.

<GuideFigure
  src="/guides/transactions/19-confirmed-panel.png"
  alt="The built-in wallet showing In a block and Sent, mined and confirmed on Bitsaga Signet."
  caption="The recorded transaction was confirmed in Bitsaga Signet block 104780."
/>

### The test transaction we verified

- Sent: **20,000 sats**
- Total fee: **282 sats**
- Change: **979,718 sats**
- Block: **104780** on Bitsaga Signet

```text
e0942d2fbe013d9d6329b334bc0c49a853b9de5de992f2cd68402bfe64c2457f
```

[View evidence for this TXID](https://signet.bitsaga.be/api/tx-proof?txid=e0942d2fbe013d9d6329b334bc0c49a853b9de5de992f2cd68402bfe64c2457f)

After the self-transfer, the total balance changed from **8,994,798 to 8,994,516 sats**, falling only by the fee.<br> This public test wallet already held coins from earlier practice. Your balance, addresses and TXID do not need to match the example.

### If confirmation is delayed

- First check that you are looking at the same **network and TXID**.
- If the transaction is still unconfirmed, wait for a block. Closing the screen does not cancel a transaction that has already been broadcast.
- If an error appears, check the existing TXID's status first. Do not repeatedly create and send new transactions without checking what happened.
- If change differs from your expectation, recheck the fee and transaction outputs.

## 6. Finish the session

After checking the incoming and outgoing transactions, use **Discard seed** to clear the loaded seed from the physical device's memory, or shut the device down normally.<br> This is different from deleting the original seed stored on SeedKeeper.

Close the simulator tab when you finish practicing. The wallet connection details may be lost, but transactions already broadcast to the test chain are not canceled.

[← Previous: Send](./send-guide)

</GuideContent>
