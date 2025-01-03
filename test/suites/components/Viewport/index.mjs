import { run as runGetAspectRatio } from './getAspectRatio.test.mjs'
import { run as runMeasureGroup } from './measureGroup.test.mjs'

export const run = (test, browser) => {
  runGetAspectRatio(test, browser)
  runMeasureGroup(test, browser)
}
