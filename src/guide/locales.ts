import type { ChapterMeta } from './chapters'

export type GuideLocale = 'ko' | 'en'

export const DEFAULT_LOCALE: GuideLocale = 'ko'
export const SUPPORTED_LOCALES: readonly GuideLocale[] = ['ko', 'en']

const localePrefixes: Record<GuideLocale, string> = {
  ko: '/ko',
  en: '/en'
}

const labels: Record<GuideLocale, Record<string, string>> = {
  ko: {
    'getting-started': 'Getting started',
    os: 'ShieldSigner OS',
    seedkeeper: 'SeedKeeper',
    wallet: 'Watch-only wallets',
    transactions: 'Transactions',
    reference: 'Reference',
    hardware: 'Hardware',
    install: 'Installation',
    verify: 'Verification',
    verification: 'Verification',
    concepts: 'Concepts',
    backup: 'Backup & recovery',
    bluewallet: 'BlueWallet',
    coconut: 'Coconut',
    receive: 'Receive',
    send: 'Send',
    signing: 'Signing',
    safety: 'Safety',
    terms: 'Terms',
    overview: '개요',
    assembly: '키트 조립 방법',
    'os-install': 'ShieldSigner OS 설치',
    javacard: 'JavaCard란?',
    'what-is-seedkeeper': 'SeedKeeper란?',
    'seedkeeper-initialize': '카드 초기화와 PIN',
    'seedkeeper-backup': '시드를 카드에 백업하기',
    'seedkeeper-clone': '카드 간 복제',
    'seedkeeper-restore': '시드 복원하기',
    'seedkeeper-recovery': '분실과 복구 계획',
    'sign-psbt': 'PSBT 검토와 서명',
    security: '보안 체크리스트',
    faq: '자주 묻는 질문',
    glossary: '용어집',
    sources: '출처와 라이선스'
  },
  en: {
    'getting-started': 'Getting started',
    os: 'ShieldSigner OS',
    seedkeeper: 'SeedKeeper',
    wallet: 'Watch-only wallets',
    transactions: 'Transactions',
    reference: 'Reference',
    hardware: 'Hardware',
    install: 'Installation',
    verify: 'Verification',
    verification: 'Verification',
    concepts: 'Concepts',
    backup: 'Backup & recovery',
    bluewallet: 'BlueWallet',
    coconut: 'Coconut',
    receive: 'Receive',
    send: 'Send',
    signing: 'Signing',
    safety: 'Safety',
    terms: 'Terms',
    overview: 'Overview',
    assembly: 'Kit assembly',
    'os-install': 'Install ShieldSigner OS',
    javacard: 'What is JavaCard?',
    'what-is-seedkeeper': 'What is SeedKeeper?',
    'seedkeeper-initialize': 'Initialize the card and set a PIN',
    'seedkeeper-backup': 'Back up a seed to the card',
    'seedkeeper-clone': 'Clone between cards',
    'seedkeeper-restore': 'Restore a seed',
    'seedkeeper-recovery': 'Loss and recovery plan',
    bluewalletChapter: 'BlueWallet watch-only',
    coconutChapter: 'Coconut Wallet watch-only',
    'sign-psbt': 'Review and sign a PSBT',
    security: 'Security checklist',
    faq: 'Frequently asked questions',
    glossary: 'Glossary',
    sources: 'Sources and licenses'
  }
}

export function getLocaleFromPath(pathname: string): GuideLocale {
  const firstSegment = pathname.replace(/^\/+/, '').split(/[/?#]/, 1)[0]
  return firstSegment === 'en' ? 'en' : DEFAULT_LOCALE
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  const stripped = normalized.replace(/^\/(?:ko|en)(?=\/|$)/, '')
  return stripped || '/'
}

export function routeFromRelativePath(relativePath: string): string {
  const withoutExtension = relativePath.replace(/\.md$/, '')
  const routePath = withoutExtension === 'index' ? '/' : `/${withoutExtension}`
  const basePath = stripLocalePrefix(routePath)
  if (basePath === '/' || basePath === '/index') return '/'
  return basePath.endsWith('/index') ? `/${basePath.slice(1, -6)}/` : `${basePath.replace(/\/+$/, '')}/`
}

export function localizeHref(href: string, locale: GuideLocale): string {
  const baseHref = stripLocalePrefix(href)
  return baseHref === '/' ? `${localePrefixes[locale]}/` : `${localePrefixes[locale]}${baseHref}`
}

export function getLocalizedLabel(id: string, fallback: string, locale: GuideLocale): string {
  return labels[locale][id] ?? fallback
}

export function getLocalizedChapter(chapter: ChapterMeta, locale: GuideLocale): ChapterMeta {
  return {
    ...chapter,
    label: getLocalizedChapterLabel(chapter.id, chapter.label, locale),
    href: localizeHref(chapter.href, locale)
  }
}

export function getLocalizedChapterLabel(id: string, fallback: string, locale: GuideLocale): string {
  if (id === 'bluewallet') return locale === 'en' ? 'BlueWallet watch-only' : 'BlueWallet'
  if (id === 'coconut') return locale === 'en' ? 'Coconut Wallet watch-only' : '코코넛 월렛'
  return getLocalizedLabel(id, fallback, locale)
}

export function getAlternateLocale(locale: GuideLocale): GuideLocale {
  return locale === 'ko' ? 'en' : 'ko'
}
