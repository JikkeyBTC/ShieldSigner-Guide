import { test, expect } from '@playwright/test';

test('landing page exposes the first-run route map', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/');
  await expect(page).toHaveTitle(/ShieldSigner/);
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'Hardware' })).toHaveAttribute(
    'href',
    /\/build\/$/
  );
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'Verification' })).toHaveAttribute(
    'href',
    /\/os\/verification\/$/
  );
  await expect(page.locator('.ss-demo-card').filter({ hasText: '변조 확인 검증' })).toHaveAttribute(
    'href',
    /\/os\/verify\/$/
  );
  await expect(page.locator('main')).toContainText('조립 방법');
  await expect(page.locator('.ss-demo-card').filter({ hasText: '키트 조립 방법' })).toHaveAttribute(
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
  await expect(page.locator('.ss-demo-rail')).toBeVisible();
  await expect(page.locator('.ss-doc-nav-bar')).toBeVisible();
  const navGeometry = await page.evaluate(() => ({
    navBottom: document.querySelector('.ss-doc-nav-bar')?.getBoundingClientRect().bottom ?? 0,
    titleTop: document.querySelector('.ss-article h1')?.getBoundingClientRect().top ?? 0
  }));
  expect(navGeometry.titleTop).toBeGreaterThan(navGeometry.navBottom);
  await expect(page.getByRole('button', { name: 'Previous card' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Next card' })).toBeEnabled();

  await page.setViewportSize({ width: 390, height: 844 });
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

test('document nav follows the visual card order', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/seedkeeper/backup/');
  await page.getByRole('button', { name: 'Next card' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/seedkeeper\/clone\/?$/);
  await page.getByRole('button', { name: 'Previous card' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/seedkeeper\/backup\/?$/);
});

test('card search stays pinned while the card rail scrolls', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/ShieldSigner-Guide/');
  const input = page.getByRole('searchbox', { name: 'Search guide cards' });
  await input.fill('SeedKeeper');
  await expect(page.locator('.ss-demo-card')).toHaveCount(10);
  const before = await page.locator('.ss-card-search').boundingBox();
  await page.locator('.ss-demo-rail').evaluate((rail) => { rail.scrollTop = 600; });
  const after = await page.locator('.ss-card-search').boundingBox();
  expect(after?.y).toBe(before?.y);
});

test('chapter navigation reaches SeedKeeper backup and marks it active', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/');
  await page.getByRole('link', { name: '시드를 카드에 백업하기' }).first().click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/seedkeeper\/backup\/?$/);
  await expect(page.locator('.ss-nav-child[aria-current="page"]')).toContainText('시드를 카드에 백업하기');
});

test('clicking a guide section opens its independent landing page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/ShieldSigner-Guide/seedkeeper/javacard');
  await page.locator('.ss-nav-section-title').filter({ hasText: 'Getting started' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/?$/);
  await expect(page.locator('.ss-nav-branch-title').filter({ hasText: 'Hardware' })).toBeVisible();
  await expect(page.locator('.ss-nav-child').filter({ hasText: '조립 방법' })).toBeVisible();
  await page.locator('.ss-nav-branch-title').filter({ hasText: 'Hardware' }).click();
  await expect(page).toHaveURL(/\/build\/?$/);
  await expect(page.locator('main h1')).toContainText('Hardware');
  await page.getByRole('link', { name: '키트 조립 방법 시작하기' }).click();
  await expect(page).toHaveURL(/\/build\/assembly\/?$/);
  await expect(page.locator('main h1')).toContainText('키트 조립 방법');
});

test('Verification landing and tamper-check detail are separate routes', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/');
  await page.locator('.ss-demo-card').filter({ hasText: 'Verification' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/os\/verification\/?$/);
  await expect(page.locator('main h1')).toContainText('Verification');
  await page.getByRole('link', { name: '변조 확인 검증 상세 페이지 열기' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/os\/verify\/?$/);
  await expect(page.locator('main h1')).toContainText('OS 이미지 검증');
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
  await expect(page.getByRole('link', { name: '다음: 카드 간 복제 →' })).toHaveAttribute('href', './clone');
  await expect(page.getByRole('link', { name: /SeedKeeper Applet 저장소/ })).toHaveCount(0);

  await page.goto('/ShieldSigner-Guide/seedkeeper/recovery/');
  await expect(page.locator('.backup-matrix')).toBeVisible();
  await expect(page.locator('.backup-matrix')).toContainText('금속 1장');
  await expect(page.getByRole('link', { name: '다음: BlueWallet 워치온리 지갑' })).toHaveAttribute('href', /wallet\/bluewallet/);

  await page.goto('/ShieldSigner-Guide/seedkeeper/javacard/');
  await expect(page.getByRole('link', { name: /SeedKeeper Applet GitHub/ })).toHaveAttribute('href', 'https://github.com/Toporin/Seedkeeper-Applet');

  await page.goto('/ShieldSigner-Guide/seedkeeper/restore/');
  await expect(page.locator('main')).toContainText('평문 가져오기');
  await expect(page.locator('main')).toContainText('암호화 가져오기');
});

test('watch-only, transaction, and reference chapters expose safety content', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/wallet/bluewallet/');
  await expect(page.locator('main h1')).toContainText('BlueWallet 워치온리');
  await expect(page.locator('main')).toContainText('시드·PIN·개인키는 휴대폰으로 옮기지 않습니다');
  await page.goto('/ShieldSigner-Guide/wallet/coconut/');
  await expect(page.locator('main')).toContainText('Watch-only');

  await page.goto('/ShieldSigner-Guide/transactions/sign-psbt/');
  await expect(page.locator('main h1')).toContainText('PSBT 검토·서명');
  await expect(page.locator('main')).toContainText('목적지·금액·수수료');

  await page.goto('/ShieldSigner-Guide/reference/security/');
  await expect(page.locator('main h1')).toContainText('보안 모델');
  await expect(page.locator('main')).toContainText('불일치·훼손 대응');
  await page.goto('/ShieldSigner-Guide/reference/glossary/');
  await expect(page.locator('main')).toContainText('JavaCard');
  await page.goto('/ShieldSigner-Guide/reference/sources/');
  await expect(page.getByRole('link', { name: 'SeedKeeper Applet 공식 저장소' })).toHaveAttribute('href', /github.com\/Toporin\/Seedkeeper-Applet/);
});

test('watch-only card list keeps one BlueWallet entry', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/');
  await expect(page.locator('.ss-demo-card').filter({ hasText: 'BlueWallet' })).toHaveCount(1);
  await expect(page.locator('.ss-demo-card').filter({ hasText: '워치온리 지갑' })).toHaveCount(0);
});

test('Receive is a single landing route', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/');
  const receiveCard = page.locator('.ss-demo-card').filter({ hasText: 'Receive' });
  await expect(receiveCard).toHaveCount(1);
  await expect(page.locator('.ss-demo-card').filter({ hasText: '수신 주소 확인' })).toHaveCount(0);
  await expect(receiveCard).toHaveAttribute(
    'href',
    /\/transactions\/receive-guide\/$/
  );
  await receiveCard.click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/transactions\/receive-guide\/?$/);
  await expect(page.locator('main h1')).toContainText('Receive');
  await expect(page.locator('main')).not.toContainText('수신 주소 확인 상세 페이지 열기');
});

test('second-level navigation groups open their own landing content', async ({ page }) => {
  await page.goto('/ShieldSigner-Guide/seedkeeper/javacard');
  await page.locator('.ss-nav-branch-title').filter({ hasText: 'Concepts' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/seedkeeper\/concepts\/?$/);
  await expect(page.locator('main h1')).toContainText('Concepts');
  await expect(page.locator('main')).toContainText('이 카테고리에서 다루는 내용');
  await expect(page.getByRole('link', { name: 'JavaCard 안내 열기' })).toHaveAttribute('href', './javacard');

  await page.locator('.ss-nav-branch-title').filter({ hasText: 'Backup & recovery' }).click();
  await expect(page).toHaveURL(/\/ShieldSigner-Guide\/seedkeeper\/backup-recovery\/?$/);
  await expect(page.locator('main h1')).toContainText('Backup & recovery');
  await expect(page.locator('main')).toContainText('작업 흐름');
});
