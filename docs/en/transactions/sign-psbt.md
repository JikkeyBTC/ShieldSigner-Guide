---
title: Review and sign a PSBT
description: Review recipients, amounts, fees, and change on physical ShieldSigner hardware, return the signed QR, and check broadcast and confirmations online
---

<script setup>
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Review and sign a PSBT

After the device reads the PSBT prepared in [Send BTC](./send-guide), **review the information on the device before signing**.<br> This page covers QR exchange for a single-signature wallet. Signing, broadcast, and confirmation are separate stages to check.

## 1. Check the seed and transaction overview {#overview}

If prompted, select the seed connected to the online wallet.<br> Apply the same passphrase if that wallet uses one.

Review the **input count, recipient count, and change-output count**, then open the detailed review.<br> If there is an unknown recipient or unexpectedly missing change, stop and check the wallet that created the transaction.

If the device says the seed cannot sign, do not select other seeds at random.<br> Compare the online wallet's public key, fingerprint, and derivation path with the seed and passphrase loaded on the device.

## 2. Compare destinations, amounts, fee, and change {#review}

Read each detailed screen on the device.<br> **Checking only the computer or phone preview does not replace reviewing the device screen.**

| Item | Compare against |
| --- | --- |
| Total inputs | The UTXOs selected for this transaction, which may differ from the entire wallet balance. |
| Recipient addresses | The **full addresses** independently confirmed with the recipients. Check every recipient. |
| Payment amounts | The requested amounts and units. |
| Network fee | The **total fee** shown in the online wallet preview, not its sat/vB fee rate. |
| Change | The amount, address, derivation information, and the device's address-verification result. |

Check that **total inputs − total recipient amounts − change = fee**.<br> A change address can differ from the address you used to receive funds. A different string is not automatically a problem, but confirm that the device verifies it as belonging to your wallet.

<Callout type="danger" title="Do not sign unexpected outputs or warnings">
Stop if you expected change but see <strong>Full Spend / No change</strong>, if change verification fails, or if there is an unknown output.<br> An intentional full spend can legitimately have no change. Check your intention instead of changing settings just to remove a warning.
</Callout>

If something is wrong, reject the transaction and create a corrected PSBT in the online wallet.<br> Review the replacement transaction from the beginning.

## 3. Approve and sign {#sign}

Sign on the final approval screen only after every value is correct.<br> When ShieldSigner displays the **signed PSBT QR**, prepare to read it with the online wallet. Keep an animated QR visible until reading finishes.

The device does not broadcast the transaction at this point.<br> However, someone holding the signed transaction can broadcast it, so complete all checks before approval and do not share the signed QR publicly.

## 4. Return the signed QR and broadcast {#broadcast}

1. In the online wallet that created the transaction, open its **import signature / read signed PSBT** function for that transaction.
2. Use the computer or phone camera to scan the QR displayed on ShieldSigner.
3. Confirm that the signature was imported and the transaction is ready to broadcast.
4. Compare the recipients, amounts, and total fee one last time, then choose **Broadcast / Send**.

You are transferring a **signed transaction**, not a SeedQR, private key, or card PIN.<br> Some apps may broadcast immediately after importing signatures, so check your app's behavior in advance.

If import fails, check that you are using the same transaction's import screen and a compatible QR format.<br> If signatures are missing, investigate the cause instead of entering seed words online to complete it.

## 5. Check broadcast and confirmations {#confirmation}

Check the broadcast result and the **TXID** in the online wallet's history.<br> A TXID is a 64-character hexadecimal transaction identifier. **Having a TXID alone does not prove broadcast or confirmation.** Some apps display it before broadcast.

| Stage | What to check |
| --- | --- |
| Broadcast result | Check whether the wallet reports success or an error. |
| Unconfirmed transaction | Look up the transaction in a synchronized wallet or a transaction tool on the same network. |
| Block inclusion | Check the block information and confirmation count. |
| Payment completion | Check that the recipient's or service's required confirmation count has been reached. |

When using an external lookup service, enter **only the TXID**, never seeds or private keys.<br> Compare the transaction's addresses, amounts, and fee with your payment. External services can learn what you query.

### If confirmation is delayed or broadcast fails

- Check the network, TXID, and wallet synchronization.
- For an unconfirmed transaction, check the fee and network congestion. Estimated times are not guarantees.
- Even after an error, check the original transaction first. Creating repeated new payments can result in duplicate payment.
- If using a fee-adjustment function, review the changed transaction. If it requires another signature, review the new PSBT on the device again.
- Closing the screen or turning off the device does not cancel a transaction already broadcast.

## 6. Finish using the device {#finish}

Once the online wallet has successfully imported the signed transaction, the device does not need to stay on.<br> Clear the loaded seed using **Discard seed** or shut the device down normally. Continue checking confirmations in the online wallet.

Removing the card alone does not clear a seed already loaded into device memory.<br> **Discard seed does not delete the seed stored on SeedKeeper.** It is different from resetting the card or deleting a stored entry.

[← Previous: Send BTC](./send-guide) · [Transactions overview](./)

Procedure reference: [ShieldSigner B12 transaction review and signing code](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/views/psbt_views.py). Menu labels and screen order may vary with the installed firmware.

</GuideContent>
