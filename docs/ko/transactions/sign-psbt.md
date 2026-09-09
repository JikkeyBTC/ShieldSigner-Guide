---
title: PSBT 검토·서명
description: ShieldSigner에서 수신자·금액·수수료·잔돈을 확인하고 서명된 거래의 전송과 확정을 확인하는 방법
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# PSBT 검토·서명

[BTC 보내기](./send-guide)에서 만든 PSBT를 기기가 읽었다면, **화면의 내용을 직접 확인한 다음 서명**해요.<br> 서명·전송·확정은 서로 다른 단계예요. 이 페이지에서는 마지막 확정 확인까지 진행해요.

## 1. 사용할 시드와 거래 개요를 확인해요 {#overview}

시드 선택 화면이 나오면 이 거래를 만들 때 연결한 지갑의 시드를 선택해요.<br> 패스프레이즈를 사용하는 지갑이라면 같은 패스프레이즈가 적용돼 있어야 해요.

거래 개요에서 **입력 수, 수신자 수, 잔돈 출력 수**를 살펴봐요.<br> 모르는 수신자가 추가됐거나 예상과 다르게 잔돈이 없다면, 다음 버튼을 계속 누르지 말고 거래를 만든 지갑부터 확인해요.

<GuideFigure screen
  src="/guides/transactions/12-overview-screen.png"
  alt="20,000 tSats 전송과 입력 하나, 수신자·수수료·잔돈이 표시된 Review Transaction 화면."
  caption="Review details를 눌러 각 항목을 확인해요. tSats는 테스트 네트워크 금액 표시예요."
/>

## 2. 목적지·금액·수수료를 대조해요 {#review}

기기의 다음 화면으로 이동하며 아래 항목을 모두 확인해요.

| 확인 항목 | 무엇과 비교하나요? |
| --- | --- |
| 입력 합계 | 이 거래에 사용되는 코인의 합계예요. 전체 지갑 잔액과 다를 수 있어요. |
| 받는 주소 | 받는 사람과 별도로 확인한 **주소 전체**와 비교해요. 여러 수신자면 각각 확인해요. |
| 보낼 금액 | 요청한 금액과 단위를 비교해요. 실습 예시는 **20,000 sats**예요. |
| 네트워크 수수료 | 실물 환경에서는 온라인 지갑에서 확인한 총수수료와 비교해요. 실습 지갑은 총액을 따로 표시하지 않으므로 기기의 Transaction Math에서 확인해요. 뜻밖에 큰 값이면 중단해요. |
| 잔돈 | 내 지갑으로 돌아오는 금액·주소·파생 정보를 확인해요. 기기의 주소 검증 결과도 확인해요. |

**입력 합계 − 보내는 금액 − 잔돈 = 수수료**가 되는지도 살펴봐요.<br> 실습의 자기 전송에서는 보낼 금액과 잔돈이 모두 같은 지갑으로 돌아올 수 있지만, 화면에서 검토할 항목이 사라지는 것은 아니에요.

<Callout type="danger" title="예상하지 못한 경고를 넘기지 마세요">
잔돈이 있어야 하는 거래에서 <strong>Full Spend / No change</strong>가 나오거나, 잔돈 주소를 검증하지 못하거나, 모르는 출력이 있으면 서명하지 마세요.<br> 전액 보내기처럼 잔돈이 없는 정상 거래도 있지만, 내 의도와 맞는지 확인해야 해요. 이 안내에서는 잔돈이 있는 거래로 연습해요.
</Callout>

<GuideFigure screen
  src="/guides/transactions/13-math-screen.png"
  alt="입력 1,000,000, 수신자 20,000, 수수료 282, 잔돈 979,718 sats가 표시된 Transaction Math."
  caption="실제 검증한 예시: 1,000,000 − 20,000 − 979,718 = 282 sats예요."
/>

<GuideFigure screen
  src="/guides/transactions/14-recipient-screen.png"
  alt="수신자 주소 전체와 20,000 tSats가 표시된 Will Send 화면."
  caption="별도로 확인한 수신자 주소 전체와 보낼 금액을 비교해요."
/>

<GuideFigure screen
  src="/guides/transactions/15-change-screen.png"
  alt="Your Change 화면에 979,718 tSats와 Address verified가 표시되어 있다."
  caption="예시에서는 잔돈 주소 #17을 기기가 내 지갑 주소로 검증했어요. 내 거래에서는 순서가 달라질 수 있어요."
/>

## 3. 마지막으로 확인하고 서명해요 {#sign}

모든 값이 맞으면 최종 승인 화면의 서명 버튼을 눌러요.<br> ShieldSigner가 서명을 만들면 **서명된 PSBT QR**이 표시돼요. QR을 읽는 쪽에서 완료했다고 확인할 때까지 유지해요.

<Callout type="warning" title="실습 지갑은 서명 QR을 읽으면 자동으로 전송해요">
내장 Simulator wallet은 반환된 서명을 읽은 뒤 거래를 완성하고 Bitsaga Signet으로 자동 전송해요.<br> 별도의 전송 확인창이 한 번 더 나오기를 기대하지 말고, 기기에서 서명하기 전에 검토를 모두 마쳐요.
</Callout>

<GuideFigure screen
  src="/guides/transactions/16-finalize-screen.png"
  alt="Sign Transaction 화면의 Approve transaction 버튼."
  caption="모든 값이 일치할 때만 Approve transaction을 눌러요."
/>

<GuideFigure screen
  src="/guides/transactions/17-signed-qr-screen.png"
  alt="승인 후 기기가 표시한 서명된 PSBT QR."
  caption="테스트 거래의 서명 반환 화면이에요. 온라인 지갑이 읽기를 마칠 때까지 유지해요."
/>

## 4. 서명된 거래를 온라인 지갑으로 돌려보내요 {#broadcast}

실물 환경에서는 온라인 지갑의 **서명된 거래 가져오기 / Scan signed transaction** 기능으로 기기의 QR을 읽어요.<br> 시드 QR, 개인키 또는 카드 PIN을 넘기는 것이 아니에요. 파일 교환을 지원하는 지갑을 사용한다면 해당 지갑과 기기가 지원하는 PSBT 파일 절차를 따라요. 이 실습에서는 QR 방식만 사용해요.

온라인 지갑에서 필요한 서명이 모두 모였는지 확인하고, **목적지·금액·수수료**를 최종 대조한 뒤 **Broadcast / 전송**해요.<br> 앱에 따라 서명 가져오기와 전송이 자동으로 이어질 수 있으니 미리 확인해요. 서명된 거래는 제3자가 전송할 수도 있으므로 함부로 공유하지 마세요.

<GuideFigure
  src="/guides/transactions/18-broadcast-panel.png"
  alt="서명 반환 후 TXID와 블록 대기 메시지가 표시된 실습 지갑."
  caption="전송됐지만 아직 블록 포함을 기다리는 화면이에요. 전송과 확정은 구분해요."
/>

## 5. TXID와 확정을 확인해요 {#confirmation}

전송 뒤에는 **TXID**가 표시돼요. TXID는 거래를 구분하는 64자리 16진수 식별자예요.<br> 복사해서 해당 네트워크의 거래 조회 화면에서 확인할 수 있어요.

실습 지갑의 **Finish it here** 단계는 전송 처리 단계이고, **In a block**은 거래가 블록에 포함됐다는 뜻이에요.<br> 전송 성공 메시지나 TXID만 보고 확정됐다고 판단하지 말고, 블록 포함 상태까지 확인해요.

Bitsaga에서는 [거래 검증 페이지](https://bitsaga.be/signet)의 **A transaction, and the block it landed in**에 TXID를 넣고 **Check it**을 누를 수 있어요.<br> 이 결과는 Bitsaga 전용 테스트 체인에서의 포함 여부예요. 비트코인 메인넷 결제 완료를 뜻하지 않아요.

<GuideFigure
  src="/guides/transactions/19-confirmed-panel.png"
  alt="실습 지갑이 In a block과 Sent, mined and confirmed on Bitsaga Signet을 표시한다."
  caption="이 거래는 Bitsaga Signet 블록 104780에 포함된 것까지 확인했어요."
/>

### 직접 확인한 테스트 거래

- 전송 금액: **20,000 sats**
- 총수수료: **282 sats**
- 잔돈: **979,718 sats**
- 확정 블록: **104780** — Bitsaga Signet

```text
e0942d2fbe013d9d6329b334bc0c49a853b9de5de992f2cd68402bfe64c2457f
```

[이 TXID의 거래 증거 보기](https://signet.bitsaga.be/api/tx-proof?txid=e0942d2fbe013d9d6329b334bc0c49a853b9de5de992f2cd68402bfe64c2457f)

자기 전송 후 지갑의 합계 잔액은 **8,994,798 → 8,994,516 sats**로, 수수료만큼 줄었어요.<br> 이 공개 테스트 지갑에는 기존 실습 잔액이 있었어요. 내 실습의 잔액·주소·TXID까지 예시와 같아야 하는 것은 아니에요.

### 확인이 지연될 때

- 먼저 같은 **네트워크와 TXID**를 보고 있는지 확인해요.
- 아직 미확정이면 블록이 만들어지기를 기다려요. 화면을 닫았다고 이미 전송한 거래가 취소되지는 않아요.
- 오류가 났다면 기존 TXID의 상태부터 확인해요. 무조건 새 거래를 만들어 반복 전송하지 않아요.
- 잔돈이 예상과 다르면 수수료와 출력 내역을 다시 확인해요.

## 6. 사용을 마쳐요

입출금 내역을 확인한 뒤 실물 기기에서는 사용한 시드를 **Discard seed**로 메모리에서 비우거나 정상 종료해요.<br> SeedKeeper에 보관한 원본 시드를 지우는 작업과는 달라요.

시뮬레이터는 연습을 마치면 탭을 닫아요. 지갑 연결 정보는 사라질 수 있지만 이미 테스트 체인에 전송한 거래가 취소되지는 않아요.

[← 이전: BTC 보내기](./send-guide)

</GuideContent>
