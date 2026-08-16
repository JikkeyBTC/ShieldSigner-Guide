import type { ChapterMeta } from './chapters'

export const categoryAccents = {
  '시작하기': '#fd6d02',
  '준비': '#ff9f43',
  'OS': '#ff9f43',
  SeedKeeper: '#9b5de5',
  '워치온리 지갑': '#2ec4b6',
  거래: '#f15bb5',
  참고: '#80ed99'
} as const

export const getChapterAccent = (chapter?: Pick<ChapterMeta, 'group'>) =>
  categoryAccents[chapter?.group as keyof typeof categoryAccents] ?? categoryAccents['시작하기']
