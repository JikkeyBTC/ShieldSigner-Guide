---
title: SeedKeeper란?
description: SeedKeeper 애플릿과 시드 백업의 개념
verifiedOn: 2026-08-16
verifiedVersion: SeedKeeper buyer guide
estimatedTime: 5분
---

<script setup>
import GuideFigure from '../../.vitepress/theme/components/GuideFigure.vue'
import GuideContent from '../../.vitepress/theme/components/GuideContent.vue'
</script>

<GuideContent>

# SeedKeeper란?

<GuideFigure class="ss-seedkeeper-logo"
  src="/brand/seedkeeper/seedkeeper_logo_black.png"
  alt="SeedKeeper by Satochip 로고"
  caption="JavaCard에 설치해 사용하는 SeedKeeper 애플릿을 소개해요."
/>

SeedKeeper는 JavaCard에서 동작하는 보안 금고 애플릿입니다.<br> 시드나 기타 시크릿을 카드 내부에 저장하고, PIN 인증으로 시드구문에 접근하도록 설계된 프로젝트입니다.<br>
ShieldSigner 에서는 SeedKeeper를 기본적으로 탑재하여, 카드 초기화 및 사용을 할 수 있게 도와줍니다.<br>
인터넷이 전혀 연결되어있지 않은 에어갭 환경에서 카드 초기화와 시드구문 저장, 불러오기를 하여 안전하게 사용할 수 있습니다.

공식 자료: [SeedKeeper Applet 저장소](https://github.com/Toporin/Seedkeeper-Applet) · [seedkeeper.io 빠른 시작](https://seedkeeper.io/quick-start/)

## 다음 단계

[← JavaCard란?](./javacard) · [다음: 카드 사용하기 →](./backup-recovery)

</GuideContent>
