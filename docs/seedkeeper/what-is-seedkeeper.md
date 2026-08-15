---
title: SeedKeeper란?
description: SeedKeeper 애플릿과 시드 백업의 개념
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 5분
---

# SeedKeeper란?

SeedKeeper는 JavaCard에서 동작하는 보안 금고 애플릿입니다. 시드나 기타 시크릿을 카드 내부에 저장하고, PIN 인증과 카드 간 백업 같은 기능을 통해 필요할 때만 접근하도록 설계됩니다.

SeedKeeper는 Bitcoin 지갑 앱이나 거래소가 아닙니다. 주소를 계산해 보여주는 워치온리 지갑도 아니며, ShieldSigner OS가 설치된 microSD도 아닙니다. ShieldSigner가 만든 시드의 백업·보관·복구를 돕는 별도 보안 경계입니다.

## 백업 모델

```text
ShieldSigner에서 시드 생성/확인
        │  (암호화 내보내기 권장)
        ▼
SeedKeeper 카드 A ── 보안 페어링/복제 ── SeedKeeper 카드 B
        │
        └── 예비 ShieldSigner에서 복원 시험
```

카드 안의 값이 백업되었다는 사실만으로 복구가 끝난 것은 아닙니다. 카드 B 또는 별도 백업으로 실제 복원이 되는지, 주소가 기대한 지갑과 일치하는지 확인해야 합니다.

<Callout type="danger" title="PIN과 시드는 공유 금지">
판매자·지원 담당자·화면 공유 상대가 PIN, 시드, 복호화 암호를 요구하면 거절하세요. 지원이 필요할 때는 오류 코드와 마스킹된 카드 식별자만 전달합니다.
</Callout>

## 내보내기 방식

- **암호화 내보내기:** 카드 간 이동이나 파일 교환 시 보호된 형식으로 이동합니다. 대상 카드와 페어링·키 교환 절차를 먼저 확인하세요.
- **평문 내보내기:** 시드가 읽을 수 있는 형태로 노출됩니다. 호환성 테스트 외에는 사용하지 말고, 사용했다면 메모리·다운로드·클립보드·스크린샷까지 즉시 폐기합니다.

가능한 경우 암호화 내보내기를 선택하고, 화면에 표시된 지문·시크릿 이름·생성 시각 등 메타데이터가 예상과 맞는지 확인하세요. 평문 내보내기는 카드의 보호를 제거하는 행위이므로 일반 백업으로 취급하지 않습니다.

공식 자료: [SeedKeeper Applet 저장소](https://github.com/Toporin/Seedkeeper-Applet) · [seedkeeper.io 빠른 시작](https://seedkeeper.io/quick-start/)

## 다음 단계

[← JavaCard란?](./javacard) · [다음: 카드 초기화와 PIN →](./initialize)
