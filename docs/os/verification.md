---
title: Verification
description: ShieldSigner OS 이미지 검증 흐름을 시작하는 안내
---

# Verification

ShieldSigner OS를 설치하기 전에 다운로드 파일의 무결성과 출처를 확인하는 단계입니다.

## 검증 흐름

1. GitHub 릴리스에서 이미지와 해시·서명 파일을 함께 내려받습니다.
2. SHA-256 값으로 파일이 바뀌지 않았는지 확인합니다.
3. PGP 서명과 공개키 fingerprint로 배포 출처를 확인합니다.

<Callout type="warning" title="검증이 끝나기 전에는 플래시하지 마세요">
해시가 다르거나 서명이 실패하면 이미지를 사용하지 말고, 공식 릴리스와 판매자 공지를 독립적으로 다시 확인하세요.
</Callout>

## 변조 확인 검증

각 명령어와 중단 조건은 상세 페이지에서 확인할 수 있습니다.

[변조 확인 검증 상세 페이지 열기](./verify)
