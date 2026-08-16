---
title: Verification
description: ShieldSigner OS 이미지의 무결성과 출처를 확인하는 안내
---

# Verification

ShieldSigner OS를 설치하기 전에 GitHub 릴리스에서 받은 이미지 파일의 무결성과 출처를 확인합니다. SHA-256과 PGP 서명 검증을 모두 통과해야 합니다.

## 검증 흐름

1. 공식 GitHub 릴리스에서 이미지와 `.sha256`, `.asc` 파일을 함께 받습니다.
2. SHA-256 값으로 파일이 변조되지 않았는지 확인합니다.
3. PGP 서명과 공개키 fingerprint로 배포 출처를 확인합니다.

<Callout type="warning" title="검증이 끝나기 전에는 플래시하지 마세요">
해시가 다르거나 서명이 실패하면 이미지를 사용하지 말고, 공식 릴리스와 판매자 공지를 독립적으로 다시 확인하세요.
</Callout>

## SHA-256 확인

Windows PowerShell:

```powershell
Get-FileHash .\shieldsigner-os.img -Algorithm SHA256
Get-Content .\shieldsigner-os.img.sha256
```

macOS:

```bash
shasum -a 256 shieldsigner-os.img
cat shieldsigner-os.img.sha256
```

Linux:

```bash
sha256sum shieldsigner-os.img
cat shieldsigner-os.img.sha256
```

출력된 64자리 해시가 공식 릴리스의 `.sha256` 값과 완전히 일치해야 합니다.

## PGP 서명 확인

```bash
gpg --import maintainer-public-key.asc
gpg --fingerprint "MAINTAINER_KEY_ID"
gpg --verify shieldsigner-os.img.asc shieldsigner-os.img
```

`Good signature`만으로 충분하지 않습니다. 표시된 fingerprint가 공식 채널의 값과 일치하는지 독립적으로 대조하세요.

<Callout type="danger" title="하나라도 실패하면 즉시 중단">
해시가 다르거나 `BAD signature`, 알 수 없는 fingerprint가 표시되면 이미지를 microSD에 기록하지 마세요. 파일을 삭제하고 공식 릴리스 URL과 서명 지문을 판매자에게 문의하세요.
</Callout>

## 검증 기록

- 릴리스 URL: `REPLACE_WITH_OFFICIAL_GITHUB_RELEASE_URL`
- 이미지 파일명: `REPLACE_WITH_IMAGE_FILENAME`
- 확인한 SHA-256: `REPLACE_WITH_64_HEX_DIGEST`
- maintainer fingerprint: `REPLACE_WITH_OFFICIAL_MAINTAINER_FINGERPRINT`

<Callout type="success" title="두 검증이 모두 통과했나요?">
이제 [ShieldSigner OS 설치](./install)에서 microSD에 기록하세요.
</Callout>
