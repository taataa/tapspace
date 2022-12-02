// tapspace.interaction
//
// Interactions define how gestures affect components.
//
// Interactions do not share a common interface.
// Interactions are not emitters. They make the components emit.
//

exports.Hold = require('./Hold')
exports.Pinch = require('./Pinch')
exports.RealignView = require('./RealignView')
exports.Slide = require('./Slide')
exports.Tap = require('./Tap')
exports.WheelRotate = require('./WheelRotate')
exports.WheelZoom = require('./WheelZoom')
