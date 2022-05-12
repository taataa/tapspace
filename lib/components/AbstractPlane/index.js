const AbstractNode = require('../AbstractNode')

const AbstractPlane = function (element, opts) {
  // Abstract class for affine components that span a coordinate plane.
  //
  // Parameters:
  //   element
  //     a HTMLElement
  //   opts
  //     anchor
  //       { x, y } on the element
  //

  // Debug
  if (!element) {
    throw new Error('Element does not exist')
  }

  // Inherit from AbstractNode
  AbstractNode.call(this, element, opts)

  // TODO check that given element is not already affine

  // Default options
  if (!opts) {
    opts = {}
  }
  opts = Object.assign({
    anchor: { x: 0, y: 0 }
  }, opts)

  // The position of the gravity on the element. The anchor point.
  this.anchor = { x: opts.anchor.x, y: opts.anchor.y }

  // The projection to the parent plane. It contains
  // the position of the anchor point on the parent
  // and the uniform scale and rotation as an affine
  // transformation.
  // TODO null if no parent? Or relative to anything?
  this.proj = { a: 1, b: 0, x: 0, y: 0 }
}

// Inherit from AbstractNode
const proto = Object.assign({}, AbstractNode.prototype)
AbstractPlane.prototype = proto
module.exports = AbstractPlane

proto.at = require('./at')
proto.atAnchor = require('./atAnchor')

proto.getPosition = require('./getPosition')

// proto.getRotation() is problematic because it would
// give only relative rotation to parent.
// Maybe elem.getProjectionTo(x).getRotation() is better.

proto.getProjectionTo = require('./getProjectionTo')
proto.getProjectionToParent = require('./getProjectionToParent')

proto.rotateBy = require('./rotateBy')

proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')

// proto.touchable = function () {
//   // TODO return a Touch object
// }
// or draggable

// proto.wheelable = function () {
//   // TODO return a Wheel object
// }
// or scrollable
