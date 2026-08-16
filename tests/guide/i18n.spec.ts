import { describe, expect, it } from 'vitest'
import {
  DEFAULT_LOCALE,
  getLocaleFromPath,
  getLocalizedLabel,
  localizeHref,
  routeFromRelativePath,
  stripLocalePrefix,
  type GuideLocale
} from '../../src/guide/locales'

describe('guide locale routing', () => {
  it('defaults the root and legacy routes to Korean', () => {
    expect(DEFAULT_LOCALE).toBe('ko')
    expect(getLocaleFromPath('/')).toBe('ko')
    expect(getLocaleFromPath('/seedkeeper/backup/')).toBe('ko')
  })

  it('normalizes localized paths to the shared route model', () => {
    expect(stripLocalePrefix('/en/seedkeeper/backup/')).toBe('/seedkeeper/backup/')
    expect(routeFromRelativePath('ko/seedkeeper/backup.md')).toBe('/seedkeeper/backup/')
    expect(routeFromRelativePath('en/index.md')).toBe('/')
  })

  it('maps one route id to localized hrefs and labels', () => {
    const locales: GuideLocale[] = ['ko', 'en']
    expect(locales.map((locale) => localizeHref('/seedkeeper/backup/', locale))).toEqual([
      '/ko/seedkeeper/backup/',
      '/en/seedkeeper/backup/'
    ])
    expect(getLocalizedLabel('seedkeeper-backup', '시드를 카드에 백업하기', 'en')).toBe('Back up a seed to the card')
  })
})
