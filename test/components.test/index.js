const units = {
  Basis: require('./Basis.test'),
  Frame: require('./Frame.test'),
  Plane: require('./Plane.test'),
  Item: require('./Item.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
