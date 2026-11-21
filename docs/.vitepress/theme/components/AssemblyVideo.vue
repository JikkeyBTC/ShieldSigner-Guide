<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const editions = {
  ko: { id: 'gF8ukSYD88Q', language: '한국어', title: 'ShieldSigner 키트 조립 동영상', watch: 'YouTube에서 보기' },
  ja: { id: 'Y9bH6WbHCsU', language: '日本語', title: 'ShieldSigner キット組み立てガイド', watch: 'YouTube で見る' },
  en: { id: 'LR7ZaaPsMI8', language: 'English', title: 'ShieldSigner kit assembly video', watch: 'Watch on YouTube' }
} as const
const props = defineProps<{ locale: keyof typeof editions }>()
const video = computed(() => editions[props.locale])
</script>

<template>
  <div class="assembly-video">
    <iframe :src="'https://www.youtube-nocookie.com/embed/' + video.id" :title="video.title"
      allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"></iframe>
    <div class="video-links">
      <a :href="'https://www.youtube.com/watch?v=' + video.id">{{ video.watch }}</a>
      <nav aria-label="Video language">
        <template v-for="(edition, code) in editions" :key="code">
          <span v-if="code === locale" :lang="code" aria-current="page">{{ edition.language }}</span>
          <a v-else :href="withBase('/' + code + '/build/assembly')" :hreflang="code" :lang="code">{{ edition.language }}</a>
        </template>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.assembly-video iframe { display: block; width: 100%; aspect-ratio: 16 / 9; border: 0; border-radius: 10px; background: #000; }
.video-links, .video-links nav { display: flex; align-items: center; flex-wrap: wrap; gap: .5rem 1rem; }
.video-links { justify-content: space-between; margin-top: .75rem; }
</style>
