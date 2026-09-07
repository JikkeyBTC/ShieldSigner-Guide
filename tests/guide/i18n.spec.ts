import { describe, expect, it } from 'vitest'
import {
  DEFAULT_LOCALE,
  getLocaleFromPath,
  getLocaleSettings,
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
    expect(getLocaleFromPath('/seedkeeper/save/')).toBe('ko')
  })

  it('normalizes localized paths to the shared route model', () => {
    expect(stripLocalePrefix('/en/seedkeeper/save/')).toBe('/seedkeeper/save/')
    expect(routeFromRelativePath('ko/seedkeeper/save.md')).toBe('/seedkeeper/save/')
    expect(routeFromRelativePath('en/index.md')).toBe('/')
  })

  it('maps one route id to localized hrefs and labels', () => {
    const locales: GuideLocale[] = ['ko', 'en']
    expect(locales.map((locale) => localizeHref('/seedkeeper/save/', locale))).toEqual([
      '/ko/seedkeeper/save/',
      '/en/seedkeeper/save/'
    ])
    expect(getLocalizedLabel('seedkeeper-save', '시드를 카드에 저장하기', 'en')).toBe('Save a seed to the card')
  })

  it('keeps language metadata and query or hash suffixes with the localized route', () => {
    expect(getLocaleSettings('en')).toMatchObject({ htmlLang: 'en', switchText: 'KO' })
    expect(getLocaleSettings('ko')).toMatchObject({ htmlLang: 'ko', switchText: 'EN' })
    expect(localizeHref('/ko/seedkeeper/save/?from=guide#saved', 'en')).toBe('/en/seedkeeper/save/?from=guide#saved')
  })
})
