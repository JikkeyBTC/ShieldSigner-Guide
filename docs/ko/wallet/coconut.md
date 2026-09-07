---
title: Coconut Wallet 보기 전용 지갑
description: ShieldSigner의 공개 정보를 Coconut Wallet 보기 전용 지갑으로 연결하는 방법
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# Coconut Wallet 보기 전용 지갑

Coconut Wallet은 ShieldSigner에서 내보낸 공개 정보만 가져와 잔액과 거래를 확인하는 모바일 보기 전용 지갑이에요.<br> 시드와 개인키는 ShieldSigner에 남겨 두고, Coconut Wallet에는 공개키와 지갑 정보만 연결해요.

**개요 → Export XPub → Single Sig·Native Segwit → Coconut Wallet 보기 전용 지갑 추가 → QR 스캔 → 지갑 정보 비교** 순서로 진행해요.

## 개요 {#overview}

Coconut Wallet을 App Store 또는 Google Play Store에서 설치한 뒤, ShieldSigner에서 지갑의 공개 정보를 QR로 표시해요.<br> Coconut Wallet은 이 QR을 읽어 보기 전용 지갑을 만들어요.

- Coconut Wallet에는 시드, 개인키, SeedKeeper PIN을 입력하지 않아요.
- 이 안내의 QR과 지문은 설명용 예시예요.<br> 실제 구매자 환경에서 표시된 값을 사용해요.
- 연결을 마친 뒤 ShieldSigner와 Coconut Wallet의 지갑 정보가 같은지 확인해요.

<Callout type="info" title="보기 전용 지갑의 역할">

Coconut Wallet은 잔액·주소·거래 초안을 보여주고, ShieldSigner는 개인키를 보관한 채 서명만 담당해요.

</Callout>

## 1. ShieldSigner에서 Export XPub을 열어요 {#export-xpub}

ShieldSigner에서 **Seeds**를 열고 공개 정보를 내보낼 지문의 메뉴로 들어가요.

<GuideFigure screen
  src="/guides/wallet/coconut/01-fingerprint-select.png"
  alt="ShieldSigner의 In-Memory Seeds 화면에서 지문 dfa25f90이 선택되어 있다."
  caption="공개 정보를 내보낼 지문을 선택해요."
/>

지문 메뉴에서 **Export Xpub**을 선택해요.

<GuideFigure screen
  src="/guides/wallet/coconut/02-export-xpub.png"
  alt="지문 메뉴에서 Export Xpub가 선택되어 있다."
  caption="Export Xpub를 열어 공개키 내보내기를 시작해요."
/>

## 2. Single Sig·Native Segwit을 선택해요 {#single-sig-native-segwit}

Export Xpub 화면에서 아래 순서로 지갑 형식을 선택해요.

1. **Single Sig**를 선택해요.

<GuideFigure screen
  src="/guides/wallet/coconut/03-single-sig.png"
  alt="Export Xpub 화면에서 Single Sig가 선택되어 있다."
  caption="단일 서명 지갑은 Single Sig를 선택해요."
/>

2. 주소 형식에서 **Native Segwit**을 선택해요.

<GuideFigure screen
  src="/guides/wallet/coconut/04-native-segwit.png"
  alt="Export Xpub 화면에서 Native Segwit이 선택되어 있다."
  caption="사용할 주소 형식과 Coconut Wallet의 지갑 형식을 맞춰요."
/>

3. 지갑 앱 선택 화면에서 **BlueWallet**을 선택해요.<br> Coconut Wallet도 같은 XPub 형식을 사용하므로 이 항목으로 공개 정보를 내보낼 수 있어요.

<GuideFigure screen
  src="/guides/wallet/coconut/05-wallet-type.png"
  alt="Export Xpub 화면에서 BlueWallet이 선택되어 있다."
  caption="Coconut Wallet에 연결할 공개키 형식으로 BlueWallet을 선택해요."
/>

4. 공개키가 앞으로의 거래를 확인하는 데 사용된다는 경고를 읽고 **I Understand**를 눌러요.

<GuideFigure screen
  src="/guides/wallet/coconut/06-warning-message.png"
  alt="Privacy Leak 경고와 I Understand 버튼이 표시된 Export Xpub 화면."
  caption="공개키는 공개 정보지만, 시드와 개인키는 절대 공유하지 않아요."
/>

5. **Xpub Details**에서 지문, 파생 경로, Xpub를 확인한 뒤 **Export Xpub**를 눌러요.

<GuideFigure screen
  src="/guides/wallet/coconut/07-export-xpub-info.png"
  alt="Xpub Details 화면에 지문 dfa25f90, 파생 경로 m/84'/0'/0', Xpub가 표시되어 있다."
  caption="지갑 형식과 파생 경로를 확인한 뒤 Export Xpub를 눌러요."
/>

화면에 QR 코드가 나타나면 Coconut Wallet에서 스캔할 준비가 된 거예요.

<GuideFigure screen
  src="/guides/wallet/coconut/08-qr-code.gif"
  alt="ShieldSigner에 공개 Xpub QR 코드가 표시되고 QR 패턴이 바뀌는 화면."
  caption="Coconut Wallet이 스캔할 수 있도록 QR 화면을 그대로 유지해요."
/>

## 3. Coconut Wallet에 보기 전용 지갑을 추가해요 {#add-watch-only}

Coconut Wallet을 열고 홈 화면 오른쪽 위의 **보기 전용 지갑 추가** 버튼을 눌러요.

<GuideFigure
  src="/guides/wallet/coconut/09-add-watch-only-wallet.png"
  alt="Coconut Wallet 홈 화면 오른쪽 위에 보기 전용 지갑 추가 버튼이 표시되어 있다."
  caption="홈 화면에서 보기 전용 지갑 추가를 시작해요."
/>

지갑 종류에서 **시드사이너**를 선택해요.

<GuideFigure
  src="/guides/wallet/coconut/10-select-seedsigner.png"
  alt="Coconut Wallet의 지갑 종류 선택 화면에서 시드사이너 항목이 선택되어 있다."
  caption="ShieldSigner 공개키를 가져오기 위해 시드사이너를 선택해요."
/>

## 4. ShieldSigner의 QR을 스캔해요 {#scan-qr}

Coconut Wallet의 카메라가 열리면 2단계에서 준비한 ShieldSigner 화면의 QR 코드를 비춰요.

<GuideFigure
  src="/guides/wallet/coconut/11-scan-qr-code.png"
  alt="Coconut Wallet 카메라가 ShieldSigner 화면의 Xpub QR 코드를 스캔하고 있다."
  caption="QR 전체가 화면 안에 들어오도록 맞춰 스캔해요."
/>

스캔이 끝나면 Coconut Wallet이 공개 정보를 불러와 보기 전용 지갑을 만들고 동기화를 시작해요.

<GuideFigure
  src="/guides/wallet/coconut/12-wallet-added.png"
  alt="Coconut Wallet에 새 보기 전용 지갑이 추가되고 잔액·거래 목록이 표시되어 있다."
  caption="지갑이 추가되고 동기화가 시작된 화면이에요."
/>

## 5. 지갑 정보를 비교해요 {#compare-wallet}

ShieldSigner에서 확인한 지갑과 Coconut Wallet에 추가된 지갑의 정보가 같은지 비교해요.<br> 특히 **지갑 ID(마스터 지문)**와 지갑 형식, 파생 경로가 일치해야 해요.

<GuideFigure
  src="/guides/wallet/coconut/13-wallet-info-compare.png"
  alt="ShieldSigner의 Xpub Details와 Coconut Wallet의 시드사이너 정보 화면을 나란히 비교하는 이미지."
  caption="ShieldSigner의 공개 정보와 Coconut Wallet의 지갑 ID가 같은지 확인해요."
/>

지갑 ID가 다르면 사용을 멈추고 네트워크, 지갑 형식, 파생 경로를 다시 확인해요.<br> 일치하는 것을 확인한 뒤에만 잔액과 수신 주소를 사용해요.

## 다음 단계

<GuideNav prev="/wallet/bluewallet" next="/transactions/receive-guide" prevLabel="이전: BlueWallet 워치온리 지갑" nextLabel="다음: 비트코인 받기" />

</GuideContent>
