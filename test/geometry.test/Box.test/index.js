const units = {
  at: require('./at.test'),
  atNorm: require('./atNorm.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
