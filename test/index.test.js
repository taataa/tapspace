const test = require('tape')
const tapspace = require('../index')

const units = {
  // General
  version: require('./version.test'),
  // Geometry
  geometry: require('./geometry.test'),
  // Components
  components: require('./components.test')
}

// Custom assertations
test.Test.prototype.almostEqual = require('./utils/almostEqual')
test.Test.prototype.almostEqualOrientation =
  require('./utils/almostEqualOrientation')
test.Test.prototype.almostEqualPoint = require('./utils/almostEqualPoint')
test.Test.prototype.almostEqualVector = require('./utils/almostEqualVector')

// Reusable container element. Each test is allowed to clear innerHTML.
const container = document.querySelector('#container')

Object.keys(units).forEach((unitName) => {
  units[unitName](test, container, tapspace)
})
