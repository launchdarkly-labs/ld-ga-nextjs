import { test, defineConfig, devices } from "@playwright/test";
const iterationCount = 100;

for (let iteration = 0; iteration < iterationCount; iteration++) {
  test(`iteration: ${iteration}`, async ({ page }) => {
    await page.goto('https://ld-ga-test.vercel.app/'); // replace with your page URL
    await page.click('text=Buy')
  })

}