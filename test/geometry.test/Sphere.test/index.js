const units = {
  atCenter: require('./atCenter.test'),
  changeBasis: require('./changeBasis.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
