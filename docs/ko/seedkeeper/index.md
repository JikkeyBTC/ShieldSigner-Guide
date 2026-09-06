---
title: SeedKeeper
description: SeedKeeper 카드의 첫 설정과 시드 저장·불러오기 안내
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 5분
---

# SeedKeeper

SeedKeeper 카테고리는 JavaCard 플랫폼, SeedKeeper 애플릿, ShieldSigner의 역할을 구분하고 카드 초기화, 시드 저장, 불러오기 순서로 이어져요.

## 이 카테고리에서 다루는 내용

<div class="ss-summary-card">

### Concepts

카드 안에서 애플릿이 실행되는 방식과 SeedKeeper의 보안 경계를 이해합니다.

[Concepts 본문](./concepts)

</div>

<div class="ss-summary-card">

### 카드 사용하기

카드에 PIN을 정하고, 시드를 저장한 다음 다시 불러와 확인해요.

[카드 사용 방법](./backup-recovery)

</div>

<Callout type="info" title="카드와 OS는 서로 다른 역할을 합니다">
SeedKeeper 카드는 시드 보관과 암호 연산을 담당하고, ShieldSigner OS는 오프라인 화면과 입력을 담당합니다.
</Callout>

<GuideNav prev="/os/verification" next="/seedkeeper/concepts" prevLabel="이전: Verification" nextLabel="다음: Concepts" />
