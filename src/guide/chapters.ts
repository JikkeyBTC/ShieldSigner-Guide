export interface ChapterMeta {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly group: string
  readonly order: number
}

/** The public route map. Keep links site-relative so GitHub Pages' base path can be applied by VitePress. */
export const chapters = [
  { id: 'overview', label: '개요', href: '/', group: '시작하기', order: 1 },
  { id: 'what-is-shieldsigner', label: 'ShieldSigner란 무엇인가요?', href: '/getting-started/what-is-shieldsigner/', group: '시작하기', order: 2 },
  { id: 'assembly', label: '조립 방법', href: '/build/assembly/', group: '시작하기', order: 3 },
  { id: 'os-install', label: 'ShieldSigner OS 설치', href: '/os/install/', group: 'OS', order: 4 },
  { id: 'javacard', label: 'JavaCard란?', href: '/seedkeeper/javacard/', group: 'SeedKeeper', order: 5 },
  { id: 'what-is-seedkeeper', label: 'SeedKeeper란?', href: '/seedkeeper/what-is-seedkeeper/', group: 'SeedKeeper', order: 6 },
  { id: 'seedkeeper-initialize', label: '카드 초기화와 PIN', href: '/seedkeeper/initialize/', group: 'SeedKeeper', order: 8 },
  { id: 'seedkeeper-save', label: '시드를 카드에 저장하기', href: '/seedkeeper/save/', group: 'SeedKeeper', order: 9 },
  { id: 'seedkeeper-load', label: '카드에서 시드 불러오기', href: '/seedkeeper/load/', group: 'SeedKeeper', order: 10 },
  { id: 'bluewallet', label: 'BlueWallet', href: '/wallet/bluewallet/', group: '워치온리 지갑', order: 13 },
  { id: 'coconut', label: '코코넛 월렛', href: '/wallet/coconut/', group: '워치온리 지갑', order: 14 },
  { id: 'sign-psbt', label: 'PSBT 검토와 서명', href: '/transactions/sign-psbt/', group: '거래', order: 15 },
  { id: 'security', label: '보안 체크리스트', href: '/reference/security/', group: '참고', order: 16 },
  { id: 'faq', label: '자주 묻는 질문', href: '/reference/faq/', group: '참고', order: 17 },
  { id: 'glossary', label: '용어집', href: '/reference/glossary/', group: '참고', order: 18 },
  { id: 'sources', label: '출처와 라이선스', href: '/reference/sources/', group: '참고', order: 19 }
] as const satisfies readonly ChapterMeta[]

const normalizePath = (pathname: string) => {
  const withoutQuery = pathname.split(/[?#]/, 1)[0] || '/'
  const withLeadingSlash = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`
  if (withLeadingSlash === '/') return '/'
  return `${withLeadingSlash.replace(/\/+$/, '')}/`
}

export function getChapterByPath(pathname: string): ChapterMeta | undefined {
  const normalized = normalizePath(pathname)
  return chapters.find((chapter) => chapter.href === normalized)
}
