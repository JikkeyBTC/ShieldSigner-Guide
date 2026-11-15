---
title: Install ShieldSigner OS
description: Install ShieldSigner OS for Raspberry Pi Zero v1.3 on a microSD card with Raspberry Pi Imager
---

<script setup>
import { ref } from 'vue'
import { withBase } from 'vitepress'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
const installationImage = (name) => withBase(`/guides/os/install-reference/${name}`)
const imageFileName = 'seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img'
const copied = ref(false)
async function copyFileName() {
  try {
    await navigator.clipboard.writeText(imageFileName)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1600)
  } catch { copied.value = false }
}
const bootChecks = ref([false, false, false])
</script>

<GuideContent>
<div class="ss-install-guide">

<p class="ins-kicker"><span class="ins-kicker-dot"></span>SHIELDSIGNER OS · INSTALL</p>

# Install ShieldSigner OS

<p class="ins-lede">Start ShieldSigner in a simple, safe sequence.<br>Five steps: get the official image, verify it, write it to a microSD card, and check the first boot.</p>

<dl class="ins-spec">
<div><dt>DEVICE</dt><dd>Raspberry Pi Zero v1.3 <em>only</em></dd></div>
<div><dt>RELEASE</dt><dd><code>SeSi-0.8.7+ShSi-B12</code></dd></div>
<div><dt>IMAGE</dt><dd><code>pi0-smartcard</code></dd></div>
<div><dt>TOOL</dt><dd>Raspberry Pi Imager</dd></div>
</dl>

<nav class="ins-route" aria-label="Installation steps">
<a href="#prepare-card"><b>01</b><span>Prepare card</span></a>
<a href="#download"><b>02</b><span>Get image</span><i>VERIFY</i></a>
<a href="#install-imager"><b>03</b><span>Install Imager</span></a>
<a href="#write-card"><b>04</b><span>Write card</span></a>
<a href="#boot-check"><b>05</b><span>Check boot</span></a>
</nav>

<section class="ins-kit" aria-labelledby="ins-kit-title">
<h3 id="ins-kit-title" class="ins-label">WHAT YOU NEED</h3>
<ul class="ins-kit-list">
<li><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="13" width="36" height="22" rx="5"/><rect x="11" y="18" width="15" height="12" rx="1.5" class="fill"/><circle cx="33" cy="20.5" r="2.2"/><circle cx="33" cy="27.5" r="2.2"/></svg><strong>ShieldSigner</strong><span>The assembled device</span></li>
<li><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 7h15l6 6v28H15z"/><path d="M19 7v6M23 7v6M27 7v6" class="accent"/><path d="M15 22h-2v6h2"/></svg><strong>microSD card</strong><span>Writing erases existing data</span></li>
<li><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="17" width="26" height="14" rx="3"/><path d="M33 20h8v8h-8"/><path d="M36 22.5h2M36 25.5h2" class="accent"/><path d="M11 21h12" class="accent"/></svg><strong>USB card reader</strong><span>Included in the package</span></li>
</ul>
</section>

<section class="ins-step" aria-labelledby="prepare-card">
<header class="ins-step-head"><span class="ins-step-no">01</span><div><p class="ins-step-tag">PREPARE</p><h2 id="prepare-card">Prepare the microSD card</h2></div></header>
<div class="ins-step-body">
<p>Insert the microSD card <strong>all the way</strong> into the USB card reader included in the package.</p>
<ul>
<li>Confirm that the card is facing the correct direction.</li>
<li>The photos below show the card partly inserted only to make the direction clear.</li>
</ul>
<div class="ss-install-gallery">
  <ImageZoom :src="installationImage('01-sd-card.png')" alt="Example microSD insertion direction 1" />
  <ImageZoom :src="installationImage('02-sd-card.png')" alt="Example microSD insertion direction 2" />
  <ImageZoom :src="installationImage('03-sd-card.png')" alt="Example microSD insertion direction 3" />
  <ImageZoom :src="installationImage('04-sd-card.png')" alt="Example microSD insertion direction 4" />
</div>
<p class="ins-then"><span>NEXT</span>Connect the card reader to a USB port on your computer.</p>
</div>
</section>

<section class="ins-step" aria-labelledby="download">
<header class="ins-step-head"><span class="ins-step-no">02</span><div><p class="ins-step-tag">DOWNLOAD</p><h2 id="download">Prepare the ShieldSigner image</h2></div></header>
<div class="ins-step-body">
<p>Download the ShieldSigner OS image on your computer.</p>
<a class="ins-link-card" href="https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12" target="_blank" rel="noreferrer">
<span class="ins-link-meta">GITHUB RELEASE</span>
<strong>Official ShieldSigner GitHub release</strong>
<span class="ins-link-sub">This guide uses <b>SeSi-0.8.7+ShSi-B12</b></span>
<span class="ins-link-arrow" aria-hidden="true">↗</span>
</a>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('05-os-download.png')" alt="ShieldSigner B12 release Assets with pi0-smartcard.img.zip highlighted" />
  <figcaption>Find <code>pi0-smartcard.img.zip</code> under Assets</figcaption>
</figure>
<div class="ins-file-flow" aria-label="From the ZIP archive to the image file">
<div class="ins-file"><span class="ins-file-ext">ZIP</span><code>pi0-smartcard.img.zip</code><small>For Pi Zero v1.3 without a communication module</small></div>
<span class="ins-file-arrow" aria-hidden="true">extract →</span>
<div class="ins-file is-target"><span class="ins-file-ext">IMG</span><code>.img</code><small>The file you will use in Imager</small></div>
</div>
<aside class="ins-gate" aria-label="Verify before writing">
<div class="ins-gate-head"><span class="ins-gate-badge">STOP</span><strong>Verify before writing the SD card</strong></div>
<p>Once the file is ready, check both items on the verification page, then return here to continue.</p>
<ol class="ins-gate-list">
<li><b>The developer's message signature</b><span>The release message is signed by the developer's address</span></li>
<li><b>SHA-256 of your <code>.img</code> file</b><span>It matches the published hash exactly</span></li>
</ol>
<a class="ins-gate-cta" href="./verification#download">Verify the installation files →</a>
</aside>
</div>
</section>

<section class="ins-step" aria-labelledby="install-imager">
<header class="ins-step-head"><span class="ins-step-no">03</span><div><p class="ins-step-tag">TOOL</p><h2 id="install-imager">Install Raspberry Pi Imager</h2></div></header>
<div class="ins-step-body">
<a class="ins-link-card" href="https://www.raspberrypi.com/software/" target="_blank" rel="noreferrer">
<span class="ins-link-meta">RASPBERRYPI.COM</span>
<strong>Official Raspberry Pi Imager download page</strong>
<span class="ins-link-sub">Download the installer for your operating system</span>
<span class="ins-link-arrow" aria-hidden="true">↗</span>
</a>
<p class="ins-os-chips"><span>Windows</span><span>macOS</span><span>Ubuntu</span></p>
<div class="ins-pair">
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('06-imager-download.png')" alt="Raspberry Pi Imager download page" />
  <figcaption><b>A</b> Download the file for your OS</figcaption>
</figure>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('07-imager-install.png')" alt="Raspberry Pi Imager installation screen" />
  <figcaption><b>B</b> Open it and complete the installation</figcaption>
</figure>
</div>
</div>
</section>

<section class="ins-step" aria-labelledby="write-card">
<header class="ins-step-head"><span class="ins-step-no">04</span><div><p class="ins-step-tag">FLASH</p><h2 id="write-card">Write the card with Raspberry Pi Imager</h2></div></header>
<div class="ins-step-body">
<p>Open Raspberry Pi Imager.<br>You are going to write the verified image to the SD card.</p>
<nav class="ins-imager-steps" aria-label="Imager steps">
<a href="#imager-device"><b>Device</b><span>4-1</span></a>
<a href="#imager-os"><b>OS</b><span>4-2 · 4-3</span></a>
<a href="#imager-storage"><b>Storage</b><span>4-4</span></a>
<a href="#imager-writing"><b>Writing</b><span>4-5 · 4-6</span></a>
<a href="#imager-done"><b>Done</b><span>4-7</span></a>
</nav>
<ol class="ins-sub">
<li id="imager-device">
<p class="ins-sub-title"><span>4-1</span>Device</p>
<p>Scroll down, choose <strong>Raspberry Pi Zero</strong>, and select <strong>Next</strong>.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('08-imager-device.png')" alt="Raspberry Pi Zero selected in the Device step" />
</figure>
</li>
<li id="imager-os">
<p class="ins-sub-title"><span>4-2</span>OS</p>
<p>Scroll down and choose <strong>Use Custom</strong>.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('09-imager-os.png')" alt="Use Custom selected in the OS step" />
</figure>
</li>
<li>
<p class="ins-sub-title"><span>4-3</span>Image file</p>
<p>Choose the downloaded and verified ShieldSigner <strong><code>.img</code> file</strong>. The Raspberry Pi Zero v1.3 filename is:</p>
<div class="ins-filename">
<code>{{ imageFileName }}</code>
<button type="button" class="ins-copy" :class="{ 'is-done': copied }" @click="copyFileName" :aria-label="copied ? 'Filename copied' : 'Copy filename'">{{ copied ? 'Copied' : 'Copy' }}</button>
</div>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('10-imager-image-file.png')" alt="The extracted pi0-smartcard.img file selected" />
</figure>
</li>
<li id="imager-storage">
<p class="ins-sub-title"><span>4-4</span>Storage</p>
<p>Choose the microSD card. Check its name and capacity carefully, and <strong>do not select the computer's SSD or another USB storage device</strong>.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('11-imager-storage.png')" alt="Storage step for choosing the SD card to write" />
</figure>
</li>
<li id="imager-writing">
<p class="ins-sub-title"><span>4-5</span>Write image</p>
<p>Select <strong>Next</strong>, review the image and destination card, then choose <strong>WRITE</strong>.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('12-imager-write-review.png')" alt="Write image screen confirming Raspberry Pi Zero, pi0-smartcard.img, and MXT-USB Storage Device before WRITE" />
</figure>
</li>
<li class="is-danger">
<p class="ins-sub-title"><span>4-6</span>Confirm data erase</p>
<p>You will see a warning that <strong>all data on the selected storage will be erased</strong>. After backing up needed files and confirming the correct card, choose <strong>I UNDERSTAND, ERASE AND WRITE</strong>.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('13-imager-erase-warning.png')" alt="Data deletion warning with the I UNDERSTAND, ERASE AND WRITE confirmation button" />
</figure>
</li>
<li class="is-done" id="imager-done">
<p class="ins-sub-title"><span>4-7</span>Write complete!</p>
<p>Wait for writing and verification to finish. When <strong>Write complete!</strong> appears, installation is complete.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('14-imager-complete.png')" alt="Write complete screen showing Raspberry Pi Zero and pi0-smartcard.img" />
</figure>
<p class="ins-then"><span>NEXT</span>Confirm the card was ejected safely, disconnect the reader, and remove the microSD card.</p>
</li>
</ol>
</div>
</section>

<section class="ins-step" aria-labelledby="boot-check">
<header class="ins-step-head"><span class="ins-step-no">05</span><div><p class="ins-step-tag">BOOT</p><h2 id="boot-check">Check ShieldSigner operation</h2></div></header>
<div class="ins-step-body">
<p>With ShieldSigner powered off, insert the microSD card and connect power to check the boot.</p>
<div class="ins-pair">
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('15-device-check.jpg')" alt="microSD card inserted in the lower slot of the ShieldSigner device" />
  <figcaption><b>A</b> Insert the card into the lower slot</figcaption>
</figure>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('16-device-boot.gif')" alt="ShieldSigner powering on during the boot process" />
  <figcaption><b>B</b> Connect power and boot</figcaption>
</figure>
</div>
<fieldset class="ins-checklist">
<legend>BOOT CHECKLIST</legend>
<label><input type="checkbox" v-model="bootChecks[0]" /><span>A 5V power supply suitable for the product is connected</span></label>
<label><input type="checkbox" v-model="bootChecks[1]" /><span>The main menu appears on screen</span></label>
<label><input type="checkbox" v-model="bootChecks[2]" /><span>The buttons respond when pressed</span></label>
<p class="ins-checklist-done" v-if="bootChecks.every(Boolean)">Installation is complete. Next, prepare your SeedKeeper card.</p>
</fieldset>
<Callout type="danger" title="Fast chargers are not supported">

Use a 5V power supply suitable for the product.

</Callout>
</div>
</section>

<a class="ins-next" href="./verification">
<span class="ins-link-meta">RELATED GUIDE</span>
<strong>Open the OS verification guide</strong>
<span class="ins-link-sub">How to check the message signature and SHA-256 in detail</span>
<span class="ins-link-arrow" aria-hidden="true">→</span>
</a>

</div>
</GuideContent>

<style scoped>
.ss-install-guide{--ins-accent:var(--chapter-accent,var(--ss-orange));--ins-mono:'Roboto Mono',ui-monospace,SFMono-Regular,monospace;--ins-ink:#1d1c1b;--ins-danger:#ff5d4f;--ins-ok:#66d69b}

/* Hero */
.ss-install-guide .ins-kicker{display:flex;align-items:center;gap:10px;margin:0 0 14px;color:var(--ins-accent);font:600 11px/1 var(--ins-mono);letter-spacing:.16em}
.ss-install-guide .ins-kicker-dot{width:7px;height:7px;border-radius:50%;background:var(--ins-accent);box-shadow:0 0 0 5px color-mix(in srgb,var(--ins-accent),transparent 82%)}
.ss-install-guide .ins-lede{margin:0 0 28px;color:#bdb7b1;font-size:16px;line-height:1.75}
.ss-install-guide .ins-spec{display:grid;grid-template-columns:1.15fr 1.4fr .95fr 1fr;margin:0 0 18px;border:1px solid var(--ss-line);border-radius:12px;background:var(--ss-panel);overflow:hidden}
.ss-install-guide .ins-spec>div{min-width:0;padding:14px 16px;border-left:1px solid var(--ss-line)}
.ss-install-guide .ins-spec>div:first-child{border-left:0}
.ss-install-guide .ins-spec dt{margin:0 0 7px;color:#807a74;font:600 10px/1 var(--ins-mono);letter-spacing:.12em}
.ss-install-guide .ins-spec dd{margin:0;color:var(--ss-text);font-size:13.5px;font-weight:600;line-height:1.45;overflow-wrap:anywhere}
.ss-install-guide .ins-spec dd em{color:var(--ins-accent);font-style:normal}
.ss-install-guide .ins-spec dd code{padding:0;border:0;background:none;font:600 12.5px/1.45 var(--ins-mono);white-space:nowrap}

/* Route map */
.ss-install-guide .ins-route{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;margin:0 0 40px}
.ss-install-guide .ins-route a{position:relative;display:flex;flex-direction:column;gap:6px;padding:12px 12px 13px;border:1px solid var(--ss-line);border-radius:10px;color:#cfc9c3;text-decoration:none;font-size:13px;line-height:1.3;transition:border-color .2s,background .2s,transform .2s}
.ss-install-guide .ins-route a:hover{border-color:var(--ins-accent);background:color-mix(in srgb,var(--ins-accent),transparent 92%);transform:translateY(-2px)}
.ss-install-guide .ins-route b{color:var(--ins-accent);font:600 11px/1 var(--ins-mono)}
.ss-install-guide .ins-route i{position:absolute;top:10px;right:10px;padding:3px 5px;border-radius:4px;background:color-mix(in srgb,#ffd65a,transparent 84%);color:#ffd65a;font:600 9px/1 var(--ins-mono);font-style:normal;letter-spacing:.04em}

/* Kit */
.ss-install-guide .ins-label{margin:0 0 12px;color:#807a74;font:600 11px/1 var(--ins-mono);letter-spacing:.16em}
.ss-install-guide .ins-kit{margin:0 0 12px}
.ss-install-guide .ins-kit-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:0;padding:0;list-style:none!important}
.ss-install-guide .ins-kit-list li{display:grid;grid-template-columns:44px 1fr;grid-template-rows:auto auto;column-gap:12px;align-items:center;margin:0;padding:14px;border:1px solid var(--ss-line);border-radius:12px;background:linear-gradient(160deg,var(--ss-panel-2),var(--ss-panel))}
.ss-install-guide .ins-kit-list li::marker{content:''}
.ss-install-guide .ins-kit-list svg{grid-row:1/3;width:44px;height:44px;fill:none;stroke:#e9e4de;stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round}
.ss-install-guide .ins-kit-list svg .fill{fill:color-mix(in srgb,var(--ins-accent),transparent 70%);stroke:var(--ins-accent)}
.ss-install-guide .ins-kit-list svg .accent{stroke:var(--ins-accent)}
.ss-install-guide .ins-kit-list strong{color:var(--ss-text);font-size:14px;line-height:1.3}
.ss-install-guide .ins-kit-list span{color:#8f8983;font-size:12px;line-height:1.45}

/* Steps — timeline */
.ss-install-guide .ins-step{position:relative;margin:0;padding:52px 0 8px}
.ss-install-guide .ins-step-head h2{scroll-margin-top:120px}
.ss-install-guide .ins-step::before{content:'';position:absolute;top:110px;bottom:-44px;left:23px;width:1px;background:linear-gradient(var(--ss-line),var(--ss-line) 70%,transparent)}
.ss-install-guide .ins-step:last-of-type::before{display:none}
.ss-install-guide .ins-step-head{display:flex;align-items:center;gap:18px;margin:0 0 18px}
.ss-install-guide .ins-step-no{position:relative;z-index:1;display:grid;place-items:center;flex:0 0 48px;width:48px;height:48px;border:1px solid var(--ins-accent);border-radius:14px;background:color-mix(in srgb,var(--ins-accent),var(--ss-bg) 88%);color:var(--ins-accent);font:600 16px/1 var(--ins-mono)}
.ss-install-guide .ins-step-tag{margin:0 0 6px;color:#807a74;font:600 10px/1 var(--ins-mono);letter-spacing:.18em}
.ss-install-guide .ins-step-head h2{margin:0;padding:0;border:0;font-size:clamp(1.35rem,2.6vw,1.8rem);line-height:1.2;letter-spacing:-.02em}
.ss-install-guide .ins-step-body{padding-left:66px}
.ss-install-guide .ins-step-body>p:first-child{margin-top:0}

/* Figures */
.ss-install-guide .ss-install-gallery{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));align-items:center;gap:10px;margin:22px 0;padding:10px;border:1px solid var(--ss-line);border-radius:12px;background:var(--ins-ink)}
.ss-install-guide .ss-install-gallery :deep(.ss-image-trigger){min-width:0}
.ss-install-guide .ss-install-gallery :deep(img){display:block;width:100%;height:auto;border-radius:6px}
.ss-install-guide .ss-install-image{margin:18px 0 22px;padding:8px;border:1px solid var(--ss-line);border-radius:12px;background:var(--ins-ink)}
.ss-install-guide .ss-install-image :deep(.ss-image-trigger){display:block;width:100%}
.ss-install-guide .ss-install-image :deep(img){display:block;width:100%;height:auto;border-radius:6px;transition:opacity .2s}
.ss-install-guide .ss-install-image :deep(.ss-image-trigger:hover img){opacity:.88}
.ss-install-guide figcaption{display:flex;align-items:center;gap:8px;margin:9px 4px 2px;color:#8f8983;font-size:12px;line-height:1.5}
.ss-install-guide figcaption b{display:grid;place-items:center;width:18px;height:18px;border-radius:5px;background:var(--ss-panel-2);color:var(--ins-accent);font:600 10px/1 var(--ins-mono)}
.ss-install-guide figcaption code{font-size:11.5px}
.ss-install-guide .ins-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:stretch;margin:18px 0}
.ss-install-guide .ins-pair .ss-install-image{display:flex;flex-direction:column;margin:0}
.ss-install-guide .ins-pair .ss-install-image :deep(.ss-image-trigger){flex:1;display:flex;align-items:center;background:#141312;border-radius:6px}
.ss-install-guide .ins-pair figcaption{margin-top:9px}

.ss-install-guide .ins-then{display:flex;align-items:baseline;gap:10px;margin:18px 0 0;padding:12px 14px;border-radius:10px;background:var(--ss-panel);color:#d0cbc6}
.ss-install-guide .ins-then span{flex:0 0 auto;color:var(--ins-accent);font:600 10px/1 var(--ins-mono);letter-spacing:.14em}

/* Link cards */
.ss-install-guide .ins-link-card,.ss-install-guide .ins-next{position:relative;display:grid;gap:4px;margin:16px 0;padding:16px 52px 16px 18px;border:1px solid var(--ss-line);border-radius:12px;background:var(--ss-panel);color:var(--ss-text);text-decoration:none;transition:border-color .2s,background .2s}
.ss-install-guide .ins-link-card:hover,.ss-install-guide .ins-next:hover{border-color:var(--ins-accent);background:var(--ss-panel-2)}
.ss-install-guide .ins-link-meta{color:#807a74;font:600 10px/1.2 var(--ins-mono);letter-spacing:.14em}
.ss-install-guide .ins-link-card strong,.ss-install-guide .ins-next strong{font-size:15px;line-height:1.4}
.ss-install-guide .ins-link-sub{color:#a6a09a;font-size:13px;line-height:1.5}
.ss-install-guide .ins-link-sub b{color:var(--ss-text)}
.ss-install-guide .ins-link-arrow{position:absolute;top:50%;right:18px;color:var(--ins-accent);font-size:18px;transform:translateY(-50%);transition:transform .2s}
.ss-install-guide .ins-link-card:hover .ins-link-arrow{transform:translate(2px,-60%)}
.ss-install-guide .ins-next:hover .ins-link-arrow{transform:translate(3px,-50%)}
.ss-install-guide .ins-next{margin-top:56px;border-color:color-mix(in srgb,var(--ins-accent),var(--ss-line) 60%)}

.ss-install-guide .ins-os-chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 4px}
.ss-install-guide .ins-os-chips span{padding:5px 10px;border:1px solid var(--ss-line);border-radius:999px;color:#bdb7b1;font:500 12px/1 var(--ins-mono)}

/* ZIP → IMG */
.ss-install-guide .ins-file-flow{display:grid;grid-template-columns:minmax(0,1.3fr) auto minmax(0,1fr);align-items:center;gap:12px;margin:18px 0}
.ss-install-guide .ins-file{display:grid;grid-template-columns:auto 1fr;column-gap:12px;row-gap:3px;align-items:center;min-width:0;padding:12px 14px;border:1px dashed var(--ss-line);border-radius:12px}
.ss-install-guide .ins-file.is-target{border-style:solid;border-color:var(--ins-accent);background:color-mix(in srgb,var(--ins-accent),transparent 93%)}
.ss-install-guide .ins-file-ext{grid-row:1/3;display:grid;place-items:center;width:38px;height:44px;border-radius:4px 12px 4px 4px;background:var(--ss-panel-2);color:#cfc9c3;font:700 10px/1 var(--ins-mono)}
.ss-install-guide .is-target .ins-file-ext{background:var(--ins-accent);color:#1d1c1b}
.ss-install-guide .ins-file code{padding:0;border:0;background:none;color:var(--ss-text);font:600 12px/1.4 var(--ins-mono);white-space:nowrap;overflow-wrap:normal;word-break:normal}
.ss-install-guide .ins-file small{color:#8f8983;font-size:11.5px;line-height:1.4}
.ss-install-guide .ins-file-arrow{color:#807a74;font:500 11px/1 var(--ins-mono);white-space:nowrap}

/* Verification gate */
.ss-install-guide .ins-gate{margin:26px 0 8px;padding:20px;border:1px solid color-mix(in srgb,#ffd65a,var(--ss-line) 55%);border-radius:14px;background:repeating-linear-gradient(-45deg,transparent 0 14px,rgba(255,214,90,.025) 14px 28px),var(--ss-panel)}
.ss-install-guide .ins-gate-head{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.ss-install-guide .ins-gate-head strong{color:var(--ss-text);font-size:15.5px;line-height:1.4}
.ss-install-guide .ins-gate-badge{flex:0 0 auto;padding:5px 7px;border-radius:5px;background:#ffd65a;color:#1d1c1b;font:700 10px/1 var(--ins-mono);letter-spacing:.12em}
.ss-install-guide .ins-gate>p{margin:0 0 14px;color:#c4beb8;font-size:14px;line-height:1.7}
.ss-install-guide .ins-gate-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0 0 16px;padding:0;list-style:none!important;counter-reset:gate}
.ss-install-guide .ins-gate-list li{display:grid;gap:4px;margin:0;padding:12px 14px 12px 44px;position:relative;border-radius:10px;background:rgba(0,0,0,.18);counter-increment:gate}
.ss-install-guide .ins-gate-list li::marker{content:''}
.ss-install-guide .ins-gate-list li::before{content:counter(gate);position:absolute;top:12px;left:14px;display:grid;place-items:center;width:20px;height:20px;border:1px solid #ffd65a;border-radius:50%;color:#ffd65a;font:600 10px/1 var(--ins-mono)}
.ss-install-guide .ins-gate-list b{color:var(--ss-text);font-size:14px;line-height:1.4}
.ss-install-guide .ins-gate-list span{color:#9a948e;font-size:12.5px;line-height:1.5}
.ss-install-guide .ins-gate-cta{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:9px;background:#ffd65a;color:#1d1c1b!important;font-size:14px;font-weight:700;text-decoration:none;transition:filter .2s}
.ss-install-guide .ins-gate-cta:hover{filter:brightness(1.08)}

/* Imager stepper */
.ss-install-guide .ins-imager-steps{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px;margin:18px 0 8px}
.ss-install-guide .ins-imager-steps a{display:grid;gap:5px;padding:10px 2px 0;border-top:2px solid color-mix(in srgb,var(--ins-accent),var(--ss-line) 55%);text-decoration:none;transition:border-color .2s}
.ss-install-guide .ins-imager-steps a:hover{border-color:var(--ins-accent)}
.ss-install-guide .ins-imager-steps b{color:var(--ss-text);font:600 12px/1.2 var(--ins-mono)}
.ss-install-guide .ins-imager-steps span{color:#807a74;font:500 10.5px/1.2 var(--ins-mono)}
.ss-install-guide .ins-imager-steps a:hover b{color:var(--ins-accent)}
.ss-install-guide .ins-sub>li{scroll-margin-top:96px}

/* Sub-steps */
.ss-install-guide .ins-sub{margin:10px 0 0;padding:0;list-style:none!important}
.ss-install-guide .ins-sub>li{position:relative;margin:0;padding:22px 0 4px 0;border-top:1px solid color-mix(in srgb,var(--ss-line),transparent 40%)}
.ss-install-guide .ins-sub>li::marker{content:''}
.ss-install-guide .ins-sub>li:first-child{border-top:0}
.ss-install-guide .ins-sub>li>p{margin:0 0 6px}
.ss-install-guide .ins-sub-title{display:flex;align-items:center;gap:10px;margin:0 0 8px!important;color:var(--ss-text)!important;font-size:16px;font-weight:700}
.ss-install-guide .ins-sub-title span{padding:4px 7px;border-radius:6px;background:var(--ss-panel-2);color:var(--ins-accent);font:600 11px/1 var(--ins-mono)}
.ss-install-guide .ins-sub>li.is-danger{margin:10px -16px;padding:20px 16px 6px;border:1px solid color-mix(in srgb,var(--ins-danger),var(--ss-line) 55%);border-radius:14px;background:color-mix(in srgb,var(--ins-danger),var(--ss-bg) 94%)}
.ss-install-guide .ins-sub>li.is-danger .ins-sub-title span{background:var(--ins-danger);color:#1d1c1b}
.ss-install-guide .ins-sub>li.is-danger + li{border-top:0}
.ss-install-guide .ins-sub>li.is-done .ins-sub-title span{background:var(--ins-ok);color:#1d1c1b}

/* File name copy */
.ss-install-guide .ins-filename{display:flex;align-items:center;gap:8px;margin:12px 0 4px;padding:6px 6px 6px 14px;border:1px solid var(--ss-line);border-radius:10px;background:var(--ins-ink)}
.ss-install-guide .ins-filename code{flex:1;min-width:0;padding:0;border:0;background:none;color:var(--ss-text);font:500 12.5px/1.5 var(--ins-mono);overflow-wrap:anywhere}
.ss-install-guide .ins-copy{flex:0 0 auto;min-width:64px;min-height:36px;padding:0 12px;border:1px solid var(--ss-line);border-radius:7px;background:var(--ss-panel-2);color:var(--ss-text);font:600 12px/1 var(--ss-font-ui,inherit);cursor:pointer;transition:border-color .2s,color .2s}
.ss-install-guide .ins-copy:hover{border-color:var(--ins-accent)}
.ss-install-guide .ins-copy.is-done{border-color:var(--ins-ok);color:var(--ins-ok)}
.ss-install-guide .ins-copy:focus-visible{outline:2px solid var(--ins-accent);outline-offset:2px}

/* Checklist */
.ss-install-guide .ins-checklist{margin:22px 0;padding:16px 18px 10px;border:1px solid var(--ss-line);border-radius:14px;background:var(--ss-panel)}
.ss-install-guide .ins-checklist legend{padding:0 8px;margin-left:-8px;color:#807a74;font:600 10px/1 var(--ins-mono);letter-spacing:.16em}
.ss-install-guide .ins-checklist label{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid color-mix(in srgb,var(--ss-line),transparent 50%);color:#d0cbc6;font-size:14.5px;cursor:pointer}
.ss-install-guide .ins-checklist label:last-of-type{border-bottom:0}
.ss-install-guide .ins-checklist input{appearance:none;flex:0 0 20px;width:20px;height:20px;margin:0;border:1.5px solid #6d6965;border-radius:6px;background:transparent;cursor:pointer;display:grid;place-items:center;transition:background .15s,border-color .15s}
.ss-install-guide .ins-checklist input:checked{border-color:var(--ins-ok);background:var(--ins-ok)}
.ss-install-guide .ins-checklist input:checked::after{content:'';width:5px;height:10px;margin-top:-2px;border:solid #1d1c1b;border-width:0 2px 2px 0;transform:rotate(45deg)}
.ss-install-guide .ins-checklist input:focus-visible{outline:2px solid var(--ins-accent);outline-offset:2px}
.ss-install-guide .ins-checklist input:checked + span{color:var(--ss-text)}
.ss-install-guide .ins-checklist-done{margin:6px 0 6px!important;padding:10px 12px;border-radius:8px;background:color-mix(in srgb,var(--ins-ok),transparent 88%);color:var(--ins-ok)!important;font-size:13.5px}

.ss-install-guide :deep(code){overflow-wrap:anywhere;word-break:break-word}

@media(max-width:759px){
  .ss-install-guide .ins-spec{grid-template-columns:repeat(2,minmax(0,1fr))}
  .ss-install-guide .ins-spec>div:nth-child(3){border-left:0}
  .ss-install-guide .ins-spec>div:nth-child(n+3){border-top:1px solid var(--ss-line)}
  .ss-install-guide .ins-route{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin-right:-16px;padding-right:16px}
  .ss-install-guide .ins-route a{flex:0 0 132px;scroll-snap-align:start}
  .ss-install-guide .ins-kit-list{grid-template-columns:1fr}
  .ss-install-guide .ins-step::before{display:none}
  .ss-install-guide .ins-step-head{gap:14px}
  .ss-install-guide .ins-step-no{flex-basis:42px;width:42px;height:42px;border-radius:12px;font-size:14px}
  .ss-install-guide .ins-step-body{padding-left:0}
  .ss-install-guide .ins-pair,.ss-install-guide .ins-gate-list{grid-template-columns:1fr}
  .ss-install-guide .ins-file-flow{grid-template-columns:1fr}
  .ss-install-guide .ins-file-arrow{justify-self:center;transform:none}
  .ss-install-guide .ins-sub>li.is-danger{margin:10px 0}
  .ss-install-guide .ins-spec dd code{white-space:normal}
  .ss-install-guide .ins-imager-steps span{font-size:9.5px}
}
@media(max-width:599px){.ss-install-guide .ss-install-gallery{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style>
