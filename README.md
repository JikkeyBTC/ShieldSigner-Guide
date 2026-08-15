# ShieldSigner Guide

공개 GitHub Pages용 ShieldSigner 한국어 가이드입니다. 이 사이트는 정적 문서만 제공하며, 비밀값·시드 데이터·사용자 데이터를 받거나 저장하지 않습니다.

## Local development

```bash
npm ci
npm run dev
```

```bash
npm run build
npm run preview
npm run test:e2e
```

`main` 브랜치에 푸시하면 GitHub Actions가 `.vitepress/dist`를 GitHub Pages에 배포합니다.
