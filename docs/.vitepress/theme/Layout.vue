<script setup lang="ts">
import GuideNav from './components/GuideNav.vue'
import AnimatedChapter from './components/AnimatedChapter.vue'

const logoPath = '/ShieldSigner-Guide/brand/shieldsigner.svg'
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

    <div class="ss-docs-shell">
      <GuideNav />
      <main class="ss-article" tabindex="-1">
        <AnimatedChapter><div class="ss-article-inner"><Content /></div></AnimatedChapter>
      </main>
    </div>
  </div>
</template>
