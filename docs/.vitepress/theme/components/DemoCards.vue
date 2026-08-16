<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import { animate, scrambleText, splitText, stagger } from 'animejs'
import { chapters, getChapterByPath, type ChapterMeta } from '../../../../src/guide/chapters'
import { branchCards, getBranchLandingByPath, getSectionLandingByPath, sectionLandings } from '../../../../src/guide/branches'
import { getChapterAccent } from '../../../../src/guide/colors'
import { guideCardOrder } from '../../../../src/guide/card-order'
import { getLocalizedChapterLabel, getLocalizedLabel, getLocaleFromPath, localizeHref, routeFromRelativePath } from '../../../../src/guide/locales'
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
  readonly copy: string
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

const cardCopy = (id: string) => ({
  'section-getting-started': 'SECURE SETUP',
  'section-os': 'OFFLINE SYSTEM',
  'section-seedkeeper': 'SEED / SECRET',
  'section-wallet': 'PUBLIC ONLY',
  'section-transactions': 'BITCOIN FLOW',
  'section-reference': 'DOCS / SOURCES',
  'branch-hardware': 'BUILD / CONNECT',
  'branch-installation': 'FLASH → BOOT',
  'branch-verification': 'HASH / SIGNATURE',
  'branch-concepts': 'JAVA CARD',
  'branch-backup-recovery': 'BACKUP → RESTORE',
  'branch-bluewallet': 'XPUB / QR',
  'branch-coconut': 'MULTISIG / KEYS',
  'branch-receive': 'BITCOIN ← USER',
  'branch-send': 'USER → BITCOIN',
  'branch-signing': 'PSBT → SIGNED',
  'branch-safety': 'CHECK / PROTECT',
  'branch-terms': 'WORDS / LINKS',
  assembly: 'FIT • TEST • BOOT',
  'os-install': 'FLASH / BOOT',
  'os-verify': 'HASH / SIGNATURE',
  javacard: 'APPLET / CHIP',
  'what-is-seedkeeper': 'ENCRYPTED VAULT',
  'seedkeeper-initialize': 'PIN / READY',
  'seedkeeper-backup': 'SEED → CARD',
  'seedkeeper-clone': 'CARD A → CARD B',
  'seedkeeper-restore': 'CARD → DEVICE',
  'seedkeeper-recovery': 'PLAN / RECOVER',
  bluewallet: 'XPUB / QR',
  coconut: 'MULTISIG / KEYS',
  'receive-guide': 'BITCOIN ← USER',
  'sign-psbt': 'PSBT → SIGNED',
  security: 'CHECK / PROTECT',
  faq: 'ASK / ANSWER',
  glossary: 'TERMS / WORDS',
  sources: 'LINK / LICENSE',
} as Record<string, string>)[id] ?? 'SHIELDSIGNER GUIDE'

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
  visual: cardVisual(`section-${landing.id}`),
  copy: cardCopy(`section-${landing.id}`)
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
  visual: cardVisual(`branch-${landing.id}`),
  copy: cardCopy(`branch-${landing.id}`)
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
  visual: cardVisual(chapter.id),
  copy: cardCopy(chapter.id)
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
let activeTransferAnimation: ReturnType<typeof animate> | null = null
let activeTransferCardElement: HTMLElement | null = null

const transferDistance = (cardElement: HTMLElement) => {
  const user = cardElement.querySelector<HTMLElement>('.ss-demo-transfer-user')
  const bitcoin = cardElement.querySelector<HTMLElement>('.ss-demo-transfer-bitcoin')
  if (!user || !bitcoin) return 0
  return Math.max(0, bitcoin.offsetLeft - user.offsetLeft)
}

const stopTransferLoop = () => {
  activeTransferAnimation?.pause()
  activeTransferCardElement?.classList.remove('is-transfer-looping')
  activeTransferAnimation = null
  activeTransferCardElement = null
}

const startTransferLoop = (card?: GuideCard) => {
  stopTransferLoop()
  if (!card || prefersReducedMotion() || (card.id !== 'branch-send' && card.id !== 'branch-receive')) return
  const cardElement = Array.from(document.querySelectorAll<HTMLElement>('.ss-demo-card')).find((item) => item.getAttribute('href') === href(card))
  const bitcoin = cardElement?.querySelector<HTMLElement>('.ss-demo-transfer-bitcoin')
  if (!cardElement || !bitcoin) return
  const distance = transferDistance(cardElement)
  if (distance <= 0) return
  const start = card.id === 'branch-send' ? -distance : 0
  const end = card.id === 'branch-send' ? 0 : -distance
  activeTransferCardElement = cardElement
  activeTransferCardElement.classList.add('is-transfer-looping')
  activeTransferAnimation = animate(bitcoin, {
    translateX: [start, end],
    duration: 1500,
    ease: 'inOutSine',
    loop: true,
    alternate: true,
  })
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

onMounted(() => {
  window.addEventListener('ss:toc-navigation', handleTocNavigation)
  nextTick(() => startTransferLoop(activeCard.value))
})
onBeforeUnmount(() => {
  stopTransferLoop()
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
  startTransferLoop(activeCard.value)
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
  const copy = cardElement.querySelector<HTMLElement>('.ss-demo-card-copy')
  if (copy) {
    copy.textContent = card.copy
    const splitter = splitText(copy, { chars: true, words: false, lines: false, accessible: false })
    animate(copy, { opacity: [.62, 1], translateX: [-4, 0], duration: 360, ease: 'out(3)' })
    if (splitter.chars.length) {
      animate(splitter.chars, {
        translateY: ['.55em', '0em'],
        opacity: [0, 1],
        delay: stagger(22),
        duration: 420,
        ease: 'out(3)',
      })
    }
    window.setTimeout(() => splitter.revert(), 760)
  }
  const iconTargets = targets('.ss-demo-icon')
  if (iconTargets.length) {
    const iconMotion: Record<string, Record<string, unknown>> = {
      'shield-check': { scale: [.82, 1.08, 1], rotate: [-5, 0], duration: 520, ease: 'out(3)' },
      'shield-logo': { scale: [.9, 1.06, 1], opacity: [.5, 1, 1], duration: 520, ease: 'out(3)' },
      'seed-vault': { rotateY: [0, 360], scale: [.85, 1, 1], duration: 620, ease: 'inOutSine' },
      'eye-wallet': { scale: [.8, 1.1, 1], translateX: [-4, 4, 0], duration: 520, ease: 'inOutSine' },
      'bitcoin-flow': { translateX: [-8, 8, 0], duration: 520, ease: 'inOutSine' },
      send: { translateX: [-8, 8, 0], duration: 520, ease: 'inOutSine' },
      receive: { translateX: [8, -8, 0], duration: 520, ease: 'inOutSine' },
      'book-links': { rotate: [-4, 4, 0], translateY: [6, -3, 0], duration: 560, ease: 'out(3)' },
      'circuit-board': { scale: [.86, 1.08, 1], rotate: [-3, 3, 0], duration: 560, ease: 'inOutSine' },
      'sd-flash': { translateX: [-12, 0], scaleX: [.8, 1], duration: 620, ease: 'out(2)' },
      'hash-check': { scale: [.75, 1.14, 1], opacity: [.45, 1, 1], duration: 500, ease: 'inOutSine' },
      chip: { rotate: [-8, 8, 0], scale: [.88, 1.08, 1], duration: 560, ease: 'inOutSine' },
      'backup-cycle': { rotate: [0, 180, 360], duration: 680, ease: 'inOutSine' },
      bluewallet: { scale: [.76, 1.12, 1], translateY: [8, -3, 0], duration: 520, ease: 'out(3)' },
      coconut: { rotate: [-12, 12, 0], scale: [.9, 1.06, 1], duration: 560, ease: 'inOutSine' },
      screwdriver: { rotate: [-18, 18, 0], translateX: [-5, 5, 0], duration: 560, ease: 'out(3)' },
      'smart-card': { translateY: [10, -2, 0], rotate: [-3, 0], duration: 560, ease: 'out(3)' },
      vault: { scale: [.86, 1.08, 1], rotateY: [0, 180, 360], duration: 620, ease: 'inOutSine' },
      'pin-lock': { scale: [.8, 1.12, 1], duration: 500, ease: 'out(3)' },
      'seed-upload': { translateY: [12, -4, 0], opacity: [.45, 1, 1], duration: 620, ease: 'out(3)' },
      'card-copy': { translateX: [-10, 10, 0], duration: 620, ease: 'inOutSine' },
      restore: { translateY: [-10, 6, 0], rotate: [-8, 0], duration: 560, ease: 'out(3)' },
      'recovery-route': { translateX: [-8, 8, 0], opacity: [.45, 1, 1], duration: 560, ease: 'inOutSine' },
      signature: { translateX: [-8, 8, 0], rotate: [-4, 2, 0], duration: 560, ease: 'out(3)' },
      'shield-warning': { translateY: [5, -5, 0], rotate: [-3, 3, 0], duration: 520, ease: 'inOutSine' },
      faq: { scale: [.8, 1.1, 1], translateY: [6, -2, 0], duration: 520, ease: 'out(3)' },
      terms: { translateY: [8, -2, 0], opacity: [.45, 1, 1], duration: 520, ease: 'out(3)' },
      glossary: { rotate: [-4, 4, 0], scale: [.9, 1.08, 1], duration: 520, ease: 'inOutSine' },
      'source-link': { translateX: [-8, 8, 0], opacity: [.45, 1, 1], duration: 560, ease: 'inOutSine' },
    }
    animate(iconTargets, iconMotion[card.visual] ?? { scale: [.86, 1.08, 1], duration: 500, ease: 'out(3)' })
  }
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
    <a v-for="card in visibleCards" :key="card.id" class="ss-demo-card ss-reveal vp-raw" :data-card-visual="card.visual" :style="{ '--card-accent': accentFor(card) }" :href="href(card)" :aria-current="isCurrent(card) ? 'page' : undefined" @click="runCardAnimation($event, card)">
      <header><span class="ss-card-title-lockup"><CardGlyph :name="card.visual" /><span class="ss-scramble-title">{{ card.displayTitle }}</span></span></header>
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
      <span class="ss-demo-card-copy" aria-hidden="true">{{ card.copy }}</span>
    </a>
    <p v-if="visibleCards.length === 0" class="ss-card-search-empty">No matching chapters.</p>
  </aside>
</template>
