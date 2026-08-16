---
title: SeedKeeper
description: JavaCard 기반 시드 백업과 복구를 시작하는 카테고리
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 5분
---

# SeedKeeper

SeedKeeper 카테고리는 JavaCard 플랫폼, SeedKeeper 애플릿, ShieldSigner의 역할을 구분하고 카드 백업·복구 흐름으로 이어집니다.

## 이 카테고리에서 다루는 내용

<div class="ss-summary-card">

### Concepts

카드 안에서 애플릿이 실행되는 방식과 SeedKeeper의 보안 경계를 이해합니다.

[Concepts 본문](./concepts)

</div>

<div class="ss-summary-card">

### Backup & recovery

카드 초기화, 암호화 백업, 복제, 복원 테스트, 분실 대응을 순서대로 진행합니다.

[Backup & recovery 본문](./backup-recovery)

</div>

<Callout type="info" title="카드와 OS는 서로 다른 역할을 합니다">
SeedKeeper 카드는 시드 보관과 암호 연산을 담당하고, ShieldSigner OS는 오프라인 화면과 입력을 담당합니다.
</Callout>

<GuideNav prev="/os/verification" next="/seedkeeper/concepts" prevLabel="이전: Verification" nextLabel="다음: Concepts" />
