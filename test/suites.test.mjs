// This test server enables testing Tapspace in a headless Chromium browser
// both locally and in a continuous integration server.
//
// ## Usage
// $ node suites.test.mjs
//
// ## Design
// We use Tape testing framework on server side only.
// In other words, the assertions happen server side.
// This is for simplicity, because Tape does not
// work in a browser without a special build setup.
// Also, extracting tape output from the headless browser would be tricky.
//
// ## Licence
// MIT. Copyright Akseli Palén 2025
//

import puppeteer from 'puppeteer'
import test from 'tape'
import { join } from 'path'

// Suites
import testSuite from './suites/index.mjs'

// Setup
const browser = await puppeteer.launch()
// Switch to the commented line to show the browser.
// const browser = await puppeteer.launch({ headless: false })

const getFileUrl = (dirname, filename) => 'file:' + join(dirname, filename)

// Custom test
const customTest = async (unitName, dirname, filename) => {
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

// Run tests
testSuite(customTest)

// Exit after all tests completed, success or not.
// It is important to keep the browser open until that.
test.onFinish(async () => {
  await browser.close()
})
