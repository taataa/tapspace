// tapspace
//
// The tapspace namespace provides [components](#tapspacecomponents) for space,
// [geometry](#tapspacegeometry) classes,
// and [interaction](#tapspaceinteraction) tools.
// There are also [loaders](#tapspaceloaders) to help in managing
// components, images, and other resources.
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

// Component creation methods
exports.createArc = exports.components.Arc.create
exports.createBasis = exports.components.Group.create // TODO is it needed?
exports.createCircle = exports.components.Circle.create
exports.createGroup = exports.components.Group.create
exports.createEdge = exports.components.Edge.create
exports.createItem = exports.components.Item.create
exports.createSpace = exports.components.Space.create

// Informative

// tapspace.version
//
// The semantic version string, for example '1.2.3'.
// It is identical to the version string in the tapspace package.json.
//
exports.version = require('./version')
