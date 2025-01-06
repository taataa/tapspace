import testComponents from './components/index.mjs'
import testVersion from './version/index.mjs'

export default function (test, browser) {
  testComponents(test, browser)
  testVersion(test, browser)
}
