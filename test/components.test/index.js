const units = {
  Arc: require('./Arc.test'),
  Component: require('./Component.test'),
  FrameComponent: require('./FrameComponent.test'),
  Item: require('./Item.test'),
  Plane: require('./Plane.test'),
  Viewport: require('./Viewport.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
