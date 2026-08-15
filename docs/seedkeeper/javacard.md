---
title: JavaCard란?
description: SeedKeeper 카드의 실행 환경과 ShieldSigner의 역할 구분
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 5분
---

# JavaCard란?

JavaCard는 작은 스마트카드 안에서 보안 애플릿(applet)을 실행하도록 만든 플랫폼입니다. 일반 운영체제처럼 앱을 마음대로 설치하는 장치가 아니라, 카드가 제공하는 제한된 보안 API와 권한 경계를 통해 키·PIN 같은 값을 카드 안에서 처리합니다.

## 세 가지를 구분하세요

| 구성요소 | 역할 | 저장·실행 위치 |
| --- | --- | --- |
| JavaCard 플랫폼 | 스마트카드에서 애플릿을 실행하는 기반 | 보안 칩 카드 |
| SeedKeeper 애플릿 | 시드와 시크릿을 보호하는 카드용 금고 프로그램 | JavaCard 안 |
| ShieldSigner | 오프라인에서 시드를 생성·사용하고 화면에 서명 내용을 보여주는 장치 | Raspberry Pi + microSD |

SeedKeeper 카드는 ShieldSigner의 microSD를 대신하지 않습니다. microSD에는 ShieldSigner OS가 있고, 카드는 별도의 백업 보관 수단입니다. 카드나 microSD 어느 하나만 믿지 말고, 복구 절차를 직접 시험하세요.

<Callout type="warning" title="애플릿 출처를 먼저 확인하세요">
카드에 애플릿을 설치하거나 교체하기 전에 공식 SeedKeeper 배포 페이지와 릴리스 서명을 확인하세요. 이 안내는 실제 카드 번호·PIN·시드가 보이는 화면을 제공하지 않으며, 캡처가 필요하면 `CARD_ID_PLACEHOLDER`, `FINGERPRINT_PLACEHOLDER` 같은 가림값을 사용합니다.
</Callout>

## 학습 순서

1. [SeedKeeper란?](./what-is-seedkeeper)에서 카드의 보안 금고 모델을 이해합니다.
2. [카드 초기화와 PIN](./initialize)에서 빈 카드를 준비합니다.
3. [시드를 카드에 백업하기](./backup)에서 첫 백업을 만들고 검증합니다.
4. [카드 간 복제](./clone)와 [시드 복원하기](./restore)로 대체 카드·예비 장치를 시험합니다.
