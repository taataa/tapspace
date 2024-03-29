const units = {
  projectTo: require('./projectTo.test'),
  transitRaw: require('./transitRaw.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
