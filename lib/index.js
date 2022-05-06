// Tapspace v2 API

// Components
exports.Component = require('./Element')
exports.Viewport = require('./Viewport')
exports.Layer = require('./Layer')

// Geometries
exports.Distance = require('./Distance')
exports.Point = require('./Point')
exports.Transform = require('./Transform')

// Geometry helpers
exports.createTransform = exports.Transform.createFromParams
exports.estimateTransform = exports.Transform.estimate

// Interaction
exports.interaction = require('./input')

// Loaders
exports.loaders = {
  loadImages: require('loadimages'),
}

// Informative
exports.version = require('./lib/version')
