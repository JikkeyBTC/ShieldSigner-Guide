<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { animateEnter } from '../../../../src/guide/animation'

const cards = [
  { title: '시작하기', type: 'intro', caption: 'FIRST RUN' },
  { title: 'OS 검증', type: 'verify', caption: 'CHECKSUM + PGP' },
  { title: 'SeedKeeper', type: 'seed', caption: 'SECURE BACKUP' },
  { title: '워치온리 지갑', type: 'wallet', caption: 'PUBLIC DATA ONLY' }
]
const cardNodes = ref<Element[]>([])
onMounted(() => animateEnter(cardNodes.value))
</script>

<template>
  <aside class="ss-demo-rail" aria-label="Guide visual chapters">
    <article v-for="card in cards" ref="cardNodes" :key="card.type" class="ss-demo-card ss-reveal">
      <header><span>{{ card.title }}</span><small>{{ card.caption }}</small></header>
      <div v-if="card.type === 'intro'" class="ss-demo-visual ss-demo-intro"><i></i><i></i><i></i><strong>01</strong></div>
      <div v-else-if="card.type === 'verify'" class="ss-demo-visual ss-demo-verify"><span class="ss-demo-dot"></span><span class="ss-demo-line"></span><span class="ss-demo-line short"></span><b>SHA-256</b></div>
      <div v-else-if="card.type === 'seed'" class="ss-demo-visual ss-demo-seed"><span class="ss-demo-card-chip"></span><span class="ss-demo-lock">✓</span><b>ENCRYPTED</b></div>
      <div v-else class="ss-demo-visual ss-demo-wallet"><span>XPUB</span><span>QR</span><span>PSBT</span></div>
    </article>
  </aside>
</template>
