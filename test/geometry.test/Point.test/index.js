const units = {
  addVector: require('./addVector.test'),
  getDistanceTo: require('./getDistanceTo.test'),
  getRaw: require('./getRaw.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
