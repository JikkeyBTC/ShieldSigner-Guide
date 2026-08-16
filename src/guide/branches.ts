export interface BranchLanding {
  readonly id: string
  readonly label: string
  readonly href: string
  readonly group: string
}

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
