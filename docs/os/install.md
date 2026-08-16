---
title: ShieldSigner OS 설치
description: GitHub에서 OS 이미지를 내려받아 microSD에 기록하고 첫 부팅하기
verifiedOn: 2026-08-16
verifiedVersion: SeedSigner firmware reference
estimatedTime: 20–30분
---

# ShieldSigner OS 설치

ShieldSigner는 SeedSigner 오픈소스 펌웨어를 사용하는 장치입니다. 이 가이드는 판매자가 제공한 ShieldSigner 하드웨어에 공식 릴리스 이미지를 설치하는 절차를 설명합니다. 먼저 [Verification](./verification)을 완료하세요.

## 1. GitHub에서 이미지 받기

판매자가 안내한 공식 GitHub 릴리스 페이지에서 이미지(`.img` 또는 압축 파일)와 SHA-256·PGP 서명 파일을 같은 릴리스에서 내려받습니다. 검색 결과나 제3자 재배포 링크 대신 릴리스의 원본 파일을 사용합니다.

<Callout type="warning" title="검증 전에는 플래시 금지">
파일을 microSD에 쓰기 전에 PGP 서명과 SHA-256을 모두 확인해야 합니다. 검증이 실패하면 파일을 열거나 실행하지 말고 삭제 후 문의하세요.
</Callout>

## 2. microSD에 기록하기

1. microSD의 기존 데이터가 모두 지워집니다. 필요한 자료를 먼저 백업합니다.
2. Raspberry Pi Imager, balenaEtcher 등 신뢰할 수 있는 이미저를 설치합니다.
3. 검증을 마친 OS 이미지를 선택하고 대상 microSD를 정확히 지정합니다.
4. 기록을 시작하고 완료될 때까지 카드를 분리하지 않습니다.
5. 완료 후 이미저의 검증 단계를 통과했는지 확인하고 운영체제에서 안전하게 꺼냅니다.

<MediaPlaceholder label="이미저에서 OS와 microSD를 선택하는 화면" />

## 3. 첫 부팅

microSD를 ShieldSigner에 넣고 전원을 연결합니다. 정상이라면 SeedSigner 시작 화면과 메뉴가 나타나고, 버튼을 눌렀을 때 선택 상태가 움직입니다. 첫 화면이 뜨기 전에는 시드 생성·가져오기 메뉴를 사용하지 않아도 됩니다.

## 실패 시 복구

- 부팅 화면이 없으면 전원을 분리하고 microSD가 끝까지 삽입됐는지, 검증된 이미지로 다시 기록했는지 확인합니다.
- 이미저가 쓰기 오류를 내면 다른 카드 리더와 정품·상태가 좋은 microSD로 재시도합니다.
- 같은 이미지가 반복해서 실패하거나 발열·냄새가 있으면 전원을 분리하고 판매자에게 문의합니다.

<Callout type="danger" title="시드·개인키는 이 단계에 필요 없습니다">
OS 설치를 위해 seed phrase, PIN, 개인키를 입력할 이유는 없습니다. 그런 입력을 요구하는 화면이 나오면 설치를 멈추고 파일 출처를 다시 확인하세요.
</Callout>

## 설치 완료 체크

- [ ] 이미지 파일과 서명 파일을 같은 공식 GitHub 릴리스에서 받았다.
- [ ] PGP와 SHA-256 검증이 모두 통과했다.
- [ ] microSD 덮어쓰기를 이해하고 이미저 기록·검증을 완료했다.
- [ ] 카드를 안전하게 꺼내 ShieldSigner 첫 부팅과 버튼 입력을 확인했다.
