---
title: 카드 초기화와 PIN
description: 공식 애플릿 확인과 SeedKeeper 카드 초기화 체크리스트
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 10분
---

# 카드 초기화와 PIN

아래 단계는 빈 카드 또는 판매자가 초기화하지 않은 카드를 처음 준비할 때의 공통 흐름입니다. 실제 메뉴 이름은 카드 리더와 SeedKeeper 버전에 따라 달라질 수 있으므로, 화면의 의미가 아래 체크포인트와 일치하는지 확인하세요.

## 초기화 전

- [ ] OS와 SeedKeeper 도구를 공식 출처에서 내려받고 서명을 확인했다.
- [ ] 카드 리더가 신뢰할 수 있는 컴퓨터에 연결되어 있고 다른 USB 장치는 분리했다.
- [ ] 실제 시드가 아닌 `TEST_SEED_DO_NOT_USE` 같은 테스트 값만 사용한다.
- [ ] 카드 외부에 기록할 복구 정책(카드 수, 보관 장소, 교체 주기)을 정했다.

## 단계

1. SeedKeeper 애플릿이 공식 릴리스인지 버전·해시·서명으로 확인합니다.
2. 카드에 애플릿을 설치하거나 이미 있다면 애플릿 식별자와 버전을 확인합니다.
3. 초기화 작업을 시작하고 카드가 요구하는 PIN을 새로 설정합니다. PIN은 비밀번호 관리자나 카드와 분리된 봉인 기록에 보관하세요.
4. 실패 횟수와 잠금 정책을 기록합니다. 추측으로 PIN을 반복 입력하지 마세요.
5. 화면에 표시되는 카드 식별자(`CARD_ID_PLACEHOLDER`)를 대조해 다른 카드를 잘못 초기화하지 않았는지 확인합니다.
6. 실제 시드를 넣기 전에 테스트 시크릿을 저장·조회하고 PIN 인증이 기대대로 작동하는지 확인합니다.

<Callout type="warning" title="초기화는 되돌릴 수 없을 수 있습니다">
초기화·삭제 명령은 카드의 기존 데이터를 지울 수 있습니다. 카드가 새 제품이라는 확신이 없거나 이미 백업이 있다면 먼저 중단하고, 공식 절차에서 초기화 대상과 경고 문구를 확인하세요.
</Callout>

## 완료 기준

카드 식별자와 애플릿 버전을 기록했고, 새 PIN을 다른 사람에게 공개하지 않았으며, 테스트 시크릿으로 인증·저장·삭제가 성공해야 합니다. 그 뒤에만 [ShieldSigner 시드 백업](./backup)을 진행합니다.

## 다음 단계

[← SeedKeeper란?](./what-is-seedkeeper) · [다음: 시드를 카드에 백업하기 →](./backup)

공식 절차 확인: [SeedKeeper Applet](https://github.com/Toporin/Seedkeeper-Applet) · [seedkeeper.io](https://seedkeeper.io/quick-start/)
