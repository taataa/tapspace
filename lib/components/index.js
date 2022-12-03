// tapspace.components
//
// Various components to render into space.
//
// **Overview:**
// - Item, a movable HTML container in space.
// - Space, the container for all space items.
// - Group, a set of space items.
// - Viewport, a viewport to space. The root element.
//
// **Special components:**
// - Circle, a round HTML element in space.
// - Edge, a CSS border as a line segment in space.
//
// **Viewport controls:**
// - ZoomControl, a button pair for zooming in and out.
//
// **Abstract components:**
// - Basis is a node in affine space.
// - Plane is a Basis that is transformable.
// - Block is a Plane that has rectangular boundaries and size.
// - Frame is a Block that has known size which can be changed.
// - Control is a Frame that stays fixed to the viewport.
//
// **Inheritance chart:**
//
// ![Inheritance between core components](tapspace_class_chart.png)
//

exports.Basis = require('./Basis')
exports.Block = require('./Block')
exports.Circle = require('./Circle')
exports.Control = require('./Control')
exports.Edge = require('./Edge')
exports.Frame = require('./Frame')
exports.Group = require('./Group')
// TODO exports.Image
exports.Interactive = require('./Interactive')
exports.Item = require('./Item')
// TODO exports.Line
exports.Plane = require('./Plane')
exports.Space = require('./Space')
// TODO exports.Text
exports.Viewport = require('./Viewport')
exports.ZoomControl = require('./ZoomControl')
