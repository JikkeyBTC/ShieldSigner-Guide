<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import GuideNav from './components/GuideNav.vue'
import DocNavBar from './components/DocNavBar.vue'
import AnimatedChapter from './components/AnimatedChapter.vue'
import DemoCards from './components/DemoCards.vue'
import { getChapterByPath } from '../../../src/guide/chapters'
import { getBranchLandingByPath, getSectionLandingByPath } from '../../../src/guide/branches'
import { getChapterAccent } from '../../../src/guide/colors'

const logoPath = '/ShieldSigner-Guide/brand/shieldsigner.svg'
const { page } = useData()
const currentChapter = computed(() => {
  const path = page.value.relativePath.replace(/\.md$/, '')
  const route = path === 'index' ? '/' : path.endsWith('/index') ? `/${path.slice(0, -6)}/` : `/${path}/`
  return getSectionLandingByPath(route) ?? getBranchLandingByPath(route) ?? getChapterByPath(route)
})
const chapterAccent = computed(() => getChapterAccent(currentChapter.value))
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

    <DocNavBar />

    <div class="ss-docs-shell" :style="{ '--chapter-accent': chapterAccent }">
      <GuideNav />
      <DemoCards />
      <main class="ss-article" tabindex="-1">
        <AnimatedChapter><div class="ss-article-inner"><Content /></div></AnimatedChapter>
      </main>
    </div>
  </div>
</template>
