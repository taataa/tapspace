// The AffineViewport is an AffineElement where any
// transformation to the element are inverted to its children
// instead of the element itself. This, combined to overflow styles
// set by affine-viewport CSS class, creates an illusion of a viewport
// to a 2D space.
//
const AffineElement = require('../Element')

const Viewport = function (el) {
  AffineElement.call(this, el)
  // A projection from the element to its parent.
  // Because transformations of the view are reflected
  // to its children. The projection to the parent is
  // always the identity transform.

  // Replace default type
  this.type = 'viewport'
}

const proto = Object.assign({}, AffineElement.prototype)
Viewport.prototype = proto

module.exports = Viewport
