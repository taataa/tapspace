// API v4

const SpaceElement = require('./lib/SpaceElement')

module.exports = SpaceElement.create

exports.geom = require('./lib/geom')
exports.preload = require('loadimages')
exports.version = require('./lib/version')
