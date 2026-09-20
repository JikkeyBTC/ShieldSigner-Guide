<script setup lang="ts">
import { withBase } from 'vitepress'
import ImageZoom from './ImageZoom.vue'
defineProps<{ src: string; alt: string; caption: string; screen?: boolean }>()
</script>

<template>
  <figure class="ss-guide-figure" :class="{ 'ss-guide-figure--screen': screen }">
    <ImageZoom :src="withBase(src)" :alt="alt" />
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>

<style scoped>
.ss-guide-figure{margin:28px 0;min-width:0}
.ss-guide-figure--screen{max-width:360px;margin-inline:auto}
.ss-guide-figure :deep(.ss-image-trigger){overflow:hidden;border:1px solid var(--ss-line);border-radius:10px;background:var(--ss-panel)}
.ss-guide-figure img{display:block;width:100%;max-width:100%;height:auto;margin:0}
.ss-guide-figure figcaption{margin-top:10px;font-size:13px;line-height:1.65;word-break:keep-all}
</style>
