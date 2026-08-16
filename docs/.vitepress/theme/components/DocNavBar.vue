<script setup lang="ts">
import { computed } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import { branchCards, getBranchLandingByPath, getSectionLandingByPath, sectionLandings } from '../../../../src/guide/branches'
import { chapters, getChapterByPath } from '../../../../src/guide/chapters'
import { guideCardOrder } from '../../../../src/guide/card-order'
import { getChapterAccent } from '../../../../src/guide/colors'

type NavCard = {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly kind: 'section' | 'branch' | 'chapter'
}

const { page } = useData()
const router = useRouter()
const current = computed(() => {
  const path = page.value.relativePath.replace(/\.md$/, '')
  const route = path === 'index' ? '/' : path.endsWith('/index') ? `/${path.slice(0, -6)}/` : `/${path}/`
  return getSectionLandingByPath(route) ?? getBranchLandingByPath(route) ?? getChapterByPath(route)
})
const cards = computed<NavCard[]>(() => {
  const sectionById = new Map(sectionLandings.map((item) => [item.id, item]))
  const branchById = new Map(branchCards.map((item) => [item.id, item]))
  const chapterById = new Map(chapters.filter((item) => item.id !== 'overview').map((item) => [item.id, item]))
  return guideCardOrder.map(({ kind, id }) => {
    const item = kind === 'section' ? sectionById.get(id) : kind === 'branch' ? branchById.get(id) : chapterById.get(id)
    return item ? { id, label: item.label, href: item.href, kind } : undefined
  }).filter(Boolean) as NavCard[]
})
const activeIndex = computed(() => {
  const href = current.value?.href
  const index = cards.value.findIndex((card) => card.href === href)
  return index >= 0 ? index : 0
})
const previous = computed(() => cards.value[activeIndex.value - 1])
const next = computed(() => cards.value[activeIndex.value + 1])
const accent = computed(() => getChapterAccent(current.value))

const goTo = (card?: NavCard) => {
  if (!card) return
  router.go(withBase(card.href))
}
</script>

<template>
  <nav class="ss-doc-nav-bar" aria-label="Document navigation" :style="{ '--nav-accent': accent }">
    <div class="ss-doc-nav-inner">
      <div class="ss-doc-nav-mobile-controls">
      </div>
      <div class="ss-doc-nav-context">
        <span class="ss-doc-nav-eyebrow">GUIDE</span>
        <span class="ss-doc-nav-current">{{ current?.label ?? 'ShieldSigner Guide' }}</span>
      </div>
      <div class="ss-doc-nav-actions">
        <span class="ss-doc-nav-count">{{ String(activeIndex + 1).padStart(2, '0') }} / {{ String(cards.length).padStart(2, '0') }}</span>
        <button type="button" class="ss-doc-nav-button" :disabled="!previous" aria-label="Previous card" :aria-disabled="!previous" @click="goTo(previous)">
          <span aria-hidden="true">↑</span><span class="ss-doc-nav-button-label">Previous</span>
        </button>
        <button type="button" class="ss-doc-nav-button" :disabled="!next" aria-label="Next card" :aria-disabled="!next" @click="goTo(next)">
          <span aria-hidden="true">↓</span><span class="ss-doc-nav-button-label">Next</span>
        </button>
      </div>
    </div>
  </nav>
</template>
