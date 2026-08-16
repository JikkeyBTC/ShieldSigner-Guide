<script setup lang="ts">
type Circle = readonly [number, number, number]
type Rect = readonly [number, number, number, number, number]
type IconSpec = { paths: readonly string[]; circles?: readonly Circle[]; rects?: readonly Rect[] }

const props = defineProps<{ name: string }>()

const icons: Record<string, IconSpec> = {
  'shield-check': { paths: ['M24 4l14 6v10c0 9-6 16-14 20C16 36 10 29 10 20V10l14-6z', 'M16 24l5 5 11-12'] },
  'shield-logo': { paths: ['M24 4l14 6v10c0 9-6 16-14 20C16 36 10 29 10 20V10l14-6z', 'M17 19h14', 'M24 12v14'] },
  'seed-vault': { paths: ['M24 5a13 13 0 1 0 0 26a13 13 0 0 0 0-26z', 'M19 22h10', 'M21 22v-5a3 3 0 0 1 6 0v5', 'M17 31l7-7 7 7'] },
  'eye-wallet': { paths: ['M5 24s7-10 19-10 19 10 19 10-7 10-19 10S5 24 5 24z', 'M24 19a5 5 0 1 0 0 10a5 5 0 0 0 0-10z'], rects: [[14, 7, 20, 9, 2]] },
  'bitcoin-flow': { paths: ['M24 7v34', 'M18 12h10a5 5 0 0 1 0 10H18h11a5 5 0 0 1 0 10H18', 'M16 12h-3', 'M16 34h-3'], circles: [[24, 24, 18]] },
  send: { paths: ['M8 24h28', 'M27 14l10 10-10 10', 'M8 18h8', 'M8 30h8'] },
  receive: { paths: ['M40 24H12', 'M21 14L11 24l10 10', 'M40 18h-8', 'M40 30h-8'] },
  'book-links': { paths: ['M8 9h12a5 5 0 0 1 5 5v25H13a5 5 0 0 1-5-5V9z', 'M40 9H28a5 5 0 0 0-5 5v25h12a5 5 0 0 1 5 5V9z', 'M30 22h8a4 4 0 0 1 0 8h-8a4 4 0 0 1 0-8z', 'M18 30h8a4 4 0 0 0 0-8h-8a4 4 0 0 0 0 8z'] },
  'circuit-board': { paths: ['M10 10h28v28H10z', 'M16 10V4', 'M24 10V4', 'M32 10V4', 'M16 44v-6', 'M24 44v-6', 'M32 44v-6', 'M10 16H4', 'M10 24H4', 'M10 32H4', 'M44 16h-6', 'M44 24h-6', 'M44 32h-6', 'M16 16h16v16H16z'], circles: [[24, 24, 3]] },
  'sd-flash': { paths: ['M12 8h24v32H12z', 'M18 8V4h12v4', 'M18 20h12', 'M18 27h12', 'M18 34h8'], rects: [[17, 16, 14, 4, 1]] },
  'hash-check': { paths: ['M17 8l-4 32', 'M31 8l-4 32', 'M8 19h31', 'M7 30h24', 'M31 32l4 4 8-10'] },
  chip: { paths: ['M16 16h16v16H16z', 'M20 20h8v8h-8z', 'M16 20h-5', 'M16 28h-5', 'M32 20h5', 'M32 28h5', 'M20 16v-5', 'M28 16v-5', 'M20 32v5', 'M28 32v5'] },
  'backup-cycle': { paths: ['M12 20a14 14 0 0 1 24-6l4 4', 'M40 18V8', 'M36 34a14 14 0 0 1-24 0l-4-4', 'M8 30v10', 'M17 21h14v10H17z'] },
  bluewallet: { paths: ['M7 15h30a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H7a3 3 0 0 1-3-3V18a3 3 0 0 1 3-3z', 'M8 15V9h25a4 4 0 0 1 4 4v2', 'M29 25h9v7h-9a3 3 0 0 1 0-7z'], circles: [[33, 28.5, 1]] },
  coconut: { paths: ['M10 28a14 14 0 1 1 28 0', 'M10 28h28', 'M14 28l-3 10h26l-3-10', 'M18 15l6 13 6-13'] },
  screwdriver: { paths: ['M31 8a9 9 0 0 0 7 12l-17 17a4 4 0 0 1-6-6l17-17a9 9 0 0 0-1-6z', 'M11 37l-4 4'] },
  'smart-card': { paths: ['M7 11h34v26H7z', 'M14 18h10v8H14z', 'M28 19h7', 'M28 25h7', 'M12 32h24'] },
  vault: { paths: ['M10 18h28v22H10z', 'M15 18v-5a9 9 0 0 1 18 0v5', 'M20 28h8', 'M24 24v8'] },
  'pin-lock': { paths: ['M13 19h22v21H13z', 'M18 19v-4a6 6 0 0 1 12 0v4', 'M19 25h2', 'M23 25h2', 'M27 25h2', 'M19 31h2', 'M23 31h2', 'M27 31h2'] },
  'seed-upload': { paths: ['M24 34V10', 'M17 17l7-7 7 7', 'M11 32v8h26v-8', 'M14 22a7 7 0 0 0 20 0'] },
  'card-copy': { paths: ['M10 14h24v26H10z', 'M16 8h22v26', 'M16 21h12', 'M16 28h8'] },
  restore: { paths: ['M38 16a16 16 0 1 0 1 16', 'M38 8v10H28', 'M24 18v12', 'M18 24h12'] },
  'recovery-route': { paths: ['M9 34c8-22 16 0 30-20', 'M33 14h8v8', 'M9 34h8v8'], circles: [[9, 34, 3], [39, 14, 3]] },
  signature: { paths: ['M8 35c8-11 11 6 17-6 4-8 8-12 15-12', 'M29 35h12', 'M11 41h28'] },
  'shield-warning': { paths: ['M24 4l14 6v10c0 9-6 16-14 20C16 36 10 29 10 20V10l14-6z', 'M24 14v11', 'M24 31v1'] },
  faq: { paths: ['M9 10h30v22H21l-8 7v-7H9z', 'M20 19a4 4 0 1 1 7 3c-2 2-3 2-3 5', 'M24 31v1'] },
  terms: { paths: ['M12 7h20l7 7v27H12z', 'M32 7v8h7', 'M18 23h14', 'M18 30h14', 'M18 37h8'] },
  glossary: { paths: ['M9 11h30v28H9z', 'M16 19h4', 'M26 19h6', 'M16 27h16', 'M16 35h10'] },
  'source-link': { paths: ['M10 8h21l7 7v25H10z', 'M31 8v8h7', 'M17 28h8', 'M28 25l5 5-5 5', 'M33 30H19'] },
}

const spec = () => icons[props.name] ?? icons.terms
</script>

<template>
  <svg class="ss-demo-icon" :data-icon="name" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect v-for="(rect, index) in spec().rects" :key="`r-${index}`" :x="rect[0]" :y="rect[1]" :width="rect[2]" :height="rect[3]" :rx="rect[4]" />
    <circle v-for="(circle, index) in spec().circles" :key="`c-${index}`" :cx="circle[0]" :cy="circle[1]" :r="circle[2]" />
    <path v-for="(path, index) in spec().paths" :key="`p-${index}`" :d="path" />
  </svg>
</template>
