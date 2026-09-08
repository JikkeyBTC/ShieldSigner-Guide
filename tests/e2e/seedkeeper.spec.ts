import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`SeedKeeper overview links through both levels of its guide tree at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/ShieldSigner-Guide/ko/seedkeeper/');
    const brand = page.locator('main .ss-seedkeeper-logo');
    await expect(brand.locator('a')).toHaveCSS('border-top-width', '0px');
    const centered = await brand.evaluate((figure) => {
      const frame = figure.closest('.ss-os-guide')!.getBoundingClientRect();
      const image = figure.getBoundingClientRect();
      return Math.abs(image.x + image.width / 2 - frame.x - frame.width / 2);
    });
    expect(centered).toBeLessThanOrEqual(1);
    const tree = page.getByRole('navigation', { name: 'SeedKeeper 안내 순서' });
    await expect(tree.locator(':scope > ul')).toHaveCSS('list-style-type', 'none');
    await expect(tree.locator(':scope > ul > li')).toHaveCount(2);
    await expect(tree.locator('ul ul a')).toHaveCount(5);
    await tree.getByRole('link', { name: 'JavaCard란?', exact: true }).click();
    await expect(page).toHaveURL(/\/ko\/seedkeeper\/javacard\/?$/);
    await expect(page.locator('main h1')).toHaveCount(1);
    const photo = page.locator('main .ss-guide-figure img');
    await expect(photo).toHaveAttribute('src', /\/brand\/card-artwork\/jikkey-javacard\.png$/);
    await expect.poll(() => photo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    await page.locator('main').getByRole('link', { name: /다음: SeedKeeper란/ }).click();
    await expect(page).toHaveURL(/\/ko\/seedkeeper\/what-is-seedkeeper\/?$/);
    const logo = page.locator('main .ss-guide-figure img');
    await expect(logo).toHaveAttribute('src', /seedkeeper_logo_black\.png$/);
    await expect(logo).toHaveCSS('filter', 'invert(1)');
    await page.locator('main').getByRole('link', { name: /다음: 카드 사용하기/ }).click();
    await expect(page).toHaveURL(/\/ko\/seedkeeper\/backup-recovery\/?$/);
    const figures = page.locator('main .ss-guide-figure img');
    await expect(figures).toHaveCount(3);
    for (const img of await figures.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
    await expect(page.locator('main').getByRole('link', { name: '시드 저장 방법' })).toHaveAttribute('href', './save');
    await expect(page.locator('main').getByRole('link', { name: '시드 불러오기 방법' })).toHaveAttribute('href', './load');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
