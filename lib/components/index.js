// @tapspace.components
//
// Various components to render into tapspace.
//
// **Core components:**
// - Item, an interaction-capable HTML container.
// - Plane, a 2D container for items and other planes.
// - Viewport, a viewport to tapspace. The root element.
//
// **Special components:**
// - Node, a round HTML element in space.
// - Edge, a CSS border as a line segment in space.
// - Arc, a curved CSS border as an arc segment in space.
//
// **Viewport controls:**
// - ZoomControl, a button pair for zooming in and out.
//
// **Abstract components:**
// - Component is a coordinate system in affine space.
// - TransformerComponent is a Component that is transformable.
// - BlockComponent is a TransformerComponent that has rectangular
//   .. boundaries and size.
// - FrameComponent is a BlockComponent that has a changeable size.
// - ControlComponent is a FrameComponent that stays fixed to the viewport.
// - InteractiveComponent is a TransformerComponent that can capture
//   .. touch and mouse gestures.
//
// **Inheritance chart:**
//
// ![Inheritance between core components](tapspace_class_chart.png)
//

// Abstract classes
exports.Animatable = require('./Animatable')
exports.Component = require('./Component')
exports.BlockComponent = require('./BlockComponent')
exports.ControlComponent = require('./ControlComponent')
exports.FrameComponent = require('./FrameComponent')
exports.InteractiveComponent = require('./InteractiveComponent')
exports.TransformerComponent = require('./TransformerComponent')

// Instance classes
exports.Arc = require('./Arc')
exports.Circle = require('./Node')
exports.CustomControl = require('./CustomControl')
exports.Edge = require('./Edge')
exports.Group = require('./Group')
exports.Hyperspace = require('./Hyperspace')
// TODO exports.Image
exports.Item = require('./Item')
// TODO exports.Line
exports.Node = exports.Circle
exports.Plane = require('./Plane')
// TODO exports.Text
exports.Viewport = require('./Viewport')
exports.ZoomControl = require('./ZoomControl')
