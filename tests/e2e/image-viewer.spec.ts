import { expect, test } from '@playwright/test';

test('viewer locks the document scrollbar and cleans up on back navigation', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/ko/');
  await page.locator('.ss-demo-card').filter({ hasText: 'Verification' }).click();
  await expect(page).toHaveURL(/\/os\/verification\/?$/);
  await page.locator('main .ss-guide-figure img').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('html')).toHaveCSS('overflow-y', 'hidden');
  await page.goBack();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.locator('html')).not.toHaveCSS('overflow-y', 'hidden');
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
});

test('inline device screenshots enlarge in the viewer', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/ShieldSigner-Guide/ko/seedkeeper/save/');
  const image = page.locator('main .ss-guide-figure--screen img').first();
  const inline = await image.boundingBox();
  await image.click();
  const enlarged = page.getByRole('dialog').locator('img');
  await expect(enlarged).toBeVisible();
  const bounds = await enlarged.boundingBox();
  expect(bounds!.height).toBeGreaterThan(inline!.height);
  expect(bounds!.width).toBeGreaterThan(inline!.width);
  expect(bounds!.height).toBeLessThanOrEqual(800);
});

for (const locale of ['ko', 'en']) {
  for (const width of [1440, 390]) {
    test(`${locale} article images open in-place and restore focus at ${width}px`, async ({ page, context }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/ShieldSigner-Guide/${locale}/os/verification/`);
      const figure = page.locator('main .ss-guide-figure').first();
      const image = figure.locator('img');
      const src = await image.getAttribute('src');
      const caption = (await figure.locator('figcaption').innerText()).split('\n')[0];
      const url = page.url();
      const pages = context.pages().length;
      await image.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      expect(page.url()).toBe(url);
      expect(context.pages()).toHaveLength(pages);
      await expect(dialog.locator('img')).toHaveAttribute('src', src!);
      await expect.poll(() => dialog.locator('img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
      const bounds = await dialog.boundingBox();
      expect(bounds!.x).toBe(0);
      expect(bounds!.y).toBe(0);
      expect(bounds!.width).toBe(width);
      expect(bounds!.height).toBe(900);
      const close = dialog.getByRole('button', { name: locale === 'ko' ? '이미지 닫기' : 'Close image' });
      const closeBounds = await close.boundingBox();
      expect(closeBounds!.x).toBeGreaterThan(width - 100);
      expect(closeBounds!.y).toBeLessThan(40);
      await expect(close).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(close).toBeFocused();
      const scrollY = await page.evaluate(() => window.scrollY);
      await page.mouse.wheel(0, 500);
      expect(await page.evaluate(() => window.scrollY)).toBe(scrollY);
      await close.click();
      await expect(dialog).toHaveCount(0);
      const trigger = figure.getByRole('button');
      await expect(trigger).toBeFocused();
      await expect(figure.locator('figcaption')).toHaveText(caption);
      await expect(page.locator('main')).not.toContainText(/그림을 누르면 크게 볼 수 있어요|Click the image to view it larger/);
      await trigger.press('Enter');
      await expect(dialog).toBeVisible();
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
      await trigger.press('Space');
      await expect(dialog).toBeVisible();
      await dialog.click({ position: { x: 8, y: 8 } });
      await expect(dialog).toHaveCount(0);
      expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }

  test(`${locale} installation gallery and GIF use the same viewer across navigation`, async ({ page, context }) => {
    await page.goto(`/ShieldSigner-Guide/${locale}/os/install/`);
    const images = page.locator('main .ss-install-guide img');
    const count = await images.count();
    expect(count).toBe(16);
    for (const index of [0, 4, 15]) {
      const image = images.nth(index);
      const src = await image.getAttribute('src');
      await image.click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      await expect(dialog.locator('img')).toHaveAttribute('src', src!);
      if (index === 15) expect(src).toMatch(/\.gif$/);
      await page.keyboard.press('Escape');
      await expect(dialog).toHaveCount(0);
    }
    expect(context.pages()).toHaveLength(1);
    await expect(page.locator('main a[target="_blank"]:has(img)')).toHaveCount(0);
    await page.locator('.ss-anime-nav').getByRole('link', { name: 'Verification', exact: true }).click();
    await expect(page).toHaveURL(/\/os\/verification\/?$/);
    await page.locator('main .ss-guide-figure img').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await page.locator('.ss-brand').click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/$`));
    await expect(page.getByRole('dialog')).toHaveCount(0);
  });
}
