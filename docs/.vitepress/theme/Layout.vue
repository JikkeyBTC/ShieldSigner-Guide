<script setup lang="ts">
import GuideNav from './components/GuideNav.vue'
import AnimatedChapter from './components/AnimatedChapter.vue'
import DemoCards from './components/DemoCards.vue'
import { useData } from 'vitepress'

const logoPath = '/ShieldSigner-Guide/brand/shieldsigner.svg'
const { frontmatter } = useData()
const formatDate = (value: unknown) => {
  if (!value) return ''
  const date = new Date(String(value))
  return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format(date)
}
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
      <DemoCards />
      <main class="ss-article" tabindex="-1">
        <AnimatedChapter><div class="ss-article-inner">
          <div v-if="frontmatter.verifiedOn || frontmatter.verifiedVersion || frontmatter.estimatedTime" class="ss-page-meta" aria-label="문서 정보">
            <span v-if="frontmatter.verifiedVersion">{{ frontmatter.verifiedVersion }}</span><span v-if="frontmatter.verifiedOn">{{ formatDate(frontmatter.verifiedOn) }} 확인</span><span v-if="frontmatter.estimatedTime">읽는 시간 {{ frontmatter.estimatedTime }}</span>
          </div>
          <Content />
        </div></AnimatedChapter>
      </main>
    </div>
  </div>
</template>
