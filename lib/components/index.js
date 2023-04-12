// @tapspace.components
//
// Various components to render into tapspace.
//
// **Core components:**
// - Item, an interaction-capable HTML container.
// - Space, a 3D container for items, planes, and other spaces.
// - Plane, a 2D container for items and other planes.
// - Viewport, a viewport to tapspace. The root element.
//
// **Special components:**
// - CircleItem, a round HTML element in space.
// - Edge, a CSS border as a line segment in space.
// - Arc, a curved CSS border as an arc segment in space.
//
// **Viewport controls:**
// - ZoomControl, a button pair for zooming in and out.
//
// **Abstract components:**
// - BasisComponent is a coordinate system in affine space.
// - Transformer is a BasisComponent that is transformable.
// - BlockComponent is a Plane that has rectangular boundaries and size.
// - FrameComponent is a BlockComponent that has known size which can be changed.
// - Control is a FrameComponent that stays fixed to the viewport.
// - Interactive is a Transformer that can capture touch and mouse gestures.
//
// **Inheritance chart:**
//
// ![Inheritance between core components](tapspace_class_chart.png)
//

exports.Arc = require('./Arc')
exports.BasisComponent = require('./BasisComponent')
exports.BlockComponent = require('./BlockComponent')
exports.CircleItem = require('./CircleItem')
exports.Control = require('./Control')
exports.CustomControl = require('./CustomControl')
exports.Edge = require('./Edge')
exports.FrameComponent = require('./FrameComponent')
exports.Group = require('./Group')
exports.Hyperspace = require('./Hyperspace')
// TODO exports.Image
exports.Interactive = require('./Interactive')
exports.Item = require('./Item')
// TODO exports.Line
exports.Plane = require('./Plane')
exports.Space = require('./Space')
exports.Transformer = require('./Transformer')
// TODO exports.Text
exports.Viewport = require('./Viewport')
exports.ZoomControl = require('./ZoomControl')
