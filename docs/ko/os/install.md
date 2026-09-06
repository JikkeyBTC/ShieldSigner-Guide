---
title: ShieldSigner OS 설치
description: 내 보드에 맞는 ShieldSigner B12 이미지를 받고, 검증한 뒤 microSD에 설치하는 방법
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# ShieldSigner OS 설치

컴퓨터에서 설치 파일을 받아 확인한 뒤, microSD 카드에 기록해요. 완성된 카드를 ShieldSigner에 넣으면 기기를 시작할 수 있어요.

이 안내는 **Raspberry Pi Zero 계열의 ShieldSigner**와 **SeSi-0.8.7+ShSi-B12** 릴리스를 기준으로 해요.

**준비 → 다운로드 → 파일 검증 → SD 카드에 기록 → 첫 부팅**

## 1. 먼저 준비해 주세요

- **ShieldSigner와 전원 케이블**
- **microSD 카드와 카드 리더:** 필요한 파일이 있다면 먼저 다른 곳에 복사해 주세요.
- **Windows·macOS·Linux 컴퓨터:** 다운로드와 파일 검증에 인터넷 연결이 필요해요.
- **balenaEtcher:** 이미지를 카드에 기록하는 무료 프로그램이에요. [공식 사이트에서 다운로드](https://etcher.balena.io/)해 컴퓨터에 맞는 버전을 설치해 주세요.

<Callout type="warning" title="설치할 SD 카드의 내용은 모두 지워져요">

기록을 시작하면 선택한 저장장치를 덮어써요. 카드에 있는 파일을 백업하고, 혼동하기 쉬운 외장하드나 USB 메모리는 미리 분리해 주세요.

</Callout>

### 내 기기에 들어 있는 보드 확인하기

제품 사양이나 주문 내역에서 **Raspberry Pi 모델명**을 확인해 주세요. 케이스 모양만으로는 구분하기 어려워요. 확인되지 않으면 파일을 고르기 전에 판매자에게 모델명을 문의해 주세요.

| 기기에 들어 있는 보드 | 파일명에서 찾을 부분 |
| --- | --- |
| Raspberry Pi Zero 1.3 / Zero W | `pi0-smartcard` |
| Raspberry Pi Zero 2 W | `pi02w-smartcard` |

`pi0`의 마지막 글자는 숫자 **0**이에요. Zero 2 W에는 `pi02w`를 선택해 주세요. 아래 절차는 Luckfox·La Frite 보드용 안내가 아니에요.

## 2. 공식 릴리스에서 설치 파일 받기 {#download}

1. [ShieldSigner B12 릴리스](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)를 열어요.
2. 저장소 이름이 **3rdIteration / seedsigner**, 릴리스 이름이 **SeSi-0.8.7+ShSi-B12**인지 확인해요. `-pre`나 개발용 `dev` 이미지는 이 안내의 대상이 아니에요.
3. 페이지 아래의 **Assets**를 펼쳐요.
4. 내 보드에 맞는 **`.img.zip` 파일 하나**를 내려받아요. GitHub 로그인은 필요하지 않아요.

<GuideFigure
  src="/guides/os/release-assets.png"
  alt="ShieldSigner B12 공식 GitHub 릴리스의 Assets 목록. Pi Zero용 pi0-smartcard.img.zip과 Zero 2 W용 pi02w-smartcard.img.zip을 구분해 선택한다."
  caption="공식 B12 릴리스의 실제 첨부 파일 목록이에요. 아래 두 파일 중 내 보드에 맞는 것을 선택하세요."
/>

Assets 목록 옆의 `sha256:`은 **다운로드 파일 자체의 값**이에요. 이 가이드에서는 릴리스 본문에 서명된 **압축 해제 후 `.img`의 값**을 대조하므로, 두 값을 혼동하지 마세요.

**Pi Zero / Zero W용**

```text
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img.zip
```

[Pi Zero / Zero W용 파일 다운로드](https://github.com/3rdIteration/seedsigner/releases/download/SeSi-0.8.7%2BShSi-B12/seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi0-smartcard.img.zip)

**Pi Zero 2 W용**

```text
seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi02w-smartcard.img.zip
```

[Pi Zero 2 W용 파일 다운로드](https://github.com/3rdIteration/seedsigner/releases/download/SeSi-0.8.7%2BShSi-B12/seedsigner_os.SeSi-0.8.7_ShSi-B12_.pi02w-smartcard.img.zip)

**`Source code (zip)` / `Source code (tar.gz)`는 설치 파일이 아니에요.** 개발자가 코드를 살펴볼 때 쓰는 자료이므로 선택하지 마세요.

## 3. 압축을 풀고 파일 검증하기

Windows에서는 받은 ZIP 파일을 마우스 오른쪽 버튼으로 눌러 **모두 압축 풀기**를 선택해요. macOS에서는 ZIP 파일을 두 번 클릭하고, Linux에서는 압축 관리자에서 풀어 주세요.

압축을 푼 폴더에서 **끝이 `.img`인 파일**을 찾아요. 파일 이름은 바꾸지 않는 편이 검증할 때 편해요. 압축을 푼 이미지는 ZIP보다 크므로 컴퓨터에 여유 공간이 필요해요.

<GuideFigure
  src="/guides/os/zip-to-image.svg"
  alt="다운로드한 img.zip의 압축을 풀어 img 파일을 만든다. SHA-256 검증과 Etcher 설치에는 압축을 푼 동일한 img 파일을 사용한다."
  caption="B12 릴리스에 적힌 SHA-256은 압축을 푼 .img 파일의 값이에요. ZIP 파일을 계산하면 다른 값이 나와요."
/>

이제 **[파일 검증 가이드](./verification)**로 이동해 **제작자의 메시지 서명**과 **내 이미지의 SHA-256**을 확인해 주세요. 검증을 마치면 이 페이지의 [4단계](#write-card)로 돌아오세요.

<Callout type="info" title="GPG 파일을 찾고 있다면">

B12 릴리스에는 별도의 GPG 서명 파일(`.asc`·`.sig`)이 제공되지 않아요. 제작자가 안내한 **비트코인 메시지 서명 + SHA-256**으로 검증해요. 차이와 확인 방법은 검증 페이지에 설명해 두었어요.

</Callout>

## 4. 검증한 이미지를 SD 카드에 기록하기 {#write-card}

**서명 확인에 성공하고, 이미지의 해시도 일치할 때만 진행해 주세요.** 파일을 SD 카드에 복사해서 넣는 것만으로는 설치되지 않아요. Etcher가 부팅할 수 있는 형태로 기록해야 해요.

microSD를 카드 리더에 넣어 컴퓨터에 연결하고, **balenaEtcher**를 실행해요.

<GuideFigure
  src="/guides/os/etcher-steps.svg"
  alt="Etcher의 순서: Flash from file에서 검증한 img 선택, Select target에서 microSD의 이름과 용량 확인, Flash로 기록한 뒤 검증 완료까지 기다리기."
  caption="Etcher에서 누를 버튼을 순서대로 정리한 안내도예요. 앱 버전과 운영체제에 따라 화면 모양은 다를 수 있어요."
/>

### ① Flash from file — 설치할 이미지 선택

**Flash from file**을 누르고, 방금 SHA-256을 확인한 **`.img` 파일**을 선택해요. 다른 폴더의 예전 버전이나 ZIP 파일을 다시 선택하지 않도록 파일명을 확인해 주세요.

### ② Select target — 기록할 SD 카드 선택

**Select target**을 누르고, **microSD의 이름과 용량**을 확인한 뒤 선택해요. 카드에 적힌 용량과 컴퓨터의 표시 용량은 조금 다를 수 있어요.

어느 항목인지 모르겠다면 선택을 취소하고, 카드 리더를 뺐을 때 사라졌다가 다시 꽂으면 나타나는 장치인지 확인해요. 컴퓨터의 SSD나 외장하드를 선택하지 않도록 주의해 주세요.

### ③ Flash! — 기록과 검증이 끝날 때까지 기다리기

1. 선택한 **이미지 파일명**과 **대상 카드**를 한 번 더 확인해요.
2. **Flash!**를 눌러요. 컴퓨터가 관리자 권한을 요청하면, 직접 실행한 Etcher의 요청인지 확인하고 허용해요.
3. **Flashing**은 카드에 쓰는 과정, **Validating**은 기록한 데이터를 다시 확인하는 과정이에요. 두 과정이 끝날 때까지 카드 리더나 전원을 분리하지 마세요.
4. **Flash Complete!** 등 완료 표시를 확인해요. 실패했다면 아래의 [문제 해결](#troubleshooting)을 확인해 주세요.

Etcher의 **Validating**은 카드에 잘 기록됐는지 확인하는 과정이에요. 앞에서 진행한 제작자 서명 검증을 대신하지는 않아요.

<Callout type="warning" title="“사용하려면 포맷해야 합니다”가 뜨면 취소하세요">

기록 후 Windows에서 포맷을 요청하거나 macOS에서 읽을 수 없는 디스크라고 표시할 수 있어요. 운영체제가 이미지의 일부 파티션을 읽지 못해 나타날 수 있는 안내예요. **포맷·초기화하지 말고 취소하거나 추출**해 주세요. 포맷하면 방금 설치한 내용이 지워져요.

</Callout>

## 5. 카드를 넣고 ShieldSigner 켜기

1. Etcher가 완료됐는지 확인하고, 컴퓨터에서 카드를 **안전하게 제거 / 추출**해요. Etcher가 이미 추출했다면 카드 리더를 분리하면 돼요.
2. **ShieldSigner의 전원이 꺼진 상태**에서 microSD를 기기의 슬롯에 넣어요. 방향이 맞지 않으면 억지로 밀지 마세요.
3. 제품에서 안내한 전원 단자에 전원 케이블을 연결해요. Raspberry Pi Zero 계열 보드의 전원 단자는 **PWR IN**이에요.
4. 부팅이 끝나고 메뉴가 나타날 때까지 기다려요. 이 단계에서는 Wi-Fi 연결, 계정 가입, 복구 단어 입력이 필요하지 않아요.

<GuideFigure
  src="/guides/os/first-boot.svg"
  alt="컴퓨터에서 microSD를 안전하게 꺼내고, 전원이 꺼진 ShieldSigner에 삽입한 뒤 전원을 연결하는 순서."
  caption="전원은 SD 카드를 넣은 다음 연결해요. 기기와 슬롯의 모양을 단순화한 안내도예요."
/>

홈 메뉴가 보이고 방향 버튼과 선택 버튼이 반응하면 첫 부팅을 확인한 거예요. **설치를 확인하려고 시드를 만들거나 기존 복구 단어를 입력할 필요는 없어요.**

## 막혔을 때 확인해 보세요 {#troubleshooting}

- **파일이 안 보여요:** 릴리스 아래 **Assets**를 펼쳤는지 확인해요.
- **해시가 달라요:** ZIP이 아닌 `.img`를 계산했는지, 버전과 보드가 같은지 확인해요. 해결 전에는 기록하지 마세요.
- **Etcher에 카드가 없어요:** 카드 리더를 다시 연결하거나 다른 USB 포트를 사용해요.
- **쓰기 또는 검증에 실패해요:** 다른 리더·USB 포트·정상적인 SD 카드로 다시 기록해요. 검증 단계는 건너뛰지 마세요.
- **카드 용량이 작아졌어요:** 설치 이미지의 파티션 때문에 일부만 보일 수 있어요. 설치 직후 다시 포맷하지 마세요.
- **부팅되지 않아요:** 전원을 분리한 뒤 보드용 파일명, 카드 삽입 상태, 전원 단자를 확인해요. 검증한 이미지로 다시 기록해도 같으면 판매자에게 문의해 주세요.

## 설치를 마쳤나요?

- [ ] 내 보드에 맞는 B12 설치 파일을 받았어요.
- [ ] 제작자의 서명 주소를 별도 채널에서 확인하고 메시지 서명을 검증했어요.
- [ ] 압축을 푼 `.img`의 SHA-256이 서명된 값과 일치해요.
- [ ] Etcher의 기록과 검증이 모두 끝났어요.
- [ ] ShieldSigner에서 메뉴가 나타나고 버튼이 반응해요.

다음은 [SeedKeeper 알아보기](../seedkeeper/what-is-seedkeeper)예요. 설치한 SD 카드는 다음 부팅에도 필요하므로 보관해 주세요.

## 참고한 공식 자료

- [ShieldSigner B12 릴리스와 검증 정보](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12)
- [ShieldSigner 소스의 지원 보드·설치 안내](https://github.com/3rdIteration/seedsigner/blob/SeSi-0.8.7%2BShSi-B12/README.md)
- [balenaEtcher 다운로드와 사용 안내](https://etcher.balena.io/)
- [Raspberry Pi 공식 문서: 전원 연결](https://www.raspberrypi.com/documentation/computers/getting-started.html)

</GuideContent>
