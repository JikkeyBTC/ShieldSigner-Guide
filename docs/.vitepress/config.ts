import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'ko-KR',
  title: 'ShieldSigner Guide',
  description: 'ShieldSigner 구매자를 위한 공개 한국어 가이드',
  base: '/ShieldSigner-Guide/',
  cleanUrls: true,
  outDir: '../.vitepress/dist',
  themeConfig: {
    outline: 'deep',
    sidebar: {
      '/build/': [
        { text: '키트 조립 방법', link: '/build/assembly' }
      ],
      '/os/': [
        { text: 'ShieldSigner OS 설치', link: '/os/install' },
        { text: 'OS 이미지 검증', link: '/os/verify' }
      ],
      '/seedkeeper/': [
        { text: 'JavaCard란?', link: '/seedkeeper/javacard' },
        { text: 'SeedKeeper란?', link: '/seedkeeper/what-is-seedkeeper' },
        { text: '카드 초기화와 PIN', link: '/seedkeeper/initialize' },
        { text: '시드를 카드에 백업하기', link: '/seedkeeper/backup' },
        { text: '카드 간 복제', link: '/seedkeeper/clone' },
        { text: '시드 복원하기', link: '/seedkeeper/restore' },
        { text: '분실과 복구 계획', link: '/seedkeeper/recovery' }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/JikkeyBTC/ShieldSigner-Guide' }]
  },
  vite: { optimizeDeps: { include: ['animejs'] } },
  // The landing-page route map intentionally precedes the task that adds its pages.
  ignoreDeadLinks: true
});
