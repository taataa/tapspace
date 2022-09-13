// tapspace
//
// The tapspace namespace provides component creation methods,
// geometry classes, and namespaces for interaction, effects, and
// resource loaders.
//
// Usage:
// ```
// const tapspace = require('tapspace')
// ```
//

// Component creation methods
exports.create = require('./components/Space/create')
exports.space = exports.create
exports.circle = require('./components/Circle/create')
exports.element = require('./components/Element/create')
exports.edge = require('./components/Edge/create')
// exports.pixel = require('./components/Pixel/create')

// Components
exports.components = require('./components')

// Geometries
exports.geometry = require('./geometry')

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
// It is identical to the version string in the tapspace package.json.
//
exports.version = require('./version')
