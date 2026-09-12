import { test, expect } from '@playwright/test';

// Catches a missing intro route, a duplicate card, or navigation skipping the intro.
for (const locale of ['ko', 'en']) {
  for (const width of [1440, 390]) {
    test(`Getting started opens the introduction first in ${locale} at ${width}px`, async ({ page }) => {
      const title = locale === 'ko' ? 'ShieldSigner란 무엇인가요?' : 'What is ShieldSigner?';
      const base = `/ShieldSigner-Guide/${locale}`;
      const route = `${base}/getting-started/what-is-shieldsigner/`;
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(`${base}/`);
      if (width < 760) await page.locator('#docs-nav-menu').click();
      const toc = page.getByRole('complementary', { name: 'Guide table of contents' });
      const first = toc.locator('.ss-nav-section.is-open .ss-nav-branch-title').first();
      await expect(first).toHaveText(title);
      await first.click();
      await expect(page).toHaveURL(new RegExp(`${route}?$`));
      await expect(page.locator('main h1')).toHaveText(title);
      await expect(first).toHaveAttribute('aria-current', 'location');
      if (width < 760) await page.locator('#docs-nav-menu').click();

      if (width >= 1200) {
        const card = page.locator(`.ss-demo-card[href='${route}']`);
        await expect(card).toHaveCount(1);
        await expect(card).toHaveAttribute('aria-current', 'page');
        await expect(card.locator('header')).toHaveText(title);
        await expect(card.locator('.ss-demo-visual')).toHaveCount(1);
        const logo = card.locator('img');
        await expect(logo).toHaveCount(1);
        await expect(logo).toHaveAttribute('src', '/ShieldSigner-Guide/brand/shieldsigner-logo-cutout.png');
        await expect.poll(() => logo.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
        const frame = await card.boundingBox();
        const picture = await logo.boundingBox();
        expect(Math.abs(picture!.x + picture!.width / 2 - frame!.x - frame!.width / 2)).toBeLessThan(2);
        expect(Math.abs(picture!.y + picture!.height / 2 - frame!.y - frame!.height / 2)).toBeLessThan(2);
      }

      const steps = page.getByRole('navigation', { name: 'Previous and next pages' });
      await steps.getByRole('link', { name: 'Next: Hardware', exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${base}/build/?$`));
      await steps.getByRole('link', { name: `Previous: ${title}`, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${route}?$`));
      await steps.getByRole('link', { name: 'Previous: Getting started', exact: true }).click();
      await expect(page).toHaveURL(`${base}/`);
      await steps.getByRole('link', { name: `Next: ${title}`, exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`${route}?$`));

      if (width < 760) {
        await page.locator('#search-nav').click();
        await page.locator('#ss-mobile-search input').fill(title);
        await page.locator('.ss-mobile-search-results a').click();
      } else {
        await page.getByRole('button', { name: 'Search documentation' }).first().click();
        await page.getByRole('searchbox', { name: 'Search documentation' }).fill(title);
        await page.locator('.ss-search-result').click();
      }
      await expect(page).toHaveURL(new RegExp(`${route}?$`));
      await page.locator('.ss-language-switch').click();
      const other = locale === 'ko' ? 'en' : 'ko';
      await expect(page).toHaveURL(new RegExp(`/ShieldSigner-Guide/${other}/getting-started/what-is-shieldsigner/?$`));
      await expect(page.locator('main h1')).toHaveText(other === 'ko' ? 'ShieldSigner란 무엇인가요?' : 'What is ShieldSigner?');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    });
  }
}
