const units = {
  Area: require('./Area.test'),
  Box: require('./Box.test'),
  Direction: require('./Direction.test'),
  Distance: require('./Distance.test'),
  Orientation: require('./Orientation.test'),
  Path: require('./Path.test'),
  Point: require('./Point.test'),
  Scale: require('./Scale.test'),
  Size: require('./Size.test'),
  Transform: require('./Transform.test'),
  Vector: require('./Vector.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
