---
title: SeedKeeper
description: SeedKeeper 카드의 첫 설정과 시드 저장·불러오기 안내
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 5분
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# SeedKeeper

SeedKeeper 카드에 시드를 보관하고, 필요할 때 ShieldSigner로 다시 불러오는 방법을 안내해요.<br> 처음이라면 개념을 살펴본 뒤 **카드 초기화 → 저장 → 불러오기** 순서로 진행해 주세요.

<GuideFigure class="ss-seedkeeper-logo"
  src="/brand/seedkeeper/seedkeeper_logo_black.png"
  alt="SeedKeeper by Satochip 로고"
  caption="SeedKeeper는 JavaCard에서 동작하는 애플릿이에요."
/>

## 안내 순서

왼쪽 메뉴와 같은 구조예요. 필요한 항목을 누르면 해당 안내로 이동해요.

<nav class="ss-seedkeeper-tree" aria-label="SeedKeeper 안내 순서">

- [개념 이해](./concepts)
  - [JavaCard란?](./javacard)
  - [SeedKeeper란?](./what-is-seedkeeper)
- [카드 사용하기](./backup-recovery)
  - [카드 초기화와 PIN](./initialize)
  - [시드를 카드에 저장하기](./save)
  - [카드에서 시드 불러오기](./load)

</nav>

## 어디서 시작하면 될까요?

- **처음 쓰는 카드**라면 [카드 초기화와 PIN](./initialize)부터 시작해요.
- **이미 PIN을 설정한 카드**라면 [시드 저장](./save) 또는 [불러오기](./load)로 바로 이동해도 돼요.

불러온 뒤에는 저장하기 전과 같은 시드 지문인지 확인해 주세요.

<Callout type="info" title="카드와 OS는 서로 다른 역할을 합니다">
SeedKeeper 카드는 시드 보관과 암호 연산을 담당하고, ShieldSigner OS는 오프라인 화면과 입력을 담당합니다.
</Callout>

[다음: 개념 이해 →](./concepts)

</GuideContent>
