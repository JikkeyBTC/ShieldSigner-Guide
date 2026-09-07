import type { ChapterMeta } from './chapters'

export type GuideLocale = 'ko' | 'en'

export interface LocaleSettings {
  readonly htmlLang: 'ko' | 'en'
  readonly switchText: 'KO' | 'EN'
  readonly switchAriaLabel: string
  readonly homeAriaLabel: string
}

export const DEFAULT_LOCALE: GuideLocale = 'ko'
export const SUPPORTED_LOCALES: readonly GuideLocale[] = ['ko', 'en']

const localePrefixes: Record<GuideLocale, string> = {
  ko: '/ko',
  en: '/en'
}

const localeSettings: Record<GuideLocale, LocaleSettings> = {
  ko: {
    htmlLang: 'ko',
    switchText: 'EN',
    switchAriaLabel: 'Switch to English',
    homeAriaLabel: 'ShieldSigner Guide home'
  },
  en: {
    htmlLang: 'en',
    switchText: 'KO',
    switchAriaLabel: '한국어로 전환',
    homeAriaLabel: 'ShieldSigner Guide English home'
  }
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
    backup: '카드 사용하기',
    'backup-recovery': '카드 사용하기',
    'seedkeeper-backup-landing': '카드 사용하기',
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
    'seedkeeper-save': '시드를 카드에 저장하기',
    'seedkeeper-load': '카드에서 시드 불러오기',
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
    backup: 'Using your card',
    'backup-recovery': 'Using your card',
    'seedkeeper-backup-landing': 'Using your card',
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
    'seedkeeper-save': 'Save a seed to the card',
    'seedkeeper-load': 'Load a seed from the card',
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

export function getLocaleSettings(locale: GuideLocale): LocaleSettings {
  return localeSettings[locale]
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
  const normalized = href.startsWith('/') ? href : `/${href}`
  const match = normalized.match(/^([^?#]*)([?#].*)?$/)
  const path = stripLocalePrefix(match?.[1] ?? normalized)
  const suffix = match?.[2] ?? ''
  const localizedPath = path === '/' ? `${localePrefixes[locale]}/` : `${localePrefixes[locale]}${path}`
  return `${localizedPath}${suffix}`
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
