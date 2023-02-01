const units = {
  at: require('./at.test'),
  atNorm: require('./atNorm.test'),
  changeBasis: require('./changeBasis.test'),
  transitRaw: require('./transitRaw.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
