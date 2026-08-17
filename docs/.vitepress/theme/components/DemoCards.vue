<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import { animate, scrambleText } from 'animejs'
import { chapters, getChapterByPath, type ChapterMeta } from '../../../../src/guide/chapters'
import { branchCards, getBranchLandingByPath, getSectionLandingByPath, sectionLandings } from '../../../../src/guide/branches'
import { getChapterAccent } from '../../../../src/guide/colors'
import { guideCardOrder } from '../../../../src/guide/card-order'
import { getLocalizedChapterLabel, getLocalizedLabel, getLocaleFromPath, localizeHref, routeFromRelativePath } from '../../../../src/guide/locales'

type GuideCard = {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly sourceHref: string
  readonly group: string
  readonly order: number
  readonly type: string
  readonly caption: string
  readonly displayTitle: string
  readonly chapterId?: string
  readonly visual: string
}

const { page } = useData()
const locale = computed(() => getLocaleFromPath(`/${page.value.relativePath}`))

const cardType = (chapter: ChapterMeta) => {
  if (chapter.id === 'os-verify') return 'verify'
  if (chapter.group === 'SeedKeeper') return 'seed'
  if (chapter.group === '워치온리 지갑') return 'wallet'
  if (chapter.group === '거래') return 'flow'
  if (chapter.group === '참고') return 'reference'
  return 'intro'
}

const cardVisual = (id: string) => ({
  'section-getting-started': 'shield-check',
  'section-os': 'shield-logo',
  'section-seedkeeper': 'seed-vault',
  'section-wallet': 'eye-wallet',
  'section-transactions': 'bitcoin-flow',
  'section-reference': 'book-links',
  'branch-hardware': 'circuit-board',
  'branch-installation': 'sd-flash',
  'branch-verification': 'hash-check',
  'branch-concepts': 'chip',
  'branch-backup-recovery': 'backup-cycle',
  'branch-bluewallet': 'bluewallet',
  'branch-coconut': 'coconut',
  'branch-receive': 'receive',
  'branch-send': 'send',
  'branch-signing': 'signature',
  'branch-safety': 'shield-warning',
  'branch-terms': 'terms',
  assembly: 'screwdriver',
  'os-install': 'sd-flash',
  javacard: 'smart-card',
  'what-is-seedkeeper': 'vault',
  'seedkeeper-initialize': 'pin-lock',
  'seedkeeper-backup': 'seed-upload',
  'seedkeeper-clone': 'card-copy',
  'seedkeeper-restore': 'restore',
  'seedkeeper-recovery': 'recovery-route',
  bluewallet: 'bluewallet',
  coconut: 'coconut',
  'sign-psbt': 'signature',
  security: 'shield-check',
  faq: 'faq',
  glossary: 'glossary',
  sources: 'source-link',
} as Record<string, string>)[id] ?? 'terms'

const sectionCards = computed<GuideCard[]>(() => sectionLandings.map((landing, index) => ({
  ...landing,
  id: `section-${landing.id}`,
  sourceHref: landing.href,
  href: localizeHref(landing.href, locale.value),
  label: getLocalizedLabel(landing.id, landing.label, locale.value),
  order: index + 1,
  type: 'category',
  caption: 'SECTION',
  displayTitle: getLocalizedLabel(landing.id, landing.label, locale.value),
  visual: cardVisual(`section-${landing.id}`)
})))

const branchLandingCards = computed<GuideCard[]>(() => branchCards.map((landing, index) => ({
  ...landing,
  id: `branch-${landing.id}`,
  sourceHref: landing.href,
  href: localizeHref(landing.href, locale.value),
  label: getLocalizedLabel(landing.id, landing.label, locale.value),
  order: index + 1,
  type: 'category',
  caption: 'CATEGORY',
  displayTitle: getLocalizedLabel(landing.id, landing.label, locale.value),
  visual: cardVisual(`branch-${landing.id}`)
})))

const chapterCards = computed<GuideCard[]>(() => chapters.filter((chapter) => chapter.id !== 'overview').map((chapter) => ({
  ...chapter,
  sourceHref: chapter.href,
  href: localizeHref(chapter.href, locale.value),
  label: getLocalizedChapterLabel(chapter.id, chapter.label, locale.value),
  type: cardType(chapter),
  caption: chapter.group.toUpperCase(),
  displayTitle: getLocalizedChapterLabel(chapter.id, chapter.label, locale.value),
  chapterId: chapter.id,
  visual: cardVisual(chapter.id)
})))

const cards = computed<GuideCard[]>(() => {
  const sectionCardById = new Map(sectionCards.value.map((card) => [card.id.replace('section-', ''), card]))
  const branchCardById = new Map(branchLandingCards.value.map((card) => [card.id.replace('branch-', ''), card]))
  const chapterCardById = new Map(chapterCards.value.map((card) => [card.chapterId, card]))
  return guideCardOrder.map(({ kind, id }) => kind === 'section' ? sectionCardById.get(id) : kind === 'branch' ? branchCardById.get(id) : chapterCardById.get(id)).filter(Boolean) as GuideCard[]
})
const accentFor = (card: GuideCard) => getChapterAccent(card)
// Search is a documentation overlay in the global topbar. Keep the card rail
// stable so searching never filters or visually focuses unrelated cards.
const visibleCards = computed(() => cards.value)

const router = useRouter()
const current = computed(() => {
  const route = routeFromRelativePath(page.value.relativePath)
  return getSectionLandingByPath(route) ?? getBranchLandingByPath(route) ?? getChapterByPath(route)
})
const href = (card: GuideCard) => withBase(card.href)
const activeCard = computed(() => {
  const matches = cards.value.filter((card) => card.sourceHref === current.value?.href)
  return matches.find((card) => card.chapterId) ?? matches.find((card) => card.id.startsWith('branch-')) ?? matches.find((card) => card.id.startsWith('section-')) ?? matches[0]
})
const isCurrent = (card: GuideCard) => activeCard.value?.id === card.id
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
let skipNextRailSync = false
let alignNextRailCard = false

const revealCardIfNeeded = (rail: HTMLElement, card: HTMLElement) => {
  const railBox = rail.getBoundingClientRect()
  const visibleTop = railBox.top + 8
  const visibleBottom = railBox.bottom - 8
  const cardBox = card.getBoundingClientRect()
  let correction = 0
  if (cardBox.bottom > visibleBottom) correction = cardBox.bottom - visibleBottom
  else if (cardBox.top < visibleTop) correction = cardBox.top - visibleTop
  if (!correction) return
  const cappedCorrection = Math.sign(correction) * Math.min(Math.abs(correction), 180)
  const maxScroll = Math.max(0, rail.scrollHeight - rail.clientHeight)
  const nextScrollTop = Math.min(maxScroll, Math.max(0, rail.scrollTop + cappedCorrection))
  rail.scrollTo({ top: nextScrollTop, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

const scrollCardToTop = (rail: HTMLElement, card: HTMLElement) => {
  const railBox = rail.getBoundingClientRect()
  const visibleTop = railBox.top + 8
  const cardBox = card.getBoundingClientRect()
  const maxScroll = Math.max(0, rail.scrollHeight - rail.clientHeight)
  const nextScrollTop = Math.min(maxScroll, Math.max(0, rail.scrollTop + cardBox.top - visibleTop))
  rail.scrollTo({ top: nextScrollTop, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}

const handleTocNavigation = (event: Event) => {
  const targetHref = (event as CustomEvent<{ href?: string }>).detail?.href
  const rail = document.querySelector<HTMLElement>('.ss-demo-rail')
  if (!rail) return
  const card = Array.from(rail.querySelectorAll<HTMLElement>('.ss-demo-card')).find((item) => item.getAttribute('href') === targetHref)
  const guideCard = cards.value.find((item) => href(item) === targetHref)
  if (card && guideCard) playCardAnimation(card, guideCard)
  if (card?.getAttribute('aria-current') === 'page') {
    scrollCardToTop(rail, card)
    return
  }
  alignNextRailCard = true
}

onMounted(() => {
  window.addEventListener('ss:toc-navigation', handleTocNavigation)
})
onBeforeUnmount(() => {
  window.removeEventListener('ss:toc-navigation', handleTocNavigation)
})

const navigateBesideCards = (path: string) => {
  const scrollY = window.scrollY
  router.go(path).then(() => {
    let attempts = 0
    const restore = () => {
      window.scrollTo(0, scrollY)
      attempts += 1
      if (attempts < 8) requestAnimationFrame(restore)
    }
    requestAnimationFrame(restore)
  })
}

watch(() => current.value?.id, async (id) => {
  if (!id) return
  await nextTick()
  if (alignNextRailCard) {
    alignNextRailCard = false
    const rail = document.querySelector<HTMLElement>('.ss-demo-rail')
    const card = rail?.querySelector<HTMLElement>('.ss-demo-card[aria-current="page"]')
    if (rail && card) scrollCardToTop(rail, card)
    return
  }
  if (skipNextRailSync) {
    skipNextRailSync = false
    return
  }
  const rail = document.querySelector<HTMLElement>('.ss-demo-rail')
  const card = rail?.querySelector<HTMLElement>('.ss-demo-card[aria-current="page"]')
  if (!rail || !card) return
  revealCardIfNeeded(rail, card)
})

const playCardAnimation = (cardElement: HTMLElement, card: GuideCard) => {
  if (prefersReducedMotion()) return
  const title = cardElement.querySelector('.ss-scramble-title')
  if (title) animate(title, { innerHTML: scrambleText({ chars: '01ABCDEFGHIJKLMNOPQRSTUVWXYZ' }), duration: 480, ease: 'linear' })
}

const runCardAnimation = (event: MouseEvent, card: GuideCard) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  const cardElement = event.currentTarget as HTMLElement
  const rail = cardElement.closest<HTMLElement>('.ss-demo-rail')
  if (rail) revealCardIfNeeded(rail, cardElement)
  skipNextRailSync = card.href !== current.value?.href
  playCardAnimation(cardElement, card)
  if (prefersReducedMotion()) {
    navigateBesideCards(href(card))
    return
  }
  navigateBesideCards(href(card))
}
</script>

<template>
  <aside class="ss-demo-rail" aria-label="Guide visual chapters">
    <a v-for="card in visibleCards" :key="card.id" class="ss-demo-card ss-reveal vp-raw" :data-card-visual="card.visual" :style="{ '--card-accent': accentFor(card) }" :href="href(card)" :aria-current="isCurrent(card) ? 'page' : undefined" @click="runCardAnimation($event, card)">
      <header><span class="ss-scramble-title">{{ card.displayTitle }}</span></header>
      <div class="ss-demo-visual ss-demo-visual--empty" aria-hidden="true"></div>
    </a>
    <p v-if="visibleCards.length === 0" class="ss-card-search-empty">No matching chapters.</p>
  </aside>
</template>
