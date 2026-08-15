<script setup lang="ts">
withDefaults(defineProps<{ label?: string; aspect?: string }>(), { label: 'Product image coming soon', aspect: '16 / 9' })
</script>

<template>
  <figure class="ss-media-placeholder" :style="{ aspectRatio: aspect }" role="img" :aria-label="label">
    <div class="ss-media-grid" aria-hidden="true" />
    <figcaption><span class="ss-media-dot" aria-hidden="true" />{{ label }}</figcaption>
  </figure>
</template>
