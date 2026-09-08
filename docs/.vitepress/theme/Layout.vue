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
import { DEFAULT_LOCALE, getAlternateLocale, getLocaleSettings, localizeHref, routeFromRelativePath, getLocaleFromPath } from '../../../src/guide/locales'
import CardRailNav from './components/CardRailNav.vue'

const logoPath = withBase('/brand/shieldsigner-logo-cutout.png')
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
const localeSettings = computed(() => getLocaleSettings(locale.value))

const syncDocumentLanguage = () => {
  if (typeof document === 'undefined') return
  const lang = localeSettings.value.htmlLang
  document.documentElement.lang = lang
  if (typeof window !== 'undefined') window.setTimeout(() => { document.documentElement.lang = lang }, 0)
}

onMounted(() => {
  syncDocumentLanguage()
  if (typeof window !== 'undefined') window.setTimeout(syncDocumentLanguage, 30)
  if (page.value.relativePath === 'index.md') router.go(withBase(localizeHref('/', DEFAULT_LOCALE)))
})
watch(locale, syncDocumentLanguage)
</script>

<template>
  <div class="ss-app">
    <header class="ss-topbar">
      <div class="ss-topbar-inner">
        <a class="ss-brand" :href="withBase(localizeHref('/', locale))" :aria-label="localeSettings.homeAriaLabel">
          <img :src="logoPath" alt="ShieldSigner" width="1214" height="389" />
        </a>
        <CardRailNav />
        <nav class="ss-top-actions" aria-label="External resources">
          <span class="ss-language-pair" aria-label="Language">
            <template v-if="locale === 'ko'">
              <span class="ss-locale-current is-active">KO</span>
              <span class="ss-locale-divider" aria-hidden="true">/</span>
              <a class="ss-language-switch" :href="languageHref" :aria-label="localeSettings.switchAriaLabel">{{ localeSettings.switchText }}</a>
            </template>
            <template v-else>
              <a class="ss-language-switch" :href="languageHref" :aria-label="localeSettings.switchAriaLabel">{{ localeSettings.switchText }}</a>
              <span class="ss-locale-divider" aria-hidden="true">/</span>
              <span class="ss-locale-current is-active">EN</span>
            </template>
          </span>
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
