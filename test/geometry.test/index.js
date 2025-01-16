const units = {
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
