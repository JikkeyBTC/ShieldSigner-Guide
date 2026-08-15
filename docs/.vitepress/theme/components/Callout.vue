<script setup lang="ts">
import { computed } from 'vue'
const props = withDefaults(defineProps<{ type?: 'info' | 'warning' | 'danger' | 'success'; title: string }>(), { type: 'info' })
const label = computed(() => ({ info: '참고', warning: '주의', danger: '중단', success: '확인' }[props.type]))
</script>
<template>
  <aside class="ss-callout" :class="`ss-callout--${type}`" :aria-label="`${label}: ${title}`">
    <div class="ss-callout-heading"><span class="ss-callout-label">{{ label }}</span><strong>{{ title }}</strong></div>
    <div class="ss-callout-body"><slot /></div>
  </aside>
</template>
<style scoped>
.ss-callout{margin:26px 0;padding:16px 18px;border:1px solid var(--ss-line);border-left:3px solid var(--ss-orange);border-radius:10px;background:var(--ss-panel);color:#d0cbc6}.ss-callout--warning{border-left-color:#ffd65a}.ss-callout--danger{border-left-color:#ff5d4f}.ss-callout--success{border-left-color:#66d69b}.ss-callout-heading{display:flex;align-items:center;gap:10px;margin-bottom:8px;color:var(--ss-text)}.ss-callout-label{font:700 10px/1 ui-monospace,SFMono-Regular,monospace;letter-spacing:.12em;color:var(--ss-orange);text-transform:uppercase}.ss-callout--warning .ss-callout-label{color:#ffd65a}.ss-callout--danger .ss-callout-label{color:#ff5d4f}.ss-callout--success .ss-callout-label{color:#66d69b}.ss-callout-body :deep(p){margin:0;color:#d0cbc6}.ss-callout-body :deep(p + p){margin-top:8px}
</style>
