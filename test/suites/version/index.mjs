import { getFileUrl } from '../utils.mjs'
import { readFile } from 'fs/promises'

const pjson = JSON.parse(
  await readFile(new URL('../../../package.json', import.meta.url))
)

export default function (test, browser) {
  test('tapspace.version', async (t) => {
    // Setup
    const pageUrl = getFileUrl(import.meta.dirname, 'version.test.html')
    const page = await browser.newPage()
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded' })

    // Get client side version
    const v = await page.evaluate(() => window.tapspace.version)

    // Assertions
    t.equal(typeof v, 'string', 'should be available')
    t.equal(v, pjson.version, 'should equal package version')

    // Exit
    await page.close()
    t.end()
  })
}
