---
title: 시드를 카드에 저장하기
description: ShieldSigner의 Backup seed 메뉴에서 SeedKeeper 카드에 시드를 저장하고 완료를 확인하는 방법
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# 시드를 카드에 저장하기

ShieldSigner에 불러온 시드를 SeedKeeper 카드에 저장해요.<br> 카드를 연결하고 PIN을 입력한 뒤, 알아보기 쉬운 이름으로 보관할 수 있어요.

**시드 선택 → Backup seed → To SeedKeeper → 카드 PIN → 저장할 이름 → 완료**

이 안내는 **ShieldSigner B12의 일반 BIP39 시드**를 기준으로 해요.<br> 아래 이미지는 시뮬레이터에서 연습용 시드로 직접 캡처했어요.<br> 캡처에 나온 지문 `b2269592`는 설명용 예시예요.

## 시작하기 전에

- [카드 초기화와 PIN](./initialize)을 마친 SeedKeeper 카드와 그 카드의 PIN을 준비해요.
- ShieldSigner에 저장하려는 시드를 불러와 주세요.<br> 아직 없다면 아래 1단계에서 시작해요.
- 처음 저장할 때는 기존 종이·금속 백업을 보관해 두세요.<br> 카드에서 다시 불러오는 것까지 확인한 뒤에 백업 구성을 정해요.

<Callout type="warning" title="연습용 시드는 실제 자금에 사용하지 마세요">

시뮬레이터에서는 공개된 연습용 값만 사용해 주세요.<br> 실제 시드와 PIN은 실물 ShieldSigner에서 입력하고, 사진·채팅·웹페이지에 남기지 마세요.

</Callout>

## 1. 저장할 시드를 준비해요 {#choose-seed}

메인 메뉴에서 **Seeds**를 열어요.<br> 이미 시드를 불러왔다면 **In-Memory Seeds** 목록에서 저장할 시드의 지문을 선택해요.

시드가 없다면 **Load a Seed** 화면에서 종이·금속에 보관한 단어 수에 맞춰 **Enter 12-word seed** 또는 **Enter 24-word seed**로 입력해요.<br> 기존 SeedQR이 있다면 **Scan a SeedQR**로 읽을 수도 있어요.<br> 시드가 있는 상태에서 다른 시드를 추가하려면 목록의 **Load a seed**를 선택해요.

입력 후 **Finalize Seed**에서 지문을 확인하고 **Done**을 눌러요.<br> 패스프레이즈를 사용하는 지갑은 해당 패스프레이즈까지 적용한 상태인지 먼저 확인해 주세요.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/01-seed-ready-screen.png"
  alt="Finalize Seed 화면에서 연습용 시드의 지문 b2269592와 Done 버튼이 표시되어 있다."
  caption="지문은 시드를 구분하는 짧은 식별값이에요. 내 시드의 값을 확인한 뒤 Done을 눌러요."
/>

## 2. Backup seed를 열어요 {#backup-menu}

선택한 시드의 메뉴에서 아래로 이동해 **Backup seed**를 열어요.<br> 화면 위의 지문이 저장하려는 시드와 같은지 확인해 주세요.

<GuideFigure
  src="/guides/seedkeeper/transfer/02-backup-seed-device.png"
  alt="주황색 배경 없이 캡처한 ShieldSigner 기기. 시드 b2269592의 메뉴에서 Backup seed가 선택되어 있다."
  caption="기기 왼쪽 방향키로 Backup seed를 고르고 가운데 확인 버튼을 눌러요."
/>

## 3. 카드를 연결하고 To SeedKeeper를 선택해요 {#to-card}

저장할 SeedKeeper 카드를 리더에 넣고 **To SeedKeeper**를 선택해요.<br> 이 항목이 카드에 저장하는 기능이에요.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/03-to-seedkeeper-screen.png"
  alt="Backup Seed 화면에서 To SeedKeeper가 선택되어 있다."
  caption="View seed words 아래의 To SeedKeeper를 선택해요."
/>

시뮬레이터에서는 기기 아래의 **카드 A·B·C 중 초기화를 마친 카드**를 눌러 연결해요.<br> 카드마다 내용이 다르니 저장할 대상을 먼저 확인해 주세요.

## 4. 카드 PIN을 입력해요 {#card-pin}

**Card PIN**에서 카드 초기화 때 정한 PIN을 입력하고, 오른쪽 아래 초록색 **확인 버튼**을 눌러요.<br> PC 시뮬레이터에서는 방향키와 Enter로 입력하고, 숫자 키 `3`으로 확인할 수 있어요.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/04-card-pin-screen.png"
  alt="Card PIN의 빈 입력창과 키보드, 오른쪽 아래 초록색 확인 표시."
  caption="새 PIN을 만드는 단계가 아니에요. 현재 카드의 PIN을 입력해 주세요."
/>

설정에 따라 PIN 입력을 건너뛸 수 있어요.<br> 반대로 **Card Uninitialised**가 나오면 새 카드의 첫 설정이 필요해요.<br> [초기화 안내](./initialize#new-card)를 확인해 주세요.

## 5. 저장할 이름을 정해요 {#seed-label}

**Seed Label**은 카드 목록에 표시할 이름이에요.<br> 기본으로 입력된 시드 지문을 그대로 사용해도 돼요.<br> 원하는 이름으로 바꿀 수도 있지만, 이름에 시드 단어나 PIN을 적지는 마세요.

<GuideFigure screen
  src="/guides/seedkeeper/transfer/05-seed-label-screen.png"
  alt="Seed Label 입력창에 기본 이름인 b2269592가 입력되어 있다."
  caption="이 예시에서는 기본 이름을 유지해요. 오른쪽 아래 초록색 확인 버튼을 누르면 저장을 시작해요."
/>

저장하는 동안 카드를 빼거나 기기 전원을 끄지 말고 기다려 주세요.

## 6. Secret Saved를 확인해요 {#saved}

**Secret Saved**와 **Secret Successfully Saved to Seedkeeper**가 나오면 카드에 저장했어요.<br> **OK**를 눌러 시드 메뉴로 돌아가요.

<GuideFigure
  src="/guides/seedkeeper/transfer/06-secret-saved-device.png"
  alt="ShieldSigner 기기에 Secret Saved와 Secret Successfully Saved to Seedkeeper 성공 안내가 표시되어 있다."
  caption="저장 완료 화면이에요. 시뮬레이터의 카드 A도 ‘시드 저장됨’으로 바뀌어요."
/>

다음 [카드에서 시드 불러오기](./load)로 같은 시드를 다시 읽을 수 있는지 확인해요.<br> 저장 전의 지문과 불러온 지문을 비교해 주세요.

<Callout type="info" title="패스프레이즈를 사용하고 있다면">

B12의 이 BIP39 저장 경로는 시드에 적용된 패스프레이즈도 함께 저장해요.<br> 패스프레이즈를 카드와 따로 보관하는 방식을 원한다면, 현재 시드에 무엇이 적용되어 있는지 먼저 확인해 주세요.

</Callout>

## 저장이 안 되면

| 이런 상황이라면 | 이렇게 해 주세요 |
| --- | --- |
| To SeedKeeper가 안 보여요 | ShieldSigner 펌웨어인지, 스마트카드 기능이 켜져 있는지 확인해요. 일반 SeedSigner와 메뉴가 달라요. |
| Incorrect PIN이 나와요 | 카드와 PIN 기록을 확인해요. 남은 횟수가 있으니 추측해서 반복 입력하지 마세요. |
| Not Enough Space가 나와요 | 카드의 저장 공간이 부족해요. 다른 준비된 카드를 사용하거나, 별도 백업을 확인한 뒤 카드 내용을 정리해 주세요. |
| 저장 중 오류가 났어요 | 연결을 확인하고 먼저 불러오기 목록에 저장 결과가 있는지 살펴봐요. 같은 항목을 여러 번 저장하지 않도록 확인 후 다시 진행해요. |

## 다음 단계

[← 카드 초기화와 PIN](./initialize) · [다음: 카드에서 시드 불러오기 →](./load)

절차 기준: [ShieldSigner B12 시드 저장·불러오기 소스](https://github.com/3rdIteration/seedsigner/blob/6faaffcb06a2ba578a96fdef689d97e21793ec23/src/seedsigner/views/seed_views.py)

</GuideContent>
