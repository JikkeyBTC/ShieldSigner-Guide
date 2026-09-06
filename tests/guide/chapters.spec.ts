import { describe, expect, it } from 'vitest'
import { chapters, getChapterByPath } from '../../src/guide/chapters'
import { guideCardOrder } from '../../src/guide/card-order'
import { localizeHref } from '../../src/guide/locales'

describe('guide chapters', () => {
  it('contains unique site-relative routes', () => {
    expect(new Set(chapters.map((chapter) => chapter.id)).size).toBe(chapters.length)
    expect(new Set(chapters.map((chapter) => chapter.href)).size).toBe(chapters.length)
    expect(chapters.every((chapter) => chapter.href.startsWith('/'))).toBe(true)
  })

  it('resolves the new save and load pages', () => {
    expect(getChapterByPath('/seedkeeper/save/')?.label).toBe('시드를 카드에 저장하기')
    expect(getChapterByPath('/seedkeeper/load?from=nav')?.id).toBe('seedkeeper-load')
    for (const old of ['backup', 'clone', 'restore', 'recovery']) {
      expect(getChapterByPath(`/seedkeeper/${old}/`)).toBeUndefined()
    }
  })

  it('preserves the printed initialization QR destination and its place before save and load', () => {
    const initialize = getChapterByPath('/seedkeeper/initialize')!
    expect(initialize.id).toBe('seedkeeper-initialize')
    expect(localizeHref(initialize.href, 'ko').replace(/\/$/, '')).toBe('/ko/seedkeeper/initialize')
    const ids = guideCardOrder.map(item => item.id)
    const at = ids.indexOf('seedkeeper-initialize')
    expect(ids.slice(at, at + 3)).toEqual(['seedkeeper-initialize', 'seedkeeper-save', 'seedkeeper-load'])
  })
})
