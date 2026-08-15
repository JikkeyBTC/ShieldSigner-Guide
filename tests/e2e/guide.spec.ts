import { test, expect } from '@playwright/test';

test('landing page exposes the first-run route map', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/');
  await expect(page).toHaveTitle(/ShieldSigner/);
  await expect(page.locator('main')).toContainText('조립 방법');
  await expect(page.getByRole('link', { name: /조립 방법/ })).toHaveAttribute(
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
