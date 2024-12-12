import puppeteer from 'puppeteer'
import { join as pathjoin } from 'path'
import { Parser } from 'tap-parser'
import { Readable } from 'stream'

class TextStream extends Readable {
  constructor(options) {
    super(options)
  }

  _read(size) {
    // No-op
  }

  write(data) {
    this.push(data)
  }

  end() {
    this.push(null)
  }
}

// Launch the browser and open a new blank page.
const browser = await puppeteer.launch()
const page = await browser.newPage()

// Capture console output
const consoleStream = new TextStream()
// page.on('console', msg => console.log('PAGE LOG:', msg.text()))
page.on('console', msg => {
  const str = msg.text() + '\n'
  consoleStream.write(str)
})

const tapParser = new Parser()
consoleStream.pipe(tapParser)

// tapParser.on('line', (line) => {
//   console.log(line)
// })

tapParser.on('complete', async (results) => {
  console.log('Tests finished.')
  // console.dir(results)

  await browser.close()

  const exitCode = results.ok ? 0 : 1

  process.exit(exitCode)
})

// Navigate the page to a URL.
const suiteUrl = `file:${ pathjoin(import.meta.dirname, 'headless.html') }`
await page.goto(suiteUrl, {
  waitUntil: 'domcontentloaded'
})

// Set screen size.
await page.setViewport({ width: 1024, height: 768 })

// Test version property
// const tapspaceVersion = await page.evaluate(() => window.tapspace.version)
// console.log(tapspaceVersion)

// Wait until tests are finished.
await page.waitForFunction('window.done === true')

// HACK Give tape a few milliseconds to print out the summary.
setTimeout(() => {
  consoleStream.end()
}, 100)

