const units = {
  getRaw: require('./getRaw.test'),
  scaleBy: require('./scaleBy.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
