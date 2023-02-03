const units = {
  at: require('./at.test'),
  atNorm: require('./atNorm.test'),
  atToNorm: require('./atToNorm.test'),
  changeBasis: require('./changeBasis.test'),
  getBoundingBox: require('./getBoundingBox.test'),
  rotateBy: require('./rotateBy.test'),
  scaleBy: require('./scaleBy.test'),
  transitRaw: require('./transitRaw.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
