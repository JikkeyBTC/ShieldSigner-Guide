---
title: 자주 묻는 질문
description: ShieldSigner와 SeedKeeper 사용 중 자주 묻는 질문
---

# 자주 묻는 질문

## 휴대폰에 시드를 입력해도 되나요?

아니요. 워치온리 지갑에는 descriptor/xpub 같은 공개 정보만 가져옵니다. 시드와 개인키는 ShieldSigner와 SeedKeeper 밖으로 옮기지 않습니다.

## 주소가 앱과 기기에서 다릅니다.

네트워크, 계정 유형, 파생 경로를 확인하고 입금·서명을 멈추세요. 일치하지 않는 주소로는 소액 테스트도 보내지 않습니다.

## PSBT QR이 여러 장인 이유는 무엇인가요?

거래 데이터가 한 화면에 담기지 않기 때문입니다. 모든 프레임을 순서대로 스캔하고 누락 경고가 없는지 확인하세요.

## PIN을 잊었습니다.

추측을 반복하지 마세요. SeedKeeper의 잠금 정책을 확인하고, 별도 카드나 금속 백업에서 복구 가능한지 먼저 점검합니다.

## 인터넷에 연결해도 되나요?

서명 장치는 오프라인으로 유지하는 것이 기본입니다. 거래 생성·브로드캐스트는 워치온리 앱에서 하고, ShieldSigner에는 필요한 PSBT만 전달합니다.

<GuideNav prev="/reference/security" next="/reference/glossary" prevLabel="이전: 보안 모델" nextLabel="다음: 용어집" />
