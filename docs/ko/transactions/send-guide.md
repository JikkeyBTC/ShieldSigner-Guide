---
title: BTC 보내기
description: 온라인 지갑에서 거래 초안을 만들고 ShieldSigner로 전달하는 방법
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# BTC 보내기

보낼 거래는 **온라인 지갑에서 만들고, ShieldSigner에서 검토·서명**해요.<br> 이 페이지에서는 거래 초안인 PSBT를 만드는 부분까지 진행하고, [다음 페이지](./sign-psbt)에서 기기 검토부터 전송·확정까지 이어가요.

## 시작하기 전에

- [BTC 받기](./receive-guide)를 따라 내 지갑의 주소와 입금을 먼저 확인해요.
- 실물 기기에서는 해당 지갑의 시드와 필요한 패스프레이즈를 불러와요.
- 받는 사람의 **주소 전체**, **금액**, **네트워크**를 별도로 확인해요.
- 실습에서는 **내장 Simulator wallet과 Bitsaga Signet 테스트 코인만** 사용해요.

## 1. Send를 열어요 {#open-send}

온라인 지갑에서 **Send / 보내기**를 열어요.<br> 워치온리 지갑은 거래를 만들 수 있지만 개인키가 없어서 혼자 서명할 수는 없어요. 서명은 ShieldSigner가 맡아요.

실습 지갑에서는 입금된 잔액을 확인한 뒤 **Send**를 눌러요.<br> 공개 테스트 시드를 쓰면 다른 사람의 예전 테스트 거래도 보일 수 있어요. 잔액 전체가 내 faucet 요청 한 번으로 생긴 금액은 아닐 수 있어요.

## 2. 받는 주소와 금액을 입력해요 {#recipient}

**To**에는 받는 주소, **Amount**에는 보낼 금액을 입력해요.<br> 실습 지갑의 금액 단위는 **sats**예요. `1 BTC = 100,000,000 sats`이고, 예시에서는 **20,000 sats = 0.0002 BTC**를 보내요.

실습에서는 **Use one of my addresses**를 눌러 같은 테스트 지갑의 주소를 받는 주소로 사용할 수 있어요.<br> 내 주소로 다시 보내는 **자기 전송**이므로, 확정 후 전체 잔액에서는 주로 수수료만 줄어들어요. 실제 결제의 받는 주소를 대신하는 기능은 아니에요.

<Callout type="warning" title="네트워크와 금액 단위를 확인해요">
이 실습의 주소는 Bitsaga Signet용이에요. <code>tb1…</code>로 시작하더라도 일반 Testnet faucet이나 다른 체인으로 보내면 같은 실습 지갑에서 확인할 수 없어요.<br> 실제 BTC를 보낼 때는 받는 사람과 확인한 비트코인 메인넷 주소를 사용하고, BTC와 sats를 혼동하지 마세요.
</Callout>

<GuideFigure
  src="/guides/transactions/09-send-form-panel.png"
  alt="Simulator wallet에 20000 sats와 자기 전송용 테스트 주소가 입력된 화면."
  caption="실습 예시: 20,000 sats를 같은 테스트 지갑의 주소로 보내요."
/>

## 3. 수수료와 잔돈을 이해해요 {#fee}

거래는 지갑이 가진 사용 가능한 입금 기록인 **UTXO**를 입력으로 사용해요.<br> 입력 금액에서 보낼 금액과 수수료를 빼고 남은 값은 보통 내 지갑의 **잔돈(change) 주소**로 돌아와요.

**입력 합계 = 받는 사람에게 보내는 금액 + 내 잔돈 + 네트워크 수수료**

예를 들어 100,000 sats를 입력으로 쓰고 20,000 sats를 보낸다면, 잔돈은 **80,000 sats에서 수수료를 뺀 값**이에요.<br> 이 숫자는 이해를 돕는 예시예요. 실제로 선택된 입력과 수수료는 지갑·거래 크기·네트워크 상황에 따라 달라져요.

**sat/vB**는 거래 크기당 수수료율이고, **sats**로 표시된 수수료는 실제로 지불할 총액이에요.<br> 실습 지갑의 고정 수수료율을 실제 메인넷의 권장값으로 사용하지 마세요. 실물 환경에서는 온라인 지갑에서 현재 수수료와 총액을 확인해요.

이 실습 지갑은 **2 sat/vB**를 기준으로 수수료를 계산하지만, 온라인 입력 화면에 총수수료를 따로 표시하지 않아요.<br> 따라서 실습에서는 다음 기기 검토 단계의 **Transaction Math**에서 총액을 확인해요. 이 예시의 총수수료는 **282 sats**예요.

## 4. PSBT를 만들어요 {#create-psbt}

실습 지갑에서 **Create transaction**을 눌러요.<br> 그러면 **Show it to your signer** 단계로 넘어가고, 기기가 읽을 **거래 QR**이 표시돼요. 이때는 아직 서명하거나 전송하지 않은 상태예요.

PSBT는 **Partially Signed Bitcoin Transaction**의 약자예요.<br> 서명 전 거래를 전달할 때도, 일부 또는 필요한 서명을 담아 반환할 때도 쓰는 형식이에요. PSBT 안에 시드나 개인키를 넣어 보내는 것은 아니에요.

<GuideFigure
  src="/guides/transactions/10-psbt-qr-panel.png"
  alt="거래를 만든 뒤 두 프레임의 PSBT QR을 표시하는 실습 지갑."
  caption="Show it to your signer 단계에서 ShieldSigner의 Scan을 열어요."
/>

## 5. ShieldSigner에서 거래 QR을 읽어요 {#scan}

ShieldSigner의 홈으로 돌아가 **Scan**을 선택해요.<br> 실습에서는 내장 지갑이 거래 QR을 가상 카메라로 전달해요. 실물 기기에서는 온라인 지갑에 표시된 PSBT QR을 카메라로 읽어요.

움직이는 QR이면 여러 프레임을 모두 읽을 때까지 같은 화면을 유지해요.<br> QR이 인식되지 않는다고 시드 QR이나 비밀키를 온라인 지갑에 보내면 안 돼요.

거래를 읽으면 **서명에 사용할 시드 선택 또는 거래 개요**로 넘어가요.<br> 여기서 바로 승인하지 말고, 다음 페이지의 항목을 하나씩 확인해 주세요.

[이전: BTC 받기](./receive-guide) · [다음: PSBT 검토·서명 →](./sign-psbt)

</GuideContent>
