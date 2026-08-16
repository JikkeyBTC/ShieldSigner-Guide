---
title: Coconut Wallet 워치온리 지갑
description: Coconut Wallet에 ShieldSigner 공개 정보를 연결하는 방법
---

# Coconut Wallet 워치온리 지갑

Coconut Wallet도 감시용 지갑으로만 사용합니다. ShieldSigner에서 내보내는 descriptor/xpub는 공개 정보이며, 시드·개인키·SeedKeeper PIN은 절대 공유하지 않습니다.

## 지갑 추가

1. ShieldSigner에서 사용할 네트워크와 계정 유형을 확인합니다.
2. `지갑 정보` 화면에서 descriptor 또는 xpub를 QR로 표시합니다.
3. Coconut Wallet → 새 지갑 → `Watch-only` 또는 `Import descriptor`를 선택합니다.
4. QR을 스캔하거나 공개 문자열을 입력하고 네트워크를 다시 확인합니다.

앱 버전에 따라 메뉴 이름이 다를 수 있습니다. `Import seed`, `private key`처럼 시드 입력을 요구하는 경로는 선택하지 마세요.

## 주소와 잔액 확인

앱에서 만든 첫 수신 주소를 ShieldSigner의 주소 확인 화면과 대조합니다. 주소가 다르면 네트워크, 계정 유형, derivation path를 확인하고 새 지갑을 만들기 전까지 입금을 멈춥니다.

## PSBT 서명 흐름

Coconut Wallet에서 거래를 만들고 PSBT를 QR 또는 파일로 내보냅니다. ShieldSigner에서 입력·출력·수수료를 확인하고 서명한 뒤, 서명된 PSBT를 Coconut Wallet으로 가져옵니다. 브로드캐스트 버튼은 마지막 검토가 끝난 후에만 누릅니다.

<Callout type="tip" title="워치온리의 역할">모바일 앱은 잔액·주소·거래 초안을 보여주고, ShieldSigner는 개인키를 격리한 채 서명만 담당합니다.</Callout>

<GuideNav prev="/wallet/bluewallet" next="/transactions/receive-guide" prevLabel="이전: BlueWallet 워치온리 지갑" nextLabel="다음: Receive" />
