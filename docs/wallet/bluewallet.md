---
title: BlueWallet 워치온리 지갑
description: ShieldSigner의 공개 정보만 BlueWallet에 연결하는 방법
---

# BlueWallet 워치온리 지갑

BlueWallet에는 **공개 정보(지갑 정책, xpub 또는 descriptor)**만 넣습니다. SeedKeeper나 ShieldSigner의 시드·PIN·개인키는 휴대폰으로 옮기지 않습니다.

## 준비

1. ShieldSigner에서 Bitcoin 네트워크와 계정(예: Native SegWit)을 선택합니다.
2. `지갑 정보`에서 descriptor/xpub를 QR 또는 복사 가능한 공개 문자열로 표시합니다.
3. 주소 형식과 네트워크(메인넷/테스트넷)를 메모해 둡니다.

## BlueWallet에 가져오기

1. BlueWallet → `+` → `Import wallet`을 엽니다.
2. ShieldSigner 화면의 QR을 스캔하거나 공개 descriptor/xpub를 붙여 넣습니다. 값은 실제 구매자 환경에서 표시된 것을 사용하세요(이 문서에 키를 적지 마세요).
3. 지갑 이름을 정하고 Bitcoin 네트워크를 확인한 뒤 저장합니다.
4. 지갑이 `watch-only`인지 확인하고, 개인키 가져오기나 seed 입력 화면은 사용하지 않습니다.

## 수신 주소 검증

BlueWallet에서 새 수신 주소를 만들고 ShieldSigner에서 같은 주소와 파생 경로를 확인합니다. 두 화면의 앞·뒤 몇 글자만 보지 말고 주소 전체를 QR/문자열로 비교하세요. 불일치하면 사용하지 말고 앱의 네트워크와 계정 유형을 먼저 점검합니다.

## 서명 인계

BlueWallet은 거래를 만들고 PSBT QR을 표시할 수 있습니다. ShieldSigner에서 QR을 스캔해 목적지·금액·수수료를 검토한 뒤 서명합니다. 서명된 PSBT QR을 BlueWallet으로 돌려보내고, 최종 검토 후에만 브로드캐스트합니다.

<Callout type="warning" title="시드 노출 금지">BlueWallet에 시드나 개인키를 입력하면 워치온리가 아닙니다. 휴대폰 카메라로 SeedKeeper 카드나 복구 문구를 촬영하지 마세요.</Callout>

<GuideNav prev="/seedkeeper/recovery" next="/wallet/coconut" prevLabel="분실과 복구 계획" nextLabel="다음: Coconut Wallet 워치온리 지갑" />
