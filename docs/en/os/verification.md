---
title: Verify the installation files
description: Download ShieldSigner B12 for Raspberry Pi Zero v1.3, verify the Bitcoin message signature, and compare SHA-256
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Verify the installation files

Check that your downloaded image **matches the file published by the developer before writing it to microSD**.<br> This guide is **exclusively for the kit's Raspberry Pi Zero v1.3**, using the `pi0-smartcard` image from ShieldSigner **SeSi-0.8.7+ShSi-B12**.

Perform these checks on your **computer**. You do not need to turn on ShieldSigner or connect a wallet.<br> No seed, PIN, private key, bitcoin balance, payment, or transaction fee is required.

## What are we checking?

The B12 developer publishes a **list of image SHA-256 hashes** and a **Bitcoin message signature** covering that list in the release description. Connect the two checks:

- **Message signature:** confirms that the holder of the signing address signed the hash list.
- **SHA-256:** confirms that the image you downloaded matches the file named in that list.

Checking only the signature leaves **your downloaded file unchecked**.<br> Comparing only the hash leaves **the publisher of that value unchecked**. Both steps are needed.

<GuideFigure
  src="/guides/os/verification-flow.svg"
  alt="Confirm the developer's signing address through another channel, verify the hash list signature with that address, and compare the SHA-256 of the downloaded image."
  caption="Checking only the signature or only the hash is not enough. Continue from confirming the signer to comparing the file."
/>

---

## 1. Download and extract the official image {#download}

Already prepared the `.img` file using the installation guide? Continue to [step 2](#signer).

1. Open the [official B12 release](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12). Check that the repository is **`3rdIteration/seedsigner`** and the version is **`SeSi-0.8.7+ShSi-B12`**.
2. Expand **Assets** near the bottom and download this file for Raspberry Pi Zero v1.3:

```text
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img.zip
```

<GuideFigure
  src="/guides/os/install-reference/05-os-download.png"
  alt="The B12 release Assets list showing the pi0-smartcard.img.zip download."
  caption="Choose the filename ending in pi0-smartcard.img.zip. Source code is not the installation image."
/>

3. Wait for the download to finish. Right-click the ZIP and choose **Extract / Extract All**. On macOS, double-click the ZIP.
4. Open the extracted folder and find this **`.img` file**. You do not need to open or mount the image itself.

```text
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img
```

Use **only the `pi0-smartcard` file** for downloading, calculating the hash, and writing the SD card in this guide.

<Callout type="warning" title="Do not write the SD card yet">

The ZIP and extracted image are different files with different hashes.<br> The B12 signed list used here covers the **`.img` files**, not the ZIP digests displayed in GitHub Assets.

</Callout>

---

## 2. Confirm the developer's signing address {#signer}

The address shown in **Signature Verification** on the official [B12 release](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12) is:

```text
37hiiSB1Poj6Shs8WawPS2HjT2jzHkFSQi
```

Open the developer's [Crypto Guide website](https://cryptoguide.tips/send-me-a-tip/) yourself and confirm that the address next to `BTC:` matches. You can also compare it with the description on the developer's [YouTube channel](https://www.youtube.com/channel/UCEviBQwLv-yfv3BErm0ojHg/).<br> This avoids relying on the release page alone.

Use `Ctrl+F` (`Command+F` on macOS) to find `BTC:` on the developer's website. Compare the **complete address, including letter case**. Do not use another coin's address or the verification website operator's donation address.

This address is used to **identify the signer**, not to send money.<br> An attacker who replaces the file, hashes, signature, and address can create a valid signature for their own address. This is why the **independent address check comes first**. Stop if the addresses differ or you cannot establish whose address it is.

---

## 3. Verify the hash-list message signature {#message-signature}

Open the [message signature verification website](https://www.verifybitcoinmessage.com/) linked by the developer in a new tab. Check that the address bar shows **`https://www.verifybitcoinmessage.com/`**.<br> Fill the three fields with public values only. **Do not upload the image or enter a seed or private key.**

This website is a separate verification tool, not the developer's own site. If you do not want to rely on it, use the **Sparrow / Electrum** instructions below. Either way, do not skip the independent address check.

### ① Bitcoin Address — signing address

Enter the **full `37hii…FSQi` address** you compared with independent channels in step 2.<br> This is not a field for your own wallet address. The code block's **Copy** button helps avoid typing errors.

### ② Message — signed text

Copy **all five lines** between the separators below **SHA256 Checksums (And message to verify)** in the release body.<br> Verification fails if you paste only the line for your board.

**This list is the developer's signed text, not a choice of supported boards for this guide.** It contains filenames for other boards, but all five lines must remain unchanged for signature verification.<br> Only the Raspberry Pi Zero v1.3 `pi0-smartcard.img` is downloaded and checked in steps 4 and 5.

The B12 text is shown below.<br> **Compare it with the official release first**, then you may use the code block's copy button to copy all five lines together.<br> Do not change filenames, colons, spaces, or line breaks.<br> Do not include the title or separators.

```text
seedsigner_os.SeSi-0.8.7_ShSi-B12_.lafrite-smartcard.img: 60f50115eba4d34bb642de2c430c062834c635a23e55632001baccf3cf145991
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img: 1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi02w-smartcard.img: 105085957adce34548bda3a11e8f2125a659ff17ef3545aa0c737eec1ced8085
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi2-smartcard.img: 78fcd7d1a1538d2f9cb191f34cfd6fa4f79421d46f6f25ab7cb988d9b337cc5f
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi4-smartcard.img: 7e59b6e421f2fed0b4759f8f3eb20c0e225e86afbb8f4223b161f781976227c8
```

The input box may show only part of the text. Scroll inside it to check that all five files, from `lafrite` to `pi4`, are present. Automatic line wrapping on a narrow screen is different from inserting an extra line break.

### ③ Signature — message signature

Paste the one-line string under **Bitcoin Message Signature** in the release.<br> Include the final `=`.

```text
H5Ayg8hhAbbjZ6BpHiNVKfDPgcifnep4ByxbkWNvfB0DMT2w5AVR7p5ZC+o9RDSREFYA5LxR0pZ3OEcCRM/OIZ4=
```

### ④ VERIFY — check the result

Choose **VERIFY** after filling all three fields. **Valid signature** below the button means the hash-list signature is valid for that address.<br> Your `.img` file has not been checked yet. Continue to step 4.

<GuideFigure
  src="/guides/os/message-signature.png"
  alt="Verification screen containing the developer address, the five B12 hash-list lines, and the message signature, with Valid signature after VERIFY."
  caption="An actual B12 verification result. The Message field contains all five lines; the small box shows only the beginning."
/>

<details>
<summary>Verify with Sparrow or Electrum</summary>

If you already have a trusted installation of **Sparrow or Electrum**, you can check the same values locally. You do not need to create a wallet or import private keys for verification.

1. Open **Tools → Sign/Verify Message**. Electrum labels it **Sign/verify message**.
2. Paste the developer's address from step 2 into **Address**.
3. Paste all five hash-list lines into **Message** and the signature string into **Signature**.
4. Choose **Verify, not Sign**, and check that the signature is valid.

B12 uses the **Electrum signature format**. Use a version that supports it; do not convert the signature or generate a new one.<br> Local verification can work offline, but obtain the release text and independently confirmed address through trusted channels first. A successful signature check still needs the file-hash comparison below.

</details>

<Callout type="danger" title="Stop installation if signature verification fails">

Do not continue if the address differs or the signature is not valid.<br> Recheck all five message lines, spaces and line breaks, and the final `=` in the signature.<br> If copying again still fails, contact the release developer or seller.

</Callout>

---

## 4. Calculate the SHA-256 of your image {#sha256}

SHA-256 is a **64-character checksum** calculated from the file contents.<br> It must match the list whose signature you verified above.<br> **Calculate the extracted `.img` file, not the `.img.zip` archive.**

### Windows — check with PowerShell

1. In File Explorer, open the folder containing the extracted **`.img` file**.
2. Click the **address bar** at the top, type `powershell`, and press Enter.<br> This is the field showing the folder path, not the search box.
3. Copy and run the **Raspberry Pi Zero v1.3 command** below.

The command reads the file and calculates a hash; it does not modify or execute the image. Administrator privileges are not needed.<br> Do not type the existing prompt, such as `PS C:\...>`.

**Raspberry Pi Zero v1.3 (`pi0`)**

```powershell
(Get-FileHash -LiteralPath ".\seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img" -Algorithm SHA256).Hash
```

The calculation may take a moment without a progress indicator. When a long letters-and-numbers line appears, keep the window open for step 5.<br> If you see a **file not found** error, check the extracted folder and filename. In File Explorer, enable **View → Show → File name extensions** if necessary to confirm the `.img` extension.

<details>
<summary>Check on macOS</summary>

Open **Terminal** and type `shasum -a 256 `.<br> Leave one space after `256`, drag the extracted **`.img` file** from Finder into the Terminal window, and press Enter.<br> The file path is inserted automatically.

If Terminal is already in that folder, use the command below.

```bash
shasum -a 256 seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img
```

The 64-character value before the filename is the SHA-256 checksum.

</details>

<details>
<summary>Check on Linux</summary>

Open the folder containing the `.img` file in your file manager and choose **Open in Terminal**.<br> Run the command below.

```bash
sha256sum seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img
```

The 64-character value before the filename is the SHA-256 checksum.

</details>

---

## 5. Compare with the signed value {#compare}

In the message you verified in step 3, find the line whose **filename ends in `pi0-smartcard.img`**.<br> The complete 64-character value you calculated must match that line.<br> Letter case does not matter for the hexadecimal hash, but do not alter the case of the signing address or message.

**B12 / Raspberry Pi Zero v1.3 (`pi0`)**

```text
1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6
```

This value applies **only to the B12 image for Raspberry Pi Zero v1.3**.<br> Do not apply it to a different version or filename.<br> Do not treat a partial prefix match as a pass.

<details>
<summary>Compare with True / False on Windows — B12 / Raspberry Pi Zero v1.3</summary>

To avoid a visual comparison, run these two lines in the **same PowerShell window**. First confirm that `$expectedHash` matches the **pi0 hash in the message verified in step 3**.

```powershell
$expectedHash = '1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6'
(Get-FileHash -LiteralPath '.\seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img' -Algorithm SHA256 -ErrorAction Stop).Hash -eq $expectedHash
```

- **True:** this image's hash matches that value. Steps 2 and 3 must also be complete.
- **False:** the hash differs. Do not write the card; check the file, version, and board.
- **Error:** the comparison did not complete. Check the path and download first.

This command compares hashes only. **It does not verify the message signature.**

</details>

<Callout type="warning" title="Do not write the SD card if the values differ">

Check whether you calculated the ZIP, selected the wrong version or board, or started before the download finished.<br> If a fresh official download under the same conditions still differs, do not use the file; contact the developer or seller.

</Callout>

---

## If a result differs or an error appears {#troubleshooting}

| Situation | What to check |
| --- | --- |
| The developer addresses differ | Stop and ask the developer. Do not substitute another address just to make verification pass. |
| The message signature is not valid | Recheck all five lines, filenames, colons, spaces, line breaks, and the signature's final `=`. |
| Only part of the message is visible | Scroll inside the field to find the final `pi4` line. Do not shorten or summarize the text. |
| The website will not load or the button does not work | This is not a successful check. Use a trusted Sparrow / Electrum installation with the same values, or try again later. |
| File not found | Open PowerShell in the extracted folder and check the exact filename and `.img` extension. |
| The hash differs or the result is False | Check that you calculated the extracted B12 `pi0-smartcard.img`, not the ZIP. Do not use the file if a fresh official download still differs. |
| You downloaded a different file | Do not write it. Return to step 1 and choose the B12 `pi0-smartcard.img.zip`. |

When asking for help, send only the **release URL, filename, calculated hash, and error text**. A seed, PIN, or private key is never needed for this check.

<Callout type="warning" title="What successful verification means">

Verification confirms that your file matches the one published by the signer whose identity you checked. It does not prove that the software has no vulnerabilities or malicious behavior.<br> A GitHub **Verified** commit badge or Raspberry Pi Imager's write verification does not replace this download verification.

</Callout>

## 6. Are you done verifying? {#complete}

- [ ] The developer's signing address matches an independent channel.
- [ ] The message signature is valid for all **five B12 hash-list lines**.
- [ ] The SHA-256 of the `.img` file you received matches the signed list.

When all three are confirmed, continue to [Write the SD card](./install#write-card).<br> If Raspberry Pi Imager is not installed yet, follow the [Imager installation step](./install#install-imager) first.

Record the release URL, image filename, signature result, and SHA-256 value so you can review them later.

## Official references

- [ShieldSigner B12 release: original hashes, signature, and verification tools](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)
- [Developer's independent channel: Crypto Guide BTC address](https://cryptoguide.tips/send-me-a-tip/)
- [Message verification tool linked by the release](https://www.verifybitcoinmessage.com/)
- [Microsoft: PowerShell Get-FileHash](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash?view=powershell-7.5)

</GuideContent>

