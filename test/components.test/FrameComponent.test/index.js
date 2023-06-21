const units = {
  resizeTo: require('./resizeTo.test'),
  transformToFill: require('./transformToFill.test'),
  transformToFit: require('./transformToFit.test')
}

module.exports = (test, container, tapspace) => {
  Object.keys(units).forEach((unitName) => {
    units[unitName](test, container, tapspace)
  })
}
