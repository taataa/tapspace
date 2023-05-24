const units = {
  at: require('./at.test'),
  atNorm: require('./atNorm.test'),
  changeBasis: require('./changeBasis.test'),
  collisions: require('./collisions.test'),
  fromBoxes: require('./fromBoxes.test'),
  fromPoints: require('./fromPoints.test'),
  getArea: require('./getArea.test'),
  getBoundingBox: require('./getBoundingBox.test'),
  getBoundingCircle: require('./getBoundingCircle.test'),
  getVolume: require('./getVolume.test'),
  normAt: require('./normAt.test'),
  projectTo: require('./projectTo.test'),
  resizeTo: require('./resizeTo.test'),
  rotateBy: require('./rotateBy.test'),
  scaleBy: require('./scaleBy.test'),
  transitRaw: require('./transitRaw.test'),
  translateBy: require('./translateBy.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
