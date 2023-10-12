const units = {
  meta: require('./meta.test'),
  //
  at: require('./at.test'),
  boundaries: require('./boundaries.test'),
  createVector: require('./createVector.test'),
  rotateBy: require('./rotateBy.test'),
  matchBasis: require('./matchBasis.test'),
  setBasis: require('./setBasis.test'),
  setOrientation: require('./setOrientation.test'),
  setScale: require('./setScale.test'),
  transformBy: require('./transformBy.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
