const units = {
  at: require('./at.test'),
  getBoundingBox: require('./getBoundingBox.test'),
  getDirection: require('./getDirection.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
