const units = {
  at: require('./at.test'),
  changeBasis: require('./changeBasis.test'),
  offsets: require('./offsets.test'),
  rotateBy: require('./rotateBy.test'),
  scaleBy: require('./scaleBy.test'),
  transformBy: require('./transformBy.test'),
  transitRaw: require('./transitRaw.test'),
  transitRawOuter: require('./transitRawOuter.test'),
  translateBy: require('./translateBy.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
