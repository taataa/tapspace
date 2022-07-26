// tapspace
//
// The tapspace namespace provides component creation methods,
// geometry classes, and namespaces for interaction, effects, and
// resource loaders.
//

// Component creation methods
exports.circle = require('./components/Circle/create')
exports.component = require('./components/Component/create')
exports.edge = require('./components/Edge/create')
exports.layer = require('./components/Layer/create')
exports.pixel = require('./components/Pixel/create')
exports.viewport = require('./components/Viewport/create')

// Components
exports.components = require('./components')

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

// tapspace.version
//
// The semantic version string, for example '1.2.3'.
//
exports.version = require('./version')
