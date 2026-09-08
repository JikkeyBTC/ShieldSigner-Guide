<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import { animate, scrambleText } from 'animejs'
import { chapters, getChapterByPath, type ChapterMeta } from '../../../../src/guide/chapters'
import { branchCards, getBranchLandingByPath, getSectionLandingByPath, sectionLandings } from '../../../../src/guide/branches'
import { getChapterAccent } from '../../../../src/guide/colors'
import { guideCardOrder } from '../../../../src/guide/card-order'
import { getLocalizedChapterLabel, getLocalizedLabel, getLocaleFromPath, isGuideRouteHidden, localizeHref, routeFromRelativePath } from '../../../../src/guide/locales'
import CardGlyph from './CardGlyph.vue'

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

type CardAsset = {
  readonly key: string
  readonly path: string
  readonly fit: 'cover' | 'contain'
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
  'seedkeeper-save': 'seed-upload',
  'seedkeeper-load': 'restore',
  bluewallet: 'bluewallet',
  coconut: 'coconut',
  'sign-psbt': 'signature',
  security: 'shield-check',
  faq: 'faq',
  glossary: 'glossary',
  sources: 'source-link',
} as Record<string, string>)[id] ?? 'terms'

const cardAssets: Record<string, CardAsset> = {
  'section-getting-started': { key: 'local-device-check', path: '/guides/os/install-reference/15-device-check.jpg', fit: 'cover' },
  'branch-hardware': { key: 'local-device-check', path: '/guides/os/install-reference/15-device-check.jpg', fit: 'cover' },
  assembly: { key: 'local-device-check', path: '/guides/os/install-reference/15-device-check.jpg', fit: 'cover' },
  'section-os': { key: 'local-release-assets', path: '/guides/os/release-assets.png', fit: 'cover' },
  'branch-installation': { key: 'local-install-image', path: '/guides/os/install-reference/10-imager-image-file.png', fit: 'cover' },
  'os-install': { key: 'local-install-complete', path: '/guides/os/install-reference/14-imager-complete.png', fit: 'cover' },
  'branch-verification': { key: 'local-verification-flow', path: '/guides/os/verification-flow.svg', fit: 'cover' },
  'section-seedkeeper': { key: 'local-seedkeeper-logo', path: '/brand/seedkeeper/seedkeeper_logo_black.png', fit: 'contain' },
  'branch-concepts': { key: 'local-select-applet', path: '/guides/seedkeeper/initialize/15-select-applet-screen.png', fit: 'cover' },
  javacard: { key: 'local-select-applet', path: '/guides/seedkeeper/initialize/15-select-applet-screen.png', fit: 'cover' },
  'what-is-seedkeeper': { key: 'local-seedkeeper-icon', path: '/brand/seedkeeper/seedkeeper_icon.png', fit: 'contain' },
  'branch-backup-recovery': { key: 'local-card-menu', path: '/guides/seedkeeper/initialize/06-smartcard-menu-screen.png', fit: 'cover' },
  'seedkeeper-initialize': { key: 'local-applet-installed', path: '/guides/seedkeeper/initialize/17-applet-installed-screen.png', fit: 'cover' },
  'seedkeeper-save': { key: 'local-seed-saved', path: '/guides/seedkeeper/transfer/06-secret-saved-device.png', fit: 'cover' },
  'seedkeeper-load': { key: 'local-seed-loaded', path: '/guides/seedkeeper/transfer/14-seed-loaded-device.png', fit: 'cover' },
  'section-wallet': { key: 'local-wallet-type', path: '/guides/wallet/coconut/05-wallet-type.png', fit: 'cover' },
  'branch-bluewallet': { key: 'photo-smartphone-qr', path: '/brand/card-photos/smartphone-qr.jpg', fit: 'cover' },
  bluewallet: { key: 'photo-smartphone-qr', path: '/brand/card-photos/smartphone-qr.jpg', fit: 'cover' },
  'branch-coconut': { key: 'local-coconut-add', path: '/guides/wallet/coconut/09-add-watch-only-wallet.png', fit: 'cover' },
  coconut: { key: 'local-coconut-wallet', path: '/guides/wallet/coconut/12-wallet-added.png', fit: 'cover' },
  'section-transactions': { key: 'photo-bitcoin', path: '/brand/card-photos/bitcoin.jpg', fit: 'cover' },
  'branch-receive': { key: 'photo-smartphone-qr', path: '/brand/card-photos/smartphone-qr.jpg', fit: 'cover' },
  'branch-send': { key: 'photo-wallet-hands', path: '/brand/card-photos/wallet-hands.jpg', fit: 'cover' },
  'branch-signing': { key: 'local-signature', path: '/guides/os/message-signature.png', fit: 'cover' },
  'sign-psbt': { key: 'local-signature', path: '/guides/os/message-signature.png', fit: 'cover' },
  'section-reference': { key: 'photo-reference-flatlay', path: '/brand/card-photos/reference-flatlay.jpg', fit: 'cover' },
  'branch-safety': { key: 'photo-security-padlock', path: '/brand/card-photos/security-padlock.jpg', fit: 'cover' },
  security: { key: 'photo-security-padlock', path: '/brand/card-photos/security-padlock.jpg', fit: 'cover' },
  'branch-terms': { key: 'photo-seedkeeper-notebook', path: '/brand/card-photos/seedkeeper-notebook.jpg', fit: 'cover' },
  faq: { key: 'photo-seedkeeper-notebook', path: '/brand/card-photos/seedkeeper-notebook.jpg', fit: 'cover' },
  glossary: { key: 'photo-javacard-chip', path: '/brand/card-photos/javacard-chip.jpg', fit: 'cover' },
  sources: { key: 'local-release-assets', path: '/guides/os/release-assets.png', fit: 'cover' },
}

const cardAssetFor = (card: GuideCard) => {
  const asset = cardAssets[card.id]
  return asset ? { ...asset, src: withBase(asset.path) } : undefined
}

const sectionCards = computed<GuideCard[]>(() => sectionLandings.filter((landing) => !isGuideRouteHidden(landing.href, locale.value)).map((landing, index) => ({
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

const branchLandingCards = computed<GuideCard[]>(() => branchCards.filter((landing) => !isGuideRouteHidden(landing.href, locale.value)).map((landing, index) => ({
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

const chapterCards = computed<GuideCard[]>(() => chapters.filter((chapter) => chapter.id !== 'overview' && !isGuideRouteHidden(chapter.href, locale.value)).map((chapter) => ({
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

const scrollToDescriptionTop = () => {
  const article = document.querySelector<HTMLElement>('.ss-article')
  if (!article) {
    window.scrollTo({ top: 0, behavior: 'auto' })
    return
  }

  const topbarHeight = document.querySelector<HTMLElement>('.ss-topbar')?.getBoundingClientRect().height ?? 0
  const mobileNavHeight = document.querySelector<HTMLElement>('.ss-doc-nav-bar')?.getBoundingClientRect().height ?? 0
  const articleTop = article.getBoundingClientRect().top + window.scrollY
  const targetScrollY = Math.max(0, articleTop - topbarHeight - mobileNavHeight)
  window.scrollTo({ top: targetScrollY, behavior: 'auto' })
}

const navigateBesideCards = (path: string) => {
  router.go(path).then(async () => {
    await nextTick()
    let attempts = 0
    const alignDescription = () => {
      scrollToDescriptionTop()
      attempts += 1
      if (attempts < 8) requestAnimationFrame(alignDescription)
    }
    requestAnimationFrame(alignDescription)
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
    <a v-for="card in visibleCards" :key="card.id" class="ss-demo-card ss-reveal vp-raw" :data-card-visual="card.visual" :data-card-asset="cardAssetFor(card)?.key" :style="{ '--card-accent': accentFor(card) }" :href="href(card)" :aria-current="isCurrent(card) ? 'page' : undefined" @click="runCardAnimation($event, card)">
      <header><span class="ss-scramble-title">{{ card.displayTitle }}</span></header>
      <div v-if="cardAssetFor(card)" class="ss-demo-visual ss-demo-visual--asset" :class="[`ss-demo-visual--${cardAssetFor(card)?.fit}`, `ss-demo-visual--asset-${cardAssetFor(card)?.key}`]" aria-hidden="true">
        <img class="ss-demo-card-image" :src="cardAssetFor(card)?.src" alt="" decoding="async">
      </div>
      <div v-else class="ss-demo-visual ss-demo-visual--glyph" aria-hidden="true">
        <CardGlyph :name="card.visual" />
      </div>
    </a>
    <p v-if="visibleCards.length === 0" class="ss-card-search-empty">No matching chapters.</p>
  </aside>
</template>
