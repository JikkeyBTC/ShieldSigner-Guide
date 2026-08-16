---
title: ShieldSigner OS
description: OS 설치와 이미지 무결성 검증을 시작하는 카테고리
verifiedOn: 2026-08-16
verifiedVersion: ShieldSigner buyer guide
estimatedTime: 4분
---

# ShieldSigner OS

ShieldSigner OS는 오프라인 화면과 서명 흐름을 제공하는 실행 환경입니다. 설치와 검증을 분리해서 진행하세요.

## 이 카테고리에서 다루는 내용

<div class="ss-summary-card">

### Installation

GitHub 릴리스에서 이미지를 내려받아 microSD에 기록하고 첫 부팅을 준비합니다.

[OS 설치 방법](./install)

</div>

<div class="ss-summary-card">

### Verification

SHA-256과 PGP 서명을 이용해 다운로드한 파일의 무결성과 출처를 확인합니다.

[OS 이미지 검증](./verify)

</div>

<Callout type="warning" title="검증 전에는 기록하지 마세요">
해시나 PGP 검증이 끝나기 전에는 이미지를 microSD에 기록하거나 장치에서 실행하지 않습니다.
</Callout>

<GuideNav prev="/build/assembly" next="/os/install" prevLabel="이전: 키트 조립 방법" nextLabel="다음: OS 설치" />
