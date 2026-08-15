import { describe, expect, it } from 'vitest'
import { chapters, getChapterByPath } from '../../src/guide/chapters'

describe('guide chapters', () => {
  it('contains unique site-relative routes', () => {
    expect(new Set(chapters.map((chapter) => chapter.id)).size).toBe(chapters.length)
    expect(new Set(chapters.map((chapter) => chapter.href)).size).toBe(chapters.length)
    expect(chapters.every((chapter) => chapter.href.startsWith('/'))).toBe(true)
  })

  it('resolves the SeedKeeper backup route with a trailing slash', () => {
    expect(getChapterByPath('/seedkeeper/backup/')?.label).toBe('시드를 카드에 백업하기')
    expect(getChapterByPath('/seedkeeper/backup?from=nav')?.id).toBe('seedkeeper-backup')
  })
})
