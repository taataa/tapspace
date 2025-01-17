import { join } from 'path'

export const getFileUrl = (dirname, filename) => {
  return 'file:' + join(dirname, filename)
}

export const makeTestAllOk = (test, browser) => {
  // Create a custom test runner to reduce boilerplate code.
  // Opens the test page and evaluates the test results.
  //
  // Parameters:
  //   test
  //     a tape.Test instance
  //   browser
  //     a puppeteer Browser instance
  //
  // Returns
  //   a function (unitName, dirname, filename)
  //
  return async (unitName, dirname, filename) => {
    test(unitName, async (t) => {
      // Setup
      const pageUrl = getFileUrl(dirname, filename)
      const page = await browser.newPage()
      await page.setViewport({ width: 800, height: 500 })
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
}
