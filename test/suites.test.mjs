import puppeteer from 'puppeteer'
import test from 'tape'
import { join } from 'path'

// Suites
import { run } from './suites/index.mjs'

// Setup
const browser = await puppeteer.launch()

// Run tests
run(test, browser)

// Exit after all tests completed, success or not.
// It is important to keep the browser open until that.
test.onFinish(async () => {
  await browser.close()
})
