exports.geom = require('./lib/geom')

const SpaceElement = require('./lib/SpaceElement')

module.exports = (el) {
  return new SpaceElement(el)
}
