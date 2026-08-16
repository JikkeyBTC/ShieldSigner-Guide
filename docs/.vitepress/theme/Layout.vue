<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import GuideNav from './components/GuideNav.vue'
import DocNavBar from './components/DocNavBar.vue'
import DocBreadcrumb from './components/DocBreadcrumb.vue'
import AnimatedChapter from './components/AnimatedChapter.vue'
import DemoCards from './components/DemoCards.vue'
import { getChapterByPath } from '../../../src/guide/chapters'
import { getBranchLandingByPath, getSectionLandingByPath } from '../../../src/guide/branches'
import { getChapterAccent } from '../../../src/guide/colors'
import { getAlternateLocale, localizeHref, routeFromRelativePath, getLocaleFromPath } from '../../../src/guide/locales'
import { guideSearchQuery } from '../../../src/guide/search'

const logoPath = withBase('/brand/shieldsigner.svg')
const { page } = useData()
const router = useRouter()
const locale = computed(() => getLocaleFromPath(`/${page.value.relativePath}`))
const currentChapter = computed(() => {
  const route = routeFromRelativePath(page.value.relativePath)
  return getSectionLandingByPath(route) ?? getBranchLandingByPath(route) ?? getChapterByPath(route)
})
const chapterAccent = computed(() => getChapterAccent(currentChapter.value))
const alternateLocale = computed(() => getAlternateLocale(locale.value))
const languageHref = computed(() => withBase(localizeHref(currentChapter.value?.href ?? '/', alternateLocale.value)))

const syncDocumentLanguage = () => {
  if (typeof document === 'undefined') return
  const lang = locale.value === 'en' ? 'en' : 'ko'
  document.documentElement.lang = lang
  if (typeof window !== 'undefined') window.setTimeout(() => { document.documentElement.lang = lang }, 0)
}

onMounted(() => {
  syncDocumentLanguage()
  if (typeof window !== 'undefined') window.setTimeout(syncDocumentLanguage, 30)
  if (page.value.relativePath === 'index.md') router.go(withBase('/ko/'))
})
watch(locale, syncDocumentLanguage)
</script>

<template>
  <div class="ss-app">
    <header class="ss-topbar">
      <div class="ss-topbar-inner">
        <a class="ss-brand" :href="withBase(localizeHref('/', locale))" aria-label="ShieldSigner Guide home">
          <img :src="logoPath" alt="ShieldSigner" />
        </a>
        <label class="ss-topbar-search" role="search">
          <span class="ss-topbar-search-icon" aria-hidden="true"></span>
          <input v-model="guideSearchQuery" type="search" autocomplete="off" placeholder="Search" aria-label="Search guide cards" @keydown.esc="guideSearchQuery = ''" />
          <kbd>/</kbd>
        </label>
        <nav class="ss-top-actions" aria-label="External resources">
          <a class="ss-language-switch" :href="languageHref" :aria-label="alternateLocale === 'en' ? 'Switch to English' : '한국어로 전환'">{{ alternateLocale.toUpperCase() }}</a>
          <a href="https://github.com/JikkeyBTC/ShieldSigner-Guide" target="_blank" rel="noreferrer">GitHub ↗</a>
        </nav>
      </div>
    </header>

    <DocNavBar />

    <div class="ss-docs-shell" :style="{ '--chapter-accent': chapterAccent }">
      <GuideNav />
      <DemoCards />
      <main class="ss-article" tabindex="-1">
        <AnimatedChapter>
          <div class="ss-article-inner">
            <DocBreadcrumb />
            <Content />
            <DocNavBar variant="bottom" />
          </div>
        </AnimatedChapter>
      </main>
    </div>
  </div>
</template>
