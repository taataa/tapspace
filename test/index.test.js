const test = require('tape')

const units = {
  // General
  version: require('./version.test'),
  tools: require('./tools.test'),
  // Geometry
  Point: require('./Point.test'),
  // Elements
  Element: require('./Element.test')
}

Object.keys(units).forEach((unitName) => {
  units[unitName](test)
})
