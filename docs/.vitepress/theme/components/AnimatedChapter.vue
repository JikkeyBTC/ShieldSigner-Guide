<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { animateEnter, animateSwap } from '../../../../src/guide/animation'

const { page } = useData()
const root = ref<HTMLElement>()
let firstPaint = true

onMounted(() => {
  if (root.value) animateEnter(Array.from(root.value.children))
})

watch(() => page.value.relativePath, () => {
  if (firstPaint) {
    firstPaint = false
    return
  }
  if (root.value) animateSwap(root.value)
})
</script>

<template>
  <div ref="root" class="ss-animated-chapter">
    <slot />
  </div>
</template>
