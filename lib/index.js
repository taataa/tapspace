// @tapspace
//
// The tapspace namespace provides [components](#tapspacecomponents) for space,
// [geometry](#tapspacegeometry) classes,
// and [interaction](#tapspaceinteraction) tools.
// There are also [loaders](#tapspaceloaders) to help in managing
// components, images, and other resources.
//

// Insert tapspace stylesheet
require('./style')

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
// Metrics
exports.metrics = require('./metrics')

// Component creation methods
exports.createArc = exports.components.Arc.create
exports.createControl = exports.components.CustomControl.create
exports.createEdge = exports.components.Edge.create
exports.createItem = exports.components.Item.create
exports.createNode = exports.components.Node.create
exports.createSpace = exports.components.Space.create
exports.createView = exports.components.Viewport.create
exports.createViewport = exports.createView

// Informative

// @tapspace.version
//
// The semantic version string, for example '1.2.3'.
// It is identical to the version string in the tapspace package.json.
//
exports.version = require('./version')
