import puppeteer from 'puppeteer'
import { join as pathjoin } from 'path'

// Launch the browser and open a new blank page.
const browser = await puppeteer.launch()
const page = await browser.newPage()

// Navigate the page to a URL.
await page.goto(`file:${ pathjoin(import.meta.dirname, 'browser.html') }`)

// Set screen size.
await page.setViewport({ width: 1024, height: 768 })

console.log('Hello from puppeteer app')

// Exit the test page and close the browser.
await browser.close()
