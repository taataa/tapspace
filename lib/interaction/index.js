// tapspace.interaction
//
// Interactions define how gestures affect components.
// Interactions are set up via ability methods such as Item:tappable.
// The easiest way to use interactions is via the ability methods.
//
// **Under the hood:**
// - Interactions do not share a common interface yet they often consists of
//   .. methods for binding and unbinding listeners and updating options.
// - Interactions are not emitters. They make the components such as Item
//   emit iteraction events.
//
// **Dependency chart:**
//
// ![Tapspace interaction dependency chart](tapspace_interaction_chart.png)
//

// TODO exports.Approach
exports.Hold = require('./Hold')
// TODO exports.Limit
exports.Pinch = require('./Pinch')
exports.RealignView = require('./RealignView')
// TODO exports.Resize
exports.Slide = require('./Slide')
exports.Tap = require('./Tap')
// TODO exports.WheelPan alias TrackpadPan
exports.WheelRotate = require('./WheelRotate')
exports.WheelZoom = require('./WheelZoom')
