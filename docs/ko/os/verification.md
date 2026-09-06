---
title: 설치 파일 검증
description: ShieldSigner B12의 비트코인 메시지 서명과 SHA-256 확인, GPG 서명과의 차이를 안내해요
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# 설치 파일 검증

SD 카드에 쓰기 전에 **제작자가 공개한 파일이 맞는지** 확인해요.<br> 이 페이지에서는 ShieldSigner **SeSi-0.8.7+ShSi-B12** 릴리스의 서명과 설치 파일을 함께 확인할 거예요.

아직 파일을 받지 않았다면 [설치 가이드의 다운로드 단계](./install#download)부터 진행해 주세요.<br> ZIP의 압축을 풀어 **`.img` 파일**을 준비하면 돼요.

## GPG 확인과 무엇이 다른가요?

**B12 릴리스에는 GPG로 확인할 `.asc`·`.sig` 서명 파일이나 별도의 `.sha256` 파일이 없어요.** 대신 릴리스 본문에 **SHA-256 목록**과 그 목록에 대한 **비트코인 메시지 서명**이 있어요.<br> 이 릴리스는 제작자가 안내한 방식으로 검증해요.

- **메시지 서명:** 해시 목록을 해당 서명 주소의 키 보유자가 서명했는지 확인해요.
- **SHA-256:** 내가 받은 이미지가 그 목록에 적힌 파일과 같은지 확인해요.
- **GPG / PGP 서명:** 배포자의 PGP 공개키로 서명을 확인하는 다른 방식이에요.<br> B12에는 필요한 서명 파일이 없어 수행할 수 없어요.

GitHub 커밋 옆의 **Verified** 배지는 커밋에 대한 표시예요.<br> 내려받은 OS 이미지 자체를 GPG로 검증했다는 뜻은 아니에요.<br> 기기의 **GPG Tools** 기능이 있다는 사실도 이 릴리스에 GPG 서명이 있다는 뜻은 아니에요.

<GuideFigure
  src="/guides/os/verification-flow.svg"
  alt="제작자의 서명 주소를 다른 채널에서 확인하고, 그 주소로 해시 목록의 서명을 검증한 뒤, 내 img 파일의 SHA-256과 비교한다."
  caption="서명만 확인하거나 해시만 비교하면 끝이 아니에요. 서명자의 주소 확인부터 파일 비교까지 이어져야 해요."
/>

## 1. 제작자의 서명 주소 확인하기

공식 [B12 릴리스의 Signature Verification](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)에 적힌 주소는 다음과 같아요.

```text
37hiiSB1Poj6Shs8WawPS2HjT2jzHkFSQi
```

**제작자의 [Crypto Guide 웹사이트](https://cryptoguide.tips/send-me-a-tip/)도 직접 열어 `BTC:` 옆 주소와 일치하는지 확인해 주세요.** 제작자의 [유튜브 채널](https://www.youtube.com/channel/UCEviBQwLv-yfv3BErm0ojHg/) 영상 설명에서도 대조할 수 있어요.<br> 릴리스 페이지 한 곳의 정보만 믿지 않기 위한 과정이에요.

이 주소는 **서명한 사람을 확인하는 용도**예요.<br> 돈을 보내거나 지갑을 연결할 필요가 없어요.<br> 아래 검증 사이트 하단의 후원 주소와 혼동하지 마세요.

## 2. 해시 목록의 메시지 서명 확인하기

제작자가 릴리스에서 안내한 [메시지 서명 확인 사이트](https://www.verifybitcoinmessage.com/)를 열어요.<br> 공개된 주소·메시지·서명만 사용하며, 시드나 개인키는 입력하지 않아요.

### Bitcoin Address — 서명 주소

1단계에서 별도 채널과 대조한 **`37hii…FSQi` 전체 주소**를 넣어요.<br> 내 지갑 주소를 넣는 칸이 아니에요.

### Message — 서명된 원문

릴리스 본문의 **SHA256 Checksums (And message to verify)** 아래 구분선 사이에 있는 **다섯 줄 전체**를 복사해요.<br> 내 기기에 맞는 한 줄만 넣으면 검증되지 않아요.

아래는 B12의 원문이에요.<br> **공식 릴리스와 대조한 뒤** 코드 블록의 복사 버튼으로 다섯 줄을 함께 복사해도 돼요.<br> 파일명, 콜론, 공백, 줄바꿈을 바꾸지 마세요.<br> 제목과 구분선은 넣지 않아요.

```text
seedsigner_os.SeSi-0.8.7_ShSi-B12_.lafrite-smartcard.img: 60f50115eba4d34bb642de2c430c062834c635a23e55632001baccf3cf145991
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img: 1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi02w-smartcard.img: 105085957adce34548bda3a11e8f2125a659ff17ef3545aa0c737eec1ced8085
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi2-smartcard.img: 78fcd7d1a1538d2f9cb191f34cfd6fa4f79421d46f6f25ab7cb988d9b337cc5f
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi4-smartcard.img: 7e59b6e421f2fed0b4759f8f3eb20c0e225e86afbb8f4223b161f781976227c8
```

### Signature — 메시지 서명

릴리스의 **Bitcoin Message Signature** 아래 문자열을 한 줄로 넣어요.<br> 끝의 `=`도 포함해요.

```text
H5Ayg8hhAbbjZ6BpHiNVKfDPgcifnep4ByxbkWNvfB0DMT2w5AVR7p5ZC+o9RDSREFYA5LxR0pZ3OEcCRM/OIZ4=
```

### VERIFY — 결과 확인

**VERIFY**를 누른 뒤 **Valid signature**가 표시되는지 확인해요.

<GuideFigure
  src="/guides/os/message-signature.png"
  alt="제작자 주소, B12의 다섯 줄 해시 목록, 메시지 서명을 입력하고 VERIFY를 눌러 Valid signature가 표시된 실제 검증 화면."
  caption="B12 릴리스의 공개된 값으로 직접 확인한 결과예요. 웹 검증기는 도구이므로, 1단계의 제작자 주소 대조도 꼭 진행해 주세요."
/>

웹사이트 자체를 신뢰하고 싶지 않다면, 릴리스에서 안내한 **Electrum 또는 Sparrow의 메시지 검증 기능**으로 같은 세 값을 확인할 수 있어요.<br> 이 서명은 **Electrum 형식**이므로 해당 형식을 지원하는 도구를 사용해 주세요.

<Callout type="danger" title="서명 확인에 실패하면 설치를 멈춰 주세요">

주소가 다르거나 유효한 서명으로 확인되지 않으면 다음 단계로 넘어가지 마세요.<br> 메시지 다섯 줄 전체, 공백·줄바꿈, 서명 끝의 `=`를 다시 확인해요.<br> 다시 복사해도 실패하면 릴리스 제작자 또는 판매자에게 문의해 주세요.

</Callout>

## 3. 내 이미지 파일의 SHA-256 계산하기

SHA-256은 파일 내용에서 계산한 **64자리 확인값**이에요.<br> 앞에서 서명을 확인한 목록과 이 값이 일치해야 해요.<br> **계산 대상은 `.img.zip`이 아니라 압축을 푼 `.img` 파일**이에요.

### Windows — PowerShell에서 확인

1. 파일 탐색기에서 압축을 푼 **`.img` 파일이 들어 있는 폴더**를 열어요.
2. 탐색기 상단의 **주소 표시줄**을 누르고 `powershell`을 입력한 뒤 Enter를 눌러요.<br> 검색창이 아닌, 폴더 경로가 표시된 칸이에요.
3. 열린 창에 **내 보드에 맞는 명령 하나**를 복사해 붙여넣고 Enter를 눌러요.

**Pi Zero / Zero W**

```powershell
(Get-FileHash -LiteralPath ".\seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img" -Algorithm SHA256).Hash
```

**Pi Zero 2 W**

```powershell
(Get-FileHash -LiteralPath ".\seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi02w-smartcard.img" -Algorithm SHA256).Hash
```

파일 크기에 따라 잠시 기다리면 긴 영문·숫자 값이 나와요.<br> **파일을 찾을 수 없다는 오류**가 나면, ZIP 내부를 보고 있는 것은 아닌지와 파일 이름·폴더 위치를 확인해 주세요.

<details>
<summary>macOS에서 확인하는 방법</summary>

**터미널** 앱을 열고 `shasum -a 256 `을 입력해요.<br> `256` 뒤에 공백을 하나 넣은 다음, Finder의 **압축을 푼 `.img` 파일**을 터미널 창으로 끌어다 놓고 Enter를 눌러요.<br> 파일 경로가 자동으로 들어가요.

이미 해당 폴더로 이동한 상태라면 아래 명령을 사용할 수 있어요.<br> Zero 2 W는 파일명의 `pi0`를 `pi02w`로 바꿔 주세요.

```bash
shasum -a 256 seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img
```

출력에서 파일명 앞의 64자리 값이 SHA-256이에요.

</details>

<details>
<summary>Linux에서 확인하는 방법</summary>

파일 관리자에서 `.img` 파일이 있는 폴더를 열고 **터미널에서 열기**를 선택해요.<br> 아래 명령을 실행해 주세요.<br> Zero 2 W는 파일명의 `pi0`를 `pi02w`로 바꿔 주세요.

```bash
sha256sum seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img
```

출력에서 파일명 앞의 64자리 값이 SHA-256이에요.

</details>

## 4. 서명된 값과 비교하기

2단계에서 검증한 메시지에서 **내 이미지와 파일명이 같은 줄**을 찾아요.<br> 계산한 64자리 전체가 그 줄의 값과 일치해야 해요.<br> 영문 대문자·소문자는 달라도 같은 값이에요.

**B12 / Pi Zero·Zero W (`pi0`)**

```text
1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6
```

**B12 / Pi Zero 2 W (`pi02w`)**

```text
105085957adce34548bda3a11e8f2125a659ff17ef3545aa0c737eec1ced8085
```

위 값은 **B12 전용**이에요.<br> 다른 버전의 파일을 받았다면 그 버전의 릴리스와 서명 정보를 사용해야 해요.<br> 일부 앞자리만 같다고 통과한 것으로 판단하지 마세요.

<Callout type="warning" title="값이 다르면 SD 카드에 기록하지 마세요">

ZIP을 계산했는지, 버전과 보드가 다른지, 다운로드가 끝나기 전에 확인했는지 살펴봐요.<br> 같은 조건으로 공식 파일을 다시 받아도 다르면 파일을 사용하지 말고 제작자 또는 판매자에게 문의해 주세요.

</Callout>

## GPG 서명이 제공되는 다른 릴리스라면

GPG는 PGP 서명을 확인하는 프로그램이에요.<br> GPG 검증에는 **그 릴리스의 실제 서명 파일**, **서명 대상 파일**, **제작자의 공개키와 확인 가능한 전체 지문(fingerprint)**이 필요해요.<br> 공개키의 이름이나 이메일 주소만 보고 신뢰하면 안 돼요.

서명이 **이미지 자체**에 붙었는지, **SHA-256 목록**에 붙었는지에 따라 검증할 파일도 달라져요.<br> 목록에 붙은 서명이라면 목록을 검증한 다음 이미지의 해시까지 대조해야 해요.<br> `Good signature`가 표시돼도 공개키 지문이 제작자가 별도 채널에 공개한 값과 일치하는지 확인해야 해요.

**B12에는 이 자료가 없으므로 임의의 공개키나 다른 프로젝트의 서명을 대신 사용하지 않아요.** GPG 검증을 필수 조건으로 삼고 있다면, 제작자가 해당 자료를 제공하기 전까지 설치를 보류해 주세요.

## 검증을 마쳤나요?

- [ ] 제작자의 서명 주소를 별도 채널과 대조했어요.
- [ ] B12의 해시 목록 **다섯 줄 전체**로 메시지 서명 확인에 성공했어요.
- [ ] 내가 받은 `.img` 파일의 SHA-256이 서명된 목록과 일치해요.

세 가지가 모두 확인됐다면 **[SD 카드에 기록하기](./install#write-card)**로 이동해 주세요.<br> 확인한 릴리스 URL, 이미지 파일명, 서명 결과와 SHA-256 값을 함께 기록해 두면 나중에 확인하기 편해요.

## 참고한 공식 자료

- [ShieldSigner B12 릴리스: 원본 해시·서명·검증 도구 안내](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)
- [제작자의 별도 채널: Crypto Guide의 BTC 주소](https://cryptoguide.tips/send-me-a-tip/)
- [GnuPG 공식 문서: 서명과 공개키 지문 확인](https://gnupg.org/download/integrity_check.html)

</GuideContent>
