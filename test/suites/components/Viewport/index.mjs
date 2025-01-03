import testGetAspectRatio from './getAspectRatio.test.mjs'
import testMeasureGroup from './measureGroup.test.mjs'

export const run = (test, browser) => {
  testGetAspectRatio(test, browser)
  testMeasureGroup(test, browser)
}
