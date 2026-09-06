<script setup lang="ts">
import { withBase } from 'vitepress'
defineProps<{ src: string; alt: string; caption: string; screen?: boolean }>()
</script>

<template>
  <figure class="ss-guide-figure" :class="{ 'ss-guide-figure--screen': screen }">
    <a :href="withBase(src)" target="_blank" rel="noopener" :aria-label="`${alt} — 새 탭에서 크게 보기`">
      <img :src="withBase(src)" :alt="alt" loading="lazy" decoding="async" />
    </a>
    <figcaption>{{ caption }} <span>그림을 누르면 크게 볼 수 있어요.</span></figcaption>
  </figure>
</template>

<style scoped>
.ss-guide-figure{margin:28px 0;min-width:0}
.ss-guide-figure--screen{max-width:360px;margin-inline:auto}
.ss-guide-figure>a{display:block;overflow:hidden;border:1px solid var(--ss-line);border-radius:10px;background:var(--ss-panel)}
.ss-guide-figure img{display:block;width:100%;max-width:100%;height:auto;margin:0}
.ss-guide-figure figcaption{margin-top:10px;font-size:13px;line-height:1.65;word-break:keep-all}
.ss-guide-figure figcaption span{display:block;color:var(--ss-muted)}
</style>
