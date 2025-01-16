const units = {
  Distance: require('./Distance.test'),
  Orientation: require('./Orientation.test'),
  Path: require('./Path.test'),
  Point: require('./Point.test'),
  Ray: require('./Ray.test'),
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
