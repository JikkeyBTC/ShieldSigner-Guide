import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'ko-KR',
  title: 'ShieldSigner Guide',
  description: 'ShieldSigner 구매자를 위한 공개 한국어 가이드',
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600&display=swap' }]
  ],
  base: '/ShieldSigner-Guide/',
  cleanUrls: true,
  outDir: '../.vitepress/dist',
  themeConfig: {
    outline: 'deep',
    sidebar: {
      '/os/': [
        { text: 'ShieldSigner OS', link: '/os/' },
        { text: 'ShieldSigner OS 설치', link: '/os/install' },
        { text: 'OS 이미지 검증', link: '/os/verify' }
      ],
      '/seedkeeper/': [
        { text: 'SeedKeeper', link: '/seedkeeper/' },
        { text: 'Concepts', link: '/seedkeeper/concepts' },
        { text: 'JavaCard란?', link: '/seedkeeper/javacard' },
        { text: 'SeedKeeper란?', link: '/seedkeeper/what-is-seedkeeper' },
        { text: '카드 초기화와 PIN', link: '/seedkeeper/initialize' },
        { text: '시드를 카드에 백업하기', link: '/seedkeeper/backup' },
        { text: '카드 간 복제', link: '/seedkeeper/clone' },
        { text: '시드 복원하기', link: '/seedkeeper/restore' },
        { text: '분실과 복구 계획', link: '/seedkeeper/recovery' }
      ],
      '/wallet/': [
        { text: 'Watch-only wallets', link: '/wallet/' },
        { text: 'BlueWallet 워치온리', link: '/wallet/bluewallet' },
        { text: 'Coconut Wallet 워치온리', link: '/wallet/coconut' }
      ],
      '/transactions/': [
        { text: 'Transactions', link: '/transactions/' },
        { text: '입금 주소 확인', link: '/transactions/receive' },
        { text: 'PSBT 검토·서명', link: '/transactions/sign-psbt' }
      ],
      '/reference/': [
        { text: 'Reference', link: '/reference/' },
        { text: 'Safety', link: '/reference/safety' },
        { text: 'Terms', link: '/reference/terms' },
        { text: '보안 모델', link: '/reference/security' },
        { text: '자주 묻는 질문', link: '/reference/faq' },
        { text: '용어집', link: '/reference/glossary' },
        { text: '출처와 라이선스', link: '/reference/sources' }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/JikkeyBTC/ShieldSigner-Guide' }]
  },
  vite: { optimizeDeps: { include: ['animejs'] } },
  // The landing-page route map intentionally precedes the task that adds its pages.
  ignoreDeadLinks: true
});
