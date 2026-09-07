---
title: Install ShieldSigner OS
description: Install ShieldSigner OS on a microSD card with Raspberry Pi Imager
---

<script setup>
import { withBase } from 'vitepress'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
const installationImage = (name) => withBase(`/guides/os/install-reference/${name}`)
</script>

<GuideContent>
<div class="ss-install-guide">

# Install ShieldSigner OS

Start ShieldSigner in a simple, safe sequence.

---

## Getting started

Prepare the ShieldSigner OS image, write it to a microSD card with Raspberry Pi Imager, and check the first boot.

### What you need

- ShieldSigner
- microSD card
- USB card reader

---

## 1. Prepare the microSD card

Insert the microSD card **all the way** into the USB card reader included in the package.

- Confirm that the card is facing the correct direction.
- The photos below show the card partly inserted only to make the direction clear.

<div class="ss-install-gallery">
  <a :href="installationImage('01-sd-card.png')" target="_blank" rel="noopener"><img :src="installationImage('01-sd-card.png')" alt="Example microSD insertion direction 1" loading="lazy" /></a>
  <a :href="installationImage('02-sd-card.png')" target="_blank" rel="noopener"><img :src="installationImage('02-sd-card.png')" alt="Example microSD insertion direction 2" loading="lazy" /></a>
  <a :href="installationImage('03-sd-card.png')" target="_blank" rel="noopener"><img :src="installationImage('03-sd-card.png')" alt="Example microSD insertion direction 3" loading="lazy" /></a>
  <a :href="installationImage('04-sd-card.png')" target="_blank" rel="noopener"><img :src="installationImage('04-sd-card.png')" alt="Example microSD insertion direction 4" loading="lazy" /></a>
</div>

Connect the card reader to a USB port on your computer.

---

## 2. Prepare the ShieldSigner image {#download}

Download the ShieldSigner OS image on your computer.

1. Open the [official ShieldSigner GitHub release](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12).<br> This guide uses **SeSi-0.8.7+ShSi-B12**.

<figure class="ss-install-image">
  <a :href="installationImage('05-os-download.png')" target="_blank" rel="noopener"><img :src="installationImage('05-os-download.png')" alt="ShieldSigner B12 release Assets with pi0-smartcard.img.zip highlighted" loading="lazy" /></a>
</figure>

2. Download `pi0-smartcard.img.zip` for the **Raspberry Pi Zero 1.3 without a communication module**.
3. Extract the ZIP and prepare the **`.img` file**.

---

## 3. Install Raspberry Pi Imager

Install Raspberry Pi Imager.

1. Open the [official Raspberry Pi Imager download page](https://www.raspberrypi.com/software/).

<figure class="ss-install-image">
  <a :href="installationImage('06-imager-download.png')" target="_blank" rel="noopener"><img :src="installationImage('06-imager-download.png')" alt="Raspberry Pi Imager download page" loading="lazy" /></a>
</figure>

Download the installer for your operating system.<br> Windows, macOS, and Ubuntu are available.

2. Open the downloaded file and complete the installation.

<figure class="ss-install-image">
  <a :href="installationImage('07-imager-install.png')" target="_blank" rel="noopener"><img :src="installationImage('07-imager-install.png')" alt="Raspberry Pi Imager installation screen" loading="lazy" /></a>
</figure>

---

## 4. Open Raspberry Pi Imager and prepare the flash {#write-card}

Open Raspberry Pi Imager.<br> You are going to write the verified image to the SD card.

In the **Device** step, scroll down, choose **Raspberry Pi Zero**, and select **Next**.

<figure class="ss-install-image">
  <a :href="installationImage('08-imager-device.png')" target="_blank" rel="noopener"><img :src="installationImage('08-imager-device.png')" alt="Raspberry Pi Zero selected in the Device step" loading="lazy" /></a>
</figure>

In the **OS** step, scroll down and choose **Use Custom**.

<figure class="ss-install-image">
  <a :href="installationImage('09-imager-os.png')" target="_blank" rel="noopener"><img :src="installationImage('09-imager-os.png')" alt="Use Custom selected in the OS step" loading="lazy" /></a>
</figure>

Choose the downloaded and verified ShieldSigner **`.img` file**.<br> For Zero 1.3, the filename is `seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img`.

<figure class="ss-install-image">
  <a :href="installationImage('10-imager-image-file.png')" target="_blank" rel="noopener"><img :src="installationImage('10-imager-image-file.png')" alt="The extracted pi0-smartcard.img file selected" loading="lazy" /></a>
</figure>

In **Storage**, choose the microSD card.<br> Check its name and capacity carefully, and do not select the computer's SSD or another USB storage device.

<figure class="ss-install-image">
  <a :href="installationImage('11-imager-storage.png')" target="_blank" rel="noopener"><img :src="installationImage('11-imager-storage.png')" alt="Storage step for choosing the SD card to write" loading="lazy" /></a>
</figure>

Select **Next** to review the image and destination card.<br> On the **Write image** screen, choose **WRITE**.

<figure class="ss-install-image">
  <a :href="installationImage('12-imager-write-review.png')" target="_blank" rel="noopener"><img :src="installationImage('12-imager-write-review.png')" alt="Write image screen confirming Raspberry Pi Zero, pi0-smartcard.img, and MXT-USB Storage Device before WRITE" loading="lazy" /></a>
</figure>

You will see a warning that **all data on the selected storage will be erased**.<br> After backing up needed files and confirming the correct card, choose **I UNDERSTAND, ERASE AND WRITE**.

<figure class="ss-install-image">
  <a :href="installationImage('13-imager-erase-warning.png')" target="_blank" rel="noopener"><img :src="installationImage('13-imager-erase-warning.png')" alt="Data deletion warning with the I UNDERSTAND, ERASE AND WRITE confirmation button" loading="lazy" /></a>
</figure>

Wait for writing and verification to finish.<br> When **Write complete!** appears, installation is complete.

<figure class="ss-install-image">
  <a :href="installationImage('14-imager-complete.png')" target="_blank" rel="noopener"><img :src="installationImage('14-imager-complete.png')" alt="Write complete screen showing Raspberry Pi Zero and pi0-smartcard.img" loading="lazy" /></a>
</figure>

Confirm that the card was ejected safely, disconnect the USB card reader, and remove the microSD card.

---

## 5. Check ShieldSigner operation

With ShieldSigner powered off, insert the microSD card and connect power to check the boot.

<figure class="ss-install-image">
  <a :href="installationImage('15-device-check.jpg')" target="_blank" rel="noopener"><img :src="installationImage('15-device-check.jpg')" alt="microSD card inserted in the lower slot of the ShieldSigner device" loading="lazy" /></a>
</figure>

<figure class="ss-install-image">
  <a :href="installationImage('16-device-boot.gif')" target="_blank" rel="noopener"><img :src="installationImage('16-device-boot.gif')" alt="ShieldSigner powering on during the boot process" loading="lazy" /></a>
</figure>

Confirm that the main menu appears and that the buttons respond.

---

> **Power note:** Use a 5V power supply suitable for the product.<br> Fast chargers are not supported.

---

[Open the OS verification guide →](./verification)

</div>
</GuideContent>

<style scoped>
.ss-install-guide .ss-install-gallery{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));align-items:center;gap:10px;margin:24px 0}
.ss-install-guide .ss-install-gallery a{min-width:0}
.ss-install-guide .ss-install-gallery img{display:block;width:100%;height:auto;border-radius:6px}
.ss-install-guide .ss-install-image{margin:24px 0}
.ss-install-guide .ss-install-image a{display:block;width:fit-content;max-width:100%}
.ss-install-guide .ss-install-image img{display:block;max-width:100%;height:auto;border-radius:8px}
.ss-install-guide :deep(code){overflow-wrap:anywhere;word-break:break-word}
@media(max-width:599px){.ss-install-guide .ss-install-gallery{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style>

