import { join } from 'path'

const pageUrl = 'file:' + join(import.meta.dirname, 'getAspectRatio.test.html')

export const run = (test, browser) => {
  test('Viewport:getAspectRatio', async (t) => {
    // Setup
    const page = await browser.newPage()
    await page.setViewport({ width: 1000, height: 500 })
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded' })

    // Test
    const aspectRatio = await page.evaluate(() => {
      return window.suite.view.getAspectRatio()
    })
    t.equal(aspectRatio, 2, 'should match viewport size')

    // Exit
    await page.close()
    t.end()
  })
}
