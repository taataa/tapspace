import testArea from './Area/index.mjs'
import testBasis from './Basis/index.mjs'
import testBox from './Box/index.mjs'
import testCircle from './Circle/index.mjs'
import testDirection from './Direction/index.mjs'
import testSphere from './Sphere/index.mjs'
import { makeTestAllOk } from '../utils.mjs'

export default function (test, browser) {
  // Custom test runner to reduce boilerplate code.
  // Opens the test page and evaluates the test results.
  const testAllOk = makeTestAllOk(test, browser)

  testArea(testAllOk)
  testBasis(testAllOk)
  testBox(testAllOk)
  testCircle(testAllOk)
  testDirection(testAllOk)
  testSphere(testAllOk)
}
