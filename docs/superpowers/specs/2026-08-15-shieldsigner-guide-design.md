# ShieldSigner Guide 디자인 설계

## 1. 목적과 범위

ShieldSigner를 구매한 사용자가 하드웨어 조립부터 실제 거래 서명까지 스스로 확인할 수 있는 한국어 가이드 사이트를 만든다. 사이트는 GitHub Pages에서 제공하는 정적 문서 사이트이며, 구매·결제·로그인 기능은 포함하지 않는다. URL은 공개될 수 있고 구매자에게 안내하는 방식으로 운영한다.

ShieldSigner는 공식 SeedSigner 펌웨어와 OS를 수정 없이 사용하는 독립 DIY 하드웨어 키트로 설명한다. ShieldSigner와 SeedSigner의 책임 범위를 분리하고, 공식 업스트림 프로젝트와의 비제휴 여부를 명확히 표시한다.

### 목표

- 조립 초보자와 기존 비트코인 사용자 모두가 빠르게 필요한 단계로 이동할 수 있게 한다.
- 부품 조립, OS 설치, PGP·SHA-256 검증, 지갑 연결, 거래 서명, 복구 훈련을 하나의 완결된 흐름으로 제공한다.
- 실제 자금 사용 전에 testnet과 복구 확인을 거치도록 유도한다.
- 제품 이미지가 준비되기 전에도 같은 비율의 플레이스홀더로 레이아웃을 확정할 수 있게 한다.
- 모바일 화면에서 목차 탐색과 긴 검증 명령을 모두 사용할 수 있게 한다.

### 범위 밖

- 사이트 내 판매, 결제, 구매자 인증
- SeedSigner 업스트림 코드나 OS 이미지의 수정·재배포
- BlueWallet·코코넛 월렛의 공식 지원을 암시하는 표현
- 사용자의 시드, 개인키, 지갑 백업을 업로드하거나 저장하는 기능

## 2. 독자와 사용 맥락

기본 독자는 전자 조립과 셀프커스터디가 모두 처음인 구매자다. 동시에 비트코인 지갑 경험이 있고 SeedSigner만 처음 사용하는 사람도 빠르게 필요한 페이지로 이동할 수 있어야 한다.

각 문서 상단에 준비물, 예상 소요 시간, 검증한 OS·앱 버전, 마지막 검증일을 표시한다. 본문은 평문 설명을 기본으로 하며 고급 세부사항은 접을 수 있는 참고 영역이나 별도 링크로 분리한다.

## 3. 정보 구조와 영구 경로

```text
/
├─ 소개
├─ 시작 전 체크리스트
├─ 조립 방법
├─ ShieldSigner OS
│  ├─ OS 다운로드·설치
│  └─ PGP·SHA-256 검증
├─ 지갑 만들기
│  ├─ 시드 생성
│  ├─ SeedQR
│  └─ 복구 연습
├─ SeedKeeper 백업
│  ├─ JavaCard란 무엇인가
│  ├─ SeedKeeper란 무엇인가
│  ├─ 카드 초기화·PIN 설정
│  ├─ 시드를 카드에 백업하기
│  ├─ 카드 간 백업 복제
│  ├─ 백업을 다시 복구하기
│  └─ 카드 분실·다중 백업 대응
├─ 보기 전용 지갑
│  ├─ BlueWallet
│  └─ 코코넛 월렛
├─ 비트코인 거래
│  ├─ 받기 주소 검증
│  └─ PSBT 검토·서명
└─ 참고
   ├─ 보안 원칙
   ├─ FAQ
   ├─ 용어집
   └─ 출처·오픈소스 고지
```

의미 있는 영구 슬러그를 사용한다. 예시는 `/build/assembly`, `/os/install`, `/os/verify`, `/seedkeeper/javacard`, `/seedkeeper/what-is-seedkeeper`, `/seedkeeper/backup`, `/seedkeeper/restore`, `/wallet/bluewallet`, `/wallet/coconut`, `/transactions/sign-psbt`, `/recovery/backup`이다. GitBook에서 사용되던 `undefined-*` 경로는 재사용하지 않는다.

SeedKeeper는 별도 상위 카테고리로 노출한다. ShieldSigner의 핵심 가치가 시드 백업인 만큼, 일반 지갑 생성 문서 안에 묻히게 하지 않고 설치·검증 다음의 주요 경로로 배치한다.

## 4. 문서 페이지 템플릿

모든 작업 문서는 다음 순서와 컴포넌트를 공유한다.

1. 페이지 제목과 한 줄 목적
2. 준비물·예상 시간·검증 버전
3. 번호가 있는 단계별 본문
4. 단계별 이미지 또는 `MediaPlaceholder`
5. 완료 체크리스트
6. 실패하거나 즉시 중단해야 하는 조건
7. 다음 단계 링크
8. 업스트림 출처와 마지막 검증일

핵심 컴포넌트 경계는 다음과 같다.

- `DocsShell`: 3열 레이아웃, 모바일 전환, 전역 포커스 상태
- `CategoryNav`: 상위 카테고리와 현재 위치
- `ChapterRail`: 현재 챕터 카드, 진행률, 챕터 전환
- `StepCard`: 설명·명령·이미지·체크리스트를 담는 단위
- `SafetyCallout`: 위험, 결과, 예방, 이상 시 중단을 반복하는 경고 블록
- `VersionBadge`: OS·지갑 버전과 검증일
- `MediaPlaceholder`: 제품 사진 교체용 고정 비율 영역
- `SourceNote`: SeedSigner, BlueWallet, 코코넛 월렛 및 라이선스 출처
- `SeedKeeperFlow`: 카드 준비, PIN, 시드 전송, 백업 확인, 복구를 연결하는 흐름 컴포넌트
- `GlossaryTerm`: JavaCard, secure element, applet, authentikey, plaintext export, encrypted export를 짧게 설명하는 용어 카드
- `BackupMatrix`: 종이·금속·SeedKeeper·복수 카드의 보호 대상과 복구 경로를 비교하는 표

### SeedKeeper 전용 콘텐츠

SeedKeeper 섹션은 다음 순서로 작성한다.

1. **JavaCard란 무엇인가** — 일반 스마트카드, secure element, JavaCard 플랫폼, applet의 관계를 그림으로 설명한다. JavaCard는 카드 안에서 제한된 애플릿을 실행하는 플랫폼이며 SeedKeeper 자체와 동일한 말이 아님을 명시한다.
2. **SeedKeeper란 무엇인가** — SeedKeeper Applet이 카드의 보안 메모리에 seed, masterseed와 기타 비밀을 저장하는 오픈소스 보안 금고라는 점을 설명한다. SeedKeeper-Tool, 모바일 NFC, 데스크톱 카드 리더가 각각 어떤 역할을 하는지 구분한다.
3. **카드 초기화와 PIN** — 카드 인식, 카드 라벨, PIN 설정, PIN 재입력, 잠금·실패 조건을 단계별로 안내한다. PIN은 시드 자체가 아니며, PIN을 잊었을 때의 복구 가능성을 별도로 표시한다.
4. **ShieldSigner 시드를 카드에 백업하기** — ShieldSigner에서 백업할 seed를 선택하고, 카드와 호스트를 준비하고, 카드로 전송하고, 라벨을 지정하고, 카드 목록에서 백업 항목을 다시 확인하는 흐름을 제공한다. 실제 시드를 호스트 화면이나 클립보드에 평문으로 노출하는 경로는 별도 경고를 거친다.
5. **카드 간 백업 복제** — 원본 카드와 백업 카드를 구분하고, secure pairing 또는 암호화 export가 필요한 경우를 표시한다. 복제 완료 후 두 카드에서 라벨·항목·복구 가능 여부를 확인하는 체크리스트를 둔다.
6. **카드에서 복구하기** — 카드의 seed를 ShieldSigner 또는 호환 지갑으로 가져오는 경로를 설명하고, plaintext export와 encrypted export를 별도 탭으로 나눈다. 복구 후 파생 경로와 첫 주소를 대조하도록 한다.
7. **분실·추가 백업·폐기** — 카드 한 장에 의존하지 않는 복구 계획, 추가 카드의 물리 보관, 카드 폐기와 PIN 관리, 복구 리허설 주기를 설명한다.

게시 전 검증 출처는 [Seedkeeper Applet 저장소](https://github.com/Toporin/Seedkeeper-Applet), [SeedKeeper 공식 빠른 시작](https://seedkeeper.io/quick-start/), [Oracle Java Card 개발자 문서](https://docs.oracle.com/en/java/javacard/)로 고정한다. SeedKeeper Applet의 라이선스가 ShieldSigner 또는 SeedSigner 라이선스와 다를 수 있으므로 `ATTRIBUTION.md`에서 별도로 고지한다.

## 5. 시각 시스템

첨부된 ShieldSigner 로고와 Anime.js 문서의 정보 밀도에서 방향을 가져오되, Anime.js 사이트의 로고·CSS·레이아웃을 그대로 복제하지 않는다.

### 색상 토큰

- `--ss-bg: #252423` — 전체 배경
- `--ss-panel: #2A2928` — 카드와 사이드 패널
- `--ss-panel-raised: #302F2D` — 선택된 카드와 입력 영역
- `--ss-orange: #FD6D02` — ShieldSigner 강조색과 활성 상태
- `--ss-orange-dim: #57311D` — 강조색의 어두운 배경
- `--ss-white: #FDFDFD` — 주요 텍스트
- `--ss-muted: #96918D` — 보조 텍스트
- `--ss-yellow: #FFD65A` — 로고 칩 모티프와 제한된 보조 강조

### 로고

원본 PNG의 1214×389 비율과 오렌지·백색 분할을 유지한다. 최종 산출물은 `public/brand/shieldsigner.svg`이며, 글자까지 path로 변환해 시스템 폰트에 의존하지 않게 한다. 제품 이미지가 없는 동안 로고와 기기 모티프만 사용하고, 실제 제품 사진이 추가되면 `MediaPlaceholder`의 파일만 교체한다.

## 6. 레이아웃과 반응형 동작

- 1200px 이상: 왼쪽 카테고리 목차, 가운데 챕터 카드, 오른쪽 본문을 둔 3열 구조
- 760–1199px: 카테고리와 본문 중심의 2열 구조
- 760px 미만: 로고 헤더, 가로 스크롤 챕터 탐색, 단일 본문 구조
- 긴 해시, PGP 명령, 표는 모바일에서 컨테이너 가로 스크롤을 허용한다.
- 터치 대상은 충분한 간격과 명시적인 active 상태를 갖는다.
- 키보드 포커스, `aria-current`, 버튼 레이블, 이미지 대체 텍스트를 제공한다.
- `prefers-reduced-motion: reduce`에서는 Anime.js 모션을 끄고 즉시 상태를 표시한다.

## 7. 애니메이션 규칙

Anime.js는 npm 패키지의 필요한 모듈만 포함한다. 현재 공식 문서가 제공하는 npm·ES 모듈 사용 방식을 따르고, 최종 빌드에는 버전을 lockfile로 고정한다. Anime.js MIT 라이선스와 저작권 고지는 `ATTRIBUTION.md` 또는 오픈소스 고지 페이지에 기록한다.

허용하는 모션은 다음으로 제한한다.

- 목차와 챕터 카드의 짧은 opacity·translate 진입
- 챕터 선택 시 본문, 진행률, 활성 인디케이터 전환
- 카드 안의 점·그리드 장식 모션
- 콘텐츠 교체 시 250–650ms 범위의 짧은 전환

안전 경고, 검증 실패, 시드 취급 단계에는 과한 모션이나 색상만으로 의미를 전달하는 효과를 사용하지 않는다. 모바일에는 hover 전용 동작을 만들지 않는다.

## 8. 보안·콘텐츠 원칙

- 실제 자금 사용 전에 testnet에서 생성·복구·수신·지출을 연습한다.
- GitHub에서 받은 OS 이미지, 서명자 지문, PGP 서명, SHA-256 해시를 서로 다른 검증 대상으로 설명한다.
- 검증이 실패하면 설치나 실행을 진행하지 않고 중단한다.
- 실제 시드·SeedQR을 인터넷 연결 컴퓨터나 휴대전화 카메라에 입력하지 않는다.
- PSBT는 QR이라는 이유로 신뢰하지 않고 수신자, 금액, 수수료, 잔돈 주소를 기기 화면에서 확인한다.
- passphrase를 사용하면 다른 지갑이 생성될 수 있으며 분실 시 복구할 수 없음을 명시한다.
- 멀티시그 또는 보기 전용 지갑에서 네트워크, 스크립트 유형, 계정, 파생 경로, 마스터 지문과 지갑 정책을 확인한다.
- SeedKeeper를 “시드를 카드에 넣으면 끝나는 기능”으로 설명하지 않는다. 카드의 PIN, 카드 분실, 카드 복제, 복구 테스트와 카드 접근 경로를 함께 설명한다.
- JavaCard는 스마트카드 보안 영역에서 애플릿을 실행하는 플랫폼이고, SeedKeeper 애플릿은 그 플랫폼 위에서 시드와 기타 비밀을 관리하는 오픈소스 애플릿이라는 층위를 구분한다.
- SeedKeeper의 plaintext export와 암호화 export를 분리한다. plaintext export는 시드가 화면·클립보드·호스트 메모리에 노출될 수 있으므로 경고와 중단 조건을 함께 표시한다.
- 암호화 export는 호환 장치와 secure pairing이 필요할 수 있으므로 “모든 지갑에서 자동 복구된다”고 표현하지 않는다.
- 카드 간 백업은 한 장의 카드가 원본과 동일한 비밀을 담는다는 의미임을 설명하고, 복제 카드 수를 늘릴 때 물리적 절도·분실 표면도 함께 평가하게 한다.
- PIN 분실과 반복된 잘못된 PIN 입력의 결과는 카드·애플릿 버전에 따라 확인한 뒤 게시한다. 공식 SeedKeeper Applet 문서의 동작을 그대로 일반화하지 않는다.
- 페이지마다 ShieldSigner의 하드웨어 키트, 공식 SeedSigner OS, 외부 코디네이터 지갑의 책임 범위를 분리한다.
- “절대 안전”, “해킹되지 않는다”, “도난당해도 무용지물” 같은 절대 표현을 사용하지 않는다.

## 9. 기술 선택과 배포

- 문서 프레임워크: VitePress
- 애니메이션: `animejs` npm 패키지, 필요한 모듈만 import
- 호스팅: GitHub Pages 프로젝트 사이트
- 배포: GitHub Actions에서 정적 빌드 후 Pages 배포
- 프로젝트 base path: `/ShieldSigner-Guide/`
- 제품 사진과 로고 파일: `public/brand/`, `public/media/`
- 문서 원본: `docs/`

동적 서버, 비밀값, 사용자 데이터 저장소를 사용하지 않는다. GitHub Pages가 공개 호스팅이라는 사실을 README와 사이트 고지에 기록한다.

## 10. 검증 기준

디자인과 구현이 완료되었다고 판단하려면 다음을 확인한다.

- 모든 영구 경로가 새로고침과 직접 링크에서 동작한다.
- desktop, tablet, 390px 전후 모바일 폭에서 목차와 본문이 겹치지 않는다.
- 모바일에서 긴 명령과 해시를 가로 스크롤할 수 있다.
- 키보드만으로 목차, 체크리스트, 링크를 사용할 수 있다.
- reduced-motion 환경에서 내용이 누락되지 않는다.
- OS 검증 페이지에 PGP 지문, 서명 파일, SHA-256 확인 절차가 분리되어 있다.
- BlueWallet·코코넛 월렛 페이지에 첫 주소 대조 단계가 포함되어 있다.
- JavaCard와 SeedKeeper의 차이를 초보자도 설명할 수 있다.
- SeedKeeper 카드 초기화, PIN 설정, 시드 백업, 카드 간 복제, 복구 검증의 다섯 흐름이 각각 독립 링크를 갖는다.
- plaintext export와 encrypted export의 위험과 호환성 차이가 문서와 UI에서 명확히 구분된다.
- SeedKeeper 관련 문서는 사용한 애플릿·앱·카드 리더 버전과 마지막 검증일을 표시한다.
- 모든 제품 이미지 플레이스홀더가 나중에 파일 교체로 대체될 수 있다.
- SVG 로고가 외부 폰트 없이 동일하게 보인다.
- Anime.js와 SeedSigner 관련 출처·라이선스 고지가 포함되어 있다.

## 11. 명시적으로 결정된 가정

- ShieldSigner는 공식 SeedSigner 펌웨어를 수정 없이 사용하는 DIY 하드웨어 키트다.
- 조립과 OS 설치·검증은 별도 페이지로 제공한다.
- SeedKeeper는 조립·OS·지갑 연동과 동급의 별도 핵심 기능 카테고리로 제공한다.
- BlueWallet과 코코넛 월렛을 보기 전용 지갑 연동 대상으로 제공한다.
- 사이트는 구매자에게 안내하지만 URL 접근 자체는 제한하지 않는다.
- 제품 사진은 나중에 추가하며 현재는 플레이스홀더를 사용한다.
