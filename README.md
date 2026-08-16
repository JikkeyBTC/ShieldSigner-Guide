# ShieldSigner Guide

구매자를 위한 ShieldSigner 한국어 가이드입니다. 키트 조립, ShieldSigner OS 설치·검증, SeedKeeper 백업과 워치온리 지갑 사용법을 단계별로 안내합니다.

이 사이트는 GitHub Pages에서 제공하는 정적 문서입니다. 비밀값·시드·개인키·사용자 데이터를 수집하거나 저장하지 않으며 로그인도 필요하지 않습니다. 제품 사진은 `docs/public/brand/` 또는 각 페이지의 플레이스홀더 자산으로 교체할 수 있습니다.

## GitHub Pages 배포

`main` 브랜치에 푸시하면 [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)이 실행됩니다.

1. 저장소 Settings → Pages → Source에서 **GitHub Actions**를 선택합니다.
2. 워크플로가 `npm ci`로 의존성을 설치하고 `npm run build`를 실행합니다.
3. VitePress 결과물 `.vitepress/dist`를 Pages artifact로 업로드한 뒤 배포합니다.

저장소 이름이 바뀌면 `docs/.vitepress/config.ts`의 `base`(`/ShieldSigner-Guide/`)도 저장소 경로에 맞춰 변경하세요.

## Local development

```bash
npm ci
npm run dev
```

프로덕션 결과와 테스트를 확인하려면 다음을 실행합니다.

```bash
npm run build
npm run preview
npm run test:unit
npm run test:e2e
```

`npm run preview`는 빌드 출력 폴더 `.vitepress/dist`와 GitHub Pages 경로(`/ShieldSigner-Guide/`)를 함께 사용합니다.

## 출처와 라이선스

사용한 오픈소스 프로젝트와 라이선스는 [`ATTRIBUTION.md`](ATTRIBUTION.md)에 정리했습니다. 이 가이드는 SeedSigner·SeedKeeper 프로젝트의 공식 웹사이트가 아닙니다.
