const units = {
  findCommonAncestor: require('./findCommonAncestor.test'),
  prependChild: require('./prependChild.test'),
  removeChild: require('./removeChild.test'),
  replaceChild: require('./replaceChild.test'),
  replaceParent: require('./replaceParent.test'),
  setId: require('./setId.test'),
  setParent: require('./setParent.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
