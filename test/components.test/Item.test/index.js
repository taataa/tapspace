const units = {
  meta: require('./meta.test'),
  //
  at: require('./at.test'),
  matchScale: require('./matchScale.test'),
  rotateBy: require('./rotateBy.test'),
  transformBy: require('./transformBy.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
