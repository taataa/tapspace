import testComponents from './components/index.mjs'
import testGeometry from './geometry/index.mjs'
import testVersion from './version/index.mjs'

export default function (test, browser) {
  testComponents(test, browser)
  testGeometry(test, browser)
  testVersion(test, browser)
}
