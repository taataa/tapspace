// API Tapspace v2

const SpaceElement = require('./lib/SpaceElement')
const SpaceView = require('./lib/SpaceView')

module.exports = (el) => {
  return new SpaceElement(el)
}

exports.createView = (el) => {
  console.log('view created')
}

exports.geom = require('./lib/geom')
exports.preload = require('loadimages')
exports.version = require('./lib/version')
