---
title: ShieldSigner OS 설치
description: Raspberry Pi Zero v1.3용 ShieldSigner OS를 Raspberry Pi Imager로 microSD 카드에 설치하는 방법
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

# ShieldSigner OS 설치

<p class="ins-lede">간결하고 안전하게 ShieldSigner를 시작하세요.<br>공식 이미지를 받아 검증하고, microSD 카드에 기록한 뒤 부팅까지 확인하는 다섯 단계예요.</p>

<dl class="ins-spec">
<div><dt>대상 기기</dt><dd>Raspberry Pi Zero v1.3 <em>전용</em></dd></div>
<div><dt>릴리스</dt><dd><code>SeSi-0.8.7+ShSi-B12</code></dd></div>
<div><dt>이미지</dt><dd><code>pi0-smartcard</code></dd></div>
<div><dt>기록 도구</dt><dd>Raspberry Pi Imager</dd></div>
</dl>

<nav class="ins-route" aria-label="설치 단계">
<a href="#prepare-card"><b>01</b><span>카드 준비</span></a>
<a href="#download"><b>02</b><span>이미지 준비</span><i>검증 필수</i></a>
<a href="#install-imager"><b>03</b><span>Imager 설치</span></a>
<a href="#write-card"><b>04</b><span>카드에 기록</span></a>
<a href="#boot-check"><b>05</b><span>부팅 확인</span></a>
</nav>

<section class="ins-kit" aria-labelledby="ins-kit-title">
<h3 id="ins-kit-title" class="ins-label">준비물</h3>
<ul class="ins-kit-list">
<li><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="13" width="36" height="22" rx="5"/><rect x="11" y="18" width="15" height="12" rx="1.5" class="fill"/><circle cx="33" cy="20.5" r="2.2"/><circle cx="33" cy="27.5" r="2.2"/><path d="M38 24h0"/></svg><strong>ShieldSigner</strong><span>조립을 마친 본체</span></li>
<li><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M15 7h15l6 6v28H15z"/><path d="M19 7v6M23 7v6M27 7v6" class="accent"/><path d="M15 22h-2v6h2"/></svg><strong>microSD 카드</strong><span>기록하면 기존 데이터가 지워져요</span></li>
<li><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="7" y="17" width="26" height="14" rx="3"/><path d="M33 20h8v8h-8"/><path d="M36 22.5h2M36 25.5h2" class="accent"/><path d="M11 21h12" class="accent"/></svg><strong>USB 카드 리더기</strong><span>패키지에 동봉돼요</span></li>
</ul>
</section>

<section class="ins-step" aria-labelledby="prepare-card">
<header class="ins-step-head"><span class="ins-step-no">01</span><div><p class="ins-step-tag">PREPARE</p><h2 id="prepare-card">microSD 카드 준비</h2></div></header>
<div class="ins-step-body">
<p>패키지에 동봉된 USB 카드 리더기에 microSD 카드를 <strong>끝까지</strong> 넣어요.</p>
<ul>
<li>카드가 올바른 방향으로 들어갔는지 확인해 주세요.</li>
<li>아래 사진은 삽입 방향을 보여주기 위해 카드를 조금만 넣은 예시예요.</li>
</ul>
<div class="ss-install-gallery">
  <ImageZoom :src="installationImage('01-sd-card.png')" alt="카드 삽입 방향 예시 1" />
  <ImageZoom :src="installationImage('02-sd-card.png')" alt="카드 삽입 방향 예시 2" />
  <ImageZoom :src="installationImage('03-sd-card.png')" alt="카드 삽입 방향 예시 3" />
  <ImageZoom :src="installationImage('04-sd-card.png')" alt="카드 삽입 방향 예시 4" />
</div>
<p class="ins-then"><span>다음</span>카드 리더기를 PC의 USB 포트에 연결해 주세요.</p>
</div>
</section>

<section class="ins-step" aria-labelledby="download">
<header class="ins-step-head"><span class="ins-step-no">02</span><div><p class="ins-step-tag">DOWNLOAD</p><h2 id="download">ShieldSigner 이미지 준비</h2></div></header>
<div class="ins-step-body">
<p>PC에서 ShieldSigner OS 이미지를 내려받아요.</p>
<a class="ins-link-card" href="https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12" target="_blank" rel="noreferrer">
<span class="ins-link-meta">GITHUB RELEASE</span>
<strong>ShieldSigner 공식 GitHub 릴리스</strong>
<span class="ins-link-sub">이 안내는 <b>SeSi-0.8.7+ShSi-B12</b> 기준이에요</span>
<span class="ins-link-arrow" aria-hidden="true">↗</span>
</a>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('05-os-download.png')" alt="ShieldSigner B12 릴리스 Assets에서 pi0-smartcard.img.zip이 강조된 화면" />
  <figcaption>Assets에서 <code>pi0-smartcard.img.zip</code>을 찾아요</figcaption>
</figure>
<div class="ins-file-flow" aria-label="압축 파일에서 이미지 파일까지">
<div class="ins-file"><span class="ins-file-ext">ZIP</span><code>pi0-smartcard.img.zip</code><small>통신모듈이 없는 Pi Zero v1.3용</small></div>
<span class="ins-file-arrow" aria-hidden="true">압축 해제 →</span>
<div class="ins-file is-target"><span class="ins-file-ext">IMG</span><code>.img</code><small>Imager에서 사용할 파일</small></div>
</div>
<aside class="ins-gate" aria-label="기록 전 검증">
<div class="ins-gate-head"><span class="ins-gate-badge">STOP</span><strong>SD 카드에 기록하기 전에 검증해 주세요</strong></div>
<p>파일을 준비했다면 설치 파일 검증 페이지에서 아래 두 가지를 모두 확인한 뒤 이 페이지로 돌아와 진행해 주세요.</p>
<ol class="ins-gate-list">
<li><b>제작자의 메시지 서명</b><span>릴리스 메시지가 제작자 주소로 서명됐는지</span></li>
<li><b>내 <code>.img</code> 파일의 SHA-256</b><span>공개된 해시와 한 글자도 다르지 않은지</span></li>
</ol>
<a class="ins-gate-cta" href="./verification#download">설치 파일 검증으로 이동 →</a>
</aside>
</div>
</section>

<section class="ins-step" aria-labelledby="install-imager">
<header class="ins-step-head"><span class="ins-step-no">03</span><div><p class="ins-step-tag">TOOL</p><h2 id="install-imager">Raspberry Pi Imager 설치</h2></div></header>
<div class="ins-step-body">
<a class="ins-link-card" href="https://www.raspberrypi.com/software/" target="_blank" rel="noreferrer">
<span class="ins-link-meta">RASPBERRYPI.COM</span>
<strong>Raspberry Pi Imager 공식 다운로드 페이지</strong>
<span class="ins-link-sub">사용 중인 운영체제에 맞는 설치 파일을 받아 주세요</span>
<span class="ins-link-arrow" aria-hidden="true">↗</span>
</a>
<p class="ins-os-chips"><span>Windows</span><span>macOS</span><span>Ubuntu</span></p>
<div class="ins-pair">
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('06-imager-download.png')" alt="Raspberry Pi Imager 다운로드 페이지" />
  <figcaption><b>A</b> 운영체제에 맞는 파일 다운로드</figcaption>
</figure>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('07-imager-install.png')" alt="Raspberry Pi Imager 설치 진행 화면" />
  <figcaption><b>B</b> 내려받은 파일을 열어 설치 진행</figcaption>
</figure>
</div>
</div>
</section>

<section class="ins-step" aria-labelledby="write-card">
<header class="ins-step-head"><span class="ins-step-no">04</span><div><p class="ins-step-tag">FLASH</p><h2 id="write-card">Raspberry Pi Imager로 카드에 기록</h2></div></header>
<div class="ins-step-body">
<p>Raspberry Pi Imager를 실행해요.<br>앞에서 검증한 이미지를 SD 카드에 기록할 거예요.</p>
<nav class="ins-imager-steps" aria-label="Imager 진행 단계">
<a href="#imager-device"><b>Device</b><span>4-1</span></a>
<a href="#imager-os"><b>OS</b><span>4-2 · 4-3</span></a>
<a href="#imager-storage"><b>저장소</b><span>4-4</span></a>
<a href="#imager-writing"><b>Writing</b><span>4-5 · 4-6</span></a>
<a href="#imager-done"><b>Done</b><span>4-7</span></a>
</nav>
<ol class="ins-sub">
<li id="imager-device">
<p class="ins-sub-title"><span>4-1</span>Device</p>
<p>아래로 내려 <strong>Raspberry Pi Zero</strong>를 선택하고 <strong>다음</strong>을 눌러요.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('08-imager-device.png')" alt="Device 단계에서 Raspberry Pi Zero를 선택한 화면" />
</figure>
</li>
<li id="imager-os">
<p class="ins-sub-title"><span>4-2</span>OS</p>
<p>아래로 내려 <strong>사용자 정의 사용</strong>을 선택해요.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('09-imager-os.png')" alt="OS 단계의 사용자 정의 사용 선택 화면" />
</figure>
</li>
<li>
<p class="ins-sub-title"><span>4-3</span>이미지 파일</p>
<p>다운로드하고 검증한 ShieldSigner <strong><code>.img</code> 파일</strong>을 선택해요. Raspberry Pi Zero v1.3용 파일명은 아래와 같아요.</p>
<div class="ins-filename">
<code>{{ imageFileName }}</code>
<button type="button" class="ins-copy" :class="{ 'is-done': copied }" @click="copyFileName" :aria-label="copied ? '파일명 복사됨' : '파일명 복사'">{{ copied ? '복사됨' : '복사' }}</button>
</div>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('10-imager-image-file.png')" alt="압축을 푼 pi0-smartcard.img 파일을 선택한 화면" />
</figure>
</li>
<li id="imager-storage">
<p class="ins-sub-title"><span>4-4</span>저장소</p>
<p>microSD 카드를 선택해요. 이름과 용량을 확인하고, <strong>PC의 SSD나 다른 USB 저장장치를 고르지 않도록</strong> 주의해 주세요.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('11-imager-storage.png')" alt="기록할 SD 카드를 고르는 저장소 선택 화면" />
</figure>
</li>
<li id="imager-writing">
<p class="ins-sub-title"><span>4-5</span>Write image</p>
<p><strong>다음</strong>으로 넘어가 이미지 파일과 대상 카드를 확인한 뒤 <strong>WRITE</strong>를 눌러요.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('12-imager-write-review.png')" alt="Raspberry Pi Zero, pi0-smartcard.img, MXT-USB Storage Device를 확인하고 WRITE를 누르는 화면" />
</figure>
</li>
<li class="is-danger">
<p class="ins-sub-title"><span>4-6</span>데이터 삭제 확인</p>
<p>선택한 저장장치의 <strong>데이터가 모두 지워진다는 안내</strong>가 나와요. 필요한 파일을 백업했고 대상 카드가 맞다면 <strong>I UNDERSTAND, ERASE AND WRITE</strong>를 눌러요.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('13-imager-erase-warning.png')" alt="데이터 삭제 안내와 I UNDERSTAND, ERASE AND WRITE 확인 버튼" />
</figure>
</li>
<li class="is-done" id="imager-done">
<p class="ins-sub-title"><span>4-7</span>Write complete!</p>
<p>기록과 검증이 끝날 때까지 기다려요. <strong>Write complete!</strong>가 나오면 설치가 끝났어요.</p>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('14-imager-complete.png')" alt="Raspberry Pi Zero와 pi0-smartcard.img 기록이 완료된 Write complete 화면" />
</figure>
<p class="ins-then"><span>다음</span>카드가 안전하게 추출된 것을 확인하고, 리더기를 분리해 microSD 카드를 꺼내요.</p>
</li>
</ol>
</div>
</section>

<section class="ins-step" aria-labelledby="boot-check">
<header class="ins-step-head"><span class="ins-step-no">05</span><div><p class="ins-step-tag">BOOT</p><h2 id="boot-check">ShieldSigner 동작확인</h2></div></header>
<div class="ins-step-body">
<p>전원이 꺼진 ShieldSigner에 microSD 카드를 넣고, 전원을 연결해 부팅을 확인해요.</p>
<div class="ins-pair">
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('15-device-check.jpg')" alt="ShieldSigner 기기 하단 슬롯에 microSD 카드가 삽입된 모습" />
  <figcaption><b>A</b> 하단 슬롯에 카드 삽입</figcaption>
</figure>
<figure class="ss-install-image">
  <ImageZoom :src="installationImage('16-device-boot.gif')" alt="ShieldSigner가 켜지는 부팅 과정" />
  <figcaption><b>B</b> 전원 연결 후 부팅</figcaption>
</figure>
</div>
<fieldset class="ins-checklist">
<legend>부팅 체크리스트</legend>
<label><input type="checkbox" v-model="bootChecks[0]" /><span>제품에 맞는 5V 전원을 연결했어요</span></label>
<label><input type="checkbox" v-model="bootChecks[1]" /><span>메인 메뉴가 화면에 나와요</span></label>
<label><input type="checkbox" v-model="bootChecks[2]" /><span>버튼을 누르면 반응해요</span></label>
<p class="ins-checklist-done" v-if="bootChecks.every(Boolean)">설치를 마쳤어요. 이제 SeedKeeper 카드를 준비할 차례예요.</p>
</fieldset>
<Callout type="danger" title="고속충전기는 사용이 불가능해요">

제품에 맞는 5V 전원을 사용해 주세요.

</Callout>
</div>
</section>

<a class="ins-next" href="./verification">
<span class="ins-link-meta">관련 가이드</span>
<strong>OS 검증 가이드 보기</strong>
<span class="ins-link-sub">메시지 서명과 SHA-256 확인 방법을 자세히 안내해요</span>
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
