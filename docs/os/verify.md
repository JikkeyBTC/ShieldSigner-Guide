---
title: OS 이미지 검증
description: GitHub 릴리스의 SHA-256 해시와 PGP 서명을 확인하는 방법
verifiedOn: 2026-08-16
verifiedVersion: verification workflow v1
estimatedTime: 10분
---

# OS 이미지 검증

검증은 두 가지 질문에 답합니다. SHA-256은 **내려받은 파일이 릴리스 파일과 동일한지(무결성)** 확인하고, PGP는 **서명자가 주장하는 공개키로 서명했는지(출처·진위)** 확인합니다. 둘 다 통과해야 [OS 설치](./install)로 넘어갑니다.

## 먼저 기록할 값

릴리스 페이지에서 이미지 파일명, 제공된 `.sha256` 파일, `.asc` 서명 파일을 같은 폴더에 둡니다. 아래 공개키 지문은 판매자가 공지한 값으로 교체해야 하는 자리입니다.

`PGP 공개키 지문: REPLACE_WITH_OFFICIAL_MAINTAINER_FINGERPRINT`

<Callout type="warning" title="지문은 복사해 붙이지 말고 독립적으로 대조">
공식 웹사이트나 판매자가 별도 채널로 공지한 지문과 대조하세요. 지문이 비어 있거나 서로 다르면 검증을 진행하지 말고 문의하세요.
</Callout>

## SHA-256 확인

### Windows PowerShell

```powershell
Get-FileHash .\shieldsigner-os.img -Algorithm SHA256
Get-Content .\shieldsigner-os.img.sha256
```

두 출력의 64자리 해시가 정확히 같아야 합니다.

### macOS

```bash
shasum -a 256 shieldsigner-os.img
cat shieldsigner-os.img.sha256
```

### Linux

```bash
sha256sum shieldsigner-os.img
cat shieldsigner-os.img.sha256
```

## PGP 서명 확인

공식 maintainer 공개키를 신뢰할 수 있는 경로에서 먼저 가져오고, 표시되는 fingerprint가 공지값과 일치하는지 확인합니다.

```bash
gpg --import maintainer-public-key.asc
gpg --fingerprint "MAINTAINER_KEY_ID"
gpg --verify shieldsigner-os.img.asc shieldsigner-os.img
```

`Good signature`만으로 충분하지 않습니다. 출력된 키 ID와 fingerprint가 공식 공지와 일치해야 합니다. Windows에서는 Gpg4win의 `gpg.exe`로 같은 명령을 실행할 수 있습니다.

<Callout type="danger" title="하나라도 실패하면 즉시 중단">
해시가 다르거나 `BAD signature`, 알 수 없는 키, 지문 불일치가 나오면 이미지를 플래시하지 마세요. 파일을 삭제하고 공식 릴리스 URL과 지문을 판매자에게 문의하세요.
</Callout>

## 검증 기록

- 릴리스 URL: `REPLACE_WITH_OFFICIAL_GITHUB_RELEASE_URL`
- 이미지 파일명: `REPLACE_WITH_IMAGE_FILENAME`
- 확인한 SHA-256: `REPLACE_WITH_64_HEX_DIGEST`
- maintainer fingerprint: `REPLACE_WITH_OFFICIAL_MAINTAINER_FINGERPRINT`
- 확인일·도구 버전: `REPLACE_WITH_DATE_AND_GPG_VERSION`

<Callout type="success" title="두 검증이 모두 통과했나요?">
이제 [ShieldSigner OS 설치](./install)에서 microSD에 기록하세요. 검증 결과를 적어 두면 나중에 카드 교체나 복구 때 비교할 수 있습니다.
</Callout>
