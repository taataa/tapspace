import { getFileUrl } from '../utils.mjs'
import { readFile } from 'fs/promises'
import semver from 'semver'

const pjson = JSON.parse(
  await readFile(new URL('../../package.json', import.meta.url))
)

export default function (test, browser) {
  test('tapspace.version', async (t) => {
    // Setup
    const pageUrl = getFileUrl(import.meta.dirname, 'version.html')
    const page = await browser.newPage()
    await page.goto(pageUrl, { waitUntil: 'domcontentloaded' })

    // Get client side version
    const v = await page.evaluate(() => window.tapspace.version)

    // Assertions
    t.equal(typeof v, 'string', 'should be available')
    t.equal(v, pjson.version, 'should equal package version')
    t.ok(semver.valid(v), 'semantically valid version')

    // Exit
    await page.close()
    t.end()
  })
}
