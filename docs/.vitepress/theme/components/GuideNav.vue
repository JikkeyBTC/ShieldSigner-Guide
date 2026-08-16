<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { animateEnter } from '../../../../src/guide/animation'
import { chapters, getChapterByPath, type ChapterMeta } from '../../../../src/guide/chapters'
import { getChapterAccent } from '../../../../src/guide/colors'

type NavBranch = { id: string; label: string; chapterIds: readonly string[] }
type NavSection = { id: string; label: string; branches: readonly NavBranch[] }
const sections: readonly NavSection[] = [
  { id: 'getting-started', label: 'Getting started', branches: [{ id: 'overview', label: 'Overview', chapterIds: ['overview'] }] },
  { id: 'build', label: 'Build', branches: [{ id: 'hardware', label: 'Hardware', chapterIds: ['assembly'] }] },
  { id: 'os', label: 'ShieldSigner OS', branches: [{ id: 'install', label: 'Installation', chapterIds: ['os-install'] }, { id: 'verify', label: 'Verification', chapterIds: ['os-verify'] }] },
  { id: 'seedkeeper', label: 'SeedKeeper', branches: [{ id: 'concepts', label: 'Concepts', chapterIds: ['javacard', 'what-is-seedkeeper'] }, { id: 'backup', label: 'Backup & recovery', chapterIds: ['seedkeeper-initialize', 'seedkeeper-backup', 'seedkeeper-clone', 'seedkeeper-restore', 'seedkeeper-recovery'] }] },
  { id: 'wallet', label: 'Watch-only wallets', branches: [{ id: 'bluewallet', label: 'BlueWallet', chapterIds: ['bluewallet'] }, { id: 'coconut', label: 'Coconut', chapterIds: ['coconut'] }] },
  { id: 'transactions', label: 'Transactions', branches: [{ id: 'receive', label: 'Receive', chapterIds: ['receive'] }, { id: 'signing', label: 'Signing', chapterIds: ['sign-psbt'] }] },
  { id: 'reference', label: 'Reference', branches: [{ id: 'safety', label: 'Safety', chapterIds: ['security', 'faq'] }, { id: 'terms', label: 'Terms', chapterIds: ['glossary', 'sources'] }] }
]
const { page } = useData()
const current = computed(() => {
  const path = page.value.relativePath.replace(/\.md$/, '')
  return getChapterByPath(path === 'index' ? '/' : `/${path}/`)
})
const navLinks = ref<Element[]>([])
const chapterById = (id: string) => chapters.find((chapter) => chapter.id === id)
const branchChapters = (branch: NavBranch) => branch.chapterIds.map(chapterById).filter(Boolean) as ChapterMeta[]
const isOpen = (section: NavSection) => section.branches.some((branch) => branch.chapterIds.includes(current.value?.id ?? ''))
const isBranchOpen = (branch: NavBranch) => branch.chapterIds.includes(current.value?.id ?? '')
const href = (chapter: ChapterMeta) => withBase(chapter.href)
const sectionHref = (section: NavSection) => href(branchChapters(section.branches[0])[0])
const branchHref = (branch: NavBranch) => href(branchChapters(branch)[0])
const sectionAccent = (section: NavSection) => getChapterAccent(branchChapters(section.branches[0])[0])
const badge = (chapter: ChapterMeta) => ({ 'os-verify': 'PGP', javacard: 'JS', 'seedkeeper-backup': 'NEW' }[chapter.id])
onMounted(() => animateEnter(navLinks.value))
watch(() => current.value?.id, async () => {
  await nextTick()
  const active = document.querySelector<HTMLElement>('.ss-anime-nav a[aria-current="page"]')
  active?.focus({ preventScroll: true })
})
</script>

<template>
  <aside class="ss-category-nav ss-anime-nav" aria-label="Guide table of contents">
    <div class="ss-rail-label">GUIDE</div>
    <div v-for="section in sections" :key="section.id" class="ss-nav-section" :class="{ 'is-open': isOpen(section) }" :style="{ '--nav-accent': sectionAccent(section) }">
      <a ref="navLinks" class="ss-nav-section-title" :href="sectionHref(section)" :aria-current="isOpen(section) ? 'location' : undefined">{{ section.label }}</a>
      <div v-if="isOpen(section)" class="ss-nav-children">
        <div v-for="branch in section.branches" :key="branch.id" class="ss-nav-branch">
          <a ref="navLinks" class="ss-nav-branch-title" :class="{ 'is-active': isBranchOpen(branch) }" :href="branchHref(branch)">{{ branch.label }}</a>
          <div class="ss-nav-branch-items">
            <a v-for="chapter in branchChapters(branch)" ref="navLinks" :key="chapter.id" class="ss-nav-child ss-reveal" :href="href(chapter)" :aria-current="current?.id === chapter.id ? 'page' : undefined">
              <span>{{ chapter.label }}</span><small v-if="badge(chapter)" class="ss-nav-badge">{{ badge(chapter) }}</small>
            </a>
          </div>
        </div>
      </div>
    </div>
  </aside>
  <nav class="ss-mobile-tabs" aria-label="Guide sections">
    <a v-for="chapter in chapters.filter((item) => ['overview', 'assembly', 'os-install', 'seedkeeper-backup', 'bluewallet'].includes(item.id))" :key="chapter.id" :href="href(chapter)" :aria-current="current?.id === chapter.id ? 'page' : undefined">{{ chapter.label }}</a>
  </nav>
</template>
