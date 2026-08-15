<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { chapters, getChapterByPath, type ChapterMeta } from '../../../../src/guide/chapters'

const { page } = useData()
const groups = ['시작하기', '준비', 'OS', 'SeedKeeper', '워치온리 지갑', '거래', '참고']
const current = computed(() => {
  const path = page.value.relativePath.replace(/\.md$/, '')
  return getChapterByPath(path === 'index' ? '/' : `/${path}/`)
})
const byGroup = (group: string) => chapters.filter((chapter) => chapter.group === group)
const active = (chapter: ChapterMeta) => current.value?.id === chapter.id
const href = (chapter: ChapterMeta) => withBase(chapter.href)
</script>

<template>
  <aside class="ss-category-nav" aria-label="Guide categories">
    <div class="ss-rail-label">GUIDE INDEX</div>
    <template v-for="group in groups" :key="group">
      <div class="ss-nav-group-label">{{ group }}</div>
      <a v-for="chapter in byGroup(group)" :key="chapter.id" class="ss-nav-link ss-reveal" :href="href(chapter)" :aria-current="active(chapter) ? 'page' : undefined">
        <span>{{ chapter.label }}</span><small>{{ String(chapter.order).padStart(2, '0') }}</small>
      </a>
    </template>
  </aside>

  <aside class="ss-chapter-rail" aria-label="On this page">
    <div class="ss-rail-label">ON THIS PAGE</div>
    <div class="ss-toc-card">{{ current?.label || 'ShieldSigner Guide' }}</div>
    <div class="ss-toc-hint">목차를 따라 다음 챕터로 이동하세요.</div>
    <a v-for="chapter in (current ? chapters.filter((item) => item.group === current?.group) : [])" :key="chapter.id" class="ss-chapter-link" :href="href(chapter)" :aria-current="active(chapter) ? 'page' : undefined">{{ chapter.label }} <span>→</span></a>
  </aside>

  <nav class="ss-mobile-tabs" aria-label="Guide sections">
    <a v-for="chapter in chapters.filter((item) => ['overview', 'assembly', 'os-install', 'seedkeeper-backup', 'bluewallet'].includes(item.id))" :key="chapter.id" :href="href(chapter)" :aria-current="active(chapter) ? 'page' : undefined">{{ chapter.label }}</a>
  </nav>
</template>
