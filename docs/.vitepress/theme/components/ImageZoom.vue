<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { getLocaleFromPath } from '../../../../src/guide/locales'

defineProps<{ src: string; alt: string }>()
const { page } = useData()
const english = computed(() => getLocaleFromPath(`/${page.value.relativePath}`) === 'en')
const trigger = ref<HTMLButtonElement>()
const dialog = ref<HTMLDialogElement>()
const isOpen = ref(false)
const failed = ref(false)
const imageRatio = ref(1)
const closeButton = ref<HTMLButtonElement>()
let previousOverflow = ''
let previousRootOverflow = ''

async function open() {
  if (isOpen.value) return
  previousOverflow = document.body.style.overflow
  previousRootOverflow = document.documentElement.style.overflow
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
  failed.value = false
  imageRatio.value = 1
  isOpen.value = true
  await nextTick()
  dialog.value?.showModal()
}

function close(restoreFocus = true) {
  if (!isOpen.value) return
  dialog.value?.close()
  isOpen.value = false
  document.body.style.overflow = previousOverflow
  document.documentElement.style.overflow = previousRootOverflow
  if (restoreFocus) trigger.value?.focus({ preventScroll: true })
}

watch(() => page.value.relativePath, () => close(false))
onBeforeUnmount(() => close(false))
</script>

<template>
  <button ref="trigger" class="ss-image-trigger" type="button" aria-haspopup="dialog"
    :aria-label="`${alt} — ${english ? 'Enlarge image' : '이미지 확대'}`" @click="open">
    <img :src="src" :alt="alt" loading="lazy" decoding="async" />
  </button>
  <Teleport to="body">
    <dialog v-if="isOpen" ref="dialog" class="ss-image-viewer" aria-modal="true"
      :aria-label="alt || (english ? 'Enlarged image' : '확대 이미지')"
      @cancel.prevent="close()" @click.self="close()" @keydown.tab.prevent="closeButton?.focus()">
      <button ref="closeButton" class="ss-image-viewer-close" type="button" autofocus
        :aria-label="english ? 'Close image' : '이미지 닫기'" @click="close()">
        <svg aria-hidden="true" viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      </button>
      <p v-if="failed" role="status">{{ english ? 'Unable to load this image.' : '이미지를 불러올 수 없어요.' }}</p>
      <img v-else class="ss-image-viewer-image" :src="src" :alt="alt"
        :style="{ '--ss-image-ratio': imageRatio }"
        @load="imageRatio = ($event.target as HTMLImageElement).naturalWidth / ($event.target as HTMLImageElement).naturalHeight"
        @error="failed = true" />
    </dialog>
  </Teleport>
</template>

<style scoped>
.ss-image-trigger{display:block;width:100%;max-width:100%;padding:0;border:0;background:transparent;color:inherit;cursor:zoom-in;text-align:inherit}
.ss-image-trigger>img{display:block;width:100%;max-width:100%;height:auto;margin:0}
.ss-image-trigger:focus-visible{outline:2px solid var(--ss-orange);outline-offset:4px}
.ss-image-viewer{position:fixed;inset:0;width:100vw;height:100vh;height:100dvh;max-width:none;max-height:none;margin:0;padding:76px 24px 24px;border:0;background:rgba(12,12,12,.96);color:#fff;overflow:hidden;overscroll-behavior:contain}
.ss-image-viewer[open]{display:flex;align-items:center;justify-content:center}
.ss-image-viewer::backdrop{background:rgba(0,0,0,.7)}
.ss-image-viewer-image{display:block;width:min(100%,calc((100dvh - 100px) * var(--ss-image-ratio,1)));height:auto;max-width:100%;max-height:100%;object-fit:contain;margin:0}
.ss-image-viewer-close{position:absolute;top:max(16px,env(safe-area-inset-top));right:max(16px,env(safe-area-inset-right));display:grid;place-items:center;width:48px;height:48px;padding:0;border:1px solid rgba(255,255,255,.3);border-radius:50%;background:#242424;color:#fff;cursor:pointer}
.ss-image-viewer-close:hover{background:#3b3b3b}
.ss-image-viewer-close:focus-visible{outline:2px solid #fff;outline-offset:3px}
@media(max-width:599px){.ss-image-viewer{padding:76px 12px 20px}}
</style>
