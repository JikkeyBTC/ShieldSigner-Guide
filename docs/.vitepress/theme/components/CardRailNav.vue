<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { guideSearchQuery } from '../../../../src/guide/search'

const input = ref<HTMLInputElement>()
const searchIndex = ref(-1)
const matchCount = ref(0)
const hasQuery = computed(() => guideSearchQuery.value.trim().length > 0)
const status = computed(() => {
  if (!hasQuery.value) return ''
  return matchCount.value > 0 ? `${searchIndex.value + 1} / ${matchCount.value}` : '0 results'
})

const cards = () => Array.from(document.querySelectorAll<HTMLElement>('.ss-demo-card'))
const syncMatches = () => {
  const items = cards()
  matchCount.value = hasQuery.value ? items.length : 0
  if (!hasQuery.value || items.length === 0) {
    searchIndex.value = -1
    items.forEach((item) => item.classList.remove('is-search-match'))
    return
  }
  if (searchIndex.value < 0 || searchIndex.value >= items.length) searchIndex.value = 0
  items.forEach((item, index) => item.classList.toggle('is-search-match', index === searchIndex.value))
}

const scrollToMatch = () => {
  const item = cards()[searchIndex.value]
  const rail = item?.closest<HTMLElement>('.ss-demo-rail')
  if (!item || !rail) return
  const railBox = rail.getBoundingClientRect()
  const itemBox = item.getBoundingClientRect()
  const correction = itemBox.top - (railBox.top + 8)
  if (Math.abs(correction) < 2) return
  rail.scrollTo({ top: Math.max(0, rail.scrollTop + correction), behavior: 'smooth' })
}

const cycle = (direction: 1 | -1) => {
  if (!hasQuery.value) {
    input.value?.focus()
    return
  }
  const items = cards()
  if (!items.length) return
  searchIndex.value = (searchIndex.value + direction + items.length) % items.length
  syncMatches()
  scrollToMatch()
}

const clear = () => {
  guideSearchQuery.value = ''
  searchIndex.value = -1
  input.value?.focus()
}

const onKeydown = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null
  const isTyping = target?.matches('input, textarea, select, [contenteditable="true"]')
  if (event.key === '/' && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault()
    input.value?.focus()
  }
  if (event.key === 'Escape' && document.activeElement === input.value && guideSearchQuery.value) clear()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  void nextTick(syncMatches)
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
watch(guideSearchQuery, async () => {
  searchIndex.value = guideSearchQuery.value.trim() ? 0 : -1
  await nextTick()
  syncMatches()
})
</script>

<template>
<div class="ss-topbar-search-nav" aria-label="Guide card search">
  <div class="ss-card-search-box" role="search">
    <span class="ss-topbar-search-icon" aria-hidden="true"></span>
    <input ref="input" v-model="guideSearchQuery" type="search" autocomplete="off" placeholder="Search" aria-label="Search guide cards" @keydown.esc="clear" @keydown.enter.prevent="cycle(1)" @keydown.arrowup.prevent="cycle(-1)" @keydown.arrowdown.prevent="cycle(1)">
    <span v-if="hasQuery" class="ss-card-search-status" aria-live="polite">{{ status }}</span>
    <kbd>/</kbd>
    <button type="button" class="ss-card-search-button" :disabled="!matchCount" aria-label="Previous search result" @click="cycle(-1)">↑</button>
    <button type="button" class="ss-card-search-button" :disabled="!matchCount" aria-label="Next search result" @click="cycle(1)">↓</button>
    <button v-if="hasQuery" type="button" class="ss-card-search-clear" aria-label="Clear search" @click="clear">×</button>
  </div>
</div>
</template>
