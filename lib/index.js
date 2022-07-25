// tapspace
//
// The tapspace namespace provides component creation methods,
// geometry classes, and namespaces for interaction, effects, and
// resource loaders.
//

// Main methods
exports.circle = require('./components/Circle/create')
exports.component = require('./components/Component/create')
exports.viewport = require('./components/Viewport/create')

// Components
exports.components = require('./components')
exports.Circle = require('./components/Circle')
exports.Component = require('./components/Component')
exports.Edge = require('./components/Edge')
exports.Layer = require('./components/Layer')
exports.Pixel = require('./components/Pixel')
exports.Viewport = require('./components/Viewport')

// Geometries
exports.geometry = require('./geometry')
exports.Direction = require('./geometry/Direction')
exports.Distance = require('./geometry/Distance')
exports.Point = require('./geometry/Point')
exports.Scale = require('./geometry/Scale')
exports.Size = require('./geometry/Size')
exports.Transform = require('./geometry/Transform')
// TODO exports.point() etc

// Geometry helpers
exports.createTransform = exports.Transform.createFromParams
exports.estimateTransform = exports.Transform.estimate

// Interaction
exports.interaction = require('./interaction')

// Effects
exports.effects = require('./effects')

// Loaders
exports.loaders = {
  loadImages: require('loadimages')
}

// Informative
exports.version = require('./version')
