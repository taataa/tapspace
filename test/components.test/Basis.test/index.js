const units = {
  findCommonAncestor: require('./findCommonAncestor.test'),
  prependChild: require('./prependChild.test'),
  removeChild: require('./removeChild.test'),
  setId: require('./setId.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
