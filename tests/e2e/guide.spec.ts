import { test, expect } from '@playwright/test';

const ko = (path = '') => {
  const normalized = path ? `/${path.replace(/^\/+|\/+$/g, '')}` : '/';
  return `/ShieldSigner-Guide/ko${normalized}`;
};

test('landing page exposes the first-run route map', async ({ page }) => {
  await page.goto(ko());
  await expect(page).toHaveTitle(/ShieldSigner/);
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'Hardware' })).toHaveAttribute(
    'href',
    /\/build\/$/
  );
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'Verification' })).toHaveCount(0);
  await expect(page.locator('.ss-demo-card').filter({ hasText: '변조 확인 검증' })).toHaveCount(0);
  await expect(page.locator('main')).toContainText('ShieldSigner를 안전하게 시작하는 방법');
  await expect(page.locator('.ss-demo-card').filter({ hasText: '키트 조립 방법' })).toHaveAttribute(
    'href',
    /\/build\/assembly/
  );
});

test('OS card list keeps one Installation entry without a duplicate install card', async ({ page }) => {
  await page.goto(ko());
  const installationCards = page.locator('.ss-demo-card').filter({ hasText: 'Installation' });
  await expect(installationCards).toHaveCount(1);
  await expect(installationCards).toHaveAttribute('href', /\/os\/install\/$/);
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'ShieldSigner OS 설치' })).toHaveCount(0);
});

for (const { title, route, file } of [
  { title: 'Getting started', route: '', file: 'shieldsigner-device-photo.png' },
  { title: 'Installation', route: '/os/install/', file: 'microsd-blank.png' },
]) {
  test(`${title} card renders its designated transparent product cutout`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(ko(route));
    const card = page.locator('.ss-demo-card').filter({ hasText: title });
    const artwork = card.locator('.ss-demo-card-image');
    await expect(artwork).toHaveCount(1);
    await expect(artwork).toHaveAttribute('src', `/ShieldSigner-Guide/brand/card-artwork/${file}`);
    await artwork.scrollIntoViewIfNeeded();
    await expect(card.locator('.ss-demo-card-type')).toHaveCount(0);
    await expect.poll(() => artwork.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    const alpha = await artwork.evaluate((image: HTMLImageElement) => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext('2d')!;
      context.drawImage(image, 0, 0);
      const sample = (x: number, y: number) => context.getImageData(Math.floor(x * canvas.width), Math.floor(y * canvas.height), 1, 1).data[3];
      return { background: [[0.02, 0.02], [0.98, 0.02], [0.02, 0.98], [0.98, 0.98]].map(([x, y]) => sample(x, y)), center: sample(0.5, 0.5) };
    });
    expect(alpha.background).toEqual([0, 0, 0, 0]);
    expect(alpha.center).toBeGreaterThan(240);
  });
}

test('ShieldSigner OS section card uses the ShieldSigner logo', async ({ page }) => {
  await page.goto(ko('/os/'));
  const osCard = page.locator('.ss-demo-card').filter({ hasText: 'ShieldSigner OS' }).first();
  await expect(osCard).toHaveCount(1);
  await expect(osCard.locator('.ss-demo-card-type')).toHaveCount(0);
  await expect(osCard.locator('.ss-demo-card-image')).toHaveAttribute('src', '/ShieldSigner-Guide/brand/shieldsigner-logo-cutout.png');
});

test('both brand logos have transparent outer corners and opaque artwork', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/os/'));
  const logos = page.locator('.ss-brand img, .ss-demo-card[data-card-asset="shieldsigner-logo"] img');
  await expect(logos).toHaveCount(2);
  for (const logo of await logos.all()) {
    await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    const pixels = await logo.evaluate((image: HTMLImageElement) => {
      const canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(image, 0, 0);
      const alpha = (x: number, y: number) => ctx.getImageData(x, y, 1, 1).data[3];
      const w = canvas.width, h = canvas.height;
      return {
        corners: [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1], [3, 3], [w - 4, 3], [3, h - 4], [w - 4, h - 4]].map(([x, y]) => alpha(x, y)),
        artwork: [[50, 50], [74, 110], [400, 200], [900, 50], [900, 280]].map(([x, y]) => alpha(x, y)),
      };
    });
    expect(pixels.corners).toEqual(Array(8).fill(0));
    expect(pixels.artwork).toEqual(Array(5).fill(255));
  }
});

test('assembly labels use the shared Korean-friendly guide font stack', async ({ page }) => {
  await page.goto(ko('/build/assembly/'));
  const fonts = await page.evaluate(() => {
    const selectors = ['.ss-nav-child[aria-current="page"]', '.ss-demo-card[aria-current="page"] .ss-scramble-title', '.ss-doc-breadcrumb [aria-current="page"]'];
    return selectors.map((selector) => getComputedStyle(document.querySelector(selector)!).fontFamily);
  });
  expect(fonts[0]).toContain('Pretendard');
  expect(fonts[1]).toBe(fonts[0]);
  expect(fonts[2]).toBe(fonts[0]);
});

test('responsive docs shell exposes brand and mobile navigation', async ({ page }) => {
  await page.goto(ko());
  await expect(page.locator('.ss-topbar')).toBeVisible();
  await expect(page.locator('.ss-topbar-search-nav')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Search documentation' }).first()).toBeVisible();
  await expect(page.locator('.ss-brand img')).toHaveAttribute('alt', 'ShieldSigner');
  await expect(page.locator('.ss-brand img')).toHaveAttribute('src', '/ShieldSigner-Guide/brand/shieldsigner-logo-cutout.png');

  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('.ss-category-nav')).toBeVisible();
  await expect(page.locator('.ss-demo-rail')).toBeVisible();
  await expect(page.locator('.ss-doc-nav-bar')).toBeHidden();
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator('.ss-brand')).toHaveCSS('width', '148px');
  await expect(page.getByRole('button', { name: 'Previous card' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Next card' })).toBeEnabled();
  const mobileMenu = page.locator('#docs-nav-menu');
  const mobileSearch = page.locator('#search-nav');
  await expect(mobileMenu).toBeVisible();
  await expect(mobileSearch).toBeVisible();
  await expect(page.locator('.ss-category-nav')).toBeHidden();
  await mobileMenu.click();
  await expect(page.locator('.ss-category-nav.is-mobile-open')).toBeVisible();
  await expect(page.locator('.ss-nav-section-title').first()).toBeVisible();
  await mobileMenu.click();
  await expect(page.locator('.ss-category-nav')).toBeHidden();
  await mobileSearch.click();
  await expect(page.locator('.ss-mobile-search-panel')).toBeVisible();
  await expect(page.getByRole('searchbox', { name: 'Search documentation' })).toBeVisible();
  await mobileSearch.click();
  await expect(page.locator('.ss-mobile-search-panel')).toBeHidden();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBeFalsy();
});

test('topbar brand reserves its intrinsic logo box during route loading', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/os/verification/'));
  const logo = page.locator('.ss-brand img');
  await expect(logo).toHaveAttribute('width', '1214');
  await expect(logo).toHaveAttribute('height', '389');
  await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth === 1214 && image.naturalHeight === 389)).toBe(true);
  await expect(page.locator('.ss-brand')).toHaveCSS('flex-shrink', '0');
});

test('mobile guide drawer stays open across section, branch, and page navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(ko());
  const menu = page.locator('#docs-nav-menu');
  const drawer = page.locator('.ss-category-nav.is-mobile-open');
  await menu.click();
  await expect(drawer).toBeVisible();

  await drawer.getByRole('link', { name: 'SeedKeeper', exact: true }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/?$/);
  await expect(drawer).toBeVisible();

  await drawer.getByRole('link', { name: 'Concepts', exact: true }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/concepts\/?$/);
  await expect(drawer).toBeVisible();

  await drawer.getByRole('link', { name: 'JavaCard란?', exact: true }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/javacard\/?$/);
  await expect(drawer).toBeVisible();
});

test('topbar remains pinned while the document scrolls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/build/assembly/'));
  await page.evaluate(() => window.scrollTo(0, 900));
  await expect.poll(() => page.locator('.ss-topbar').evaluate((element) => Math.abs(element.getBoundingClientRect().top))).toBeLessThanOrEqual(1);
});

test('topbar content stays inside a centered desktop container', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto(ko());
  const inner = page.locator('.ss-topbar-inner');
  const box = await inner.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeLessThanOrEqual(1680);
  expect(Math.abs(box!.x - ((1920 - box!.width) / 2))).toBeLessThanOrEqual(1);
});

test('locale and GitHub actions share the Anime-style top nav baseline', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko());
  const state = await page.evaluate(() => {
    const locale = document.querySelector<HTMLElement>('.ss-language-pair');
    const github = document.querySelector<HTMLElement>('.ss-top-actions > a:last-child');
    if (!locale || !github) return null;
    const localeBox = locale.getBoundingClientRect();
    const githubBox = github.getBoundingClientRect();
    const localeStyle = getComputedStyle(locale.querySelector('.ss-locale-current') ?? locale);
    const githubStyle = getComputedStyle(github);
    return {
      yDelta: Math.abs(localeBox.top - githubBox.top),
      localeFont: localeStyle.fontFamily,
      githubFont: githubStyle.fontFamily,
      labels: document.querySelector('.ss-top-actions')?.textContent?.replace(/\s+/g, ' ').trim()
    };
  });
  expect(state).not.toBeNull();
  expect(state!.yDelta).toBeLessThanOrEqual(1);
  expect(state!.localeFont).toBe(state!.githubFont);
  expect(state!.labels).toContain('GitHub');
});

test('desktop shell uses the wide card rail and article measure', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko());
  const rail = page.locator('.ss-demo-rail');
  const railBox = await rail.boundingBox();
  expect(railBox).not.toBeNull();
  expect(railBox!.width).toBe(354);
  await expect(page.locator('.ss-article-inner')).toHaveCSS('max-width', '1080px');
  await expect(page.locator('.ss-article-inner')).toHaveCSS('padding-top', '56px');
  await expect(page.locator('.ss-article-inner')).toHaveCSS('padding-right', '64px');
  const cardHeights = await page.locator('.ss-demo-card').evaluateAll((cards) => cards.map((card) => Math.round(card.getBoundingClientRect().height)));
  expect(cardHeights.length).toBeGreaterThan(0);
  expect(cardHeights.every((height) => height === 192)).toBeTruthy();
});

test('article titles use the compact documentation scale', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/os/install/'));
  const titleSize = await page.locator('main h1').evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
  expect(titleSize).toBeLessThanOrEqual(48);
  expect(titleSize).toBeGreaterThanOrEqual(40);
});

test('card search aligns with the card rail at the same width', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko());
  const searchBox = await page.locator('.ss-card-search-box').boundingBox();
  const railBox = await page.locator('.ss-demo-rail').boundingBox();
  const topbarBox = await page.locator('.ss-topbar').boundingBox();
  expect(searchBox).not.toBeNull();
  expect(railBox).not.toBeNull();
  expect(topbarBox).not.toBeNull();
  expect(searchBox!.width).toBe(354);
  expect(Math.abs(searchBox!.x - railBox!.x)).toBeLessThanOrEqual(1);
  expect(searchBox!.y).toBeLessThan(railBox!.y);
  expect(railBox!.y - (topbarBox!.y + topbarBox!.height)).toBe(12);
  expect(railBox!.y - (searchBox!.y + searchBox!.height)).toBe(24);
});

test('global top navigation opens Anime-style documentation search', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko());
  await expect(page.locator('.ss-guide-nav-bar')).toHaveCount(0);
  await expect(page.locator('.ss-topbar-search-nav')).toBeVisible();
  await page.getByRole('button', { name: 'Search documentation' }).first().click();
  await expect(page.locator('.ss-search-overlay')).toBeVisible();
  const input = page.getByRole('searchbox', { name: 'Search documentation' });
  await input.fill('SeedKeeper');
  expect(await page.locator('.ss-search-result').count()).toBeGreaterThan(0);
  await expect(page.locator('.ss-demo-card.is-search-match')).toHaveCount(0);
  await input.press('ArrowDown');
  await input.press('Enter');
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/javacard\/?$/);
  await expect(page.locator('.ss-search-overlay')).toBeHidden();
});

test('document nav follows the visual card order', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(ko('/seedkeeper/save/'));
  await page.getByRole('button', { name: 'Next card' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/load\/?$/);
  await page.getByRole('button', { name: 'Previous card' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/save\/?$/);
});

test('article next steps use paired previous and next cards', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/seedkeeper/save/'));
  const nav = page.locator('.ss-doc-nav-bottom');
  await expect(nav).toBeVisible();
  await expect(nav.locator('.ss-doc-nav-step-label')).toHaveText(['Previous', 'Next']);
  await expect(nav.getByRole('link', { name: /카드 초기화와 PIN/ })).toHaveAttribute('href', /\/seedkeeper\/initialize/);
  await expect(nav.getByRole('link', { name: /카드에서 시드 불러오기/ })).toHaveAttribute('href', /\/seedkeeper\/load/);
  await expect(nav.locator('.ss-doc-nav-link')).toHaveCount(2);
});

test('assembly video is preceded by a linked documentation breadcrumb', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/build/assembly/'));
  const breadcrumb = page.locator('.ss-doc-breadcrumb');
  await expect(breadcrumb).toBeVisible();
  await expect(breadcrumb.locator('a')).toHaveText(['Getting started', 'Hardware']);
  await expect(breadcrumb.locator('a').nth(0)).toHaveAttribute('href', '/ShieldSigner-Guide/ko/');
  await expect(breadcrumb.locator('a').nth(1)).toHaveAttribute('href', '/ShieldSigner-Guide/ko/build/');
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText('키트 조립 방법');
  const positions = await breadcrumb.evaluate((element) => {
    const title = element.parentElement?.querySelector('video');
    return title ? { breadcrumbBottom: element.getBoundingClientRect().bottom, titleTop: title.getBoundingClientRect().top } : null;
  });
  expect(positions).not.toBeNull();
  expect(positions!.breadcrumbBottom).toBeLessThan(positions!.titleTop);
});

test('documentation search leaves the visual card rail unchanged', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko());
  const cardCount = await page.locator('.ss-demo-card').count();
  await page.getByRole('button', { name: 'Search documentation' }).first().click();
  const input = page.getByRole('searchbox', { name: 'Search documentation' });
  await input.fill('SeedKeeper');
  await expect(page.locator('.ss-demo-card')).toHaveCount(cardCount);
  await expect(page.locator('.ss-demo-card.is-search-match')).toHaveCount(0);
  await input.press('Escape');
  await expect(page.locator('.ss-search-overlay')).toBeHidden();
});

test('TOC navigation aligns the selected card to the top of the rail', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/seedkeeper/javacard/'));
  const rail = page.locator('.ss-demo-rail');
  await rail.evaluate((element) => { element.scrollTop = 620; });

  await page.locator('.ss-nav-branch-title').filter({ hasText: '카드 사용하기' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/backup-recovery\/?$/);
  const cardOffset = () => page.evaluate(() => {
    const railElement = document.querySelector<HTMLElement>('.ss-demo-rail');
    const card = railElement?.querySelector<HTMLElement>('.ss-demo-card[aria-current="page"]');
    return railElement && card ? card.getBoundingClientRect().top - railElement.getBoundingClientRect().top : Number.POSITIVE_INFINITY;
  });
  await expect.poll(cardOffset).toBeGreaterThanOrEqual(-2);
  await expect.poll(cardOffset).toBeLessThan(36);

  const alignment = await page.evaluate(() => {
    const railElement = document.querySelector<HTMLElement>('.ss-demo-rail');
    const card = railElement?.querySelector<HTMLElement>('.ss-demo-card[aria-current="page"]');
    if (!railElement || !card) return null;
    const railTop = railElement.getBoundingClientRect().top;
    const cardTop = card.getBoundingClientRect().top;
    return { cardTop, railTop, railScrollTop: railElement.scrollTop };
  });
  expect(alignment).not.toBeNull();
  expect(alignment!.cardTop).toBeGreaterThanOrEqual(alignment!.railTop - 2);
  expect(alignment!.cardTop).toBeLessThan(alignment!.railTop + 36);
});

test('TOC navigation keeps the selected card visual panel populated', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/seedkeeper/javacard/'));
  const selectedCard = page.locator('.ss-demo-card').filter({ hasText: '카드 사용하기' });

  await page.locator('.ss-nav-branch-title').filter({ hasText: '카드 사용하기' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/backup-recovery\/?$/);
  await expect(selectedCard).toHaveAttribute('aria-current', 'page');
  await expect(selectedCard.locator('.ss-demo-card-type')).toHaveText('↔');
  await expect(selectedCard.locator('.ss-demo-visual > *')).toHaveCount(1);
});

test('active branch highlight bar reaches the end of its nested items', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/seedkeeper/save/'));
  const metrics = await page.locator('.ss-nav-branch.is-active').filter({ hasText: '카드 사용하기' }).evaluate((branch) => {
    const branchBox = branch.getBoundingClientRect();
    const items = branch.querySelector<HTMLElement>('.ss-nav-branch-items')?.getBoundingClientRect();
    const pseudo = getComputedStyle(branch, '::after');
    const parent = branch.parentElement?.getBoundingClientRect();
    const top = Number.parseFloat(pseudo.top) || 0;
    const bottom = Number.parseFloat(pseudo.bottom) || 0;
    return {
      barBottom: branchBox.bottom - bottom,
      branchBottom: branchBox.bottom,
      itemsBottom: items?.bottom ?? null,
      parentBottom: parent?.bottom ?? null,
      isLastBranch: !branch.nextElementSibling,
      pseudoBottom: bottom,
      pseudoHeight: pseudo.height,
      borderRadius: pseudo.borderRadius,
      connectorWidth: getComputedStyle(branch, '::before').width,
      gap: bottom,
    };
  });
  const itemsBottom = metrics.itemsBottom ?? metrics.branchBottom;
  expect(metrics.barBottom).toBeGreaterThanOrEqual(itemsBottom - 1);
  if (metrics.isLastBranch && metrics.parentBottom !== null) {
    expect(Math.abs(metrics.barBottom - metrics.parentBottom)).toBeLessThanOrEqual(1);
  }
  expect(Number.parseFloat(metrics.pseudoBottom)).toBeLessThanOrEqual(-8);
  expect(metrics.borderRadius).toBe('0px');
  expect(metrics.connectorWidth).toBe('16px');
});

test('chapter navigation reaches SeedKeeper save and marks it active', async ({ page }) => {
  await page.goto(ko());
  await page.getByRole('link', { name: '시드를 카드에 저장하기' }).first().click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/save\/?$/);
  await expect(page.locator('.ss-nav-child[aria-current="page"]')).toContainText('시드를 카드에 저장하기');
});

test('clicking a guide section opens its independent landing page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/seedkeeper/javacard'));
  await page.locator('.ss-nav-section-title').filter({ hasText: 'Getting started' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/?$/);
  await expect(page.locator('.ss-nav-branch-title').filter({ hasText: 'Hardware' })).toBeVisible();
  await expect(page.locator('.ss-nav-child').filter({ hasText: '조립 방법' })).toBeHidden();
  await page.locator('.ss-nav-branch-title').filter({ hasText: 'Hardware' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/build\/?$/);
  await expect(page.locator('main h1')).toContainText('Hardware');
  await expect(page.locator('.ss-nav-child').filter({ hasText: '조립 방법' })).toBeVisible();
  await page.getByRole('link', { name: '키트 조립 방법 시작하기' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/build\/assembly\/?$/);
  await expect(page.getByLabel('ShieldSigner 키트 조립 동영상')).toBeVisible();
});

test('Verification remains directly accessible while hidden from Korean navigation', async ({ page }) => {
  await page.goto(ko());
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'Verification' })).toHaveCount(0);
  await expect(page.locator('.ss-nav-branch-title').filter({ hasText: 'Verification' })).toHaveCount(0);
  await page.goto(ko('/os/verification/'));
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/os\/verification\/?$/);
  await expect(page.locator('main h1')).toContainText('설치 파일 검증');
  await expect(page.locator('main')).toContainText('Get-FileHash');
  await expect(page.locator('main')).not.toContainText('변조 확인 검증 상세 페이지 열기');
});

test('reduced motion keeps navigation and article content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(ko());
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('.ss-reveal').first()).toBeVisible();
  await expect(page.getByRole('link', { name: '시드를 카드에 저장하기' }).first()).toBeVisible();
});

test('assembly contains only the playable video and resizes for mobile', async ({ page }) => {
  await page.goto(ko('/build/assembly/'));
  await expect(page.locator('.ss-demo-card[data-card-asset="shieldsigner-assembly"] img')).toHaveAttribute('src', '/ShieldSigner-Guide/brand/card-artwork/shieldsigner-assembly.gif');
  const video = page.getByLabel('ShieldSigner 키트 조립 동영상');
  await expect(page.locator('main video')).toHaveCount(1);
  await expect(page.locator('main h1')).toHaveText('ShieldSigner 조립 동영상');
  await expect(page.locator('main h2, main .ss-media-placeholder')).toHaveCount(0);
  await expect(video).toHaveAttribute('src', '/ShieldSigner-Guide/guides/assembly/assembly.mp4');
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.readyState)).toBeGreaterThanOrEqual(2);
  await video.evaluate((element: HTMLVideoElement) => element.play());
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0);
  await video.evaluate((element: HTMLVideoElement) => element.pause());
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(video).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test('buyer OS guides expose release-specific verification and installation steps', async ({ page }) => {
  await page.goto(ko('/os/install/'));
  await expect(page.locator('main')).toContainText('ShieldSigner OS 설치');
  await expect(page.locator('main')).toContainText('microSD');
  await expect(page.locator('main')).toContainText('앞에서 검증한 이미지를 SD 카드에 기록할 거예요.');

  await page.goto(ko('/os/verification/'));
  await expect(page.locator('main h1')).toContainText('설치 파일 검증');
  await expect(page.locator('main')).toContainText('Get-FileHash');
  await expect(page.locator('main')).toContainText('sha256sum');
  await expect(page.locator('main')).toContainText('비트코인 메시지 서명');
  await expect(page.locator('main')).toContainText('Valid signature');
  await expect(page.locator('main')).not.toContainText('REPLACE_WITH_OFFICIAL_MAINTAINER_FINGERPRINT');
  await expect(page.locator('main')).toContainText('서명 확인에 실패하면 설치를 멈춰 주세요');
});

test('SeedKeeper navigation preserves the package QR and offers save and load guides', async ({ page }) => {
  await page.goto(ko('/seedkeeper/initialize/'));
  await expect(page.locator('main h1')).toHaveText('카드 초기화와 PIN');
  await expect(page.locator('.ss-doc-nav-bottom .ss-doc-nav-link-next')).toHaveAttribute('href', /seedkeeper\/save/);
  await expect(page.locator('img[src*="18-diy-tools-screen.png"]')).toHaveCount(1);
  await expect(page.locator('img[src*="19-install-applet-screen.png"]')).toHaveCount(1);
  const nav = page.locator('.ss-anime-nav');
  await expect(nav.getByRole('link', { name: '카드 초기화와 PIN', exact: true })).toHaveAttribute('href', /ko\/seedkeeper\/initialize/);
  for (const old of ['backup', 'clone', 'restore', 'recovery']) {
    await expect(page.locator('a[href$="/seedkeeper/' + old + '/"]')).toHaveCount(0);
  }
  for (const [route, heading, menu] of [
    ['save', '시드를 카드에 저장하기', 'To SeedKeeper'],
    ['load', '카드에서 시드 불러오기', 'From SeedKeeper']
  ]) {
    await page.goto(ko('/seedkeeper/' + route + '/'));
    await expect(page.locator('main h1')).toHaveText(heading);
    await expect(page.locator('main')).toContainText(menu);
    await expect(page.locator('main')).toContainText('PIN');
    await expect(page.locator('main')).toContainText('지문');
    await expect(page.locator('main .ss-guide-figure').first()).toBeVisible();
    await expect(page.locator('main')).not.toContainText('PLACEHOLDER');
  }
});

test('watch-only, transaction, and reference chapters expose safety content', async ({ page }) => {
  await page.goto(ko('/wallet/bluewallet/'));
  await expect(page.locator('main h1')).toContainText('BlueWallet 워치온리');
  await expect(page.locator('main')).toContainText('시드·PIN·개인키는 휴대폰으로 옮기지 않습니다');
  await page.goto(ko('/wallet/coconut/'));
  await expect(page.locator('main')).toContainText('Watch-only');

  await page.goto(ko('/transactions/sign-psbt/'));
  await expect(page.locator('main h1')).toContainText('PSBT 검토·서명');
  await expect(page.locator('main')).toContainText('목적지·금액·수수료');

  await page.goto(ko('/reference/security/'));
  await expect(page.locator('main h1')).toContainText('보안 모델');
  await expect(page.locator('main')).toContainText('불일치·훼손 대응');
  await page.goto(ko('/reference/glossary/'));
  await expect(page.locator('main')).toContainText('JavaCard');
  await page.goto(ko('/reference/sources/'));
  await expect(page.getByRole('link', { name: 'SeedKeeper Applet 공식 저장소' })).toHaveAttribute('href', /github.com\/Toporin\/Seedkeeper-Applet/);
});

test('temporarily hidden Korean sections stay out of cards, navigation, and search', async ({ page }) => {
  await page.goto(ko());
  for (const label of ['Watch-only wallets', 'BlueWallet', 'Coconut', 'Transactions', 'Receive', 'Send', 'Signing', 'Reference', 'Safety', 'Terms']) {
    await expect(page.locator('.ss-demo-card').filter({ hasText: label })).toHaveCount(0);
    await expect(page.locator('.ss-anime-nav').getByRole('link', { name: label, exact: true })).toHaveCount(0);
  }
  await page.getByRole('button', { name: 'Search documentation' }).first().click();
  const input = page.getByRole('searchbox', { name: 'Search documentation' });
  await input.fill('BlueWallet');
  await expect(page.locator('.ss-search-result')).toHaveCount(0);
});

test('hidden transaction cards are omitted from the Korean rail', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko());
  const sendCard = page.locator('.ss-demo-card').filter({ hasText: 'Send' });
  const receiveCard = page.locator('.ss-demo-card').filter({ hasText: 'Receive' });
  await expect(sendCard).toHaveCount(0);
  await expect(receiveCard).toHaveCount(0);
});

test('guide cards keep their visual mapping without header icons', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko());
  const cards = page.locator('.ss-demo-card');
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  for (let index = 0; index < count; index += 1) {
    const card = cards.nth(index);
    await expect(card).toHaveAttribute('data-card-visual', /.+/);
    await expect(card.locator('header .ss-demo-icon')).toHaveCount(0);
    await expect(card.locator('.ss-scramble-title')).toBeVisible();
  }
});

test('guide card visual panels render artwork or glyphs', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko(), { waitUntil: 'networkidle' });
  const visualChildCounts = await page.locator('.ss-demo-card .ss-demo-visual').evaluateAll((panels) => panels.map((panel) => panel.children.length));
  expect(visualChildCounts.length).toBeGreaterThan(0);
  expect(visualChildCounts.every((count) => count > 0)).toBeTruthy();
});

test('every visible guide card uses a loaded local image or typography', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko(), { waitUntil: 'networkidle' });
  const assets = await page.locator('.ss-demo-card').evaluateAll((cards) => cards.map((card) => ({
    asset: card.getAttribute('data-card-asset'),
    src: card.querySelector<HTMLImageElement>('.ss-demo-card-image')?.getAttribute('src'),
    loaded: (() => { const image = card.querySelector<HTMLImageElement>('.ss-demo-card-image'); return image?.complete && image.naturalWidth > 0; })(),
    typography: card.querySelector('.ss-demo-card-type')?.textContent?.trim(),
  })));
  expect(assets.length).toBeGreaterThan(0);
  expect(assets.every(({ src, loaded, typography }) => src ? loaded && src.startsWith('/ShieldSigner-Guide/') && !typography : Boolean(typography))).toBeTruthy();
});

test('guide cards keep only a title and one visual cue', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko(), { waitUntil: 'networkidle' });
  const cards = page.locator('.ss-demo-card');
  await expect(cards.first().locator('header .ss-scramble-title')).toBeVisible();
  await expect(cards.first().locator('header > *')).toHaveCount(1);
  await expect(cards.first().locator('.ss-demo-card-summary')).toHaveCount(0);
  await expect(cards.first().locator('.ss-demo-card-meta')).toHaveCount(0);
  await expect(cards.first().locator('.ss-demo-card-kicker')).toHaveCount(0);
  const visualChildren = await cards.locator('.ss-demo-visual').evaluateAll((panels) => panels.map((panel) => panel.children.length));
  expect(visualChildren.length).toBeGreaterThan(0);
  expect(visualChildren.every((count) => count === 1)).toBeTruthy();
});

test('card visuals center on the entire card independently of the title', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko(), { waitUntil: 'networkidle' });
  const card = page.locator('.ss-demo-card').filter({ hasText: 'Getting started' }).first();
  const metrics = await card.evaluate((element) => {
    const cardRect = element.getBoundingClientRect();
    const visualRect = element.querySelector<HTMLElement>('.ss-demo-visual')?.getBoundingClientRect();
    if (!visualRect) return null;
    return {
      leftInset: visualRect.left - cardRect.left,
      rightInset: cardRect.right - visualRect.right,
      bottomInset: cardRect.bottom - visualRect.bottom,
    };
  });
  expect(metrics).not.toBeNull();
  expect(metrics?.leftInset).toBeLessThanOrEqual(1.5);
  expect(metrics?.rightInset).toBeLessThanOrEqual(1.5);
  expect(metrics?.bottomInset).toBeLessThanOrEqual(1.5);
  for (const locale of ['ko', 'en']) {
    await page.goto(`/ShieldSigner-Guide/${locale}/`, { waitUntil: 'networkidle' });
    const centers = await page.locator('.ss-demo-card').evaluateAll((cards) => cards.map((card) => {
      const frame = card.getBoundingClientRect();
      const artwork = card.querySelector<HTMLElement>('.ss-demo-card-image, .ss-demo-card-type')!.getBoundingClientRect();
      return {
        title: card.getAttribute('aria-label'),
        x: Math.abs(artwork.left + artwork.width / 2 - frame.left - frame.width / 2),
        y: Math.abs(artwork.top + artwork.height / 2 - frame.top - frame.height / 2),
      };
    }));
    for (const center of centers) {
      expect(center.x, `${locale}: ${center.title} horizontal center`).toBeLessThanOrEqual(1);
      expect(center.y, `${locale}: ${center.title} vertical center`).toBeLessThanOrEqual(1);
    }
  }
});

test('SeedKeeper and JavaCard use the actual logo and JikKey product photo', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko(), { waitUntil: 'networkidle' });
  const cases = [
    ['SeedKeeper', 'seedkeeper-logo', /brand\/seedkeeper\/seedkeeper_logo_black\.png/],
    ['JavaCard란?', 'jikkey-javacard', /brand\/card-artwork\/jikkey-javacard\.png/],
  ] as const;
  for (const [title, asset, src] of cases) {
    const card = page.locator('.ss-demo-card').filter({ hasText: title }).first();
    await expect(card).toHaveAttribute('data-card-asset', asset);
    await expect(card.locator('.ss-demo-card-image')).toHaveAttribute('src', src);
  }
  for (const [title, mark] of [['카드 초기화와 PIN', 'PIN'], ['시드를 카드에 저장하기', 'SAVE'], ['카드에서 시드 불러오기', 'LOAD']]) {
    const card = page.locator('.ss-demo-card').filter({ hasText: title });
    await expect(card.locator('.ss-demo-card-type')).toHaveText(mark);
    await expect(card.locator('.ss-demo-card-image')).toHaveCount(0);
  }
});

test('active guide cards do not add a visible border or halo', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko(), { waitUntil: 'networkidle' });
  const activeCard = page.locator('.ss-demo-card[aria-current="page"]').first();
  const styles = await activeCard.evaluate((card) => {
    const computed = getComputedStyle(card);
    return { borderColor: computed.borderColor, boxShadow: computed.boxShadow };
  });
  expect(styles.borderColor).toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
  expect(styles.boxShadow).toBe('none');
});

test('cards omit the old bottom-left summary copy', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko(), { waitUntil: 'networkidle' });
  const card = page.locator('.ss-demo-card').filter({ hasText: 'Verification' }).first();
  await expect(card.locator('.ss-demo-card-copy')).toHaveCount(0);
});

test('cards keep summary copy out of both the visual panel and card header', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko(), { waitUntil: 'networkidle' });
  const card = page.locator('.ss-demo-card').filter({ hasText: 'Verification' }).first();
  await expect(card.locator('.ss-demo-visual .ss-demo-card-copy')).toHaveCount(0);
  await expect(card.locator('header .ss-demo-card-copy')).toHaveCount(0);
});

test('Getting started card shows the ShieldSigner product cutout', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko(), { waitUntil: 'networkidle' });
  const card = page.locator('.ss-demo-card').filter({ hasText: 'Getting started' }).first();
  await expect(card).toHaveAttribute('data-card-asset', 'shieldsigner-device');
  await expect(card.locator('.ss-demo-card-image')).toHaveAttribute('src', /brand\/card-artwork\/shieldsigner-device-photo\.png/);
});

test('Hardware card shows the ShieldSigner board', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko(), { waitUntil: 'networkidle' });
  const card = page.locator('.ss-demo-card').filter({ hasText: 'Hardware' }).first();
  await expect(card).toHaveAttribute('data-card-asset', 'shieldsigner-board');
  await expect(card.locator('.ss-demo-card-image')).toHaveAttribute('src', /brand\/card-artwork\/shieldsigner-board\.png/);
});

test('second-level navigation groups open their own landing content', async ({ page }) => {
  await page.goto(ko('/seedkeeper/javacard'));
  await page.locator('.ss-nav-branch-title').filter({ hasText: 'Concepts' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/concepts\/?$/);
  await expect(page.locator('main h1').filter({ hasText: 'Concepts' })).toBeVisible();
  await expect(page.locator('main')).toContainText('이 카테고리에서 다루는 내용');
  await expect(page.getByRole('link', { name: 'JavaCard 안내 열기' })).toHaveAttribute('href', './javacard');

  await page.locator('.ss-nav-branch-title').filter({ hasText: '카드 사용하기' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/backup-recovery\/?$/);
  await expect(page.locator('main h1').filter({ hasText: '카드 사용하기' })).toBeVisible();
  await expect(page.locator('main').getByRole('link', { name: '시드 저장 방법' })).toHaveAttribute('href', './save');
  await expect(page.locator('main').getByRole('link', { name: '시드 불러오기 방법' })).toHaveAttribute('href', './load');
});

test('root redirects to Korean and the language switch preserves the route', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/');
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ko');
  const switchToEnglish = page.locator('.ss-language-switch');
  await expect(switchToEnglish).toHaveAttribute('href', /\/ShieldSigner-Guide\/en\/?$/);
  await switchToEnglish.click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/en\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('main h1')).toContainText('ShieldSigner Guide');
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'Kit assembly' })).toHaveAttribute('href', /\/en\/build\/assembly\//);
  await expect(page.locator('.ss-language-switch')).toHaveAttribute('href', /\/ShieldSigner-Guide\/ko\/?$/);
});
