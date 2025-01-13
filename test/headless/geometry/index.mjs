import testArea from './Area/index.mjs'
import { makeTestAllOk } from '../utils.mjs'

export default function (test, browser) {
  // Custom test runner to reduce boilerplate code.
  // Opens the test page and evaluates the test results.
  const testAllOk = makeTestAllOk(test, browser)

  testArea(testAllOk)
}
