---
title: SeedKeeper Concepts
description: JavaCard와 SeedKeeper의 역할을 한눈에 이해하는 안내
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 3분
---

# Concepts

SeedKeeper를 시작하기 전에 카드 안에서 무엇이 실행되고, ShieldSigner가 그 기능을 어떻게 사용하는지 먼저 정리합니다.

## 이 카테고리에서 다루는 내용

<div class="ss-summary-card">

### JavaCard란?

스마트카드에서 보안 애플릿을 실행하는 플랫폼과 저장 경계를 설명합니다.

[JavaCard 안내 열기](./javacard)

</div>

<div class="ss-summary-card">

### SeedKeeper란?

SeedKeeper 애플릿의 역할, 카드 초기화, ShieldSigner와의 관계를 설명합니다.

[SeedKeeper 소개 열기](./what-is-seedkeeper)

</div>

## 읽는 순서

1. JavaCard의 실행·저장 위치를 확인합니다.
2. SeedKeeper가 시드와 시크릿을 어떤 경계에서 보호하는지 확인합니다.
3. 다음 카테고리에서 카드 초기화와 백업 절차를 진행합니다.

<Callout type="info" title="카드와 OS의 역할을 구분하세요">
SeedKeeper 카드는 시드 보관과 암호 연산을 담당하고, ShieldSigner OS는 오프라인 화면과 사용자 입력을 담당합니다. 시드·PIN·개인키는 이 페이지에 입력하거나 기록하지 마세요.
</Callout>

<GuideNav prev="/" next="/seedkeeper/backup-recovery" prevLabel="처음으로" nextLabel="다음: Backup & recovery" />
