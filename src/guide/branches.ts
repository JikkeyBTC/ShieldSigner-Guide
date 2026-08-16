export interface BranchLanding {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly group: string
}

export interface SectionLanding {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly group: string
}

export const sectionLandings = [
  { id: 'getting-started', label: 'Getting started', href: '/', group: '시작하기' },
  { id: 'os', label: 'ShieldSigner OS', href: '/os/', group: 'OS' },
  { id: 'seedkeeper', label: 'SeedKeeper', href: '/seedkeeper/', group: 'SeedKeeper' },
  { id: 'wallet', label: 'Watch-only wallets', href: '/wallet/', group: '워치온리 지갑' },
  { id: 'transactions', label: 'Transactions', href: '/transactions/', group: '거래' },
  { id: 'reference', label: 'Reference', href: '/reference/', group: '참고' }
] as const satisfies readonly SectionLanding[]

/** Card destinations for every second-level navigation group. */
export const branchCards = [
  { id: 'hardware', label: 'Hardware', href: '/build/', group: '준비' },
  { id: 'installation', label: 'Installation', href: '/os/install/', group: 'OS' },
  { id: 'verification', label: 'Verification', href: '/os/verify/', group: 'OS' },
  { id: 'concepts', label: 'Concepts', href: '/seedkeeper/concepts/', group: 'SeedKeeper' },
  { id: 'backup-recovery', label: 'Backup & recovery', href: '/seedkeeper/backup-recovery/', group: 'SeedKeeper' },
  { id: 'bluewallet', label: 'BlueWallet', href: '/wallet/bluewallet/', group: '워치온리 지갑' },
  { id: 'coconut', label: 'Coconut', href: '/wallet/coconut/', group: '워치온리 지갑' },
  { id: 'receive', label: 'Receive', href: '/transactions/receive/', group: '거래' },
  { id: 'signing', label: 'Signing', href: '/transactions/sign-psbt/', group: '거래' },
  { id: 'safety', label: 'Safety', href: '/reference/safety/', group: '참고' },
  { id: 'terms', label: 'Terms', href: '/reference/terms/', group: '참고' }
] as const

/** Landing pages for second-level navigation groups that contain multiple chapters. */
export const branchLandings = [
  { id: 'hardware', label: 'Hardware', href: '/build/', group: '준비' },
  { id: 'seedkeeper-concepts', label: 'Concepts', href: '/seedkeeper/concepts/', group: 'SeedKeeper' },
  { id: 'seedkeeper-backup-landing', label: 'Backup & recovery', href: '/seedkeeper/backup-recovery/', group: 'SeedKeeper' },
  { id: 'reference-safety', label: 'Safety', href: '/reference/safety/', group: '참고' },
  { id: 'reference-terms', label: 'Terms', href: '/reference/terms/', group: '참고' }
] as const satisfies readonly BranchLanding[]

export function getBranchLandingByPath(pathname: string): BranchLanding | undefined {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  return branchLandings.find((landing) => landing.href === normalized)
}

export function getSectionLandingByPath(pathname: string): SectionLanding | undefined {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  return sectionLandings.find((landing) => landing.href === normalized)
}
