---
title: 키트 조립 방법
description: ShieldSigner 키트 조립 동영상
---

<script setup>
import { withBase } from 'vitepress'
</script>

# ShieldSigner 조립 동영상

<div>
<video
  :src="withBase('/guides/assembly/assembly-ko-sohee.mp4')"
  :poster="withBase('/guides/assembly/assembly-ko-poster.jpg')"
  controls
  playsinline
  preload="metadata"
  aria-label="ShieldSigner 키트 조립 동영상"
  aria-describedby="assembly-video-info"
  style="display: block; width: 100%; max-height: 75vh; margin: 0 auto; background: #000; border-radius: 10px;"
>
  <track kind="chapters" :src="withBase('/guides/assembly/assembly-ko-chapters.vtt')" srclang="ko" label="조립 단계" default />
</video>
</div>

<p id="assembly-video-info" class="ss-assembly-note">한국어 Sohee 음성·자막 포함 · 약 3분 7초 · 반복 나사 조이기는 2배속입니다. <a :href="withBase('/guides/assembly/assembly-ko-sohee.srt')" download>자막 내려받기</a></p>

<p class="ss-assembly-note">※ SD 카드는 빈 상태로 배송됩니다. 꼭 <a href="../os/install">Installation</a>을 참고하여 SD카드에 설치를 진행해주세요.</p>

<style scoped>
.ss-assembly-note {
  margin: 10px 0 0;
  color: #9c9690;
  font-size: 0.75rem;
  line-height: 1.5;
}
</style>
