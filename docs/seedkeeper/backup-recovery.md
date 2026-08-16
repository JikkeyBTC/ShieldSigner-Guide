---
title: SeedKeeper Backup & Recovery
description: 카드 초기화부터 백업·복제·복원·분실 대응까지의 흐름
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 8분
---

# Backup & recovery

이 카테고리는 카드를 안전하게 준비하고, 암호화된 백업을 만들고, 복원 테스트까지 수행하는 흐름을 제공합니다.

## 작업 흐름

<div class="ss-summary-card">

### 01 · 카드 초기화와 PIN

새 카드를 초기화하고 PIN을 설정합니다. PIN은 누구와도 공유하지 않습니다.

[카드 초기화 안내](./initialize)

</div>

<div class="ss-summary-card">

### 02 · SeedKeeper 백업

ShieldSigner에서 시드를 카드로 전달하고 암호화된 백업 결과를 확인합니다.

[백업 방법 안내](./backup)

</div>

<div class="ss-summary-card">

### 03 · 복제·복원·분실 대응

예비 카드 복제, 복원 테스트, 카드 분실 시 대응 순서를 확인합니다.

[카드 복제](./clone) · [시드 복원](./restore) · [분실과 복구](./recovery)

</div>

<Callout type="warning" title="복원 테스트를 생략하지 마세요">
백업 파일이나 카드가 실제로 복원되는지 확인하기 전에는 원본을 폐기하지 마세요. 복원 과정에서 시드·PIN을 화면 캡처하거나 온라인 저장소에 업로드하지 않습니다.
</Callout>

<GuideNav prev="/seedkeeper/concepts" next="/seedkeeper/initialize" prevLabel="이전: Concepts" nextLabel="다음: 카드 초기화와 PIN" />
