// API Tapspace v2

const SpaceElement = require('./lib/SpaceElement')
const SpaceView = require('./lib/SpaceView')

module.exports = SpaceElement.create

exports.createView = (el) => {
  console.log('view created')
}

exports.geom = require('./lib/geom')
exports.preload = require('loadimages')
exports.version = require('./lib/version')
