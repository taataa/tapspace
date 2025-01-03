import { join } from 'path'

const pageUrl = 'file:' + join(import.meta.dirname, 'measureGroup.test.html')

export default function (test, browser) {
  test('Viewport:measureGroup', async (t) => {
    // Setup
    const page = await browser.newPage()
    await page.setViewport({ width: 1000, height: 500 })
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded' })

    // Test
    const suite = await page.evaluate(() => {
      return window.suite
    })

    for (let i = 0; i < suite.length; i += 1) {
      const predicate = suite[i][0]
      const message = suite[i][1]
      t.ok(predicate, message)
    }

    // Exit
    await page.close()
    t.end()
  })
}
