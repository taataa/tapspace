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

// Suites
import testSuite from './suites/index.mjs'

// Setup
const browser = await puppeteer.launch()
// Switch to the commented line to show the browser.
// const browser = await puppeteer.launch({ headless: false })

// Run tests
testSuite(test, browser)

// Exit after all tests completed, success or not.
// It is important to keep the browser open until that.
test.onFinish(async () => {
  await browser.close()
})
