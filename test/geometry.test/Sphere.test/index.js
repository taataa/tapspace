const units = {
  boundaries: require('./boundaries.test'),
  dimensions: require('./dimensions.test'),
  // getBoundingBox: require('./getBoundingBox.test'),
  measures: require('./measures.test'),
  points: require('./points.test'),
  // TODO rotateAroundLine: require('./rotateAroundLine.test'),
  // TODO rotateBy: require('./rotateBy.test'),
  transformations: require('./transformations.test'),
  transitions: require('./transitions.test'),
  translations: require('./translations.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
