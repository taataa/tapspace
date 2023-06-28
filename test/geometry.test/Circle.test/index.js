const units = {
  boundaries: require('./boundaries.test'),
  collisions: require('./collisions.test'),
  construction: require('./construction.test'),
  dimensions: require('./dimensions.test'),
  points: require('./points.test'),
  transformations: require('./transformations.test'),
  transitions: require('./transitions.test'),
  translations: require('./translations.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
