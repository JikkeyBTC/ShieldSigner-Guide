import { test, expect } from '@playwright/test';

test('landing page exposes the first-run route map', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/');
  await expect(page).toHaveTitle(/ShieldSigner/);
  await expect(page.locator('main')).toContainText('조립 방법');
  await expect(page.locator('.ss-nav-link').filter({ hasText: '조립 방법' })).toHaveAttribute(
    'href',
    /\/build\/assembly/
  );
});

test('responsive docs shell exposes brand and mobile navigation', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/');
  await expect(page.locator('.ss-topbar')).toBeVisible();
  await expect(page.locator('.ss-brand img')).toHaveAttribute('alt', 'ShieldSigner');
  await expect(page.locator('.ss-brand img')).toHaveAttribute('src', '/ShieldSigner-Guide/brand/shieldsigner.svg');

  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('.ss-category-nav')).toBeVisible();
  await expect(page.locator('.ss-chapter-rail')).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.ss-mobile-tabs')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBeFalsy();
});

test('chapter navigation reaches SeedKeeper backup and marks it active', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/');
  await page.getByRole('link', { name: '시드를 카드에 백업하기' }).first().click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/seedkeeper\/backup\/?$/);
  await expect(page.locator('.ss-nav-link[aria-current="page"]')).toContainText('시드를 카드에 백업하기');
});

test('reduced motion keeps navigation and article content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/ShieldSigner-Guide/');
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('.ss-reveal').first()).toBeVisible();
  await expect(page.getByRole('link', { name: '시드를 카드에 백업하기' }).first()).toBeVisible();
});

test('buyer setup guides expose safety checks and verification commands', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/build/assembly/');
  await expect(page).toHaveURL(/\/build\/assembly\/?$/);
  await expect(page.locator('main')).toContainText('키트 조립 방법');
  await expect(page.locator('main')).toContainText('완료 체크리스트');
  await expect(page.locator('main')).toContainText('시드를 입력하지 마세요');

  await page.goto('/ShieldSigner-Guide/os/install/');
  await expect(page.locator('main')).toContainText('ShieldSigner OS 설치');
  await expect(page.locator('main')).toContainText('microSD');
  await expect(page.locator('main')).toContainText('검증 전에는 플래시 금지');

  await page.goto('/ShieldSigner-Guide/os/verify/');
  await expect(page.locator('main')).toContainText('OS 이미지 검증');
  await expect(page.locator('main')).toContainText('Get-FileHash');
  await expect(page.locator('main')).toContainText('sha256sum');
  await expect(page.locator('main')).toContainText('gpg --verify');
  await expect(page.locator('main')).toContainText('REPLACE_WITH_OFFICIAL_MAINTAINER_FINGERPRINT');
  await expect(page.locator('main')).toContainText('하나라도 실패하면 즉시 중단');
});

test('SeedKeeper chapter routes expose the complete backup and recovery flow', async ({ page }) => {
  const routes = [
    ['/seedkeeper/javacard/', 'JavaCard란?'],
    ['/seedkeeper/what-is-seedkeeper/', 'SeedKeeper란?'],
    ['/seedkeeper/initialize/', '카드 초기화와 PIN'],
    ['/seedkeeper/backup/', '시드를 카드에 백업하기'],
    ['/seedkeeper/clone/', '카드 간 복제'],
    ['/seedkeeper/restore/', '시드 복원하기'],
    ['/seedkeeper/recovery/', '분실과 복구 계획']
  ] as const;

  for (const [route, heading] of routes) {
    await page.goto(`/ShieldSigner-Guide${route}`);
    await expect(page.locator('main h1')).toContainText(heading);
    await expect(page.locator('main')).toContainText('PIN');
  }

  await page.goto('/ShieldSigner-Guide/seedkeeper/backup/');
  await expect(page.getByRole('link', { name: '카드 간 복제' }).first()).toHaveAttribute('href', /\/seedkeeper\/clone\//);
  await expect(page.getByRole('link', { name: '시드 복원하기' }).first()).toHaveAttribute('href', /\/seedkeeper\/restore\//);
  await expect(page.getByRole('link', { name: '분실과 복구 계획' }).first()).toHaveAttribute('href', /\/seedkeeper\/recovery\//);
});
