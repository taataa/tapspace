// @tapspace.components
//
// Various components to render into tapspace.
//
// **Core components:**
// - Item, an interaction-capable HTML container.
// - Space, a boundless container for items and other spaces.
// - Viewport, a viewport to tapspace. The root element.
//
// **Special components:**
// - Node, a round HTML element in space.
// - Edge, a CSS border as a line segment in space.
// - Arc, a curved CSS border as an arc segment in space.
//
// **Viewport controls:**
// - CustomControl, a control with custom HTML content.
// - ZoomControl, a button pair for zooming in and out.
//
// **Abstract components:**
// - Component is a coordinate system in affine space.
// - Transformer is a Component that is transformable.
// - BlockComponent is a Transformer that has rectangular
//   .. boundaries and size.
// - FrameComponent is a BlockComponent that has a changeable size.
// - ViewportControl is a FrameComponent that stays fixed to the viewport.
// - Interactive is a Transformer that can capture
//   .. touch and mouse gestures.
//
// **Inheritance chart:**
//
// ![Inheritance between core components](tapspace_class_chart.png)
//

// Abstract classes
exports.Animatable = require('./Animatable')
exports.BlockComponent = require('./BlockComponent')
exports.Component = require('./Component')
exports.Composite = require('./Composite')
exports.ViewportControl = require('./ViewportControl')
exports.FrameComponent = require('./FrameComponent')
exports.Interactive = require('./Interactive')
exports.Transformer = require('./Transformer')

// Instance classes
exports.Arc = require('./Arc')
exports.CustomControl = require('./CustomControl')
exports.Edge = require('./Edge')
exports.Hyperspace = require('./Hyperspace')
// TODO exports.Image
exports.Item = require('./Item')
// TODO exports.Line
exports.Node = require('./Node')
exports.Space = require('./Space')
// TODO exports.Text
exports.Viewport = require('./Viewport')
exports.ZoomControl = require('./ZoomControl')
