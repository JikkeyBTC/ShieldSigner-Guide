<script setup lang="ts">
import { onMounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const logoPath = '/ShieldSigner-Guide/brand/shieldsigner.svg'

onMounted(async () => {
  const module = await import('animejs')
  const animate = module.animate
  animate('.ss-reveal', { opacity: [0, 1], translateY: [10, 0], delay: module.stagger(55), duration: 500, ease: 'out(3)' })
})
</script>

<template>
  <div class="ss-app">
    <header class="ss-topbar">
      <a class="ss-brand" href="/ShieldSigner-Guide/" aria-label="ShieldSigner Guide home">
        <img :src="logoPath" alt="ShieldSigner" />
      </a>
      <p class="ss-kicker">PRIVATE BUYER GUIDE <span aria-hidden="true">/</span> OFFLINE-FIRST</p>
      <nav class="ss-top-actions" aria-label="External resources">
        <a href="https://github.com/JikkeyBTC/ShieldSigner-Guide" target="_blank" rel="noreferrer">GitHub ↗</a>
      </nav>
    </header>

    <nav class="ss-mobile-tabs" aria-label="Guide sections">
      <a href="/ShieldSigner-Guide/" :aria-current="frontmatter.layout === 'home' ? 'page' : undefined">Overview</a>
      <a href="/ShieldSigner-Guide/build/assembly">Build</a>
      <a href="/ShieldSigner-Guide/os/install">OS</a>
      <a href="/ShieldSigner-Guide/seedkeeper">SeedKeeper</a>
    </nav>

    <div class="ss-docs-shell">
      <aside class="ss-category-nav" aria-label="Guide categories">
        <div class="ss-rail-label">GUIDE INDEX</div>
        <a class="ss-nav-link ss-reveal" href="/ShieldSigner-Guide/">Overview <span>01</span></a>
        <a class="ss-nav-link ss-reveal" href="/ShieldSigner-Guide/build/assembly">Build the kit <span>02</span></a>
        <a class="ss-nav-link ss-reveal" href="/ShieldSigner-Guide/os/install">Install OS <span>03</span></a>
        <a class="ss-nav-link ss-reveal" href="/ShieldSigner-Guide/os/verify">Verify image <span>04</span></a>
        <a class="ss-nav-link ss-reveal" href="/ShieldSigner-Guide/seedkeeper">SeedKeeper <span>05</span></a>
        <a class="ss-nav-link ss-reveal" href="/ShieldSigner-Guide/wallets">Watch-only wallets <span>06</span></a>
      </aside>

      <aside class="ss-chapter-rail" aria-label="On this page">
        <div class="ss-rail-label">ON THIS PAGE</div>
        <div class="ss-toc-card">{{ frontmatter.title || 'ShieldSigner Guide' }}</div>
        <div class="ss-toc-hint">Scroll to follow the chapter</div>
      </aside>

      <main class="ss-article" tabindex="-1">
        <div class="ss-article-inner"><Content /></div>
      </main>
    </div>
  </div>
</template>
