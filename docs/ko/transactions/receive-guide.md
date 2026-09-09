---
title: BTC 받기
description: 수신 주소를 ShieldSigner에서 확인하고 Bitsaga Signet 실습 지갑으로 입금을 확인하는 방법
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# BTC 받기

BTC를 받을 때는 **내 지갑의 주소가 맞는지 먼저 확인**해요.<br> 받기 자체에는 거래 서명이 필요하지 않아요. 주소를 확인한 뒤 보내는 사람에게 전달하고, 온라인 지갑에서 입금과 확정을 확인하면 돼요.

## 실물 기기에서 받는 순서

1. ShieldSigner에 사용할 시드를 불러와요. 패스프레이즈를 쓰는 지갑이면 같은 패스프레이즈도 적용해요.
2. 같은 시드의 공개키로 만든 워치온리 지갑에서 **Receive / 받기**를 열어요.
3. ShieldSigner의 **Scan**으로 받는 주소 QR을 읽고 해당 시드를 선택해 주소를 검증해요. 또는 **Address explorer**에서 같은 네트워크·계정·스크립트 종류·수신 주소 순서를 선택해 대조해요.
4. 기기에서 확인한 **주소 전체**가 온라인 지갑의 주소와 일치하는지 확인해요.
5. 확인한 주소만 보내는 사람에게 전달하고, 온라인 지갑에서 거래 내역과 확정 수를 확인해요.

<Callout type="warning" title="주소가 다르면 입금을 중단해요">
네트워크, 시드·패스프레이즈, 계정 번호, 주소 유형과 주소 순서를 다시 확인해요.<br> 주소 앞뒤 몇 글자만 같다고 승인하지 마세요. 이미 확인한 주소를 붙여 넣을 때도 전체 주소가 바뀌지 않았는지 확인해요.
</Callout>

## 시뮬레이터로 연습하기 {#practice}

먼저 [실습 환경과 주의사항](./#practice)을 읽어 주세요.<br> 아래에서는 **싱글시그 · Native Segwit · Testnet · 계정 0**을 사용해요. 이 지갑의 계정 경로는 `m/84h/1h/0h`예요.

### 1. 테스트 전용 시드를 불러와요

[시뮬레이터](https://bitsaga.be/seedsigner-simulator/wallet.html?firmware=smartcard&wallet=1)를 열고 펌웨어가 **ShieldSigner**, 네트워크가 **Testnet**인지 확인해요.<br> 방향키와 Enter 또는 화면의 기기 버튼으로 조작할 수 있어요.

시드가 없다면 **Seeds → Enter 12-word seed**에서 아래 공개 테스트 시드를 입력할 수 있어요.<br> 마지막 확인 화면의 지문은 **b2269592**예요. 별도 패스프레이즈는 사용하지 않아요.

```text
army van defense carry jealous true garbage claim echo media make crunch
```

<Callout type="danger" title="누구나 알고 있는 테스트 시드예요">
위 시드는 공개 BIP39 테스트 벡터예요. 누구나 같은 지갑에 접근할 수 있으므로 실제 BTC를 절대로 보내지 마세요.<br> 화면의 예시 주소를 복사하지 말고, 실습 중 내장 지갑에 표시된 주소를 사용해요.
</Callout>

<GuideFigure screen
  src="/guides/transactions/02-seed-screen.png"
  alt="공개 테스트 시드의 지문 b2269592가 표시된 Finalize Seed 화면."
  caption="테스트 지문을 확인하고 Done으로 시드 메뉴를 열어요."
/>

### 2. 공개키로 내장 지갑을 연결해요

**Simulator wallet**을 여는 버튼을 누른 뒤, 기기의 시드 메뉴에서 아래 순서로 진행해요.

**Export Xpub → Single Sig → Native Segwit → Static**

공개키 정보와 경로를 확인하고 QR을 표시한 채 기다리면 내장 지갑이 읽어 연결해요.<br> **시드 QR이 아니라 xpub QR**을 내보내는 단계예요. xpub만으로 서명할 수는 없지만 지갑의 주소와 거래를 추적할 수 있으므로 공개적으로 공유하지 않아요.

<GuideFigure screen
  src="/guides/transactions/03-wallet-connected-screen.png"
  alt="ShieldSigner가 표시한 테스트 계정의 xpub QR."
  caption="내장 지갑은 기기의 공개키 QR을 읽어 연결해요."
/>

### 3. 첫 주소로 지갑 연결을 확인해요

공개키 내보내기 뒤 기기에서 **Verify Address**를 안내하면, 내장 지갑의 **Show it to the device**를 누르고 기기에서 **Scan**을 선택해요.<br> 내장 지갑이 주소 QR을 가상 카메라로 전달하고, 기기는 시드에서 주소를 계산해 일치 여부를 확인해요.

**주소 확인 성공 화면**을 확인한 뒤 홈으로 돌아와요.<br> 실물 기기에서는 온라인 지갑의 주소 QR을 실제 카메라로 읽는 부분이에요.

이 화면은 **수신 주소 0번으로 지갑 연결을 확인**한 결과예요.<br> faucet은 다음 미사용 주소로 입금하므로, 이미 사용한 지갑에서는 실제 입금 주소가 0번과 다를 수 있어요. 0번을 확인했다고 이후 모든 입금 주소를 직접 대조한 것은 아니에요.

**실제 입금 주소도 확인하려면** 내장 지갑의 **Receive**를 열고 주소 전체와 `address 19` 같은 순서를 확인해요.<br> 기기의 시드 메뉴에서 **Address explorer**를 열고 같은 Testnet·Single Sig·Native Segwit·계정 0의 **수신 주소** 중 그 순서를 찾아 전체 주소를 비교해요. 잔돈 주소 목록과 혼동하지 마세요.<br> 새 지갑에서 Receive 버튼이 아직 없다면, 지갑에 표시된 첫 주소가 방금 검증한 0번 주소와 같은지 확인해요.

확인한 주소를 고정해서 사용하려면 그 문자열을 아래의 **별도 faucet 페이지**에 붙여 넣고 전송 전에 다시 대조해요. 내장 **Get test bitcoin**은 요청 시점의 미사용 주소를 선택하는 간편 실습 기능이에요.

이 실습의 **Address explorer → Native Segwit → Receive addresses** 목록은 10개씩 보여요. 더 뒤의 주소는 **Next 10**으로 이동해요.<br> 아래에서는 실습 지갑이 표시한 19번 수신 주소를 기기에서도 찾아 QR을 대조했고, 같은 주소임을 확인했어요.

<GuideFigure screen
  src="/guides/transactions/27-explorer-index19-screen.png"
  alt="기기의 Receive Addrs 목록에서 19번 수신 주소가 선택되어 있다."
  caption="현재 받을 주소의 순서와 기기의 수신 주소 순서를 맞춰 확인해요."
/>

<GuideFigure screen
  src="/guides/transactions/05-address-verified-screen.png"
  alt="Address Verified 성공 화면과 수신 주소 순서 0, Testnet 파생 경로."
  caption="초록색 성공 표시와 주소 순서를 확인해요. 이 화면은 실제 테스트 시드로 검증한 결과예요."
/>

### 4. faucet에서 테스트 코인을 받아요

내장 지갑에서 **Get test bitcoin**을 눌러요.<br> faucet은 테스트용 코인을 보내주는 곳이에요. 요청 후에는 버튼을 반복해서 누르지 말고 입금 상태가 갱신될 때까지 기다려요.

처음에는 **블록에 들어가기를 기다리는 상태**가 표시되고, 이후 잔액과 거래 내역에 입금이 반영돼요.<br> faucet 지급량은 서비스 상태에 따라 달라질 수 있으니 화면에 나온 값을 확인해요.

별도 faucet 페이지를 쓴다면 내장 지갑의 **Receive**에 표시된 주소를 복사해 [Bitsaga faucet](https://bitsaga.be/signet)에 넣어요.<br> 일일 한도나 대기 제한이 나오면 안내대로 기다려요. 일반 Testnet faucet으로 대체하면 이 지갑에서 같은 입금이 보이지 않아요.

<GuideFigure
  src="/guides/transactions/08-receive-panel.png"
  alt="내장 Simulator wallet의 Receive 화면과 테스트 주소 QR."
  caption="별도 faucet을 쓸 때는 이 받기 화면의 주소를 사용해요. 예시 이미지를 복사해 사용하지 마세요."
/>

### 5. 입금과 확정을 구분해요

**Pending / 미확정**은 거래를 알게 됐지만 아직 블록에 포함되지 않은 상태예요.<br> **Confirmed / 확정**은 블록에 포함된 상태예요. 거래 식별자인 **TXID**로 어떤 입금인지 구분할 수 있어요.

입금이 보이지 않으면 주소 전체와 네트워크부터 다시 확인하고, 실습 지갑을 새로 조회해요.<br> 실물 ShieldSigner에는 네트워크 잔액이 표시되지 않으므로, 기기에서 잔액을 찾으려고 할 필요는 없어요.

<GuideFigure
  src="/guides/transactions/07-deposit-row.png"
  alt="1,000,000 sats 입금이 블록 104773에서 확정된 거래 내역."
  caption="실제 실습에서는 faucet 입금 1,000,000 sats의 블록 포함을 확인했어요."
/>

[이전: 트랜잭션](./) · [다음: BTC 보내기 →](./send-guide)

</GuideContent>
