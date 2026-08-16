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
  { id: 'build', label: 'Build', href: '/build/', group: '준비' },
  { id: 'os', label: 'ShieldSigner OS', href: '/os/', group: 'OS' },
  { id: 'seedkeeper', label: 'SeedKeeper', href: '/seedkeeper/', group: 'SeedKeeper' },
  { id: 'wallet', label: 'Watch-only wallets', href: '/wallet/', group: '워치온리 지갑' },
  { id: 'transactions', label: 'Transactions', href: '/transactions/', group: '거래' },
  { id: 'reference', label: 'Reference', href: '/reference/', group: '참고' }
] as const satisfies readonly SectionLanding[]

/** Landing pages for second-level navigation groups that contain multiple chapters. */
export const branchLandings = [
  { id: 'seedkeeper-concepts', label: 'Concepts', href: '/seedkeeper/concepts/', group: 'SeedKeeper' },
  { id: 'seedkeeper-backup', label: 'Backup & recovery', href: '/seedkeeper/backup-recovery/', group: 'SeedKeeper' },
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
