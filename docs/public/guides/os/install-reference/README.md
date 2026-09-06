# 설치 가이드 이미지

사용자 지정 원문: https://jikkey.gitbook.io/seedsigner-guide/undefined-1/02-installation
반영 페이지: docs/ko/os/install.md

원문의 5단계와 이미지 16개의 순서를 유지한다. 이미지 원본은 GitBook의 공개 파일에서 가져왔으며 픽셀을 수정하지 않았다. SeedSigner 파일명·기기 화면은 참고용으로 유지하고, 사용자가 ShieldSigner 화면을 재촬영하면 아래 파일을 교체한다. 본문은 ShieldSigner B12 다운로드와 검증 경로를 사용한다.

페이지 디자인, 전체 목차, 조립·검증·카드 가이드는 변경하지 않는다. 기존 #download 및 #write-card 앵커를 유지한다.

| 파일 | 상태 | 원문의 이미지 설명 |
| --- | --- | --- |
| 01-sd-card.png | 공통 이미지 재사용 | 카드 삽입 방향 예시 1 |
| 02-sd-card.png | 공통 이미지 재사용 | 카드 삽입 방향 예시 2 |
| 03-sd-card.png | 공통 이미지 재사용 | 카드 삽입 방향 예시 3 |
| 04-sd-card.png | 공통 이미지 재사용 | 카드 삽입 방향 예시 4 |
| 05-os-download.png | 사용자 제공 캡처 반영 | ShieldSigner B12 Assets에서 pi0-smartcard.img.zip 선택 |
| 06-imager-download.png | 공통 이미지 재사용 | Imager 다운로드 |
| 07-imager-install.png | 공통 이미지 재사용 | 설치 진행 |
| 08-imager-device.png | 공통 이미지 재사용 | Device 선택 |
| 09-imager-os.png | 공통 이미지 재사용 | OS 선택 |
| 10-imager-image-file.png | 사용자 제공 캡처 반영 | 압축을 푼 pi0-smartcard.img 파일 선택 |
| 11-imager-storage.png | 공통 이미지 재사용 | 저장소 선택 |
| 12-imager-write-review.png | 사용자 제공 캡처 반영 | Raspberry Pi Zero·pi0-smartcard.img·MXT-USB Storage Device 기록 요약 |
| 13-imager-erase-warning.png | 공통 이미지 재사용 | WRITE 버튼 |
| 14-imager-complete.png | 사용자 제공 캡처 반영 | Raspberry Pi Zero·pi0-smartcard.img·MXT-USB Storage Device 기록 완료 |
| 15-device-check.jpg | 사용자 제공 사진 반영 | ShieldSigner 기기 하단 슬롯의 microSD 카드 삽입 |
| 16-device-boot.gif | 사용자 제공 영상 변환 | ShieldSigner 부팅 영상 |

원문의 12~14번 이미지 설명과 실제 버튼이 달라 파일명과 본문을 실제 화면에 맞췄다: 기록 요약 → 삭제 경고 → 기록 완료. 16번은 사용자가 제공한 `3_crop.mp4`를 640px 폭·12fps GIF로 변환했다. 05-os-download.png, 10-imager-image-file.png, 12-imager-write-review.png, 14-imager-complete.png, 15-device-check.jpg는 사용자가 제공한 ShieldSigner 이미지로 교체했다.

## 원본 파일 출처

- 01-sd-card.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-0ddec33942259d2055123c2a4212940dacb3f878%2FSDCard_1.png?alt=media
- 02-sd-card.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-e7687bb7bad982a8915ee03765cef06a76bf2547%2FSDCard_2.png?alt=media
- 03-sd-card.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-be9a39717b786c330f8dc244c95031a762229bfc%2FSDCard_3.png?alt=media
- 04-sd-card.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-4a91561ba76ae14e762c5e34ec11a8597a9c216c%2FSDCard_4.png?alt=media
- 05-os-download.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-6f6fc5850d5eb55d01acd673633252c56a7d8d7e%2Fos_image.png?alt=media
- 06-imager-download.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-eb43b803930a452ccef518000e0e88b46090eb8a%2Frevision_0.png?alt=media
- 07-imager-install.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-985a538d2ff00469e272c94b041aa40a6023ea33%2F1.png?alt=media
- 08-imager-device.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-edd0f4439f5d9725666731e9eba452ce1654ba4c%2Frevision_2.png?alt=media
- 09-imager-os.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-7525a04cd9f5e45f60cb07e7f457ae2c07a937d9%2Frevision_3.png?alt=media
- 10-imager-image-file.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-708684f4a059144a48280448a93fd206fe43cb79%2F4.png?alt=media
- 11-imager-storage.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-c79a407c562470331e12fe8387b3aa40d83aab93%2Frevision_4.png?alt=media
- 12-imager-write-review.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-49d86d3bee5e5dd6cf9a767b66263922dd502929%2Frevision_5.png?alt=media
- 13-imager-erase-warning.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-eff2b3bd71a35cb0c1c70357cf90de24280b3e73%2Frevision_6.png?alt=media
- 14-imager-complete.png: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-e85fde3a4bf516f0c73aca24d8e045532e3bd1b8%2Frevision_7.png?alt=media
- 15-device-check.jpg: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-278601a9d00b0d97e833e3766ac75d1748b65a4a%2F10.jpg?alt=media
- 16-device-boot.gif: https://2172725426-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVADufmRKKLSDeoqz90fn%2Fuploads%2Fgit-blob-62a2558ff0bdb740067c5f6bb9fbe554e8c9ecc3%2F1.gif?alt=media
