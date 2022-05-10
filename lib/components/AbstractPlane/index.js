
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

  // TODO check that given element is not already affine

  // Default options
  if (!opts) {
    opts = {}
  }
  opts = Object.assign({
    anchor: { x: 0, y: 0 }
  }, opts)

  // Set up a way to access element's affine properties outside.
  // We can attach directly to the DOM element
  // NOTE Beware of memory leaks:
  //   https://stackoverflow.com/a/1402782/638546
  element.affine = this

  // The DOM element
  this.el = element

  // The position of the gravity on the element. The anchor point.
  this.anchor = { x: opts.anchor.x, y: opts.anchor.y }
  // The position of the anchor point on the parent.
  this.position = { x: 0, y: 0 }
  // The scale and rotation around the anchor, represented
  // in a linear similarity transformation.
  this.linear = { a: 0, b: 0 }

  // TODO capture transformation from css at init?

  this.type = 'plane'
}

const proto = AbstractPlane.prototype

proto.at = require('./at')

proto.getAncestors = require('./getAncestors')
proto.getParent = require('./getParent')

// proto.getRotation() is problematic because it would
// give only relative rotation to parent.
// Maybe elem.getProjectionTo(x).getRotation() is better.

proto.isAffineRoot = require('./isAffineRoot')

proto.getProjectionTo = require('./getProjectionTo')
proto.getProjectionToParent = require('./getProjectionToParent')

proto.rotateBy = require('./rotateBy')

proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')

// proto.off // TODO
// proto.on // TODO

// proto.touchable = function () {
//   // TODO return a Touch object
// }
// or draggable

// proto.wheelable = function () {
//   // TODO return a Wheel object
// }
// or scrollable

module.exports = AbstractPlane
