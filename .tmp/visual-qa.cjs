const { chromium } = require('C:/Users/800sa/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
  });
  const results = [];
  for (const [name, width, height, colorScheme] of [
    ['desktop', 1440, 1000, 'light'],
    ['mobile', 390, 844, 'light'],
    ['small-dark-preference', 320, 740, 'dark'],
  ]) {
    const page = await browser.newPage({ viewport: { width, height }, colorScheme });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:3100', { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (const img of document.images) {
        img.loading = 'eager';
        await img.decode();
      }
      await Promise.all(document.getAnimations().map(animation => animation.finished));
    });
    await page.screenshot({ path: '.tmp/' + name + '.png', fullPage: true });
    const checks = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      colorScheme: getComputedStyle(document.documentElement).colorScheme,
      background: getComputedStyle(document.body).backgroundColor,
      images: [...document.images].map(img => ({ loaded: img.complete && img.naturalWidth > 0, src: img.getAttribute('src') })),
      removedButton: !document.body.innerText.toLowerCase().includes('see the collection'),
      brokenAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.querySelector(a.getAttribute('href'))).length,
    }));
    await page.getByRole('link', { name: 'Get in touch' }).first().click();
    await page.waitForURL('**/#contact');
    results.push({ name, ...checks, errors, contactNavigation: page.url().endsWith('#contact') });
    await page.close();
  }
  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
