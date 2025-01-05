import testSpace from './Space/index.mjs'
import testViewport from './Viewport/index.mjs'

export default function (test, browser) {
  testSpace(test, browser)
  testViewport(test, browser)
}
