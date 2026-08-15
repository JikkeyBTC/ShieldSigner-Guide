<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { animate, scrambleText, stagger } from 'animejs'
import { animateEnter } from '../../../../src/guide/animation'
import { chapters, getChapterByPath, type ChapterMeta } from '../../../../src/guide/chapters'

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
const { page } = useData()
const current = computed(() => {
  const path = page.value.relativePath.replace(/\.md$/, '')
  return getChapterByPath(path === 'index' ? '/' : `/${path}/`)
})
const href = (chapterId: string) => withBase(chapters.find((chapter) => chapter.id === chapterId)?.href ?? '/')
const cardNodes = ref<Element[]>([])
const titleNodes = ref<Element[]>([])
onMounted(() => {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  animateEnter(cardNodes.value)
  animate(titleNodes.value, {
    innerHTML: scrambleText({ chars: '01アイウエオABCDEFGHIJKLMNOPQRSTUVWXYZ' }),
    delay: stagger(70),
    duration: 850,
    ease: 'linear'
  })
  animate('.ss-demo-stagger i', { translateY: [8, -6], rotate: [-4, 4], opacity: [.5, 1], delay: stagger(140), duration: 900, direction: 'alternate', loop: true, ease: 'inOutSine' })
  animate('.ss-demo-dot', { scale: [.75, 1.35], opacity: [.45, 1], duration: 700, direction: 'alternate', loop: true, ease: 'inOutSine' })
  animate('.ss-demo-line', { scaleX: [.35, 1], transformOrigin: 'left center', delay: stagger(150), duration: 1000, direction: 'alternate', loop: true, ease: 'inOutSine' })
  animate('.ss-demo-card-chip', { rotateY: [0, 360], duration: 1800, delay: 300, loop: true, ease: 'linear' })
  animate('.ss-demo-lock', { scale: [.8, 1.2], opacity: [.5, 1], duration: 700, direction: 'alternate', loop: true, ease: 'inOutSine' })
  animate('.ss-demo-qr-node', { scale: [.75, 1], opacity: [.45, 1], delay: stagger(180), duration: 650, direction: 'alternate', loop: true, ease: 'inOutSine' })
  animate('.ss-demo-flow-node', { translateX: [-8, 8], duration: 900, delay: stagger(140), direction: 'alternate', loop: true, ease: 'inOutSine' })
  animate('.ss-demo-flow i', { opacity: [.25, 1], translateX: [-3, 3], delay: stagger(140), duration: 700, direction: 'alternate', loop: true, ease: 'inOutSine' })
  animate('.ss-demo-ref-line', { innerHTML: scrambleText({ chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' }), delay: stagger(120), duration: 900, loop: true, loopDelay: 1000, ease: 'linear' })
})
</script>

<template>
  <aside class="ss-demo-rail" aria-label="Guide visual chapters">
    <a v-for="card in cards" ref="cardNodes" :key="card.id" class="ss-demo-card ss-reveal" :href="href(card.id)" :aria-current="current?.id === card.id ? 'page' : undefined">
      <header><span ref="titleNodes" class="ss-scramble-title">{{ card.displayTitle }}</span><small>{{ card.caption }}</small></header>
      <div v-if="card.type === 'intro'" class="ss-demo-visual ss-demo-intro ss-demo-stagger"><i></i><i></i><i></i><strong>{{ String(card.order).padStart(2, '0') }}</strong></div>
      <div v-else-if="card.type === 'verify'" class="ss-demo-visual ss-demo-verify"><span class="ss-demo-dot"></span><span class="ss-demo-line"></span><span class="ss-demo-line short"></span><b>SHA-256</b></div>
      <div v-else-if="card.type === 'seed'" class="ss-demo-visual ss-demo-seed"><span class="ss-demo-card-chip"></span><span class="ss-demo-lock">✓</span><b>ENCRYPTED</b></div>
      <div v-else-if="card.type === 'flow'" class="ss-demo-visual ss-demo-flow"><span class="ss-demo-flow-node">ADDR</span><i>→</i><span class="ss-demo-flow-node">PSBT</span><i>→</i><span class="ss-demo-flow-node">SIGN</span></div>
      <div v-else-if="card.type === 'reference'" class="ss-demo-visual ss-demo-reference"><span class="ss-demo-ref-line">FAQ / TERMS</span><span class="ss-demo-ref-line">SOURCES / SAFE</span></div>
      <div v-else class="ss-demo-visual ss-demo-wallet"><span class="ss-demo-qr-node">XPUB</span><span class="ss-demo-qr-node">QR</span><span class="ss-demo-qr-node">PSBT</span></div>
    </a>
  </aside>
</template>
