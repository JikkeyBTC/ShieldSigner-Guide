<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'
import { animateEnter } from '../../../../src/guide/animation'

const { page } = useData()
const cards = computed(() => {
  const path = page.value.relativePath
  if (path.includes('verify')) return [
    { label: 'READ', text: '공식 릴리즈와 파일 지문을 먼저 확인하세요.' },
    { label: 'CHECK', text: 'SHA-256과 PGP 서명이 모두 일치해야 합니다.' },
    { label: 'NEXT', text: '검증이 끝나면 microSD에 기록합니다.' }
  ]
  if (path.includes('seedkeeper')) return [
    { label: 'READ', text: '카드·PIN·암호화 내보내기의 차이를 이해하세요.' },
    { label: 'CHECK', text: '복원 테스트와 두 번째 백업 카드를 준비하세요.' },
    { label: 'NEXT', text: '실제 시드는 화면 밖에 기록하지 않습니다.' }
  ]
  if (path.includes('wallet') || path.includes('transactions')) return [
    { label: 'READ', text: '워치온리 앱에는 공개 정보만 연결합니다.' },
    { label: 'CHECK', text: '주소·금액·수수료를 ShieldSigner에서 대조합니다.' },
    { label: 'NEXT', text: '검토가 끝난 PSBT만 서명하고 전송합니다.' }
  ]
  return [
    { label: 'READ', text: '페이지의 순서를 처음부터 따라가세요.' },
    { label: 'CHECK', text: '검증과 안전 경고를 건너뛰지 않습니다.' },
    { label: 'NEXT', text: '다음 단계는 왼쪽 목차에서 선택합니다.' }
  ]
})
const cardNodes = ref<Element[]>([])
onMounted(() => animateEnter(cardNodes.value))
</script>

<template>
  <aside class="ss-summary-rail" aria-label="Chapter summary">
    <div class="ss-summary-kicker">QUICK SUMMARY</div>
    <div v-for="card in cards" ref="cardNodes" :key="card.label" class="ss-summary-card ss-reveal">
      <span class="ss-summary-label">{{ card.label }}</span>
      <p>{{ card.text }}</p>
    </div>
  </aside>
</template>
