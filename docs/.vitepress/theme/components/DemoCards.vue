<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import { animate, scrambleText, stagger } from 'animejs'
import { chapters, getChapterByPath, type ChapterMeta } from '../../../../src/guide/chapters'
import { getChapterAccent } from '../../../../src/guide/colors'

const cardType = (chapter: ChapterMeta) => {
  if (chapter.id === 'os-verify') return 'verify'
  if (chapter.group === 'SeedKeeper') return 'seed'
  if (chapter.group.includes('지갑')) return 'wallet'
  if (chapter.group === '거래') return 'flow'
  if (chapter.group === '참고') return 'reference'
  return 'intro'
}
const cards = chapters.map((chapter) => ({
  ...chapter,
  type: cardType(chapter),
  caption: chapter.group.toUpperCase(),
  displayTitle: ({ assembly: '쉽게 조립하는 방법', 'os-verify': '변조 확인 검증', 'seedkeeper-backup': 'SeedKeeper 소개', bluewallet: '워치온리 지갑' } as Record<string, string>)[chapter.id] ?? chapter.label
}))
const accentFor = (card: typeof cards[number]) => getChapterAccent(card)
const searchQuery = ref('')
const visibleCards = computed(() => {
  const query = searchQuery.value.trim().toLocaleLowerCase()
  if (!query) return cards
  return cards.filter((card) => [card.label, card.displayTitle, card.group, card.caption].join(' ').toLocaleLowerCase().includes(query))
})
const { page } = useData()
const router = useRouter()
const current = computed(() => {
  const path = page.value.relativePath.replace(/\.md$/, '')
  return getChapterByPath(path === 'index' ? '/' : `/${path}/`)
})
const href = (chapterId: string) => withBase(chapters.find((chapter) => chapter.id === chapterId)?.href ?? '/')
const seedkeeperLogo = withBase('/brand/seedkeeper/seedkeeper_logo_black.png')
const seedkeeperIcon = withBase('/brand/seedkeeper/seedkeeper_icon.png')
const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
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
  searchQuery.value = ''
  await nextTick()
  const rail = document.querySelector<HTMLElement>('.ss-demo-rail')
  const card = rail?.querySelector<HTMLElement>(`.ss-demo-card[aria-current="page"]`)
  const search = rail?.querySelector<HTMLElement>('.ss-card-search')
  if (!rail || !card) return
  const target = Math.max(0, card.offsetTop - (search?.offsetHeight ?? 0) - 10)
  rail.scrollTo({ top: target, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
})
const runCardAnimation = (event: MouseEvent, card: typeof cards[number]) => {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  const cardElement = event.currentTarget as HTMLElement
  if (prefersReducedMotion()) {
    navigateBesideCards(href(card.id))
    return
  }
  const title = cardElement.querySelector('.ss-scramble-title')
  if (title) animate(title, { innerHTML: scrambleText({ chars: '01ABCDEFGHIJKLMNOPQRSTUVWXYZ' }), duration: 480, ease: 'linear' })
  const targets = (selector: string) => Array.from(cardElement.querySelectorAll(selector))
  if (card.id === 'assembly') animate(targets('.ss-demo-stagger i'), { translateY: [18, 0], rotate: [-8, 0], opacity: [.35, 1], delay: stagger(120), duration: 560, ease: 'out(3)' })
  if (card.id === 'os-install') animate(targets('.ss-demo-install-progress'), { scaleX: [0, 1], transformOrigin: 'left center', duration: 620, ease: 'out(2)' })
  if (card.id === 'overview') animate(targets('.ss-demo-stagger i'), { translateY: [8, -6, 0], rotate: [-4, 4, 0], opacity: [.5, 1, 1], delay: stagger(90), duration: 520, ease: 'inOutSine' })
  if (card.type === 'verify') animate([...targets('.ss-demo-dot'), ...targets('.ss-demo-line')], { scale: [.75, 1.15, 1], opacity: [.45, 1, 1], delay: stagger(90), duration: 520, ease: 'inOutSine' })
  if (card.type === 'seed') animate([...targets('.ss-demo-seed-logo'), ...targets('.ss-demo-seed-icon'), ...targets('.ss-demo-card-chip'), ...targets('.ss-demo-lock')], { rotateY: [0, 360], scale: [.85, 1.08, 1], delay: stagger(90), duration: 560, ease: 'inOutSine' })
  if (card.type === 'wallet') animate(targets('.ss-demo-qr-node'), { scale: [.75, 1.12, 1], opacity: [.45, 1, 1], delay: stagger(110), duration: 500, ease: 'inOutSine' })
  if (card.type === 'flow') animate([...targets('.ss-demo-flow-node'), ...targets('.ss-demo-flow i')], { translateX: [-8, 8, 0], opacity: [.35, 1, 1], delay: stagger(90), duration: 520, ease: 'inOutSine' })
  if (card.type === 'reference') animate(targets('.ss-demo-ref-line'), { innerHTML: scrambleText({ chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }), delay: stagger(100), duration: 520, ease: 'linear' })
  navigateBesideCards(href(card.id))
}
</script>

<template>
  <aside class="ss-demo-rail" aria-label="Guide visual chapters">
    <div class="ss-card-search" role="search">
      <label class="ss-card-search-box">
        <span class="ss-card-search-icon" aria-hidden="true">⌕</span>
        <input v-model="searchQuery" type="search" autocomplete="off" placeholder="Search" aria-label="Search guide cards" @keydown.esc="searchQuery = ''">
        <kbd>/</kbd>
      </label>
      <span class="ss-card-search-count" aria-live="polite">{{ visibleCards.length }}/{{ cards.length }}</span>
    </div>
    <a v-for="card in visibleCards" :key="card.id" class="ss-demo-card ss-reveal vp-raw" :style="{ '--card-accent': accentFor(card) }" :href="href(card.id)" :aria-current="current?.id === card.id ? 'page' : undefined" @click="runCardAnimation($event, card)">
      <header><span class="ss-scramble-title">{{ card.displayTitle }}</span><small>{{ card.caption }}</small></header>
      <div v-if="card.type === 'intro' && card.id === 'os-install'" class="ss-demo-visual ss-demo-intro ss-demo-install"><span class="ss-demo-install-track"><i class="ss-demo-install-progress"></i></span><b>FLASH / BOOT</b></div>
      <div v-else-if="card.type === 'intro'" class="ss-demo-visual ss-demo-intro ss-demo-stagger"><i></i><i></i><i></i><strong>{{ String(card.order).padStart(2, '0') }}</strong></div>
      <div v-else-if="card.type === 'verify'" class="ss-demo-visual ss-demo-verify"><span class="ss-demo-dot"></span><span class="ss-demo-line"></span><span class="ss-demo-line short"></span><b>SHA-256</b></div>
      <div v-else-if="card.type === 'seed'" class="ss-demo-visual ss-demo-seed"><img v-if="card.id === 'seedkeeper-backup'" class="ss-demo-seed-logo" :src="seedkeeperLogo" alt="SeedKeeper"><img v-else class="ss-demo-seed-icon" :src="seedkeeperIcon" alt=""><span class="ss-demo-card-chip"></span><span class="ss-demo-lock">✓</span><b>ENCRYPTED</b></div>
      <div v-else-if="card.type === 'flow'" class="ss-demo-visual ss-demo-flow"><span class="ss-demo-flow-node">ADDR</span><i>→</i><span class="ss-demo-flow-node">PSBT</span><i>→</i><span class="ss-demo-flow-node">SIGN</span></div>
      <div v-else-if="card.type === 'reference'" class="ss-demo-visual ss-demo-reference"><span class="ss-demo-ref-line">FAQ / TERMS</span><span class="ss-demo-ref-line">SOURCES / SAFE</span></div>
      <div v-else class="ss-demo-visual ss-demo-wallet"><span class="ss-demo-qr-node">XPUB</span><span class="ss-demo-qr-node">QR</span><span class="ss-demo-qr-node">PSBT</span></div>
    </a>
    <p v-if="visibleCards.length === 0" class="ss-card-search-empty">No matching chapters.</p>
  </aside>
</template>
