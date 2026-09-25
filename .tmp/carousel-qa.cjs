const { chromium, expect } = require('C:/Users/800sa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/test');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
  try {
    for (const [name, width, height, reducedMotion] of [
      ['desktop', 1440, 1000, 'no-preference'],
      ['portrait', 390, 844, 'no-preference'],
      ['reduced-motion', 320, 740, 'reduce'],
    ]) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion, colorScheme: 'dark' });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.clock.install();
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      await page.waitForFunction(() => [...document.querySelectorAll('.hero-photo')].every(img => img.complete && img.naturalWidth));
      if (reducedMotion === 'no-preference') await expect(page.getByRole('button', { name: 'Pause slideshow' })).toBeVisible();
      const images = await page.locator('.hero-photo').evaluateAll(images => images.map(img => ({ src: img.currentSrc, width: img.naturalWidth, height: img.naturalHeight })));
      assert.equal(images.length, 3);
      assert(images.every(img => width < 768 ? img.src.includes('-mobile.webp') && img.height > img.width : !img.src.includes('-mobile') && img.width > img.height));
      const label = page.locator('.hero-location');
      await expect(label).toContainText('Kampala');
      if (reducedMotion === 'no-preference') {
        for (const city of ['London', 'New York', 'Kampala']) {
          await page.clock.fastForward(6100);
          await expect(label).toContainText(city);
        }
        await page.getByRole('button', { name: 'Pause slideshow' }).click();
        await page.mouse.move(0, 0);
        await page.clock.fastForward(12000);
        await expect(label).toContainText('Kampala');
        await page.getByRole('button', { name: 'Play slideshow' }).click();
        await page.mouse.move(0, 0);
        await page.clock.fastForward(6100);
        await expect(label).toContainText('London');
        await page.getByRole('button', { name: 'Previous hero image' }).click();
      } else {
        assert.equal(await page.getByRole('button', { name: 'Pause slideshow' }).count(), 0);
        await page.clock.fastForward(18000);
        await expect(label).toContainText('Kampala');
      }
      for (const city of ['Kampala', 'London', 'New York']) {
        await expect(label).toContainText(city);
        await page.clock.fastForward(1400);
        await page.screenshot({ path: '.tmp/hero-' + name + '-' + city.replaceAll(' ', '-') + '.png' });
        await page.getByRole('button', { name: 'Next hero image' }).click();
      }
      await expect(label).toContainText('Kampala');
      const layout = await page.evaluate(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, colorScheme: getComputedStyle(document.documentElement).colorScheme, hero: document.querySelector('.hero').getBoundingClientRect().toJSON() }));
      assert.equal(layout.overflow, false);
      assert.equal(layout.colorScheme, 'light');
      if (width < 768) assert.equal(layout.hero.height / layout.hero.width, 1.5);
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ name, images, rotation: 'passed', controls: 'passed', layout, errors }));
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
