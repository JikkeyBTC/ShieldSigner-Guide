---
title: 설치 파일 검증
description: Raspberry Pi Zero v1.3용 ShieldSigner B12 다운로드부터 메시지 서명 확인과 SHA-256 비교까지 안내해요
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# 설치 파일 검증

다운로드한 OS 이미지를 microSD 카드에 기록하기 전에 **제작자가 공개한 파일과 같은지** 확인해요.<br> 이 안내는 키트의 **Raspberry Pi Zero v1.3 전용**이며, ShieldSigner **SeSi-0.8.7+ShSi-B12**의 `pi0-smartcard` 이미지를 사용해요.

검증은 **PC에서** 진행해요.<br> ShieldSigner를 켜거나 지갑을 연결하지 않아도 돼요. 시드·PIN·개인키, 비트코인 잔액이나 송금 수수료도 필요하지 않아요.

## 무엇을 확인하나요?

B12 제작자는 릴리스 본문에 **이미지별 SHA-256 목록**과 그 목록의 **비트코인 메시지 서명**을 공개했어요.<br> 이 둘을 연결해서 확인하는 과정이에요.

- **메시지 서명:** 해시 목록을 해당 서명 주소의 키 보유자가 서명했는지 확인해요.
- **SHA-256:** 내가 받은 이미지가 그 목록에 적힌 파일과 같은지 확인해요.

서명만 확인하면 **내 파일은 아직 확인하지 않은 상태**예요.<br> 해시만 비교하면 **누가 그 값을 공개했는지 확인하지 않은 상태**예요. 두 단계 모두 필요해요.

<GuideFigure
  src="/guides/os/verification-flow.svg"
  alt="제작자의 서명 주소를 다른 채널에서 확인하고, 그 주소로 해시 목록의 서명을 검증한 뒤, 내 img 파일의 SHA-256과 비교한다."
  caption="서명만 확인하거나 해시만 비교하면 끝이 아니에요. 서명자의 주소 확인부터 파일 비교까지 이어져야 해요."
/>

---

## 1. 공식 이미지 다운로드와 압축 풀기 {#download}

이미 설치 가이드에서 `.img` 파일을 준비했다면 [2단계](#signer)로 넘어가도 돼요.

1. [공식 B12 릴리스](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)를 열어요. 주소의 저장소가 `3rdIteration/seedsigner`, 버전이 `SeSi-0.8.7+ShSi-B12`인지 확인해요.
2. 페이지 아래 **Assets**를 펼치고, Raspberry Pi Zero v1.3용 아래 파일을 내려받아요.

```text
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img.zip
```

<GuideFigure
  src="/guides/os/install-reference/05-os-download.png"
  alt="B12 릴리스의 Assets 목록에서 pi0-smartcard.img.zip 다운로드 위치를 보여주는 화면."
  caption="파일명 끝의 pi0-smartcard.img.zip을 확인해요. Source code는 설치 이미지가 아니에요."
/>

3. 다운로드가 완료되면 ZIP을 마우스 오른쪽 버튼으로 누르고 **압축 풀기 / 모두 추출**을 선택해요. macOS에서는 ZIP을 이중 클릭해요.
4. 압축을 푼 폴더 안에 아래 **`.img` 파일**이 있는지 확인해요. 파일을 더블 클릭해 열거나 마운트할 필요는 없어요.

```text
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img
```

이 가이드에서는 다운로드·해시 계산·SD 카드 기록에 **`pi0-smartcard` 파일만** 사용해요.

<Callout type="warning" title="아직 SD 카드에 기록하지 마세요">

ZIP과 압축을 푼 이미지는 서로 다른 파일이라 해시값도 달라요.<br> 이 안내에서 비교하는 B12 서명 목록의 대상은 **`.img` 파일**이에요. GitHub Assets에 표시되는 ZIP의 해시와 혼동하지 마세요.

</Callout>

---

## 2. 제작자의 서명 주소 확인하기 {#signer}

공식 [B12 릴리스의 Signature Verification](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)에 적힌 주소는 다음과 같아요.

```text
37hiiSB1Poj6Shs8WawPS2HjT2jzHkFSQi
```

**제작자의 [Crypto Guide 웹사이트](https://cryptoguide.tips/send-me-a-tip/)도 직접 열어 `BTC:` 옆 주소와 일치하는지 확인해 주세요.** 제작자의 [유튜브 채널](https://www.youtube.com/channel/UCEviBQwLv-yfv3BErm0ojHg/) 영상 설명에서도 대조할 수 있어요.<br> 릴리스 페이지 한 곳의 정보만 믿지 않기 위한 과정이에요.

브라우저에서 `Ctrl+F`(macOS는 `Command+F`)로 `BTC:`를 찾으면 주소를 확인하기 쉬워요.<br> **주소 전체를 대소문자까지** 비교해 주세요. 다른 코인의 주소나 아래 검증 사이트 운영자의 후원 주소와 혼동하지 마세요.

이 주소는 **서명한 사람을 확인하는 용도**예요. 돈을 보내지 않아요.<br> 공격자가 릴리스의 파일·해시·서명·주소를 모두 바꿨다면 자기 주소에 대해서는 유효한 서명을 만들 수 있어요. 그래서 **별도 채널의 주소 대조가 먼저**예요. 주소가 다르거나 제작자의 주소인지 확인할 수 없다면 멈춰 주세요.

---

## 3. 해시 목록의 메시지 서명 확인하기 {#message-signature}

제작자가 릴리스에서 안내한 [메시지 서명 확인 사이트](https://www.verifybitcoinmessage.com/)를 새 탭에서 열어요.<br> 주소 표시줄이 `https://www.verifybitcoinmessage.com/`인지 확인해 주세요. 아래 세 칸에 공개된 값만 넣어요. **이미지 파일을 업로드하거나 시드·개인키를 입력하지 않아요.**

이 웹사이트는 제작자와 별개의 검증 도구예요.<br> 웹사이트만 믿고 싶지 않다면 아래의 **Sparrow·Electrum으로 확인하기**를 이용해요. 어떤 도구를 사용하든 2단계의 주소 대조를 생략하지 않아요.

### ① Bitcoin Address — 서명 주소

2단계에서 별도 채널과 대조한 **`37hii…FSQi` 전체 주소**를 넣어요.<br> 내 지갑 주소를 넣는 칸이 아니에요. 코드 블록 오른쪽의 **복사** 버튼을 쓰면 오타를 줄일 수 있어요.

### ② Message — 서명된 원문

릴리스 본문의 **SHA256 Checksums (And message to verify)** 아래 구분선 사이에 있는 **다섯 줄 전체**를 복사해요.<br> 내 기기에 맞는 한 줄만 넣으면 검증되지 않아요.

**아래 목록은 보드를 선택하는 안내가 아니라 제작자가 서명한 원문이에요.** 다른 보드의 파일명도 들어 있지만, 서명 확인을 위해 다섯 줄 모두 그대로 넣어야 해요.<br> 실제 다운로드와 4·5단계의 파일 검증에는 Raspberry Pi Zero v1.3용 `pi0-smartcard.img`만 사용해요.

아래는 B12의 원문이에요.<br> **공식 릴리스와 대조한 뒤** 코드 블록의 복사 버튼으로 다섯 줄을 함께 복사해도 돼요.<br> 파일명, 콜론, 공백, 줄바꿈을 바꾸지 마세요.<br> 제목과 구분선은 넣지 않아요.

```text
seedsigner_os.SeSi-0.8.7_ShSi-B12_.lafrite-smartcard.img: 60f50115eba4d34bb642de2c430c062834c635a23e55632001baccf3cf145991
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img: 1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi02w-smartcard.img: 105085957adce34548bda3a11e8f2125a659ff17ef3545aa0c737eec1ced8085
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi2-smartcard.img: 78fcd7d1a1538d2f9cb191f34cfd6fa4f79421d46f6f25ab7cb988d9b337cc5f
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi4-smartcard.img: 7e59b6e421f2fed0b4759f8f3eb20c0e225e86afbb8f4223b161f781976227c8
```

입력창이 작아서 일부만 보여도 안쪽을 스크롤하면 나머지 줄을 볼 수 있어요.<br> `lafrite`부터 `pi4`까지 다섯 파일이 모두 들어가야 해요. 화면 폭 때문에 자동으로 접혀 보이는 줄과 직접 Enter를 넣은 줄바꿈은 달라요.

### ③ Signature — 메시지 서명

릴리스의 **Bitcoin Message Signature** 아래 문자열을 한 줄로 넣어요.<br> 끝의 `=`도 포함해요.

```text
H5Ayg8hhAbbjZ6BpHiNVKfDPgcifnep4ByxbkWNvfB0DMT2w5AVR7p5ZC+o9RDSREFYA5LxR0pZ3OEcCRM/OIZ4=
```

### ④ VERIFY — 결과 확인

세 칸을 입력했다면 **VERIFY**를 눌러요.<br> 버튼 아래에 **Valid signature**가 표시되면 **그 주소에 대한 해시 목록의 서명이 유효하다**는 뜻이에요. 아직 내 `.img` 파일까지 검사한 것은 아니므로 4단계도 진행해 주세요.

<GuideFigure
  src="/guides/os/message-signature.png"
  alt="제작자 주소, B12의 다섯 줄 해시 목록, 메시지 서명을 입력하고 VERIFY를 눌러 Valid signature가 표시된 실제 검증 화면."
  caption="B12의 실제 서명 확인 화면이에요. Message 칸에는 다섯 줄 전체가 들어 있고, 작은 입력창에는 시작 부분만 보여요."
/>

<details>
<summary>Sparrow·Electrum으로 확인하기</summary>

이미 신뢰할 수 있는 경로로 설치한 **Sparrow 또는 Electrum**이 있다면 PC에서 같은 값을 검증할 수 있어요. 이 검증을 위해 새 지갑을 만들거나 개인키를 가져올 필요는 없어요.

1. 앱 상단의 **Tools → Sign/Verify Message**를 열어요. Electrum에서는 메뉴가 **Sign/verify message**로 표시돼요.
2. **Address**에 2단계의 제작자 주소를 넣어요.
3. **Message**에 위 해시 목록 다섯 줄 전체를, **Signature**에 위 서명 문자열을 넣어요.
4. **Sign이 아니라 Verify**를 눌러 서명이 유효하다는 결과를 확인해요.

B12 제작자가 안내한 서명은 **Electrum 형식**이에요. 이를 지원하는 버전을 사용하고, 서명을 다른 형식으로 변환하거나 다시 만들지 마세요.<br> 앱 검증은 인터넷 연결 없이도 할 수 있지만, 비교할 주소와 릴리스 원문은 미리 신뢰할 수 있는 경로로 확보해야 해요. 앱에서 성공해도 이어서 파일 해시를 비교해야 해요.

</details>

<Callout type="danger" title="서명 확인에 실패하면 설치를 멈춰 주세요">

주소가 다르거나 유효한 서명으로 확인되지 않으면 다음 단계로 넘어가지 마세요.<br> 메시지 다섯 줄 전체, 공백·줄바꿈, 서명 끝의 `=`를 다시 확인해요.<br> 다시 복사해도 실패하면 릴리스 제작자 또는 판매자에게 문의해 주세요.

</Callout>

---

## 4. 내 이미지 파일의 SHA-256 계산하기 {#sha256}

SHA-256은 파일 내용에서 계산한 **64자리 확인값**이에요.<br> 앞에서 서명을 확인한 목록과 이 값이 일치해야 해요.<br> **계산 대상은 `.img.zip`이 아니라 압축을 푼 `.img` 파일**이에요.

### Windows — PowerShell에서 확인

1. 파일 탐색기에서 압축을 푼 **`.img` 파일이 들어 있는 폴더**를 열어요.
2. 탐색기 상단의 **주소 표시줄**을 누르고 `powershell`을 입력한 뒤 Enter를 눌러요.<br> 검색창이 아닌, 폴더 경로가 표시된 칸이에요.
3. 열린 창에 아래 **Raspberry Pi Zero v1.3용 명령**을 복사해 붙여넣고 Enter를 눌러요.

아래 명령은 파일을 읽고 해시를 계산할 뿐, 파일을 수정하거나 실행하지 않아요.<br> 관리자 권한으로 열 필요도 없어요. `PS C:\...>`처럼 이미 표시된 프롬프트는 입력하지 마세요.

**Raspberry Pi Zero v1.3 (`pi0`)**

```powershell
(Get-FileHash -LiteralPath ".\seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img" -Algorithm SHA256).Hash
```

계산하는 동안 진행 표시 없이 잠시 기다릴 수 있어요.<br> 완료되면 긴 영문·숫자 한 줄이 나와요. 창을 닫지 말고 아래 5단계에서 비교해 주세요.<br> **파일을 찾을 수 없다는 오류**가 나면 ZIP 내부를 보고 있는 것은 아닌지와 파일 이름·폴더 위치를 확인해요. 확장자가 숨겨져 있다면 탐색기의 **보기 → 표시 → 파일 확장명**을 켜서 `.img`인지 확인해요.

<details>
<summary>macOS에서 확인하는 방법</summary>

**터미널** 앱을 열고 `shasum -a 256 `을 입력해요.<br> `256` 뒤에 공백을 하나 넣은 다음, Finder의 **압축을 푼 `.img` 파일**을 터미널 창으로 끌어다 놓고 Enter를 눌러요.<br> 파일 경로가 자동으로 들어가요.

이미 해당 폴더로 이동한 상태라면 아래 명령을 사용할 수 있어요.

```bash
shasum -a 256 seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img
```

출력에서 파일명 앞의 64자리 값이 SHA-256이에요.

</details>

<details>
<summary>Linux에서 확인하는 방법</summary>

파일 관리자에서 `.img` 파일이 있는 폴더를 열고 **터미널에서 열기**를 선택해요.<br> 아래 명령을 실행해 주세요.

```bash
sha256sum seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img
```

출력에서 파일명 앞의 64자리 값이 SHA-256이에요.

</details>

---

## 5. 서명된 값과 비교하기 {#compare}

3단계에서 검증한 메시지에서 **파일명이 `pi0-smartcard.img`로 끝나는 줄**을 찾아요.<br> 계산한 64자리 전체가 그 줄의 값과 일치해야 해요.<br> 해시의 영문 대문자·소문자는 달라도 같은 값이에요. 서명 주소·메시지 자체는 임의로 대소문자를 바꾸면 안 돼요.

**B12 / Raspberry Pi Zero v1.3 (`pi0`)**

```text
1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6
```

위 값은 **B12의 Raspberry Pi Zero v1.3용 이미지 전용**이에요.<br> 버전이나 파일명이 다르면 이 값을 적용하지 마세요.<br> 일부 앞자리만 같다고 통과한 것으로 판단하지 마세요.

<details>
<summary>Windows에서 True / False로 비교하기 — B12 / Raspberry Pi Zero v1.3</summary>

육안 비교가 어렵다면 **같은 PowerShell 창**에서 아래 두 줄을 차례로 실행해도 돼요.<br> `$expectedHash`는 3단계에서 서명을 확인한 **pi0 파일의 해시**와 같은지 먼저 대조해 주세요.

```powershell
$expectedHash = '1c9f8a1c84b3e626986b62d7ab847126fcb1c5bcd6a96ee15a4be2f76ecbeab6'
(Get-FileHash -LiteralPath '.\seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img' -Algorithm SHA256 -ErrorAction Stop).Hash -eq $expectedHash
```

- **True:** 이 `.img` 파일의 해시가 위 값과 일치해요. 2·3단계도 완료했는지 확인해요.
- **False:** 해시가 달라요. 기록하지 말고 파일·버전·보드를 다시 확인해요.
- **오류 메시지:** 비교가 끝난 것이 아니에요. 파일 경로나 다운로드 상태부터 확인해요.

이 명령은 해시 비교만 해요. **메시지 서명 검증을 대신하지 않아요.**

</details>

<Callout type="warning" title="값이 다르면 SD 카드에 기록하지 마세요">

ZIP을 계산했는지, 버전과 보드가 다른지, 다운로드가 끝나기 전에 확인했는지 살펴봐요.<br> 같은 조건으로 공식 파일을 다시 받아도 다르면 파일을 사용하지 말고 제작자 또는 판매자에게 문의해 주세요.

</Callout>

---

## 결과가 다르거나 오류가 나면 {#troubleshooting}

| 이런 상황이라면 | 이렇게 확인해 주세요 |
| --- | --- |
| 제작자 주소가 서로 달라요 | 검증을 중단해요. 검증에 성공하도록 다른 주소로 바꾸지 말고 제작자에게 확인해요. |
| 메시지 서명이 유효하지 않아요 | 다섯 줄 전체인지, 파일명·콜론·공백·줄바꿈·서명 끝의 `=`가 원문과 같은지 확인해요. |
| 메시지가 길어서 일부만 보여요 | 입력창 안쪽을 스크롤해 마지막 `pi4` 줄까지 들어갔는지 확인해요. 줄을 줄이거나 요약하지 않아요. |
| 웹사이트가 안 열리거나 버튼이 작동하지 않아요 | 검증 성공으로 간주하지 않아요. 신뢰하는 Sparrow·Electrum에서 같은 세 값을 확인하거나 나중에 다시 시도해요. |
| 파일을 찾을 수 없다고 나와요 | ZIP 압축을 푼 실제 폴더에서 PowerShell을 열었는지, 파일명과 `.img` 확장자가 맞는지 확인해요. |
| 해시가 다르거나 False가 나와요 | ZIP이 아니라 압축을 푼 B12의 `pi0-smartcard.img`를 계산했는지 확인해요. 공식 파일을 다시 받아도 다르면 사용하지 않아요. |
| 다른 파일을 받았어요 | 기록하지 말고 1단계로 돌아가 B12의 `pi0-smartcard.img.zip`을 다시 선택해요. |

문의를 보낼 때는 **릴리스 URL, 파일명, 계산된 해시와 오류 문구**만 전달해요.<br> 시드·PIN·개인키는 검증이나 문의에 필요하지 않아요.

<Callout type="warning" title="검증 성공이 뜻하는 범위">

검증은 **확인한 서명자가 공개한 파일과 내 파일이 같은지** 확인하는 과정이에요. 파일이 위 변조가 되지는 않았는지 확인할수 있어요.<br> GitHub의 **Verified** 커밋 배지나 Raspberry Pi Imager의 기록 후 검사는 이 다운로드 파일 검증을 대신하지 않아요.

</Callout>

## 6. 검증을 마쳤나요? {#complete}

- [ ] 제작자의 서명 주소를 별도 채널과 대조했어요.
- [ ] B12의 해시 목록 **다섯 줄 전체**로 메시지 서명 확인에 성공했어요.
- [ ] 내가 받은 `.img` 파일의 SHA-256이 서명된 목록과 일치해요.

세 가지가 모두 확인됐다면 [SD 카드에 기록하기](./install#write-card)로 이동해 주세요.<br> Raspberry Pi Imager가 아직 없다면 [Imager 설치 단계](./install#install-imager)를 먼저 진행해요.

확인한 릴리스 URL, 이미지 파일명, 서명 결과와 SHA-256 값을 함께 기록해 두면 나중에 확인하기 편해요.

## 참고한 공식 자료

- [ShieldSigner B12 릴리스: 원본 해시·서명·검증 도구 안내](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)
- [제작자의 별도 채널: Crypto Guide의 BTC 주소](https://cryptoguide.tips/send-me-a-tip/)
- [릴리스에서 안내한 메시지 검증 도구](https://www.verifybitcoinmessage.com/)
- [Microsoft: PowerShell Get-FileHash 사용법](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash?view=powershell-7.5)

</GuideContent>
