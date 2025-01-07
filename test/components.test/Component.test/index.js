const units = {
  setId: require('./setId.test'),
  setParent: require('./setParent.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
