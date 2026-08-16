<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import { animate, scrambleText, stagger } from 'animejs'
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

const sectionCards = computed<GuideCard[]>(() => sectionLandings.map((landing, index) => ({
  ...landing,
  id: `section-${landing.id}`,
  sourceHref: landing.href,
  href: localizeHref(landing.href, locale.value),
  label: getLocalizedLabel(landing.id, landing.label, locale.value),
  order: index + 1,
  type: 'category',
  caption: 'SECTION',
  displayTitle: getLocalizedLabel(landing.id, landing.label, locale.value)
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
  displayTitle: getLocalizedLabel(landing.id, landing.label, locale.value)
})))

const chapterCards = computed<GuideCard[]>(() => chapters.filter((chapter) => chapter.id !== 'overview').map((chapter) => ({
  ...chapter,
  sourceHref: chapter.href,
  href: localizeHref(chapter.href, locale.value),
  label: getLocalizedChapterLabel(chapter.id, chapter.label, locale.value),
  type: cardType(chapter),
  caption: chapter.group.toUpperCase(),
  displayTitle: getLocalizedChapterLabel(chapter.id, chapter.label, locale.value),
  chapterId: chapter.id
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
const seedkeeperLogo = withBase('/brand/seedkeeper/seedkeeper_logo_black.png')
const seedkeeperIcon = withBase('/brand/seedkeeper/seedkeeper_icon.png')
const shieldsignerLogo = withBase('/brand/shieldsigner.svg')
const bitcoinAsset = withBase('/brand/bitcoin.svg')
const userAsset = withBase('/brand/user-circle.svg')
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
let skipNextRailSync = false
let alignNextRailCard = false

const transferDistance = (cardElement: HTMLElement) => {
  const user = cardElement.querySelector<HTMLElement>('.ss-demo-transfer-user')
  const bitcoin = cardElement.querySelector<HTMLElement>('.ss-demo-transfer-bitcoin')
  if (!user || !bitcoin) return 0
  return Math.max(0, bitcoin.offsetLeft - user.offsetLeft)
}

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

onMounted(() => window.addEventListener('ss:toc-navigation', handleTocNavigation))
onBeforeUnmount(() => window.removeEventListener('ss:toc-navigation', handleTocNavigation))

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
  const targets = (selector: string) => Array.from(cardElement.querySelectorAll(selector))
  if (card.type === 'category' && card.id !== 'section-os') animate(targets('.ss-demo-category-shape'), { translateY: [10, -5, 0], rotate: [-4, 4, 0], opacity: [.45, 1, 1], delay: stagger(90), duration: 520, ease: 'inOutSine' })
  if (card.id === 'section-os') animate(targets('.ss-demo-os-logo'), { scale: [.94, 1.02, 1], opacity: [.72, 1, 1], duration: 520, ease: 'out(3)' })
  if (card.id === 'branch-hardware' || card.id === 'section-build' || card.id === 'assembly') animate(targets('.ss-demo-stagger i'), { translateY: [18, 0], rotate: [-8, 0], opacity: [.35, 1], delay: stagger(120), duration: 560, ease: 'out(3)' })
  if (card.id === 'os-install') animate(targets('.ss-demo-install-progress'), { scaleX: [0, 1], transformOrigin: 'left center', duration: 620, ease: 'out(2)' })
  if (card.type === 'verify') animate([...targets('.ss-demo-dot'), ...targets('.ss-demo-line')], { scale: [.75, 1.15, 1], opacity: [.45, 1, 1], delay: stagger(90), duration: 520, ease: 'inOutSine' })
  if (card.type === 'seed') animate([...targets('.ss-demo-seed-logo'), ...targets('.ss-demo-seed-icon'), ...targets('.ss-demo-card-chip'), ...targets('.ss-demo-lock')], { rotateY: [0, 360], scale: [.85, 1.08, 1], delay: stagger(90), duration: 560, ease: 'inOutSine' })
  if (card.type === 'wallet') animate(targets('.ss-demo-qr-node'), { scale: [.75, 1.12, 1], opacity: [.45, 1, 1], delay: stagger(110), duration: 500, ease: 'inOutSine' })
  if (card.id === 'branch-send') {
    const bitcoin = cardElement.querySelector<HTMLElement>('.ss-demo-transfer-bitcoin')
    const distance = transferDistance(cardElement)
    if (bitcoin && distance > 0) animate(bitcoin, { translateX: { from: `${-distance}px`, to: '0px', duration: 680, ease: 'out(3)' } })
  } else if (card.id === 'branch-receive') {
    const bitcoin = cardElement.querySelector<HTMLElement>('.ss-demo-transfer-bitcoin')
    const distance = transferDistance(cardElement)
    if (bitcoin && distance > 0) animate(bitcoin, { translateX: { from: '0px', to: `${-distance}px`, duration: 680, ease: 'out(3)' } })
  } else if (card.type === 'flow') {
    animate([...targets('.ss-demo-flow-node'), ...targets('.ss-demo-flow i')], { translateX: [-8, 8, 0], opacity: [.35, 1, 1], delay: stagger(90), duration: 520, ease: 'inOutSine' })
  }
  if (card.type === 'reference') animate(targets('.ss-demo-ref-line'), { innerHTML: scrambleText({ chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }), delay: stagger(100), duration: 520, ease: 'linear' })
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
    <a v-for="card in visibleCards" :key="card.id" class="ss-demo-card ss-reveal vp-raw" :style="{ '--card-accent': accentFor(card) }" :href="href(card)" :aria-current="isCurrent(card) ? 'page' : undefined" @click="runCardAnimation($event, card)">
      <header><span class="ss-scramble-title">{{ card.displayTitle }}</span></header>
      <div v-if="card.id === 'branch-send'" class="ss-demo-visual ss-demo-transfer ss-demo-transfer--send" aria-label="User sends Bitcoin"><img class="ss-demo-transfer-user" :src="userAsset" alt=""><span class="ss-demo-transfer-arrow" aria-hidden="true"></span><img class="ss-demo-transfer-bitcoin" :src="bitcoinAsset" alt=""></div>
      <div v-else-if="card.id === 'branch-receive'" class="ss-demo-visual ss-demo-transfer ss-demo-transfer--receive" aria-label="User receives Bitcoin"><img class="ss-demo-transfer-user" :src="userAsset" alt=""><span class="ss-demo-transfer-arrow" aria-hidden="true"></span><img class="ss-demo-transfer-bitcoin" :src="bitcoinAsset" alt=""></div>
      <div v-else-if="card.id === 'section-os'" class="ss-demo-visual ss-demo-category ss-demo-os"><img class="ss-demo-os-logo" :src="shieldsignerLogo" alt="ShieldSigner"></div>
      <div v-else-if="card.type === 'category'" class="ss-demo-visual ss-demo-category"><i class="ss-demo-category-shape"></i><i class="ss-demo-category-shape"></i><i class="ss-demo-category-shape"></i></div>
      <div v-else-if="card.type === 'intro' && card.id === 'os-install'" class="ss-demo-visual ss-demo-intro ss-demo-install"><span class="ss-demo-install-track"><i class="ss-demo-install-progress"></i></span><b>FLASH / BOOT</b></div>
      <div v-else-if="card.type === 'intro'" class="ss-demo-visual ss-demo-intro ss-demo-stagger"><i></i><i></i><i></i></div>
      <div v-else-if="card.type === 'verify'" class="ss-demo-visual ss-demo-verify"><span class="ss-demo-dot"></span><span class="ss-demo-line"></span><span class="ss-demo-line short"></span><b>SHA-256</b></div>
      <div v-else-if="card.type === 'seed'" class="ss-demo-visual ss-demo-seed" :class="{ 'ss-demo-seed--backup': card.id === 'seedkeeper-backup' }">
        <div v-if="card.id === 'seedkeeper-backup'" class="ss-demo-seed-resource-field" aria-hidden="true">
          <img class="ss-demo-seed-logo ss-demo-seed-logo--hero" :src="seedkeeperLogo" alt="">
        </div>
        <template v-else>
          <img class="ss-demo-seed-icon" :src="seedkeeperIcon" alt="">
          <span class="ss-demo-card-chip"></span><span class="ss-demo-lock">⌁</span><b>ENCRYPTED</b>
        </template>
      </div>
      <div v-else-if="card.type === 'flow'" class="ss-demo-visual ss-demo-flow"><span class="ss-demo-flow-node">ADDR</span><i>→</i><span class="ss-demo-flow-node">PSBT</span><i>→</i><span class="ss-demo-flow-node">SIGN</span></div>
      <div v-else-if="card.type === 'reference'" class="ss-demo-visual ss-demo-reference"><span class="ss-demo-ref-line">FAQ / TERMS</span><span class="ss-demo-ref-line">SOURCES / SAFE</span></div>
      <div v-else class="ss-demo-visual ss-demo-wallet"><span class="ss-demo-qr-node">XPUB</span><span class="ss-demo-qr-node">QR</span><span class="ss-demo-qr-node">PSBT</span></div>
    </a>
    <p v-if="visibleCards.length === 0" class="ss-card-search-empty">No matching chapters.</p>
  </aside>
</template>
