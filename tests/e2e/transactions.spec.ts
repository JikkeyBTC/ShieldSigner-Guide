import { test, expect } from '@playwright/test';

// Catches a restored route missing from any navigation surface or losing its locale/base path.
for (const width of [1440, 390]) {
  test(`transaction guides are reachable through navigation and search at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/ShieldSigner-Guide/ko/');
    if (width < 760) await page.locator('#docs-nav-menu').click();
    const toc = page.getByRole('complementary', { name: 'Guide table of contents' });
    await toc.getByRole('link', { name: '트랜잭션', exact: true }).click();
    await expect(page).toHaveURL(/\/ko\/transactions\/$/);
    for (const [title, route] of [['BTC 받기', 'receive-guide'], ['BTC 보내기', 'send-guide'], ['PSBT 검토·서명', 'sign-psbt']]) {
      await toc.getByRole('link', { name: title, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/ko/transactions/${route}/?$`));
      await expect(page.locator('main h1')).toHaveText(title);
      if (width >= 1200) {
        const card = page.locator(`.ss-demo-card[href='/ShieldSigner-Guide/ko/transactions/${route}/']`);
        await expect(card).toHaveCount(1);
        await expect(card).toHaveAttribute('aria-current', 'page');
      }
    }
    if (width < 760) {
      await page.locator('#docs-nav-menu').click();
      await page.locator('#search-nav').click();
      await page.locator('#ss-mobile-search input').fill('BTC 받기');
      await page.locator('.ss-mobile-search-results a').click();
    } else {
      await page.getByRole('button', { name: 'Search documentation' }).first().click();
      await page.getByRole('searchbox', { name: 'Search documentation' }).fill('BTC 받기');
      await page.locator('.ss-search-result').click();
    }
    await expect(page).toHaveURL(/\/ko\/transactions\/receive-guide\/?$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
