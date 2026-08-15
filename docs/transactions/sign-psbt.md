---
title: PSBT 검토·서명
description: QR 또는 파일로 PSBT를 검토하고 ShieldSigner에서 서명하는 방법
---

# PSBT 검토·서명

PSBT는 아직 브로드캐스트되지 않은 거래 초안입니다. 워치온리 앱은 초안을 만들고 ShieldSigner는 내용을 확인한 뒤 서명합니다.

## QR 흐름

1. BlueWallet 또는 Coconut Wallet에서 거래를 만들고 PSBT QR을 표시합니다.
2. ShieldSigner에서 `Sign transaction`을 열어 QR을 여러 장 스캔합니다.
3. 입력 합계, 각 목적지 주소, 금액, 수수료, change 주소를 천천히 대조합니다.
4. 예상과 모두 일치할 때만 서명하고, 서명된 PSBT QR을 앱으로 돌려보냅니다.

## 파일 흐름

앱이 파일 내보내기를 지원하면 PSBT 파일을 microSD로 옮겨 ShieldSigner에서 읽습니다. 파일을 열기 전 운영체제와 앱이 신뢰할 수 있는지 확인하고, 서명 후 생성된 파일을 다시 워치온리 앱으로 가져옵니다.

## 마지막 확인

앱에 돌아온 서명된 PSBT를 다시 열어 상태를 확인합니다. 목적지·금액·수수료가 바뀌었거나 서명 상태가 예상과 다르면 브로드캐스트하지 말고 폐기하세요. 브로드캐스트는 네트워크 연결된 워치온리 앱에서 최종 검토 후에만 수행합니다.

<Callout type="danger" title="서명은 되돌릴 수 없습니다">주소를 문자 몇 글자만 보고 승인하지 마세요. ShieldSigner에 표시된 전체 주소와 금액을 실제 주문 내용과 대조한 뒤 승인하세요.</Callout>

<GuideNav prev="/transactions/receive" next="/reference/security" prevLabel="이전: 입금 주소 확인" nextLabel="다음: 보안 모델" />
