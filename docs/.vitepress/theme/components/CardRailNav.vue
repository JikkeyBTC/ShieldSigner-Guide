<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, useRouter, withBase } from 'vitepress'
import { chapters } from '../../../../src/guide/chapters'
import { branchLandings, sectionLandings } from '../../../../src/guide/branches'
import { getLocalizedChapterLabel, getLocalizedLabel, getLocaleFromPath, localizeHref } from '../../../../src/guide/locales'

type SearchResult = {
  readonly id: string
  readonly label: string
  readonly group: string
  readonly href: string
}

const { page } = useData()
const router = useRouter()
const locale = computed(() => getLocaleFromPath(`/${page.value.relativePath}`))
const isOpen = ref(false)
const query = ref('')
const activeIndex = ref(0)
const overlayInput = ref<HTMLInputElement>()

const allResults = computed<SearchResult[]>(() => {
  const sections: SearchResult[] = sectionLandings.map((item) => ({
    id: `section-${item.id}`,
    label: getLocalizedLabel(item.id, item.label, locale.value),
    group: 'Section',
    href: withBase(localizeHref(item.href, locale.value))
  }))
  const branches: SearchResult[] = branchLandings.map((item) => ({
    id: `branch-${item.id}`,
    label: getLocalizedLabel(item.id, item.label, locale.value),
    group: 'Category',
    href: withBase(localizeHref(item.href, locale.value))
  }))
  const pages: SearchResult[] = chapters.filter((item) => item.id !== 'overview').map((item) => ({
    id: `chapter-${item.id}`,
    label: getLocalizedChapterLabel(item.id, item.label, locale.value),
    group: item.group,
    href: withBase(localizeHref(item.href, locale.value))
  }))
  const unique = new Map<string, SearchResult>()
  for (const result of [...sections, ...branches, ...pages]) unique.set(`${result.href}:${result.label}`, result)
  return [...unique.values()]
})

const results = computed(() => {
  const normalized = query.value.trim().toLocaleLowerCase()
  if (!normalized) return allResults.value.slice(0, 8)
  return allResults.value.filter((result) => `${result.label} ${result.group}`.toLocaleLowerCase().includes(normalized)).slice(0, 12)
})

const openSearch = async () => {
  isOpen.value = true
  await nextTick()
  overlayInput.value?.focus()
}

const closeSearch = () => {
  isOpen.value = false
  query.value = ''
  activeIndex.value = 0
}

const selectResult = (result: SearchResult) => {
  closeSearch()
  router.go(result.href)
}

const moveActive = (direction: 1 | -1) => {
  if (!results.value.length) return
  activeIndex.value = (activeIndex.value + direction + results.value.length) % results.value.length
}

const onOverlayKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeSearch()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveActive(1)
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveActive(-1)
  } else if (event.key === 'Enter' && results.value[activeIndex.value]) {
    event.preventDefault()
    selectResult(results.value[activeIndex.value])
  }
}

const onGlobalKeydown = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement | null
  const isTyping = target?.matches('input, textarea, select, [contenteditable="true"]')
  if (event.key === '/' && !isTyping && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault()
    void openSearch()
  } else if (event.key === 'Escape' && isOpen.value) {
    event.preventDefault()
    closeSearch()
  }
}

watch(results, (next) => {
  if (activeIndex.value >= next.length) activeIndex.value = 0
})
watch(isOpen, (open) => {
  if (typeof document !== 'undefined') document.body.classList.toggle('ss-search-open', open)
})

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onGlobalKeydown)
  if (typeof document !== 'undefined') document.body.classList.remove('ss-search-open')
})
</script>

<template>
  <div class="ss-topbar-search-nav">
    <div class="ss-card-search-box" role="search">
      <button class="ss-search-trigger" type="button" aria-label="Search documentation" :aria-expanded="isOpen" aria-haspopup="dialog" @click="openSearch">
        <span class="ss-topbar-search-icon" aria-hidden="true"></span>
        <span class="ss-search-trigger-label">Search</span>
      </button>
      <kbd>/</kbd>
      <span class="ss-search-trigger-arrows" aria-hidden="true">↑&nbsp;&nbsp;↓</span>
    </div>
  </div>

  <Teleport to="body">
    <div v-if="isOpen" class="ss-search-overlay" role="dialog" aria-modal="true" aria-label="Search documentation" @mousedown.self="closeSearch">
      <div class="ss-search-dialog">
        <div class="ss-search-overlay-box">
          <span class="ss-topbar-search-icon" aria-hidden="true"></span>
          <input ref="overlayInput" v-model="query" type="search" autocomplete="off" placeholder="Search documentation..." aria-label="Search documentation" @keydown="onOverlayKeydown">
          <button class="ss-search-close" type="button" aria-label="Close search" @click="closeSearch">×</button>
        </div>
        <div v-if="query.trim()" class="ss-search-results" role="listbox" aria-label="Documentation results">
          <button v-for="(result, index) in results" :key="result.id" type="button" class="ss-search-result" :class="{ 'is-active': index === activeIndex }" role="option" :aria-selected="index === activeIndex" @mouseenter="activeIndex = index" @click="selectResult(result)">
            <span class="ss-search-result-label">{{ result.label }}</span>
            <span class="ss-search-result-group">{{ result.group }}</span>
          </button>
          <p v-if="query.trim() && results.length === 0" class="ss-search-empty">No matching documentation.</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
