---
title: ShieldSigner OS 설치
description: Raspberry Pi Imager로 ShieldSigner OS를 microSD 카드에 설치하는 방법
---

<script setup>
import { withBase } from 'vitepress'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
const installationImage = (name) => withBase(`/guides/os/install-reference/${name}`)
</script>

<GuideContent>
<div class="ss-install-guide">

# ShieldSigner OS 설치

간결하고 안전하게 ShieldSigner를 시작하세요.

---

## 시작하기

ShieldSigner OS 이미지를 준비하고, Raspberry Pi Imager로 microSD 카드에 기록한 뒤 부팅을 확인해요.

### 준비물

- ShieldSigner
- microSD 카드
- USB 카드 리더기

---

## 1. microSD 카드 준비

패키지에 동봉된 USB 카드 리더기에 microSD 카드를 **끝까지** 넣어요.

- 카드가 올바른 방향으로 들어갔는지 확인해 주세요.
- 아래 사진은 삽입 방향을 보여주기 위해 카드를 조금만 넣은 예시예요.

<div class="ss-install-gallery">
  <a :href="installationImage('01-sd-card.png')" target="_blank" rel="noopener"><img :src="installationImage('01-sd-card.png')" alt="카드 삽입 방향 예시 1" loading="lazy" /></a>
  <a :href="installationImage('02-sd-card.png')" target="_blank" rel="noopener"><img :src="installationImage('02-sd-card.png')" alt="카드 삽입 방향 예시 2" loading="lazy" /></a>
  <a :href="installationImage('03-sd-card.png')" target="_blank" rel="noopener"><img :src="installationImage('03-sd-card.png')" alt="카드 삽입 방향 예시 3" loading="lazy" /></a>
  <a :href="installationImage('04-sd-card.png')" target="_blank" rel="noopener"><img :src="installationImage('04-sd-card.png')" alt="카드 삽입 방향 예시 4" loading="lazy" /></a>
</div>

카드 리더기를 PC의 USB 포트에 연결해 주세요.

---

## 2. ShieldSigner 이미지 준비 {#download}

PC에서 ShieldSigner OS 이미지를 내려받아요.

1. [ShieldSigner 공식 GitHub 릴리스](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)를 열어요.<br> 이 안내는 **SeSi-0.8.7+ShSi-B12** 기준이에요.

<figure class="ss-install-image">
  <a :href="installationImage('05-os-download.png')" target="_blank" rel="noopener"><img :src="installationImage('05-os-download.png')" alt="ShieldSigner B12 릴리스 Assets에서 pi0-smartcard.img.zip이 강조된 화면" loading="lazy" /></a>
</figure>

2. 통신모듈이 없는 Raspberry Pi Zero 1.3에 맞는 `pi0-smartcard.img.zip`을 다운로드해요.
3. ZIP의 압축을 풀고 **`.img` 파일**을 준비해요.

---

## 3. Raspberry Pi Imager 설치

Raspberry Pi Imager를 설치해요.

1. [Raspberry Pi Imager 공식 다운로드 페이지](https://www.raspberrypi.com/software/)를 열어요.

<figure class="ss-install-image">
  <a :href="installationImage('06-imager-download.png')" target="_blank" rel="noopener"><img :src="installationImage('06-imager-download.png')" alt="Raspberry Pi Imager 다운로드 페이지" loading="lazy" /></a>
</figure>

사용 중인 운영체제에 맞는 설치 파일을 받아 주세요.<br> Windows, macOS, Ubuntu 중에서 선택할 수 있어요.

2. 내려받은 파일을 열어 설치를 진행해요.

<figure class="ss-install-image">
  <a :href="installationImage('07-imager-install.png')" target="_blank" rel="noopener"><img :src="installationImage('07-imager-install.png')" alt="Raspberry Pi Imager 설치 진행 화면" loading="lazy" /></a>
</figure>

---

## 4. Raspberry Pi Imager 실행 및 Flash 준비 {#write-card}

Raspberry Pi Imager를 실행해요.<br> 앞에서 검증한 이미지를 SD 카드에 기록할 거예요.

**Device** 단계에서 아래로 내려 **Raspberry Pi Zero**를 선택하고 **다음**을 눌러요.

<figure class="ss-install-image">
  <a :href="installationImage('08-imager-device.png')" target="_blank" rel="noopener"><img :src="installationImage('08-imager-device.png')" alt="Device 단계에서 Raspberry Pi Zero를 선택한 화면" loading="lazy" /></a>
</figure>

**OS** 단계에서 아래로 내려 **사용자 정의 사용**을 선택해요.

<figure class="ss-install-image">
  <a :href="installationImage('09-imager-os.png')" target="_blank" rel="noopener"><img :src="installationImage('09-imager-os.png')" alt="OS 단계의 사용자 정의 사용 선택 화면" loading="lazy" /></a>
</figure>

다운로드하고 검증한 ShieldSigner **`.img` 파일**을 선택해요.<br>Zero 1.3 기준 파일명은 `seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img`예요.

<figure class="ss-install-image">
  <a :href="installationImage('10-imager-image-file.png')" target="_blank" rel="noopener"><img :src="installationImage('10-imager-image-file.png')" alt="압축을 푼 pi0-smartcard.img 파일을 선택한 화면" loading="lazy" /></a>
</figure>

**저장소**에서 microSD 카드를 선택해요.<br>이름과 용량을 확인하고, PC의 SSD나 다른 USB 저장장치를 고르지 않도록 주의해 주세요.

<figure class="ss-install-image">
  <a :href="installationImage('11-imager-storage.png')" target="_blank" rel="noopener"><img :src="installationImage('11-imager-storage.png')" alt="기록할 SD 카드를 고르는 저장소 선택 화면" loading="lazy" /></a>
</figure>

**다음**으로 넘어가 이미지 파일과 대상 카드를 확인해요.<br> **Write image** 화면에서 **WRITE**를 눌러요.

<figure class="ss-install-image">
  <a :href="installationImage('12-imager-write-review.png')" target="_blank" rel="noopener"><img :src="installationImage('12-imager-write-review.png')" alt="Raspberry Pi Zero, pi0-smartcard.img, MXT-USB Storage Device를 확인하고 WRITE를 누르는 화면" loading="lazy" /></a>
</figure>

선택한 저장장치의 **데이터가 모두 지워진다는 안내**가 나와요.<br>필요한 파일을 백업했고 대상 카드가 맞다면 **I UNDERSTAND, ERASE AND WRITE**를 눌러요.

<figure class="ss-install-image">
  <a :href="installationImage('13-imager-erase-warning.png')" target="_blank" rel="noopener"><img :src="installationImage('13-imager-erase-warning.png')" alt="데이터 삭제 안내와 I UNDERSTAND, ERASE AND WRITE 확인 버튼" loading="lazy" /></a>
</figure>

기록과 검증이 끝날 때까지 기다려요.<br> **Write complete!**가 나오면 설치가 끝났어요.

<figure class="ss-install-image">
  <a :href="installationImage('14-imager-complete.png')" target="_blank" rel="noopener"><img :src="installationImage('14-imager-complete.png')" alt="Raspberry Pi Zero와 pi0-smartcard.img 기록이 완료된 Write complete 화면" loading="lazy" /></a>
</figure>

카드가 안전하게 추출된 것을 확인하고, USB 카드 리더기를 PC에서 분리해 microSD 카드를 꺼내요.

---

## 5. ShieldSigner 동작확인

전원이 꺼진 ShieldSigner에 microSD 카드를 넣고, 전원을 연결해 부팅을 확인해요.

<figure class="ss-install-image">
  <a :href="installationImage('15-device-check.jpg')" target="_blank" rel="noopener"><img :src="installationImage('15-device-check.jpg')" alt="ShieldSigner 기기 하단 슬롯에 microSD 카드가 삽입된 모습" loading="lazy" /></a>
</figure>

<figure class="ss-install-image">
  <a :href="installationImage('16-device-boot.gif')" target="_blank" rel="noopener"><img :src="installationImage('16-device-boot.gif')" alt="ShieldSigner가 켜지는 부팅 과정" loading="lazy" /></a>
</figure>

메인 메뉴가 나오고 버튼이 반응하는지 확인해요.

---

> **전원 연결 안내:** 제품에 맞는 5V 전원을 사용해 주세요.<br> 고속충전기는 사용이 불가능해요.

---

[OS 검증 가이드 보기 →](./verification)

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
