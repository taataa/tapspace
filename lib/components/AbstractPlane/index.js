
const AbstractPlane = function (element, opts) {
  // Abstract class for affine components that span a coordinate plane.
  //
  // Parameters:
  //   element
  //     a HTMLElement
  //   opts
  //     gravity
  //       { x, y } on the element
  //
  if (typeof element === 'string') {
    // Treat as selector string. The querySelector returns the first match.
    // If not found, results null
    element = document.querySelector(element)
  }
  if (!element) {
    throw new Error('Element does not exist')
  }

  // TODO check that given element is not already affine

  // Default options
  if (!opts) {
    opts = {}
  }
  opts = Object.assign({
    gravity: { x: 0, y: 0 }
  }, opts)

  // Set up a way to access element's affine properties outside.
  // We can attach directly to the DOM element
  // NOTE Beware of memory leaks:
  //   https://stackoverflow.com/a/1402782/638546
  element.affine = this

  // The DOM element
  this.el = element

  // The position of the anchor on the element. Gravity.
  this.gravity = { x: opts.gravity.x, y: opts.gravity.y }
  // The position of the gravity point on the parent.
  this.position = { x: 0, y: 0 }
  // The scale and rotation around the gravity, represented
  // in a linear similarity transformation.
  this.linear = { a: 0, b: 0 }

  // TODO capture transformation from css at init?

  this.type = 'plane'
}

const proto = AbstractPlane.prototype

proto.at = require('./at')

proto.getAncestors = require('./getAncestors')

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
