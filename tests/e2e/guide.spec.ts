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
