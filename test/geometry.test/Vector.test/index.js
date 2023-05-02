const units = {
  fromPolar: require('./fromPolar.test'),
  fromSpherical: require('./fromSpherical.test'),
  getRaw: require('./getRaw.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
