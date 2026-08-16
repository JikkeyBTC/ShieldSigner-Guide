---
title: Send
description: 출금 거래를 만들고 수신자와 금액을 확인하는 흐름
---

# Send

Send 단계에서는 워치온리 지갑이 만든 거래 초안을 ShieldSigner에서 확인하고 서명합니다. 카드의 애니메이션처럼 사용자의 요청이 오른쪽의 Bitcoin 거래로 전달되는 흐름을 따라가세요.

## 흐름

1. BlueWallet 또는 Coconut Wallet에서 `Send`를 엽니다.
2. 수신자 주소, 금액, 네트워크 수수료, 잔돈 주소를 입력하거나 불러옵니다.
3. PSBT를 QR 또는 파일로 ShieldSigner에 전달합니다.
4. 화면에 표시된 수신자, 금액, 수수료, 입력·출력 개수를 모두 대조합니다.
5. 값이 일치할 때만 서명하고, 서명된 PSBT를 워치온리 지갑으로 돌려보내 온라인 상태에서 방송합니다.

<Callout type="warning" title="수신자 주소와 금액이 다르면 중단">
주소·금액·수수료 중 하나라도 예상과 다르면 서명하지 마세요. 원본 요청서나 판매자가 알려준 값이 아니라 ShieldSigner 화면과 독립적으로 대조한 값만 신뢰하세요.
</Callout>

## 마지막 확인

서명 전에는 주소 전체와 네트워크를 다시 확인합니다. QR을 스캔하거나 파일을 옮길 때 개인키와 시드가 포함된 파일을 만들지 말고, 서명된 PSBT만 워치온리 지갑으로 전달하세요.

<GuideNav prev="/transactions/receive-guide" next="/transactions/sign-psbt" prevLabel="이전: Receive" nextLabel="다음: Signing" />
