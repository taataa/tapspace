// API Tapspace v2

const SpaceElement = require('./lib/Element')
const SpaceView = require('./lib/View')

module.exports = (el) => {
  return new SpaceElement(el)
}

exports.element = (el) => {
  return new SpaceElement(el)
}

exports.viewport = (el) => {
  console.log('view created')
  return new SpaceView(el)
}

exports.space = (el) => {

}

exports.geom = require('./lib/geom')
exports.preload = require('loadimages')
exports.version = require('./lib/version')
