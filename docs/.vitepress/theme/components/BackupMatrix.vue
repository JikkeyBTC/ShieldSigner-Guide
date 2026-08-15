<template>
  <div class="backup-matrix" role="region" aria-label="백업 매체와 개수 비교">
    <div class="backup-matrix__scroll"><table><caption>백업 매체·개수 비교</caption><thead><tr><th>구성</th><th>장점</th><th>주의점</th><th>권장 용도</th></tr></thead><tbody>
      <tr><th>종이 1장</th><td>저렴하고 오프라인</td><td>화재·습기·분실에 취약</td><td>단독 백업으로 사용하지 않기</td></tr>
      <tr><th>금속 1장</th><td>열·습기에 상대적으로 강함</td><td>분실·도난과 기록 오류 위험</td><td>장기 보관용 보조 수단</td></tr>
      <tr><th>종이 + 금속</th><td>서로 다른 위험을 분산</td><td>두 보관 위치를 모두 관리</td><td>카드와 함께 쓰는 보조 백업</td></tr>
      <tr><th>SeedKeeper 여러 장</th><td>PIN 보호와 복구 시험</td><td>손상·잠금·호환성 확인 필요</td><td>서로 다른 장소에 암호화 복제</td></tr>
    </tbody></table></div>
    <p class="backup-matrix__note">어떤 매체도 단독 정답은 아닙니다. 실제 자금에 쓰기 전에 최소 두 가지 방식으로 복원 가능성을 시험하세요.</p>
  </div>
</template>
<style scoped>
.backup-matrix{margin:24px 0;border:1px solid var(--ss-line);border-radius:12px;background:var(--ss-panel);overflow:hidden}.backup-matrix__scroll{overflow-x:auto}.backup-matrix table{width:100%;min-width:650px;border-collapse:collapse;font-size:13px}.backup-matrix caption{text-align:left;padding:14px 16px;font-weight:700;color:var(--ss-text);background:#302e2c}.backup-matrix th,.backup-matrix td{padding:12px 14px;border-top:1px solid var(--ss-line);text-align:left;vertical-align:top;color:#c8c3be}.backup-matrix thead th{color:var(--ss-orange);font-size:11px;letter-spacing:.06em}.backup-matrix tbody th{color:var(--ss-text);white-space:nowrap}.backup-matrix__note{margin:0;padding:12px 16px;color:#aaa39c;font-size:12px}
</style>
