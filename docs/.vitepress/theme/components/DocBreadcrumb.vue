<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { branchCards, getBranchLandingByPath, getSectionLandingByPath, sectionLandings } from '../../../../src/guide/branches'
import { chapters, getChapterByPath } from '../../../../src/guide/chapters'
import { getLocalizedChapterLabel, getLocalizedLabel, getLocaleFromPath, localizeHref, routeFromRelativePath } from '../../../../src/guide/locales'

type BreadcrumbItem = {
  readonly label: string
  readonly href?: string
  readonly current?: boolean
}

const chapterParentBranch: Record<string, string> = {
  assembly: 'hardware',
  'os-install': 'installation',
  javacard: 'concepts',
  'what-is-seedkeeper': 'concepts',
  'seedkeeper-initialize': 'backup-recovery',
  'seedkeeper-backup': 'backup-recovery',
  'seedkeeper-clone': 'backup-recovery',
  'seedkeeper-restore': 'backup-recovery',
  'seedkeeper-recovery': 'backup-recovery',
  bluewallet: 'bluewallet',
  coconut: 'coconut',
  'sign-psbt': 'signing',
  security: 'safety',
  faq: 'safety',
  glossary: 'terms',
  sources: 'terms'
}

const sectionByGroup: Record<string, string> = {
  '시작하기': 'getting-started',
  OS: 'os',
  SeedKeeper: 'seedkeeper',
  '워치온리 지갑': 'wallet',
  거래: 'transactions',
  참고: 'reference'
}

const { page } = useData()
const locale = computed(() => getLocaleFromPath(`/${page.value.relativePath}`))

const crumbs = computed<BreadcrumbItem[]>(() => {
  const route = routeFromRelativePath(page.value.relativePath)
  const chapter = getChapterByPath(route)
  const branch = getBranchLandingByPath(route)
  const section = getSectionLandingByPath(route)
  const current = chapter ?? branch ?? section
  if (!current) return []

  const group = current.group
  const sectionId = section?.id ?? sectionByGroup[group]
  const sectionItem = sectionLandings.find((item) => item.id === sectionId)
  const items: BreadcrumbItem[] = []

  if (sectionItem && sectionItem.id !== current.id) {
    items.push({ label: getLocalizedLabel(sectionItem.id, sectionItem.label, locale.value), href: withBase(localizeHref(sectionItem.href, locale.value)) })
  }

  const parentId = branch?.id ?? (chapter ? chapterParentBranch[chapter.id] : undefined)
  const parent = parentId ? branchCards.find((item) => item.id === parentId) : undefined
  if (parent && parent.id !== current.id) {
    items.push({ label: getLocalizedLabel(parent.id, parent.label, locale.value), href: withBase(localizeHref(parent.href, locale.value)) })
  }

  const label = chapter ? getLocalizedChapterLabel(chapter.id, chapter.label, locale.value) : getLocalizedLabel(current.id, current.label, locale.value)
  items.push({ label, current: true })
  return items
})
</script>

<template>
  <nav v-if="crumbs.length" class="ss-doc-breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, index) in crumbs" :key="`${item.label}-${index}`">
        <span v-if="index" class="ss-doc-breadcrumb-separator" aria-hidden="true">›</span>
        <a v-if="item.href" :href="item.href">{{ item.label }}</a>
        <span v-else aria-current="page">{{ item.label }}</span>
      </li>
    </ol>
  </nav>
</template>
