---
title: Verify the installation files
description: Verify the ShieldSigner B12 message signature and SHA-256 before writing the SD card
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Verify the installation files

Confirm that the file is the one published by the developer **before writing it to an SD card**.<br> This page checks the signatures and installation image for the ShieldSigner **SeSi-0.8.7+ShSi-B12** release.

If you have not downloaded the file yet, start with the [download step in the installation guide](./install#download).<br> Extract the ZIP and prepare the **`.img` file**.

## How is this different from GPG verification?

**The B12 release does not provide `.asc` or `.sig` files for GPG verification, nor a separate `.sha256` file.** Instead, the release body publishes a **SHA-256 list** and a **Bitcoin message signature** for that list.<br> Use the method published by the developer for this release.

- **Message signature:** confirms that the holder of the signing address signed the hash list.
- **SHA-256:** confirms that the image you downloaded matches the file named in that list.
- **GPG / PGP signature:** a different way to verify a file with a distributor's PGP public key.<br> B12 does not include the files required to perform this check.

The **Verified** badge next to a GitHub commit describes the commit.<br> It does not mean that the downloaded OS image itself was verified with GPG.<br> The device's **GPG Tools** menu also does not mean that this release includes a GPG signature.

<GuideFigure
  src="/guides/os/verification-flow.svg"
  alt="Confirm the developer's signing address through another channel, verify the hash list signature with that address, and compare the SHA-256 of the downloaded image."
  caption="Checking only the signature or only the hash is not enough. Continue from confirming the signer to comparing the file."
/>

## 1. Confirm the developer's signing address

The address shown in **Signature Verification** on the official [B12 release](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12) is:

```text
37hiiSB1Poj6Shs8WawPS2HjT2jzHkFSQi
```

Open the developer's [Crypto Guide website](https://cryptoguide.tips/send-me-a-tip/) yourself and confirm that the address next to `BTC:` matches. You can also compare it with the description on the developer's [YouTube channel](https://www.youtube.com/channel/UCEviBQwLv-yfv3BErm0ojHg/).<br> This avoids relying on the release page alone.

This address is used to **identify the signer**.<br> You do not need to send money or connect a wallet.<br> Do not confuse it with the support address shown at the bottom of the verification website.

## 2. Verify the hash-list message signature

Open the [message signature verification website](https://www.verifybitcoinmessage.com/) linked by the developer in the release.<br> Use only the public address, message, and signature; never enter a seed or private key.

### Bitcoin Address — signing address

Enter the **full `37hii…FSQi` address** you compared with the independent channels in step 1.<br> This is not a field for your own wallet address.

### Message — signed text

Copy **all five lines** between the separators below **SHA256 Checksums (And message to verify)** in the release body.<br> Verification fails if you paste only the line for your board.

The B12 text is shown below.<br> **Compare it with the official release first**, then you may use the code block's copy button to copy all five lines together.<br> Do not change filenames, colons, spaces, or line breaks.<br> Do not include the title or separators.

```text
seedsigner_os.SeSi-0.8.7_ShSi-B12_.lafrite-smartcard.img: 60f50115eba4d34bb642de2c430c062834c635a23e55632001baccf3cf145991
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img: 1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi02w-smartcard.img: 105085957adce34548bda3a11e8f2125a659ff17ef3545aa0c737eec1ced8085
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi2-smartcard.img: 78fcd7d1a1538d2f9cb191f34cfd6fa4f79421d46f6f25ab7cb988d9b337cc5f
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi4-smartcard.img: 7e59b6e421f2fed0b4759f8f3eb20c0e225e86afbb8f4223b161f781976227c8
```

### Signature — message signature

Paste the one-line string under **Bitcoin Message Signature** in the release.<br> Include the final `=`.

```text
H5Ayg8hhAbbjZ6BpHiNVKfDPgcifnep4ByxbkWNvfB0DMT2w5AVR7p5ZC+o9RDSREFYA5LxR0pZ3OEcCRM/OIZ4=
```

### VERIFY — check the result

Choose **VERIFY** and confirm that **Valid signature** appears.

<GuideFigure
  src="/guides/os/message-signature.png"
  alt="Verification screen containing the developer address, the five B12 hash-list lines, and the message signature, with Valid signature after VERIFY."
  caption="This result uses the public values from the B12 release. The web verifier is only a tool, so still compare the developer address in step 1."
/>

If you do not want to rely on the website, verify the same three values with the **message verification feature in Electrum or Sparrow** linked by the release.<br> This signature uses the **Electrum format**, so choose a tool that supports it.

<Callout type="danger" title="Stop installation if signature verification fails">

Do not continue if the address differs or the signature is not valid.<br> Recheck all five message lines, spaces and line breaks, and the final `=` in the signature.<br> If copying again still fails, contact the release developer or seller.

</Callout>

## 3. Calculate the SHA-256 of your image

SHA-256 is a **64-character checksum** calculated from the file contents.<br> It must match the list whose signature you verified above.<br> **Calculate the extracted `.img` file, not the `.img.zip` archive.**

### Windows — check with PowerShell

1. In File Explorer, open the folder containing the extracted **`.img` file**.
2. Click the **address bar** at the top, type `powershell`, and press Enter.<br> This is the field showing the folder path, not the search box.
3. Copy and run the one command for your board.

**Pi Zero / Zero W**

```powershell
(Get-FileHash -LiteralPath ".\seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img" -Algorithm SHA256).Hash
```

**Pi Zero 2 W**

```powershell
(Get-FileHash -LiteralPath ".\seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi02w-smartcard.img" -Algorithm SHA256).Hash
```

Wait briefly for the file size while the long letters-and-numbers value is calculated.<br> If you see a **file not found** error, confirm that you are not inside the ZIP and check the filename and folder.

<details>
<summary>Check on macOS</summary>

Open **Terminal** and type `shasum -a 256 `.<br> Leave one space after `256`, drag the extracted **`.img` file** from Finder into the Terminal window, and press Enter.<br> The file path is inserted automatically.

If Terminal is already in that folder, use the command below.<br> For Zero 2 W, replace `pi0` with `pi02w` in the filename.

```bash
shasum -a 256 seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img
```

The 64-character value before the filename is the SHA-256 checksum.

</details>

<details>
<summary>Check on Linux</summary>

Open the folder containing the `.img` file in your file manager and choose **Open in Terminal**.<br> Run the command below.<br> For Zero 2 W, replace `pi0` with `pi02w` in the filename.

```bash
sha256sum seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img
```

The 64-character value before the filename is the SHA-256 checksum.

</details>

## 4. Compare with the signed value

In the message you verified in step 2, find the line whose filename matches your image.<br> The complete 64-character value you calculated must match that line.<br> Letter case does not matter for this hexadecimal value.

**B12 / Pi Zero·Zero W (`pi0`)**

```text
1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6
```

**B12 / Pi Zero 2 W (`pi02w`)**

```text
105085957adce34548bda3a11e8f2125a659ff17ef3545aa0c737eec1ced8085
```

These values apply **only to B12**.<br> If you downloaded another version, use that version's release and signature information.<br> Do not treat a partial prefix match as a pass.

<Callout type="warning" title="Do not write the SD card if the values differ">

Check whether you calculated the ZIP, selected the wrong version or board, or started before the download finished.<br> If a fresh official download under the same conditions still differs, do not use the file; contact the developer or seller.

</Callout>

## If another release provides GPG signatures

GPG verifies PGP signatures.<br> A GPG check needs the release's actual signature file, the signed file, and the developer's public key with a complete, independently verified fingerprint.<br> Do not trust only the key name or email address.

The file to verify depends on whether the signature covers the **image itself** or a **SHA-256 list**.<br> For a signed list, verify the list first and then compare the image hash.<br> Even when `Good signature` appears, confirm that the public-key fingerprint matches the value the developer published through another channel.

**B12 does not include these materials, so do not substitute an arbitrary public key or another project's signature.** If GPG verification is a required condition, postpone installation until the developer provides the necessary material.

## Are you done verifying?

- [ ] The developer's signing address matches an independent channel.
- [ ] The message signature is valid for all **five B12 hash-list lines**.
- [ ] The SHA-256 of the `.img` file you received matches the signed list.

When all three are confirmed, continue to [Write the SD card](./install#write-card).<br> Record the release URL, image filename, signature result, and SHA-256 value so you can review them later.

## Official references

- [ShieldSigner B12 release: original hashes, signature, and verification tools](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)
- [Developer's independent channel: Crypto Guide BTC address](https://cryptoguide.tips/send-me-a-tip/)
- [Official GnuPG documentation: signatures and public-key fingerprints](https://gnupg.org/download/integrity_check.html)

</GuideContent>

