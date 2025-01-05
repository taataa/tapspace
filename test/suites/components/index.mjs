import testArc from './Arc/index.mjs'
import testSpace from './Space/index.mjs'
import testViewport from './Viewport/index.mjs'
import { getFileUrl } from '../utils.mjs'

export default function (test, browser) {
  // Custom test runner to reduce boilerplate code.
  // Opens the test page and evaluates the test results.
  const testAllOk = async (unitName, dirname, filename) => {
    test(unitName, async (t) => {
      // Setup
      const pageUrl = getFileUrl(dirname, filename)
      const page = await browser.newPage()
      await page.setViewport({ width: 1000, height: 500 })
      await page.goto(pageUrl, { waitUntil: 'domcontentloaded' })

      // Collect test results.
      const suite = await page.evaluate(() => window.suite)

      // Check test results.
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

  testArc(testAllOk)
  testSpace(testAllOk)
  testViewport(testAllOk)
}
