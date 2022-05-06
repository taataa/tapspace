// Tapspace v2 API

// Components
exports.Component = require('./Element')
exports.Viewport = require('./Viewport')
exports.Layer = require('./Layer')

// Geometries
exports.Distance = require('./geometry/Distance')
exports.Point = require('./geometry/Point')
exports.Transform = require('./geometry/Transform')

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
