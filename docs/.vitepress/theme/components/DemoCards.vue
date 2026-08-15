<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { animateEnter } from '../../../../src/guide/animation'
import { chapters, getChapterByPath, type ChapterMeta } from '../../../../src/guide/chapters'

const cardType = (chapter: ChapterMeta) => {
  if (chapter.id === 'os-verify') return 'verify'
  if (chapter.group === 'SeedKeeper') return 'seed'
  if (chapter.group.includes('지갑') || chapter.group === '거래') return 'wallet'
  return 'intro'
}
const cards = chapters.map((chapter) => ({
  ...chapter,
  type: cardType(chapter),
  caption: chapter.group.toUpperCase()
}))
const { page } = useData()
const current = computed(() => {
  const path = page.value.relativePath.replace(/\.md$/, '')
  return getChapterByPath(path === 'index' ? '/' : `/${path}/`)
})
const href = (chapterId: string) => withBase(chapters.find((chapter) => chapter.id === chapterId)?.href ?? '/')
const cardNodes = ref<Element[]>([])
onMounted(() => animateEnter(cardNodes.value))
</script>

<template>
  <aside class="ss-demo-rail" aria-label="Guide visual chapters">
    <a v-for="card in cards" ref="cardNodes" :key="card.id" class="ss-demo-card ss-reveal" :href="href(card.id)" :aria-current="current?.id === card.id ? 'page' : undefined">
      <header><span>{{ card.label }}</span><small>{{ card.caption }}</small></header>
      <div v-if="card.type === 'intro'" class="ss-demo-visual ss-demo-intro"><i></i><i></i><i></i><strong>{{ String(card.order).padStart(2, '0') }}</strong></div>
      <div v-else-if="card.type === 'verify'" class="ss-demo-visual ss-demo-verify"><span class="ss-demo-dot"></span><span class="ss-demo-line"></span><span class="ss-demo-line short"></span><b>SHA-256</b></div>
      <div v-else-if="card.type === 'seed'" class="ss-demo-visual ss-demo-seed"><span class="ss-demo-card-chip"></span><span class="ss-demo-lock">✓</span><b>ENCRYPTED</b></div>
      <div v-else class="ss-demo-visual ss-demo-wallet"><span>XPUB</span><span>QR</span><span>PSBT</span></div>
    </a>
  </aside>
</template>
