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
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'Verification' })).toHaveAttribute(
    'href',
    /\/os\/verification\/$/
  );
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

test('ShieldSigner OS section card shows the brand logo inside its visual panel', async ({ page }) => {
  await page.goto(ko('/os/'));
  const osCard = page.locator('.ss-demo-card').filter({ hasText: 'ShieldSigner OS' }).first();
  await expect(osCard).toHaveCount(1);
  await expect(osCard.locator('.ss-demo-os')).toBeVisible();
  await expect(osCard.locator('.ss-demo-os-logo')).toHaveAttribute('src', '/ShieldSigner-Guide/brand/shieldsigner.svg');
  await expect(osCard.locator('.ss-demo-os-logo')).toHaveCSS('object-fit', 'contain');
});

test('assembly labels use the shared Korean-friendly guide font stack', async ({ page }) => {
  await page.goto(ko('/build/assembly/'));
  const fonts = await page.evaluate(() => {
    const selectors = ['.ss-nav-child[aria-current="page"]', '.ss-demo-card[aria-current="page"] .ss-scramble-title', 'main h1'];
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
  await expect(page.locator('.ss-brand img')).toHaveAttribute('src', '/ShieldSigner-Guide/brand/shieldsigner.svg');

  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator('.ss-category-nav')).toBeVisible();
  await expect(page.locator('.ss-demo-rail')).toBeVisible();
  await expect(page.locator('.ss-doc-nav-bar')).toBeHidden();
  await page.setViewportSize({ width: 390, height: 844 });
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
});

test('article titles use the compact documentation scale', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/build/assembly/'));
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
  await page.goto(ko('/seedkeeper/backup/'));
  await page.getByRole('button', { name: 'Next card' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/clone\/?$/);
  await page.getByRole('button', { name: 'Previous card' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/backup\/?$/);
});

test('article next steps use paired previous and next cards', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/seedkeeper/backup/'));
  const nav = page.locator('.ss-doc-nav-bottom');
  await expect(nav).toBeVisible();
  await expect(nav.locator('.ss-doc-nav-step-label')).toHaveText(['Previous', 'Next']);
  await expect(nav.getByRole('link', { name: /카드 초기화와 PIN/ })).toHaveAttribute('href', /\/seedkeeper\/initialize/);
  await expect(nav.getByRole('link', { name: /카드 간 복제/ })).toHaveAttribute('href', /\/seedkeeper\/clone/);
  await expect(nav.locator('.ss-doc-nav-link')).toHaveCount(2);
});

test('article titles are preceded by a linked documentation breadcrumb', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/build/assembly/'));
  const breadcrumb = page.locator('.ss-doc-breadcrumb');
  await expect(breadcrumb).toBeVisible();
  await expect(breadcrumb.locator('a')).toHaveText(['Getting started', 'Hardware']);
  await expect(breadcrumb.locator('a').nth(0)).toHaveAttribute('href', '/ShieldSigner-Guide/ko/');
  await expect(breadcrumb.locator('a').nth(1)).toHaveAttribute('href', '/ShieldSigner-Guide/ko/build/');
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText('키트 조립 방법');
  const positions = await breadcrumb.evaluate((element) => {
    const title = element.parentElement?.querySelector('h1');
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

  await page.locator('.ss-nav-branch-title').filter({ hasText: 'Backup & recovery' }).click();
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

test('active branch highlight bar reaches the end of its nested items', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(ko('/seedkeeper/backup/'));
  const metrics = await page.locator('.ss-nav-branch.is-active').filter({ hasText: 'Backup & recovery' }).evaluate((branch) => {
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

test('chapter navigation reaches SeedKeeper backup and marks it active', async ({ page }) => {
  await page.goto(ko());
  await page.getByRole('link', { name: '시드를 카드에 백업하기' }).first().click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/backup\/?$/);
  await expect(page.locator('.ss-nav-child[aria-current="page"]')).toContainText('시드를 카드에 백업하기');
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
  await expect(page.locator('main h1')).toContainText('키트 조립 방법');
});

test('Verification is a single landing route', async ({ page }) => {
  await page.goto(ko());
  const verificationCard = page.locator('.ss-demo-card').filter({ hasText: 'Verification' });
  await expect(verificationCard).toHaveCount(1);
  await verificationCard.click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/os\/verification\/?$/);
  await expect(page.locator('main h1')).toContainText('Verification');
  await expect(page.locator('main')).toContainText('Get-FileHash');
  await expect(page.locator('main')).not.toContainText('변조 확인 검증 상세 페이지 열기');
});

test('reduced motion keeps navigation and article content visible', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(ko());
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('.ss-reveal').first()).toBeVisible();
  await expect(page.getByRole('link', { name: '시드를 카드에 백업하기' }).first()).toBeVisible();
});

test('buyer setup guides expose safety checks and verification commands', async ({ page }) => {
  await page.goto(ko('/build/assembly/'));
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/build\/assembly\/?$/);
  await expect(page.locator('main')).toContainText('키트 조립 방법');
  await expect(page.locator('main')).toContainText('완료 체크리스트');
  await expect(page.locator('main')).toContainText('시드를 입력하지 마세요');

  await page.goto(ko('/os/install/'));
  await expect(page.locator('main')).toContainText('ShieldSigner OS 설치');
  await expect(page.locator('main')).toContainText('microSD');
  await expect(page.locator('main')).toContainText('검증 전에는 플래시 금지');

  await page.goto(ko('/os/verification/'));
  await expect(page.locator('main')).toContainText('Verification');
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
    await page.goto(ko(route));
    await expect(page.locator('main h1')).toContainText(heading);
    await expect(page.locator('main')).toContainText('PIN');
  }

  await page.goto(ko('/seedkeeper/backup/'));
  await expect(page.getByRole('link', { name: '카드 간 복제' }).first()).toHaveAttribute('href', /\/seedkeeper\/clone\//);
  await expect(page.getByRole('link', { name: '시드 복원하기' }).first()).toHaveAttribute('href', /\/seedkeeper\/restore\//);
  await expect(page.getByRole('link', { name: '분실과 복구 계획' }).first()).toHaveAttribute('href', /\/seedkeeper\/recovery\//);
  await expect(page.getByRole('link', { name: '다음: 카드 간 복제 →' })).toHaveAttribute('href', './clone');
  await expect(page.getByRole('link', { name: /SeedKeeper Applet 저장소/ })).toHaveCount(0);

  await page.goto(ko('/seedkeeper/recovery/'));
  await expect(page.locator('.backup-matrix')).toBeVisible();
  await expect(page.locator('.backup-matrix')).toContainText('금속 1장');
  await expect(page.getByRole('link', { name: '다음: BlueWallet 워치온리 지갑' })).toHaveAttribute('href', /wallet\/bluewallet/);

  await page.goto(ko('/seedkeeper/javacard/'));
  await expect(page.getByRole('link', { name: /SeedKeeper Applet GitHub/ })).toHaveAttribute('href', 'https://github.com/Toporin/Seedkeeper-Applet');

  await page.goto(ko('/seedkeeper/restore/'));
  await expect(page.locator('main')).toContainText('평문 가져오기');
  await expect(page.locator('main')).toContainText('암호화 가져오기');
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

test('watch-only card list keeps one BlueWallet entry', async ({ page }) => {
  await page.goto(ko());
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'BlueWallet' })).toHaveCount(1);
  await expect(page.locator('.ss-demo-card').filter({ hasText: '워치온리 지갑' })).toHaveCount(0);
});

test('Receive is a single landing route', async ({ page }) => {
  await page.goto(ko());
  const receiveCard = page.locator('.ss-demo-card').filter({ hasText: 'Receive' });
  await expect(receiveCard).toHaveCount(1);
  await expect(receiveCard.locator('.ss-demo-transfer')).toHaveCount(1);
  await expect(receiveCard.locator('.ss-demo-transfer-bitcoin')).toHaveAttribute('src', '/ShieldSigner-Guide/brand/bitcoin.svg');
  await expect(page.locator('.ss-demo-card').filter({ hasText: '수신 주소 확인' })).toHaveCount(0);
  const sendCard = page.locator('.ss-demo-card').filter({ hasText: 'Send' });
  await expect(sendCard).toHaveCount(1);
  await expect(sendCard).toHaveAttribute('href', /\/transactions\/send-guide\/$/);
  await expect(sendCard.locator('.ss-demo-transfer-user')).toHaveAttribute('src', '/ShieldSigner-Guide/brand/user-circle.svg');
  await expect(sendCard.locator('.ss-demo-transfer-bitcoin')).toHaveAttribute('src', '/ShieldSigner-Guide/brand/bitcoin.svg');
  const signingCard = page.locator('.ss-demo-card').filter({ hasText: 'Signing' });
  await expect(signingCard).toHaveCount(1);
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'PSBT 검토·서명' })).toHaveCount(0);
  await expect(receiveCard).toHaveAttribute(
    'href',
    /\/transactions\/receive-guide\/$/
  );
  await receiveCard.click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/transactions\/receive-guide\/?$/);
  await expect(page.locator('main h1')).toContainText('Receive');
  await expect(page.locator('main')).not.toContainText('수신 주소 확인 상세 페이지 열기');
  await page.goto(ko());
  await sendCard.click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/transactions\/send-guide\/?$/);
  await expect(page.locator('main h1')).toContainText('Send');
  await expect(page.locator('main')).toContainText('수신자 주소');
});

test('Send and Receive transfer animations travel between the user and Bitcoin', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const transferGap = (card: ReturnType<typeof page.locator>) => card.evaluate((element) => {
    const user = element.querySelector<HTMLElement>('.ss-demo-transfer-user');
    const bitcoin = element.querySelector<HTMLElement>('.ss-demo-transfer-bitcoin');
    if (!user || !bitcoin) return null;
    const userBox = user.getBoundingClientRect();
    const bitcoinBox = bitcoin.getBoundingClientRect();
    return Math.abs((bitcoinBox.left + bitcoinBox.width / 2) - (userBox.left + userBox.width / 2));
  });

  await page.goto(ko());
  await page.locator('.ss-demo-rail').evaluate((rail) => { rail.scrollTop = rail.scrollHeight; });
  const sendCard = page.locator('.ss-demo-card').filter({ hasText: 'Send' });
  await sendCard.evaluate((element) => { const rail = element.closest<HTMLElement>('.ss-demo-rail'); if (rail) rail.scrollTop += element.getBoundingClientRect().top - rail.getBoundingClientRect().top - 120; });
  const sendInitialGap = await transferGap(sendCard);
  const sendBox = await sendCard.boundingBox();
  expect(sendBox).not.toBeNull();
  await page.mouse.click(sendBox!.x + sendBox!.width / 2, sendBox!.y + sendBox!.height / 2);
  await page.waitForTimeout(50);
  await page.waitForTimeout(120);
  const sendEarlyGap = await transferGap(sendCard);
  await page.waitForTimeout(650);
  const sendFinalGap = await transferGap(sendCard);
  expect(sendInitialGap).not.toBeNull();
  expect(sendEarlyGap).toBeLessThan(sendInitialGap! - 5);
  expect(sendFinalGap).toBeGreaterThan(sendInitialGap! * 0.8);

  await page.goto(ko());
  await page.locator('.ss-demo-rail').evaluate((rail) => { rail.scrollTop = rail.scrollHeight; });
  const receiveCard = page.locator('.ss-demo-card').filter({ hasText: 'Receive' });
  await receiveCard.evaluate((element) => { const rail = element.closest<HTMLElement>('.ss-demo-rail'); if (rail) rail.scrollTop += element.getBoundingClientRect().top - rail.getBoundingClientRect().top - 120; });
  const receiveInitialGap = await transferGap(receiveCard);
  const receiveBox = await receiveCard.boundingBox();
  expect(receiveBox).not.toBeNull();
  await page.mouse.click(receiveBox!.x + receiveBox!.width / 2, receiveBox!.y + receiveBox!.height / 2);
  await page.waitForTimeout(120);
  const receiveEarlyGap = await transferGap(receiveCard);
  await page.waitForTimeout(650);
  const receiveFinalGap = await transferGap(receiveCard);
  expect(receiveInitialGap).not.toBeNull();
  expect(receiveEarlyGap).toBeLessThan(receiveInitialGap! * 0.75);
  expect(receiveFinalGap).toBeLessThan(10);
});

test('second-level navigation groups open their own landing content', async ({ page }) => {
  await page.goto(ko('/seedkeeper/javacard'));
  await page.locator('.ss-nav-branch-title').filter({ hasText: 'Concepts' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/concepts\/?$/);
  await expect(page.locator('main h1')).toContainText('Concepts');
  await expect(page.locator('main')).toContainText('이 카테고리에서 다루는 내용');
  await expect(page.getByRole('link', { name: 'JavaCard 안내 열기' })).toHaveAttribute('href', './javacard');

  await page.locator('.ss-nav-branch-title').filter({ hasText: 'Backup & recovery' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/ko\/seedkeeper\/backup-recovery\/?$/);
  await expect(page.locator('main h1')).toContainText('Backup & recovery');
  await expect(page.locator('main')).toContainText('작업 흐름');
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
