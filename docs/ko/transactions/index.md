---
title: 트랜잭션
description: ShieldSigner로 받는 주소를 확인하고, 거래를 검토·서명한 뒤 전송과 확정을 확인하는 방법
---

<script setup>
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# 트랜잭션

비트코인을 **받을 때는 내 주소인지 확인**하고, **보낼 때는 거래 내용을 확인한 뒤 서명**해요.<br> ShieldSigner와 온라인 지갑은 서로 다른 일을 맡아요.

| 구분 | 온라인 지갑 | ShieldSigner |
| --- | --- | --- |
| 받기 | 받는 주소를 표시하고 입금을 조회해요. | 그 주소가 내 시드에서 나온 주소인지 확인해요. |
| 보내기 | 수신자·금액·수수료로 거래 초안인 PSBT를 만들어요. | PSBT의 목적지·금액·수수료·잔돈을 확인하고 서명해요. |
| 전송 후 | 서명된 거래를 네트워크에 전송하고 확정을 조회해요. | 네트워크에 접속하거나 잔액을 조회하지 않아요. |

**받는 주소 확인 → 입금 → PSBT 생성 → 기기에서 검토·서명 → 온라인 지갑으로 반환 → 전송 → 확정 확인**

비트코인이 기기나 카드 안으로 들어오는 것은 아니에요.<br> 거래와 잔액은 네트워크에 기록되고, ShieldSigner는 사용할 시드로 주소를 확인하거나 거래에 서명해요.

## 순서대로 따라 해요

1. [BTC 받기](./receive-guide): 지갑 연결, 주소 확인, 테스트 입금을 진행해요.
2. [BTC 보내기](./send-guide): 받는 주소와 금액을 입력하고 거래 초안을 만들어요.
3. [PSBT 검토·서명](./sign-psbt): 기기에서 모든 값을 확인한 뒤 서명하고 전송·확정을 확인해요.

실물 기기는 **Raspberry Pi Zero v1.3 기반 ShieldSigner**를 기준으로 안내해요.<br> SeedKeeper를 사용한다면 먼저 [카드에서 시드 불러오기](../seedkeeper/load)를 마쳐 주세요.

## 실제 BTC 없이 먼저 연습해요 {#practice}

이 안내의 실습은 **ShieldSigner 시뮬레이터 + 내장 Simulator wallet + Bitsaga Signet**을 사용해요.<br> 화면은 ShieldSigner B12 기반 로컬 시뮬레이터에서 촬영했어요. 공개 시뮬레이터의 버전에 따라 메뉴 문구나 배치가 조금 다를 수 있어요.

- [실습 시뮬레이터 열기](https://bitsaga.be/seedsigner-simulator/wallet.html?firmware=smartcard&wallet=1)
- [Bitsaga Signet 안내와 faucet](https://bitsaga.be/signet)

Bitsaga Signet은 **일반 Testnet이나 공개 Signet과 다른 전용 테스트 네트워크**예요.<br> 이 네트워크의 코인은 금전적 가치가 없어요. 실습에서는 기기의 **Testnet** 설정과 `tb1…` 주소를 사용하지만, 이것만으로 일반 Testnet과 같은 네트워크가 되는 것은 아니에요.

외부 지갑은 이 전용 체인에 동기화할 수 없으므로 **내장 Simulator wallet**에서 입출금을 확인해요.<br> BlueWallet·Coconut·Sparrow에 이 주소만 등록해서 같은 입금이 보일 것이라고 기대하면 안 돼요. 네트워크가 초기화되면 실습 기록도 사라질 수 있어요.

<Callout type="danger" title="실제 지갑의 시드는 넣지 마세요">
시뮬레이터는 브라우저에서 동작하는 연습 도구예요. 실제 BTC가 있거나 앞으로 사용할 시드·패스프레이즈·개인키를 입력하지 마세요.<br> 아래 페이지의 공개 테스트 시드 또는 테스트 전용 시드만 사용해요. 실제 자금은 실물 기기와 본인이 확인한 온라인 지갑으로 다뤄요.
</Callout>

## 서명과 전송은 달라요

**서명**은 이 거래를 승인했다는 증거를 만드는 단계예요. **브로드캐스트**는 서명된 거래를 네트워크에 전달하는 단계예요.<br> 서명된 거래가 생겼다고 곧바로 블록에 포함되는 것은 아니고, 전송됐다고 바로 확정되는 것도 아니에요.

실습 지갑은 기기의 서명 QR을 읽으면 **자동으로 전송을 진행**해요.<br> 따라서 실습에서는 기기의 최종 서명 버튼을 누르기 전에 검토를 끝내야 해요. 서명된 거래를 다른 사람에게 전달하면 그 사람이 전송할 수도 있어요.

[다음: BTC 받기 →](./receive-guide)

</GuideContent>
