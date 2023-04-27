const units = {
  getAspectRatio: require('./getAspectRatio.test'),
  measureGroup: require('./measureGroup.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
