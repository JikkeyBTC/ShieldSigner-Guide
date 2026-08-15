<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { animateEnter } from '../../../../src/guide/animation'
import { chapters, getChapterByPath, type ChapterMeta } from '../../../../src/guide/chapters'

type NavSection = { id: string; label: string; chapterIds: readonly string[] }
const sections: readonly NavSection[] = [
  { id: 'getting-started', label: 'Getting started', chapterIds: ['overview'] },
  { id: 'build', label: 'Build', chapterIds: ['assembly'] },
  { id: 'os', label: 'ShieldSigner OS', chapterIds: ['os-install', 'os-verify'] },
  { id: 'seedkeeper', label: 'SeedKeeper', chapterIds: ['javacard', 'what-is-seedkeeper', 'seedkeeper-initialize', 'seedkeeper-backup', 'seedkeeper-clone', 'seedkeeper-restore', 'seedkeeper-recovery'] },
  { id: 'wallet', label: 'Watch-only wallets', chapterIds: ['bluewallet', 'coconut'] },
  { id: 'transactions', label: 'Transactions', chapterIds: ['receive', 'sign-psbt'] },
  { id: 'reference', label: 'Reference', chapterIds: ['security', 'faq', 'glossary', 'sources'] }
]
const { page } = useData()
const current = computed(() => {
  const path = page.value.relativePath.replace(/\.md$/, '')
  return getChapterByPath(path === 'index' ? '/' : `/${path}/`)
})
const navLinks = ref<Element[]>([])
const chapterById = (id: string) => chapters.find((chapter) => chapter.id === id)
const sectionChapters = (section: NavSection) => section.chapterIds.map(chapterById).filter(Boolean) as ChapterMeta[]
const isOpen = (section: NavSection) => section.chapterIds.includes(current.value?.id ?? '')
const href = (chapter: ChapterMeta) => withBase(chapter.href)
const badge = (chapter: ChapterMeta) => ({ 'os-verify': 'PGP', javacard: 'JS', 'seedkeeper-backup': 'NEW' }[chapter.id])
onMounted(() => animateEnter(navLinks.value))
</script>

<template>
  <aside class="ss-category-nav ss-anime-nav" aria-label="Guide table of contents">
    <div class="ss-rail-label">GUIDE</div>
    <div v-for="section in sections" :key="section.id" class="ss-nav-section" :class="{ 'is-open': isOpen(section) }">
      <div class="ss-nav-section-title">{{ section.label }}</div>
      <div v-if="isOpen(section)" class="ss-nav-children">
        <a v-for="chapter in sectionChapters(section)" ref="navLinks" :key="chapter.id" class="ss-nav-child ss-reveal" :href="href(chapter)" :aria-current="current?.id === chapter.id ? 'page' : undefined">
          <span>{{ chapter.label }}</span><small v-if="badge(chapter)" class="ss-nav-badge">{{ badge(chapter) }}</small>
        </a>
      </div>
    </div>
  </aside>
  <nav class="ss-mobile-tabs" aria-label="Guide sections">
    <a v-for="chapter in chapters.filter((item) => ['overview', 'assembly', 'os-install', 'seedkeeper-backup', 'bluewallet'].includes(item.id))" :key="chapter.id" :href="href(chapter)" :aria-current="current?.id === chapter.id ? 'page' : undefined">{{ chapter.label }}</a>
  </nav>
</template>
