// Tapspace v2 API

// Components
exports.Component = require('./components/Component')
exports.Viewport = require('./components/Viewport')
exports.Layer = require('./components/Layer')

// Geometries
exports.Direction = require('./geometry/Direction')
exports.Distance = require('./geometry/Distance')
exports.Point = require('./geometry/Point')
exports.Scale = require('./geometry/Scale')
exports.Size = require('./geometry/Size')
exports.Transform = require('./geometry/Transform')

// Geometry helpers
exports.createTransform = exports.Transform.createFromParams
exports.estimateTransform = exports.Transform.estimate

// Interaction
exports.interaction = require('./interaction')

// Loaders
exports.loaders = {
  loadImages: require('loadimages')
}

// Informative
exports.version = require('./version')
