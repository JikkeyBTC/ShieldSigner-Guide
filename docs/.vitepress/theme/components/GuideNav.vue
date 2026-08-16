<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'
import { animateEnter } from '../../../../src/guide/animation'
import { chapters, getChapterByPath, type ChapterMeta } from '../../../../src/guide/chapters'
import { branchLandings, getBranchLandingByPath, getSectionLandingByPath, sectionLandings, type BranchLanding, type SectionLanding } from '../../../../src/guide/branches'
import { getChapterAccent } from '../../../../src/guide/colors'
import { getLocalizedLabel, getLocaleFromPath, localizeHref, routeFromRelativePath } from '../../../../src/guide/locales'

type NavBranch = { id: string; label: string; chapterIds: readonly string[]; landingId?: string; showChildren?: boolean }
type NavSection = { id: string; label: string; branches: readonly NavBranch[] }
const sections: readonly NavSection[] = [
  { id: 'getting-started', label: 'Getting started', branches: [{ id: 'hardware', label: 'Hardware', chapterIds: ['assembly'], landingId: 'hardware', showChildren: true }] },
  { id: 'os', label: 'ShieldSigner OS', branches: [{ id: 'install', label: 'Installation', chapterIds: ['os-install'] }, { id: 'verify', label: 'Verification', chapterIds: [], landingId: 'os-verification' }] },
  { id: 'seedkeeper', label: 'SeedKeeper', branches: [{ id: 'concepts', label: 'Concepts', chapterIds: ['javacard', 'what-is-seedkeeper'], landingId: 'seedkeeper-concepts' }, { id: 'backup', label: 'Backup & recovery', chapterIds: ['seedkeeper-initialize', 'seedkeeper-backup', 'seedkeeper-clone', 'seedkeeper-restore', 'seedkeeper-recovery'], landingId: 'seedkeeper-backup-landing' }] },
  { id: 'wallet', label: 'Watch-only wallets', branches: [{ id: 'bluewallet', label: 'BlueWallet', chapterIds: ['bluewallet'] }, { id: 'coconut', label: 'Coconut', chapterIds: ['coconut'] }] },
  { id: 'transactions', label: 'Transactions', branches: [{ id: 'receive', label: 'Receive', chapterIds: [], landingId: 'receive-guide' }, { id: 'send', label: 'Send', chapterIds: [], landingId: 'send-guide' }, { id: 'signing', label: 'Signing', chapterIds: ['sign-psbt'] }] },
  { id: 'reference', label: 'Reference', branches: [{ id: 'safety', label: 'Safety', chapterIds: ['security', 'faq'], landingId: 'reference-safety' }, { id: 'terms', label: 'Terms', chapterIds: ['glossary', 'sources'], landingId: 'reference-terms' }] }
]
const { page } = useData()
const locale = computed(() => getLocaleFromPath(`/${page.value.relativePath}`))
const current = computed(() => {
  const route = routeFromRelativePath(page.value.relativePath)
  return getSectionLandingByPath(route) ?? getBranchLandingByPath(route) ?? getChapterByPath(route)
})
const navLinks = ref<Element[]>([])
const mobileOpen = ref(false)
const mobileSearchOpen = ref(false)
const mobileSearchQuery = ref('')
const chapterById = (id: string) => chapters.find((chapter) => chapter.id === id)
const landingById = (id?: string) => branchLandings.find((landing) => landing.id === id)
const sectionLandingById = (id: string) => sectionLandings.find((landing) => landing.id === id)
const branchChapters = (branch: NavBranch) => branch.chapterIds.map(chapterById).filter(Boolean) as ChapterMeta[]
const label = (id: string, fallback: string) => getLocalizedLabel(id, fallback, locale.value)
const mobileSearchItems = computed(() => [
  ...sectionLandings.map((item) => ({ label: label(item.id, item.label), href: localizeHref(item.href, locale.value), type: 'section' })),
  ...branchLandings.map((item) => ({ label: label(item.id, item.label), href: localizeHref(item.href, locale.value), type: 'category' })),
  ...chapters.filter((item) => item.id !== 'overview').map((item) => ({ label: label(item.id, item.label), href: localizeHref(item.href, locale.value), type: 'page' }))
])
const filteredMobileSearchItems = computed(() => {
  const query = mobileSearchQuery.value.trim().toLocaleLowerCase()
  if (!query) return mobileSearchItems.value.slice(0, 8)
  return mobileSearchItems.value.filter((item) => item.label.toLocaleLowerCase().includes(query)).slice(0, 12)
})
const isOpen = (section: NavSection) => section.id === current.value?.id || section.branches.some((branch) => branch.chapterIds.includes(current.value?.id ?? '') || branch.landingId === current.value?.id)
const isBranchActive = (branch: NavBranch) => branch.landingId === current.value?.id || branch.chapterIds.includes(current.value?.id ?? '')
const hasChildItems = (branch: NavBranch) => branch.showChildren ?? branch.chapterIds.length > 1
const hasChildren = (branch: NavBranch) => hasChildItems(branch) && isBranchActive(branch)
const isBranchOpen = (branch: NavBranch) => isBranchActive(branch)
const href = (chapter: ChapterMeta) => withBase(localizeHref(chapter.href, locale.value))
const landingHref = (landing: BranchLanding) => withBase(localizeHref(landing.href, locale.value))
const sectionHref = (section: NavSection) => {
  const landing = sectionLandingById(section.id)
  return landing ? withBase(localizeHref(landing.href, locale.value)) : branchHref(section.branches[0])
}
const branchHref = (branch: NavBranch) => landingById(branch.landingId) ? landingHref(landingById(branch.landingId)!) : href(branchChapters(branch)[0])
const sectionAccent = (section: NavSection) => {
  const landing = sectionLandingById(section.id)
  return getChapterAccent(landing ?? branchChapters(section.branches[0])[0])
}
const notifyTocNavigation = (event: MouseEvent) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  const anchor = event.currentTarget as HTMLAnchorElement
  window.dispatchEvent(new CustomEvent('ss:toc-navigation', { detail: { href: anchor.getAttribute('href') ?? '' } }))
}
onMounted(() => animateEnter(navLinks.value))
watch(() => current.value?.id, async () => {
  mobileOpen.value = false
  mobileSearchOpen.value = false
  mobileSearchQuery.value = ''
  await nextTick()
  const active = document.querySelector<HTMLElement>('.ss-anime-nav a[aria-current="page"]')
  active?.focus({ preventScroll: true })
})
</script>

<template>
  <Teleport defer to="#ss-doc-nav-mobile-controls">
    <div class="ss-mobile-toolbar" aria-label="Mobile documentation controls">
      <button id="docs-nav-menu" class="docs-nav-menu" type="button" aria-label="Open documentation navigation" aria-controls="ss-mobile-guide-nav" :aria-expanded="mobileOpen" @click="mobileOpen = !mobileOpen">
        <span class="ss-mobile-menu-icon" aria-hidden="true"><i></i><i></i><i></i></span>
      </button>
      <button id="search-nav" class="search-nav" type="button" aria-label="Search documentation" :aria-expanded="mobileSearchOpen" aria-controls="ss-mobile-search" @click="mobileSearchOpen = !mobileSearchOpen">
        <span class="ss-search-glyph" aria-hidden="true"></span>
      </button>
    </div>
    <div v-if="mobileSearchOpen" id="ss-mobile-search" class="ss-mobile-search-panel" role="search">
      <label class="ss-mobile-search-box">
        <span class="ss-mobile-search-icon" aria-hidden="true">⌕</span>
        <input v-model="mobileSearchQuery" type="search" placeholder="Search documentation" aria-label="Search documentation" @keydown.esc="mobileSearchOpen = false">
      </label>
      <div class="ss-mobile-search-results" aria-live="polite">
      <a v-for="item in filteredMobileSearchItems" :key="`${item.type}-${item.href}`" :href="withBase(item.href)" @click="notifyTocNavigation($event); mobileSearchOpen = false">
          <span>{{ item.label }}</span><small>{{ item.type }}</small>
        </a>
        <p v-if="filteredMobileSearchItems.length === 0">No matching pages.</p>
      </div>
    </div>
  </Teleport>
  <div v-if="mobileOpen" class="ss-mobile-menu-scrim" aria-hidden="true" @click="mobileOpen = false"></div>
  <aside id="ss-mobile-guide-nav" class="ss-category-nav ss-anime-nav" :class="{ 'is-mobile-open': mobileOpen }" aria-label="Guide table of contents">
    <div v-for="section in sections" :key="section.id" class="ss-nav-section" :class="{ 'is-open': isOpen(section) }" :style="{ '--nav-accent': sectionAccent(section) }">
      <a ref="navLinks" class="ss-nav-section-title" :class="{ 'is-active': section.id === current?.id }" :href="sectionHref(section)" :aria-current="isOpen(section) ? 'location' : undefined" @click="notifyTocNavigation">{{ label(section.id, section.label) }}</a>
      <div v-if="isOpen(section)" class="ss-nav-children">
        <div v-for="branch in section.branches" :key="branch.id" class="ss-nav-branch" :class="{ 'has-children': hasChildren(branch), 'is-active': isBranchOpen(branch) }">
          <a ref="navLinks" class="ss-nav-branch-title" :class="{ 'is-active': isBranchOpen(branch) }" :href="branchHref(branch)" :aria-current="isBranchOpen(branch) ? 'location' : undefined" @click="notifyTocNavigation">{{ label(branch.id, branch.label) }}</a>
          <div v-if="hasChildren(branch)" class="ss-nav-branch-items">
            <a v-for="chapter in branchChapters(branch)" ref="navLinks" :key="chapter.id" class="ss-nav-child ss-reveal" :href="href(chapter)" :aria-current="current?.id === chapter.id ? 'page' : undefined" @click="notifyTocNavigation">
              <span>{{ label(chapter.id, chapter.label) }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
