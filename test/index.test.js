const test = require('tape')
const tapspace = require('../index')

const units = {
  // General
  version: require('./version.test'),
  // Geometry
  geometry: require('./geometry.test/index.test'),
  // Components
  components: require('./components.test/index.test')
}

// Custom assertations
test.Test.prototype.almostEqualVector = require('./utils/almostEqualVector')

// Reusable container element. Each test is allowed to clear innerHTML.
const container = document.querySelector('#container')

Object.keys(units).forEach((unitName) => {
  units[unitName](test, container, tapspace)
})
