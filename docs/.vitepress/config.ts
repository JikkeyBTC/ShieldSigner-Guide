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
    socialLinks: [{ icon: 'github', link: 'https://github.com/JikkeyBTC/ShieldSigner-Guide' }]
  },
  vite: { optimizeDeps: { include: ['animejs'] } },
  // The landing-page route map intentionally precedes the task that adds its pages.
  ignoreDeadLinks: true
});
