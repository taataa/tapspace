const test = require('tape')

const units = {
  version: require('./version.test'),
}

Object.keys(units).forEach((unitName) => {
  units[unitName](test)
})
