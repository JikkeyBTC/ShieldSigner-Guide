---
title: 시드를 카드에 백업하기
description: ShieldSigner 시드를 SeedKeeper 카드에 암호화 백업하고 확인하는 방법
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 15–20분
---

# 시드를 카드에 백업하기

이 절차는 ShieldSigner에서 생성하거나 가져온 시드를 SeedKeeper 카드에 백업하는 흐름입니다. 메뉴 이름은 사용하는 SeedKeeper 앱·리더에 따라 다를 수 있으므로, 아래 **확인할 값**을 기준으로 진행하세요.

<Callout type="danger" title="먼저 시드의 진위를 확인하세요">
백업 전에 ShieldSigner 화면에서 지갑 지문·파생 경로·시드 단어 수를 두 번 대조합니다. 누군가 보낸 시드나 테스트 시드를 실제 자금 지갑에 넣지 마세요.
</Callout>

## 다음 단계

[← 카드 초기화와 PIN](./initialize) · [다음: 카드 간 복제 →](./clone)

공식 절차 확인: [SeedKeeper Applet](https://github.com/Toporin/Seedkeeper-Applet) · [seedkeeper.io](https://seedkeeper.io/quick-start/)

## 절차

1. [카드 초기화](./initialize)를 완료한 카드와 ShieldSigner를 준비합니다.
2. ShieldSigner에서 백업할 시크릿의 이름, 지갑 지문, 파생 경로를 기록합니다. 단어·개인키는 기록하거나 촬영하지 않습니다.
3. 카드 리더에 카드를 연결하고 PIN을 입력합니다. 카드 식별자가 준비한 카드와 일치하는지 확인합니다.
4. SeedKeeper의 가져오기/백업 메뉴에서 **암호화 내보내기** 또는 이에 해당하는 보호된 전송을 선택합니다.
5. 화면에 표시되는 대상 카드, 시크릿 이름, 지문(`FINGERPRINT_PLACEHOLDER`)을 ShieldSigner와 대조합니다.
6. 전송을 승인하고 완료 메시지와 기록된 메타데이터를 비교합니다. 시드 단어가 화면·터미널·클립보드에 나타나면 즉시 중단합니다.
7. 원본 카드와 대상 카드의 PIN 인증으로 백업 목록과 메타데이터만 조회합니다. 평문 시드가 표시되는 복구 테스트는 [예비 장치에서 복원](./restore) 단계에서 오프라인으로 수행합니다.

## 백업 검증 체크리스트

- [ ] 암호화 전송을 선택했거나, 평문을 사용했다면 노출 경로를 모두 폐기했다.
- [ ] 카드 ID·애플릿 버전·시크릿 이름·지갑 지문이 기록과 일치한다.
- [ ] 실제 시드를 채팅, 이메일, 사진, 클라우드 동기화에 남기지 않았다.
- [ ] 두 번째 카드 또는 별도 복구 수단을 준비했다.
- [ ] [복원 테스트](./restore)를 예비 장치에서 완료했다.

<Callout type="warning" title="카드 하나가 유일한 백업이면 안 됩니다">
SeedKeeper 카드도 분실·손상·PIN 잠금이 발생할 수 있습니다. [카드 간 복제](./clone)와 [분실·복구 계획](./recovery)을 함께 준비하세요.
</Callout>
