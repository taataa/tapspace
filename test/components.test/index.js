const units = {
  Arc: require('./Arc.test'),
  BasisComponent: require('./BasisComponent.test'),
  FrameComponent: require('./FrameComponent.test'),
  Plane: require('./Plane.test'),
  Item: require('./Item.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
