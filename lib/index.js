// Tapspace v2 API

// Components
exports.Component = require('./components/Element')
exports.Viewport = require('./components/Viewport')
exports.Layer = require('./components/Layer')

// Geometries
exports.Distance = require('./geometry/Distance')
exports.Point = require('./geometry/Point')
exports.Transform = require('./geometry/Transform')

// Geometry helpers
exports.createTransform = exports.Transform.createFromParams
exports.estimateTransform = exports.Transform.estimate

// Interaction
exports.interaction = require('./interaction')

// Loaders
exports.loaders = {
  loadImages: require('loadimages'),
}

// Informative
exports.version = require('./lib/version')
