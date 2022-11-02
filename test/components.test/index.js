const units = {
  AbstractNode: require('./AbstractNode.test'),
  // AbstractPlane: require('./AbstractPlane.test')
  // Element: require('./Element.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
