---
title: 카드에서 시드 불러오기
description: SeedKeeper 카드의 PIN으로 인증하고 저장한 시드를 ShieldSigner에 불러오는 방법
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# 카드에서 시드 불러오기

SeedKeeper 카드에 저장한 시드를 ShieldSigner로 읽어와요.<br> 불러온 시드는 기기에서 주소를 확인하거나 거래에 서명할 때 사용할 수 있어요.<br> **카드에 저장된 원본은 그대로 남아요.**

**Seeds → From SeedKeeper → 카드 PIN → 저장한 시드 선택 → 지문 확인 → Done**

이 안내는 **ShieldSigner B12의 일반 BIP39 시드**를 기준으로 해요.<br> 화면 예시는 카드에 저장한 시드를 다시 불러오는 일반적인 흐름을 보여줘요.

## 시작하기 전에

- [시드 저장](./save)을 마친 SeedKeeper 카드와 해당 카드의 PIN을 준비해요.<br> PIN만 설정한 빈 카드에는 아직 불러올 시드가 없어요.
- 저장할 때 확인한 시드 지문과 카드에 붙인 이름을 준비해요.
- 실제 시드는 실물 ShieldSigner에서 불러와요.

## 1. 카드를 연결하고 Seeds를 열어요 {#open-seeds}

ShieldSigner를 켜고 시드가 저장된 카드를 리더에 넣어요.<br> 메인 메뉴에서 **Seeds**를 선택해요.

<GuideFigure
  src="/guides/seedkeeper/transfer/09-home-seeds-device.png"
  alt="ShieldSigner 기기 전체. 메인 메뉴의 Seeds가 주황색으로 선택되어 있다."
  caption="시드를 가져올 때는 메인 메뉴의 Seeds에서 시작해요."
/>

기기에 이미 다른 시드가 있다면 **In-Memory Seeds** 목록이 먼저 나와요.<br> 여기서는 **Load a seed**를 눌러 새로 불러오는 화면으로 이동해 주세요.

## 2. From SeedKeeper를 선택해요 {#from-card}

**Load a Seed** 목록에서 **From SeedKeeper**를 열어요.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/10-from-seedkeeper-screen.png"
  alt="Load a Seed 화면에서 From SeedKeeper가 선택되어 있다."
  caption="From SeedKeeper는 카드에서 기기로 시드를 읽어오는 메뉴예요."
/>

앞서 시드를 저장한 **같은 카드**를 연결해 주세요.<br> 다른 빈 카드를 고르면 저장한 시드가 나오지 않아요.

## 3. 카드 PIN을 입력해요 {#card-pin}

**Card PIN**에서 현재 카드의 PIN을 입력하고, 오른쪽 아래 초록색 **확인 버튼**을 눌러요.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/11-load-pin-screen.png"
  alt="카드에서 시드를 불러오기 전에 표시되는 Card PIN 입력 화면."
  caption="카드 PIN으로 인증하면 저장된 시드 목록을 읽을 수 있어요."
/>

설정에 따라 PIN을 다시 묻지 않을 수 있어요.<br> PIN 오류가 나면 남은 횟수를 확인하고, 추측해서 반복 입력하지 마세요.

## 4. 저장한 시드를 선택해요 {#select-secret}

**Select Secret**에 카드에 저장된 항목이 나와요.<br> 앞에서 저장할 때 정한 **Seed Label**을 선택해 주세요.<br> 여러 개라면 방향키로 원하는 항목을 고른 뒤 확인해요.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/12-select-secret-screen.png"
  alt="Select Secret 목록에 앞서 저장한 이름 b2269592가 표시되어 있다."
  caption="이 예시에서는 기본 이름을 그대로 써서 시드 지문이 목록에 보여요."
/>

목록의 이름은 사용자가 붙인 라벨이에요.<br> 이름이 맞더라도 다음 화면에서 실제로 불러온 시드의 지문을 확인해 주세요.

## 5. 지문을 확인하고 Done을 눌러요 {#fingerprint}

**Finalize Seed**에서 저장하기 전과 같은 지문인지 비교해요.<br> 이 예시에서는 저장 전과 불러온 뒤 모두 **b2269592**예요.<br> 내 카드에서는 내 시드의 지문과 비교하면 돼요.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/13-loaded-fingerprint-screen.png"
  alt="카드에서 불러온 시드의 Finalize Seed 화면. 저장 전과 같은 지문 b2269592와 Done 버튼이 표시되어 있다."
  caption="저장 전의 값과 불러온 뒤의 값을 비교한 후 Done을 눌러요."
/>

패스프레이즈를 사용하는 지갑은 적용된 상태도 확인해 주세요.<br> B12에서 패스프레이즈와 함께 저장했다면 불러올 때도 함께 읽어와요.<br> 별도로 패스프레이즈를 적용해야 하는 백업이라면, 적용을 마친 뒤 해당 지갑의 지문과 비교해요.

지문이 맞으면 **Done**을 눌러요.<br> 아래처럼 지문이 표시된 시드 메뉴가 열리면 불러오기를 마친 상태예요.

<GuideFigure
  src="/guides/seedkeeper/transfer/14-seed-loaded-device.png"
  alt="카드에서 시드를 불러온 뒤 ShieldSigner의 시드 메뉴가 열린 모습. 상단에 b2269592 지문이 표시되어 있다."
  caption="불러온 시드를 기기에서 사용할 준비가 끝났어요. 카드에 저장된 시드는 지워지지 않아요."
/>

처음 백업을 확인하는 경우에는 **Address explorer**에서 기존 지갑과 같은 네트워크·스크립트 종류·계정·주소 순서를 선택하고 첫 수신 주소도 대조해요.<br> 지문이나 주소가 다르면 거래를 진행하지 말고 시드 선택과 지갑 설정을 다시 확인해 주세요.

## 6. 사용 후 기기 메모리를 비워요 {#discard}

주소 확인이나 서명 등 필요한 작업을 마쳤다면, 시드 메뉴 아래의 **Discard seed**를 선택해요.<br> 기기에 임시로 불러온 시드를 비우는 기능이에요.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/07-discard-seed-screen.png"
  alt="시드 메뉴 아래쪽의 Discard seed가 선택된 화면."
  caption="사용을 마친 시드를 기기 메모리에서 비울 때 Discard seed를 선택해요."
/>

**Discard Seed?** 화면에서 지문을 다시 확인해요.<br> 백업이 준비되어 있고 작업을 끝냈다면 **Discard**를 선택해요.<br> 계속 사용하려면 **Keep seed**로 돌아갈 수 있어요.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/08-discard-confirm-screen.png"
  alt="Discard Seed? 확인 화면. Wipe seed b2269592 from the device? 안내와 Keep seed, Discard 버튼이 있다."
  caption="from the device는 기기 메모리에서 비운다는 뜻이에요. 카드의 저장 항목을 삭제하지 않아요."
/>

<Callout type="warning" title="카드를 빼는 것만으로 기기의 시드가 지워지지는 않아요">

불러온 시드는 기기 메모리에 있어요.<br> 사용 후에는 **Discard seed**로 비우거나 실물 기기의 전원을 꺼 주세요.<br> 카드의 **Factory Reset Card**는 다른 기능이며, 이 과정에서는 사용하지 않아요.

</Callout>

## 불러오기가 안 되면

| 이런 상황이라면 | 이렇게 해 주세요 |
| --- | --- |
| No Secrets to Load가 나와요 | 연결한 카드에 이 메뉴로 불러올 수 있는 시드가 없어요. 카드를 바꿔 끼우지 않았는지, 저장 완료까지 진행했는지 확인해요. |
| Card Uninitialised가 나와요 | 아직 PIN 설정을 마치지 않은 카드예요. 시드를 저장한 카드가 맞는지 먼저 확인해 주세요. |
| 목록에 원하는 이름이 없어요 | 카드 선택과 저장할 때 붙인 라벨을 확인해요. 다른 앱으로 저장한 항목은 형식·내보내기 권한에 따라 이 목록에서 불러오지 못할 수 있어요. |
| 지문이 달라요 | 선택한 시드와 패스프레이즈를 확인해요. 저장할 때의 지문을 시드 이름이나 카드 UID와 혼동하지 마세요. |
| PIN을 잊었어요 | 반복 입력을 멈추고 보관한 기록이나 별도 백업을 확인해요. 카드 초기화로 기존 데이터를 복구할 수는 없어요. |

## 다음 단계

[← 시드를 카드에 저장하기](./save) · 워치온리 지갑 연결하기 →
<!-- Temporarily hidden link: [워치온리 지갑 연결하기 →](../wallet/) -->

절차 기준: [ShieldSigner B12 시드 저장·불러오기 소스](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/views/seed_views.py)

</GuideContent>
