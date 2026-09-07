<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { getLocaleFromPath } from '../../../../src/guide/locales'

const { page } = useData()
const locale = computed(() => getLocaleFromPath(`/${page.value.relativePath}`))
</script>

<template>
  <div class="ss-os-guide" :data-locale="locale"><slot /></div>
</template>

<style scoped>
/* Article-only reading controls; the existing navigation and theme stay intact. */
.ss-os-guide :deep(ul){list-style:disc}
.ss-os-guide :deep(ol){list-style:decimal}
.ss-os-guide :deep(li){margin:8px 0}
.ss-os-guide :deep(li::marker){color:var(--chapter-accent,var(--ss-orange))}
.ss-os-guide :deep(table){white-space:normal;width:100%}
.ss-os-guide :deep(th),.ss-os-guide :deep(td){vertical-align:top}
.ss-os-guide :deep(div[class*="language-"]){position:relative;margin:22px 0;min-width:0}
.ss-os-guide :deep(div[class*="language-"] pre){margin:0;padding-top:56px}
.ss-os-guide :deep(div[class*="language-"]>.lang){position:absolute;top:19px;left:18px;color:var(--ss-muted);font:11px/1.4 ui-monospace,monospace;text-transform:uppercase}
.ss-os-guide :deep(button.copy){position:absolute;top:8px;right:8px;z-index:1;display:grid;place-items:center;min-width:64px;min-height:40px;padding:6px 12px;border:1px solid var(--ss-line);border-radius:6px;background:var(--ss-panel);color:var(--ss-text);font:13px/1.4 var(--ss-font-ui);cursor:pointer;opacity:1}
.ss-os-guide[data-locale='ko'] :deep(button.copy::before){content:'복사'}
.ss-os-guide[data-locale='ko'] :deep(button.copy.copied::before){content:'복사됨'}
.ss-os-guide[data-locale='en'] :deep(button.copy::before){content:'Copy'}
.ss-os-guide[data-locale='en'] :deep(button.copy.copied::before){content:'Copied'}
.ss-os-guide :deep(button.copy:hover){border-color:var(--chapter-accent,var(--ss-orange))}
.ss-os-guide :deep(details){margin:18px 0;padding:14px 16px;border:1px solid var(--ss-line);border-radius:8px;background:var(--ss-panel)}
.ss-os-guide :deep(summary){cursor:pointer;color:var(--ss-text);font-weight:600;line-height:1.6}
.ss-os-guide :deep(summary:focus-visible){outline:2px solid var(--ss-orange);outline-offset:4px}
@media(max-width:759px){.ss-os-guide :deep(button.copy){min-height:44px}}
</style>
