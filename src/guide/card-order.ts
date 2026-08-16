export type GuideCardKind = 'section' | 'branch' | 'chapter'

export interface GuideCardOrderItem {
  readonly kind: GuideCardKind
  readonly id: string
}

/** The single source of truth for the visual card sequence and document navigation. */
export const guideCardOrder = [
  { kind: 'section', id: 'getting-started' }, { kind: 'branch', id: 'hardware' }, { kind: 'chapter', id: 'assembly' },
  { kind: 'section', id: 'os' }, { kind: 'branch', id: 'installation' }, { kind: 'branch', id: 'verification' },
  { kind: 'section', id: 'seedkeeper' }, { kind: 'branch', id: 'concepts' }, { kind: 'chapter', id: 'javacard' }, { kind: 'chapter', id: 'what-is-seedkeeper' }, { kind: 'branch', id: 'backup-recovery' },
  { kind: 'chapter', id: 'seedkeeper-initialize' }, { kind: 'chapter', id: 'seedkeeper-backup' }, { kind: 'chapter', id: 'seedkeeper-clone' }, { kind: 'chapter', id: 'seedkeeper-restore' }, { kind: 'chapter', id: 'seedkeeper-recovery' },
  { kind: 'section', id: 'wallet' }, { kind: 'branch', id: 'bluewallet' }, { kind: 'branch', id: 'coconut' }, { kind: 'chapter', id: 'coconut' },
  { kind: 'section', id: 'transactions' }, { kind: 'branch', id: 'receive' }, { kind: 'branch', id: 'send' }, { kind: 'branch', id: 'signing' },
  { kind: 'section', id: 'reference' }, { kind: 'branch', id: 'safety' }, { kind: 'chapter', id: 'security' }, { kind: 'chapter', id: 'faq' }, { kind: 'branch', id: 'terms' }, { kind: 'chapter', id: 'glossary' }, { kind: 'chapter', id: 'sources' }
] as const satisfies readonly GuideCardOrderItem[]
