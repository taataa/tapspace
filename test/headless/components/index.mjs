import testArc from './Arc/index.mjs'
import testComponent from './Component/index.mjs'
import testFrameComponent from './FrameComponent/index.mjs'
import testItem from './Item/index.mjs'
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

      // Wait max 5 sec for an async test to finish.
      await page.waitForFunction('window.test.finished === true', { timeout: 5000 })
      // Collect test results.
      const report = await page.evaluate(() => window.test.report())

      // Check test results.
      for (let i = 0; i < report.length; i += 1) {
        t._assert(report[i].result, {
          message: report[i].message,
          operator: report[i].operator,
          actual: report[i].actual,
          expected: report[i].expected
        })
      }

      // Exit
      await page.close()
      t.end()
    })
  }

  testArc(testAllOk)
  testComponent(testAllOk)
  testFrameComponent(testAllOk)
  testItem(testAllOk)
  testSpace(testAllOk)
  testViewport(testAllOk)
}
