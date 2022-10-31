const test = require('tape')
const tapspace = require('../index')

const units = {
  // General
  version: require('./version.test'),
  // tools: require('./tools.test'),
  // Geometry
  Direction: require('./Direction.test'),
  Distance: require('./Distance.test'),
  Path: require('./Path.test'),
  Point: require('./Point.test'),
  Transform: require('./Transform.test'),
  Vector: require('./Vector.test'),
  // Elements
  AbstractNode: require('./AbstractNode.test')
  // Element: require('./Element.test')
}

// Reusable container element. Each test is allowed to clear innerHTML.
const container = document.querySelector('#container')

Object.keys(units).forEach((unitName) => {
  units[unitName](test, container, tapspace)
})
