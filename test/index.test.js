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
const proto = test.Test.prototype
proto.almostEqual = require('./utils/almostEqual')
proto.almostEqualBasis = require('./utils/almostEqualBasis')
proto.almostEqualDirection = require('./utils/almostEqualDirection')
proto.almostEqualDistance = require('./utils/almostEqualDistance')
proto.almostEqualOrientation = require('./utils/almostEqualOrientation')
proto.almostEqualPoint = require('./utils/almostEqualPoint')
proto.almostEqualSphere = require('./utils/almostEqualSphere')
proto.almostEqualVector = require('./utils/almostEqualVector')

// Reusable container element. Each test is allowed to clear innerHTML.
const container = document.querySelector('#container')

Object.keys(units).forEach((unitName) => {
  units[unitName](test, container, tapspace)
})
