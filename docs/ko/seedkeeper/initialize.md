---
title: 카드 초기화와 PIN
description: 실물 ShieldSigner에 SeedKeeper Applet을 설치하고 새 SeedKeeper 카드에 PIN을 설정하는 방법
verifiedOn: 2026-09-06
verifiedVersion: SeSi-0.8.7+ShSi-B12 기준
estimatedTime: 5~10분
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# 카드 초기화와 PIN

새 SeedKeeper 카드에 **나만의 PIN**을 정해 사용할 준비를 해요.<br> PIN은 카드의 데이터를 사용할 때 필요한 비밀번호예요.<br> 시드 단어나 지갑의 패스프레이즈와는 별개예요.

**카드 연결 → SeedKeeper Applet 설치 → Card Info → 새 PIN 입력 → PIN 확인 → 설정 완료**

이 안내는 **ShieldSigner B12**를 기준으로 해요.<br> 메뉴 이름은 기기 화면의 영어 표기를 그대로 보여드려요.

<Callout type="warning" title="여기서 초기화는 새 카드의 첫 설정을 뜻해요">

이 안내에서는 새 카드에 PIN을 만들어요.<br> 기존 데이터를 지우는 **Factory Reset Card**는 선택하지 마세요.<br> 이미 사용 중인 카드라면 기존 PIN과 백업 상태부터 확인해 주세요.

</Callout>

## 시작하기 전에

- [OS 설치](../os/install)와 [다운로드 파일 검증](../os/verification)을 마친 ShieldSigner를 준비해요.
- **SeedKeeper Applet을 설치할 카드**가 필요해요.<br> Applet은 카드 안에서 동작하는 프로그램이에요.<br> 이 안내에서 실물 ShieldSigner에 `SeedKeeper-0.2-official.cap`을 설치한 뒤 PIN을 설정해요.
- 카드가 여러 장이라면 A·B·C처럼 구분해 두고 **한 장씩** 설정해요.
- 새 PIN을 안전하게 보관할 방법을 정해요.<br> 카드 겉면에 PIN을 적거나, 카드와 PIN 기록을 함께 보관하지 마세요.

아직 시드를 만들거나 카드에 저장할 필요는 없어요.<br> 먼저 PIN 설정부터 마칠게요.

## 1. 카드를 연결하고 Tools를 열어요 {#connect}

ShieldSigner를 켜고 메인 메뉴가 나올 때까지 기다려요.<br> 기기에 연결된 스마트카드 리더의 방향 표시에 맞춰 SeedKeeper 카드를 넣어 주세요.

다음에 카드 삽입 방향을 확인하고 카드를 연결합니다.

금색 표면이 아래로 가도록 삽입해주세요.

카드를 연결한 뒤 메인 메뉴에서 **Tools**를 선택해요.<br> 방향키로 주황색 선택 표시를 옮긴 뒤, 가운데 확인 버튼을 누르면 돼요.

<GuideFigure
  src="/guides/seedkeeper/initialize/03-home-tools-device.png"
  alt="주황색 스웨이드 배경 위 ShieldSigner 기기와 오른쪽으로 나온 스마트카드. 금색 접점이 보인다."
  caption="금색 표면이 아래로 향하도록 카드를 삽입해 주세요."
/>

## 2. SeedKeeper Applet을 설치해요 {#install-applet}

시뮬레이터에서는 Applet 설치 자체를 지원하지 않아요.<br> 다만 **DIY Tools → Install Applet** 메뉴까지의 이동은 확인할 수 있어요.<br> SeedKeeper Applet 설치는 **실물 ShieldSigner**에서 진행해요.

### Smartcard Tools 선택

Tools 목록에서 아래로 이동해 **Smartcard Tools**를 열어요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/05-smartcard-selected-screen.png"
  alt="Tools 목록에서 Smartcard Tools가 선택된 기기 화면."
  caption="Tools에서 Smartcard Tools를 선택해요."
/>

### DIY Tools로 진입해요

**Smartcard Tools**에서 **DIY Tools**를 열어요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/18-diy-tools-screen.png"
  alt="Smartcard Tools 화면에서 DIY Tools가 선택된 모습."
  caption="Smartcard Tools에서 DIY Tools를 선택해요."
/>

### Install Applet으로 진입해요

**DIY Tools**에서 **Install Applet**을 선택해요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/19-install-applet-screen.png"
  alt="Javacard DIY 화면에서 Install Applet이 선택된 모습."
  caption="DIY Tools에서 Install Applet을 선택해요."
/>

### SeedKeeper Applet 파일을 선택해요

목록에서 **SeedKeeper-0.2-official.cap** 파일을 선택해요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/15-select-applet-screen.png"
  alt="Select Applet 화면에서 SeedKeeper-0.2-official.cap이 선택된 모습."
  caption="SeedKeeper-0.2-official.cap 파일을 선택해요."
/>

### 기본 스토리지 8 KB를 선택해요

**Select Storage**에서 **8 KB (default)**를 선택해요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/16-select-storage-screen.png"
  alt="Select Storage 화면에서 8 KB (default)가 선택된 모습."
  caption="기본 스토리지인 8 KB (default)를 선택해요."
/>

### 설치 완료를 확인해요

**Success** 화면에 **Applet Installed**가 표시되면 카드에 SeedKeeper Applet이 정상적으로 설치된 거예요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/17-applet-installed-screen.png"
  alt="Success 화면에 Applet Installed가 표시된 모습."
  caption="카드에 정상적으로 SeedKeeper Applet이 설치됐는지 확인해요."
/>

## 3. Card Info로 들어가요 {#card-info-menu}

Applet 설치가 끝나면 **Tools → Smartcard Tools → Common Functions → Card Info**로 들어가요.

### Common Functions 선택

맨 위의 **Common Functions**를 열어요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/06-smartcard-menu-screen.png"
  alt="Smartcard Tools 화면에서 맨 위 Common Functions가 선택되어 있다."
  caption="카드의 첫 설정은 Common Functions에서 진행할 수 있어요."
/>

### Card Info 선택

화면 제목이 **Common Tools**로 바뀌면 두 번째 항목인 **Card Info**를 열어요.<br> 새 카드라면 카드 정보를 보여주기 전에 PIN 설정을 안내해요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/08-card-info-selected-screen.png"
  alt="Common Tools 화면에서 두 번째 항목 Card Info가 선택되어 있다."
  caption="Device Filter 아래에 있는 Card Info를 선택해 주세요."
/>

## 4. 새 카드라는 안내를 확인해요 {#new-card}

**Card Uninitialised**가 나오면 아직 첫 설정을 하지 않은 카드예요.<br> 화면의 안내는 “카드 설정을 마치려면 PIN을 정해 주세요”라는 뜻이에요.

**I Understand**를 선택해 다음으로 넘어가요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/09-card-uninitialised-screen.png"
  alt="Card Uninitialised 화면. Set a device PIN to complete Card Setup 안내와 I Understand 버튼이 보인다."
  caption="새 카드에서 나오는 첫 설정 안내예요. 아래 I Understand로 계속해요."
/>

이 화면 없이 바로 `Card Info`에 **Setup: Done**이 보인다면 이미 설정된 카드예요.<br> 다시 초기화하지 말고 기존 PIN을 알고 있는지 확인해 주세요.

## 5. 새 PIN을 입력해요 {#new-pin}

**New Card PIN**에서 이 카드에 사용할 PIN을 정해요.<br> B12의 SeedKeeper PIN은 **4~16자**이고, 숫자뿐 아니라 영문도 사용할 수 있어요.<br> 짧은 반복 문자나 생일처럼 쉽게 짐작할 수 있는 값은 피해 주세요.

<GuideFigure
  src="/guides/seedkeeper/initialize/10-new-pin-device.png"
  alt="기기 전체에 표시된 New Card PIN 입력 화면. 왼쪽은 방향키, 화면 오른쪽에는 ABC, 123, 초록색 체크 표시가 있다."
  caption="방향키로 문자를 고르고 가운데 버튼으로 한 글자씩 입력해요."
/>

| 하고 싶은 일 | 누를 곳 |
| --- | --- |
| 문자 선택·입력 | 방향키로 이동한 뒤 가운데 확인 버튼 |
| 대문자·소문자 전환 | 화면 오른쪽 위 `ABC` 또는 `abc`에 대응하는 버튼 |
| 숫자 키보드로 전환 | 화면 오른쪽 가운데 `123`에 대응하는 버튼 |
| 잘못 입력한 글자 지우기 | 키보드 아래의 지우기 기호 `⌫` |
| 입력 마치기 | 화면 오른쪽 아래 **초록색 체크 표시**에 대응하는 버튼 |

입력을 마치면 화면 오른쪽 아래의 초록색 **확인 버튼**을 눌러요.

입력한 글자는 화면에 보일 수 있어요.<br> 실제 PIN을 정할 때는 주변 시선과 촬영에 주의해 주세요.

<details>
<summary>PIN 입력 화면만 크게 보기</summary>

<GuideFigure screen
  src="/guides/seedkeeper/initialize/10-new-pin-screen.png"
  alt="New Card PIN의 빈 입력창과 영문 키보드, ABC·123 전환 버튼, 초록색 확인 표시를 확대한 화면."
  caption="문자 선택과 입력을 마쳤다면 오른쪽 아래 초록색 체크 표시로 확인해요."
/>

</details>

## 6. 같은 PIN을 한 번 더 입력해요 {#confirm-pin}

**Confirm Card PIN**이 나오면 방금 정한 PIN을 똑같이 입력하고 초록색 **확인 버튼**을 눌러요.<br> 영문 대소문자와 입력한 글자 수까지 같아야 해요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/12-confirm-pin-screen.png"
  alt="Confirm Card PIN 화면. 새 PIN과 같은 값을 다시 입력할 수 있는 빈 키보드가 보인다."
  caption="새로운 PIN을 정하는 화면이 아니라, 방금 입력한 PIN을 확인하는 화면이에요."
/>

`PIN Mismatch`가 나오면 두 입력이 달랐다는 뜻이에요.<br> 안내를 확인하고 새 PIN 입력부터 다시 진행해 주세요.

## 7. 설정 완료를 확인해요 {#complete}

**Card Setup**과 초록색 체크 표시, **PIN set.<br> Import seed next.** 문구가 보이면 PIN 설정이 끝났어요.<br> **OK**를 눌러 카드 정보로 넘어가요.

<GuideFigure
  src="/guides/seedkeeper/initialize/13-card-setup-complete-device.png"
  alt="ShieldSigner 기기 전체에 Card Setup 성공 화면이 표시되어 있다. PIN set. Import seed next.와 OK 버튼이 보인다."
  caption="PIN 설정 성공 화면이에요. 설정이 완료되면 카드를 사용할 준비가 끝나요."
/>

이어서 나오는 **Card Info**에서 다음 항목을 확인해 주세요.

<GuideFigure screen
  src="/guides/seedkeeper/initialize/14-card-info-done-screen.png"
  alt="Card Info에서 Type: SeedKeeper, Remaining PIN tries, Setup: Done이 표시된 카드 화면."
  caption="Setup: Done이 첫 설정 완료를 뜻해요. UID와 버전은 카드마다 달라요."
/>

| 화면의 항목 | 확인할 내용 |
| --- | --- |
| `Type` | **SeedKeeper**인지 확인해요. |
| `UID` | 카드 식별자예요. 카드 A·B·C를 구분할 때 함께 기록할 수 있어요. |
| `Version` | 카드가 보고하는 프로토콜·애플릿 버전이에요. ShieldSigner OS의 B12 버전과는 달라요. |
| `Remaining PIN tries` | PIN을 틀리게 입력할 수 있는 남은 횟수예요. 카드 설정과 사용 상태에 따라 달라요. |
| `Setup` | **Done**이면 카드의 첫 설정을 마친 상태예요. |

카드 B·C도 준비한다면 현재 카드의 설정을 마친 후 교체하고, 같은 순서로 한 장씩 진행해요.

<Callout type="success" title="카드를 사용할 준비가 끝났어요">

지금까지는 **PIN만 설정**했어요.<br> 시드가 카드에 백업된 상태는 아니에요.<br> 다음 [시드를 카드에 저장하기](./save)에서 저장 과정을 이어가세요.

</Callout>

## 화면이 다르게 나오면 {#troubleshooting}

| 이런 화면·상황이라면 | 이렇게 해 주세요 |
| --- | --- |
| 카드가 인식되지 않아요 | 카드 종류와 삽입 방향, 리더 연결 상태를 확인하고 ShieldSigner가 카드를 인식하는지 살펴봐요. |
| `Card Uninitialised`가 안 나와요 | `Card Info`의 `Setup`을 확인해요. `Done`이면 이미 설정된 카드예요. 처음부터 따라 하려고 Factory Reset을 선택하지 마세요. |
| `Invalid PIN`이 나와요 | 이 안내의 SeedKeeper 기준으로 4~16자인지 확인하고 다시 입력해요. 다른 종류의 카드는 PIN 규칙이 다를 수 있어요. |
| `PIN Mismatch`가 나와요 | 새 PIN과 확인용 PIN이 달라요. 대소문자와 오타를 확인하고 두 번 다시 입력해요. |
| `Incorrect PIN` 또는 남은 횟수가 나와요 | 기존 카드의 PIN 인증에 실패한 상태예요. 추측해서 반복 입력하지 말고 보관한 PIN 기록을 확인해요. |
| PIN을 잊었어요 | PIN을 재설정하면서 기존 시드를 그대로 살릴 수 있다고 가정하면 안 돼요. 별도로 보관한 백업부터 확인해 주세요. Factory Reset은 데이터 복구 기능이 아니에요. |

## 다음 단계

[← SeedKeeper란?](./what-is-seedkeeper) · [다음: 시드를 카드에 저장하기 →](./save)

절차 확인: [ShieldSigner B12 릴리스](https://github.com/3rdIteration/seedsigner/releases/tag/SeSi-0.8.7%2BShSi-B12) · [B12 카드 메뉴 소스](https://github.com/3rdIteration/seedsigner/blob/SeSi-0.8.7%2BShSi-B12/src/seedsigner/views/smartcard_views.py) · [B12 PIN 설정 소스](https://github.com/3rdIteration/seedsigner/blob/SeSi-0.8.7%2BShSi-B12/src/seedsigner/helpers/seedkeeper_utils.py)

</GuideContent>
