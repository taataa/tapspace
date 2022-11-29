// tapspace
//
// The tapspace namespace provides components for space, geometry classes,
// and tools for interaction. There are also helpers for loading resources
// and managing components.
//

// Import tapspace stylesheet
require('./tapspace.css')

// Capturers
exports.capturers = require('./capturers')
// Components
exports.components = require('./components')
// Geometries
exports.geometry = require('./geometry')
// Interaction
exports.interaction = require('./interaction')
// Effects
exports.effects = require('./effects')
// Loaders
exports.loaders = require('./loaders')
// Utilities
exports.utils = require('./utils')

// Component creation methods
exports.circle = require('./components/Circle/create')
exports.create = require('./components/Space/create')
exports.createBasis = exports.components.Plane.create
exports.createCircle = exports.circle
exports.createElement = exports.components.Item.create
exports.createItem = exports.components.Item.create
exports.createSpace = exports.create
exports.edge = require('./components/Edge/create')
exports.element = exports.createElement
exports.space = exports.createSpace
// exports.pixel = require('./components/Pixel/create')

// Informative

// tapspace.version
//
// The semantic version string, for example '1.2.3'.
// It is identical to the version string in the tapspace package.json.
//
exports.version = require('./version')
