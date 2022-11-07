// tapspace
//
// The tapspace namespace provides component creation methods,
// geometry classes, and namespaces for interaction, effects, and
// resource loaders.
//
// **Table of Contents:**
//

// Import tapspace stylesheet
require('./tapspace.css')

// Component creation methods
exports.circle = require('./components/Circle/create')
exports.create = require('./components/Space/create')
exports.createElement = require('./components/Element/create')
exports.edge = require('./components/Edge/create')
exports.element = exports.createElement
exports.space = exports.create
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
exports.loaders = require('./loaders')

// Informative

// tapspace.version
//
// The semantic version string, for example '1.2.3'.
// It is identical to the version string in the tapspace package.json.
//
exports.version = require('./version')
