<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { getBranchLandingByPath, getSectionLandingByPath, sectionLandings } from '../../../../src/guide/branches'
import { getChapterAccent } from '../../../../src/guide/colors'
import { getChapterByPath } from '../../../../src/guide/chapters'
import { getLocalizedLabel, getLocaleFromPath, localizeHref, routeFromRelativePath } from '../../../../src/guide/locales'

const { page } = useData()
const locale = computed(() => getLocaleFromPath(`/${page.value.relativePath}`))
const current = computed(() => {
  const route = routeFromRelativePath(page.value.relativePath)
  return getSectionLandingByPath(route) ?? getBranchLandingByPath(route) ?? getChapterByPath(route)
})
const section = computed(() => sectionLandings.find((item) => item.group === current.value?.group) ?? sectionLandings[0])
const label = computed(() => getLocalizedLabel(section.value.id, section.value.label, locale.value))
const href = computed(() => withBase(localizeHref(section.value.href, locale.value)))
const accent = computed(() => getChapterAccent(current.value ?? section.value))
</script>

<template>
<div class="ss-guide-nav-bar" :style="{ '--nav-accent': accent }" aria-label="Guide navigation context">
  <span class="ss-guide-nav-eyebrow">GUIDE</span>
  <a :href="href" class="ss-guide-nav-current">{{ label }}</a>
</div>
</template>
