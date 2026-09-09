import { expect, test, type Locator } from '@playwright/test';

const en = (path = '') => `/ShieldSigner-Guide/en/${path.replace(/\/$/, '')}`;
const cards = [
  { title: 'Send', path: 'transactions/send-guide/' },
  { title: 'Receive', path: 'transactions/receive-guide/' },
  { title: 'Transactions', path: 'transactions/' },
  { title: 'Signing', path: 'transactions/sign-psbt/' },
] as const;

async function centered(card: Locator) {
  const offset = await card.evaluate((element) => {
    const frame = element.getBoundingClientRect();
    const artwork = element.querySelector('.ss-demo-visual')!.firstElementChild!.getBoundingClientRect();
    return {
      x: artwork.left + artwork.width / 2 - frame.left - frame.width / 2,
      y: artwork.top + artwork.height / 2 - frame.top - frame.height / 2,
      width: artwork.width,
      height: artwork.height,
    };
  });
  expect(Math.abs(offset.x)).toBeLessThanOrEqual(1);
  expect(Math.abs(offset.y)).toBeLessThanOrEqual(1);
  expect(offset.width).toBeGreaterThan(20);
  expect(offset.height).toBeGreaterThan(20);
}

// Samples real rendered frames, including the route while animation is running.
async function clickFrames(card: Locator, repeat = false) {
  await card.scrollIntoViewIfNeeded();
  return card.evaluate(async (element, repeatClick) => {
    const visual = element.querySelector('.ss-demo-visual')!;
    const artwork = visual.firstElementChild!;
    const rail = element.closest('.ss-demo-rail')!;
    const scrollBefore = rail.scrollTop;
    const title = element.getAttribute('aria-label');
    const started = performance.now();
    const frames: { time: number; x: number; y: number; points: string | null; path: string; title: string | null }[] = [];
    let repeated = false;
    (element as HTMLElement).click();
    await new Promise<void>((resolve) => {
      const sample = () => {
        const time = performance.now() - started;
        if (repeatClick && !repeated && time >= 140) {
          repeated = true;
          (element as HTMLElement).click();
        }
        const box = artwork.getBoundingClientRect();
        const frame = element.getBoundingClientRect();
        frames.push({ time, x: box.left + box.width / 2 - frame.left - frame.width / 2,
          y: box.top + box.height / 2 - frame.top - frame.height / 2,
          points: artwork.querySelector('polyline')?.getAttribute('points') ?? null,
          path: location.pathname.replace(/\/$/, ''), title: element.querySelector('header')?.textContent?.trim() ?? null });
        if (time < 950) requestAnimationFrame(sample);
        else resolve();
      };
      requestAnimationFrame(sample);
    });
    return { frames, scrollBefore, scrollAfter: rail.scrollTop, title };
  }, repeat);
}

test.use({ viewport: { width: 1440, height: 900 } });
test.beforeEach(async ({ page }) => {
  await page.goto(en(), { waitUntil: 'networkidle' });
});

test('BTC cards have only a title and one centered visual with no decorative panel', async ({ page }) => {
  for (const { title } of cards) {
    const link = page.locator('.ss-demo-rail').getByRole('link', { name: title, exact: true });
    await expect(link.locator(':scope > *')).toHaveCount(2);
    await expect(link.locator('header > *')).toHaveCount(1);
    await expect(link.locator('.ss-demo-visual > *')).toHaveCount(1);
    await centered(link);
    const panel = await link.locator('.ss-demo-visual').evaluate((element) => {
      const style = getComputedStyle(element);
      return { background: style.backgroundColor, image: style.backgroundImage, shadow: style.boxShadow };
    });
    expect(panel).toEqual({ background: 'rgba(0, 0, 0, 0)', image: 'none', shadow: 'none' });
    if (title === 'Send' || title === 'Receive') await expect(link.locator('.ss-demo-visual')).toHaveText('₿');
    else await expect(link.locator('.ss-demo-visual svg')).toHaveCount(1);
  }
});

for (const { title, path, direction } of [
  { title: 'Send', path: 'transactions/send-guide/', direction: -1 },
  { title: 'Receive', path: 'transactions/receive-guide/', direction: 1 },
]) {
  test(`${title} moves one Bitcoin in the approved direction and navigates during playback`, async ({ page }) => {
    const card = page.locator('.ss-demo-rail').getByRole('link', { name: title, exact: true });
    const { frames, scrollBefore, scrollAfter } = await clickFrames(card);
    expect(frames.length).toBeGreaterThan(5);
    expect(frames[0].x * direction).toBeGreaterThan(50);
    expect(frames.some((frame) => frame.time < 400 && frame.path === en(path) && Math.abs(frame.x) > 2)).toBe(true);
    for (let i = 1; i < frames.length; i++) {
      expect((frames[i].x - frames[i - 1].x) * direction).toBeLessThanOrEqual(1);
      expect(Math.abs(frames[i].y)).toBeLessThanOrEqual(1);
    }
    expect(Math.abs(scrollAfter - scrollBefore)).toBeLessThanOrEqual(1);
    expect(frames.every((frame) => frame.title === title)).toBe(true);
    await centered(card);
    await expect(card).toHaveAttribute('aria-current', 'page');
    await expect(card).toHaveCSS('filter', 'none');
    const inactive = page.locator('.ss-demo-rail').getByRole('link', { name: title === 'Send' ? 'Receive' : 'Send', exact: true });
    await expect(inactive).toHaveCSS('filter', 'grayscale(1)');
  });
}

for (const { title, path } of cards.slice(2)) {
  test(`${title} morphs its central block into a centered check and can replay`, async ({ page }) => {
    const card = page.locator('.ss-demo-rail').getByRole('link', { name: title, exact: true });
    const shape = card.locator('svg polyline');
    await expect(shape).toHaveCount(1);
    const initial = await shape.getAttribute('points');
    const first = await clickFrames(card);
    const completed = first.frames.at(-1)!.points;
    expect(completed).not.toBe(initial);
    expect(first.frames.some((frame) => frame.points !== initial && frame.points !== completed)).toBe(true);
    expect(first.frames.some((frame) => frame.time < 400 && frame.path === en(path) && frame.points !== completed)).toBe(true);
    const check = await shape.evaluate((element: SVGPolylineElement) => {
      const points = Array.from(element.points).filter((point, index, all) => index === 0 || point.x !== all[index - 1].x || point.y !== all[index - 1].y);
      const box = element.getBBox();
      return { points: points.map(({ x, y }) => ({ x, y })), x: box.x + box.width / 2, y: box.y + box.height / 2 };
    });
    expect(check.points).toHaveLength(3);
    expect(check.points[0].x).toBeLessThan(check.points[1].x);
    expect(check.points[1].x).toBeLessThan(check.points[2].x);
    expect(check.points[1].y).toBeGreaterThan(check.points[0].y);
    expect(check.points[2].y).toBeLessThan(check.points[0].y);
    expect(check.x).toBe(50);
    expect(check.y).toBe(50);
    expect(first.frames.every((frame) => frame.title === title)).toBe(true);
    expect(Math.abs(first.scrollAfter - first.scrollBefore)).toBeLessThanOrEqual(1);
    const replay = await clickFrames(card, true);
    expect(replay.frames[0].points).not.toBe(completed);
    expect(replay.frames.at(-1)!.points).toBe(completed);
    await centered(card);
  });
}

test('rapid Bitcoin clicks restart and settle at center without competing animations', async ({ page }) => {
  const card = page.locator('.ss-demo-rail').getByRole('link', { name: 'Send', exact: true });
  const { frames } = await clickFrames(card, true);
  expect(frames.filter((frame) => frame.time > 100 && frame.time < 260).some((frame) => frame.x < -50)).toBe(true);
  expect(Math.abs(frames.at(-1)!.x)).toBeLessThanOrEqual(1);
  await centered(card);
});

test('reduced motion keeps complete visuals static and centered through navigation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload({ waitUntil: 'networkidle' });
  for (const { title, path } of cards) {
    const card = page.locator('.ss-demo-rail').getByRole('link', { name: title, exact: true });
    const visual = card.locator('.ss-demo-visual');
    if (title === 'Send' || title === 'Receive') await expect(visual).toHaveText('₿');
    else {
      await expect(visual.locator('svg polyline')).toHaveCount(1);
      const vertices = await visual.locator('polyline').evaluate((element: SVGPolylineElement) =>
        new Set(Array.from(element.points, (point) => `${point.x},${point.y}`)).size);
      expect(vertices).toBe(3);
    }
    const initial = await visual.evaluate((element) => element.querySelector('polyline')?.getAttribute('points') ?? null);
    const { frames } = await clickFrames(card);
    expect(frames.every((frame) => Math.abs(frame.x) <= 1 && Math.abs(frame.y) <= 1 && frame.points === initial && frame.title === title)).toBe(true);
    expect(frames.some((frame) => frame.time < 400 && frame.path === en(path))).toBe(true);
    await centered(card);
    await expect(card).toHaveAttribute('aria-current', 'page');
  }
});
