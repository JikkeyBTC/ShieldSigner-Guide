---
title: 입금 주소 확인
description: 워치온리 앱과 ShieldSigner에서 수신 주소를 검증하는 절차
---

# 입금 주소 확인

입금 전 주소를 **두 장치에서 독립적으로** 확인하면 클립보드 변조나 잘못된 계정 선택을 줄일 수 있습니다.

## 절차

1. BlueWallet 또는 Coconut Wallet에서 `Receive`를 엽니다.
2. 표시된 주소 QR을 ShieldSigner의 주소 확인 기능으로 스캔합니다.
3. ShieldSigner 화면에서 네트워크, 계정 유형, 파생 경로, 주소 전체를 확인합니다.
4. 금액을 보낼 거래소나 송금 화면에서 QR을 다시 스캔하고, 마지막으로 주소의 전체 문자열이 일치하는지 확인합니다.

주소·네트워크·금액 중 하나라도 다르면 입금을 취소하고 새 주소를 생성합니다. 검색 결과나 메신저로 전달받은 주소를 그대로 신뢰하지 마세요.

<Callout type="warning" title="주소가 바뀌는 것은 정상">HD 지갑은 수신할 때마다 새 주소를 제안할 수 있습니다. 이전 주소의 잔액이 사라진 것이 아니며, 현재 화면의 주소를 ShieldSigner에서 검증하면 됩니다.</Callout>

<GuideNav prev="/wallet/coconut" next="/transactions/sign-psbt" prevLabel="이전: Coconut Wallet 워치온리 지갑" nextLabel="다음: PSBT 검토·서명" />
