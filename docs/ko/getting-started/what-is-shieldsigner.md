---
title: ShieldSigner란 무엇인가요?
description: SeedSigner 기반의 ShieldSigner와 이 기기에서 지원하는 SeedKeeper 기능을 알아봐요.
---

<script setup>
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# ShieldSigner란 무엇인가요?

**ShieldSigner는 SeedSigner를 기반으로 스마트카드와 백업 기능을 확장한 포크 버전이에요.**<br>
포크란 기존 오픈소스 프로젝트의 코드를 바탕으로, 필요한 기능을 더해 발전시킨 프로젝트를 뜻해요.

SeedSigner의 오프라인 비트코인 서명 흐름을 이어받으면서, **PIN으로 보호되는 카드에 시드와 패스프레이즈를 보관하고 필요할 때 불러오는 방법**을 더했어요.<br>
이 가이드는 **Raspberry Pi Zero v1.3**으로 구성한 ShieldSigner를 기준으로 설명해요.

## SeedSigner에서 이어받은 기본 역할

ShieldSigner는 비트코인을 보관하는 상자가 아니라, 거래 내용을 확인하고 **서명하는 장치**예요.<br>
인터넷에 연결된 지갑이 거래 초안인 PSBT를 만들면, ShieldSigner에서 받는 주소·금액·수수료를 확인하고 서명해요. 서명한 결과를 온라인 지갑으로 돌려보내면 그 지갑이 네트워크에 전송해요.

일반적인 시드 기반 사용에서는 시드를 장치의 작업 메모리에 불러와 사용해요.<br>
전원을 끈 뒤 다시 쓰려면 시드를 다시 불러와야 하므로, **장치와 별개로 복구 가능한 백업**을 준비해야 해요. SeedKeeper는 이때 시드를 보관하고 불러오는 선택지예요.

## SeedKeeper로 무엇을 할 수 있나요?

SeedKeeper는 JavaCard에서 동작하는 **비밀정보 보관용 애플릿**이에요.<br>
카드에 저장해 둔 정보를 PIN 인증 후 ShieldSigner로 불러올 수 있어요.

- **시드와 패스프레이즈:** 시드만, 시드와 패스프레이즈를 함께, 또는 패스프레이즈만 따로 불러올 수 있어요.
- **지갑 구성 정보:** 싱글시그·멀티시그 지갑을 다시 구성하는 데 필요한 디스크립터를 저장하고 불러올 수 있어요. 디스크립터에는 주소 생성 방식과 공개키 같은 정보가 담겨요.
- **기타 비밀정보:** 지원하는 텍스트 형태의 비밀정보를 저장하고, 필요하면 텍스트나 QR로 확인할 수 있어요.

카드가 비트코인 잔액을 담고 있는 것은 아니에요.<br>
시드·패스프레이즈와 지갑 구성 정보를 보관해, 같은 지갑을 다시 사용할 수 있도록 돕는 역할이에요.

## 이 기기에서는 SeedKeeper만 지원해요

**이 가이드에서 안내하는 ShieldSigner 기기의 스마트카드 기능은 SeedKeeper만 지원해요.**<br>
SeedKeeper에 시드·패스프레이즈·지갑 구성 정보를 저장하고, PIN 인증 후 필요한 정보를 기기로 불러와 사용해요.

비트코인 거래 서명은 SeedKeeper 카드 안에서 이루어지는 것이 아니라, **불러온 시드를 이용해 ShieldSigner 기기에서 진행해요.**

[카드 초기화와 PIN](../seedkeeper/initialize) → [시드 저장](../seedkeeper/save) → [불러오기](../seedkeeper/load) 순서로 사용 방법을 확인해요.

</GuideContent>
