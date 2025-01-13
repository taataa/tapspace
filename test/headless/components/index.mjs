import testArc from './Arc/index.mjs'
import testComponent from './Component/index.mjs'
import testFrameComponent from './FrameComponent/index.mjs'
import testItem from './Item/index.mjs'
import testSpace from './Space/index.mjs'
import testViewport from './Viewport/index.mjs'
import { makeTestAllOk } from '../utils.mjs'

export default function (test, browser) {
  // Custom test runner to reduce boilerplate code.
  // Opens the test page and evaluates the test results.
  const testAllOk = makeTestAllOk(test, browser)

  testArc(testAllOk)
  testComponent(testAllOk)
  testFrameComponent(testAllOk)
  testItem(testAllOk)
  testSpace(testAllOk)
  testViewport(testAllOk)
}
