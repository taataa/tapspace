const units = {
  at: require('./at.test'),
  atNorm: require('./atNorm.test'),
  changeBasis: require('./changeBasis.test'),
  fromBoxes: require('./fromBoxes.test'),
  fromPoints: require('./fromPoints.test'),
  getBoundingBox: require('./getBoundingBox.test'),
  normAt: require('./normAt.test'),
  rotateBy: require('./rotateBy.test'),
  scaleBy: require('./scaleBy.test'),
  transitRaw: require('./transitRaw.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
