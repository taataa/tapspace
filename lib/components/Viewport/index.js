// The AffineViewport is an AffineElement where any
// transformation to the element are inverted to its children
// instead of the element itself. This, combined to overflow styles
// set by affine-viewport CSS class, creates an illusion of a viewport
// to a 2D space.
//
const AffineElement = require('../Element')
const AffineLayer = require('../Layer')

const AffineViewport = function (el, opts) {
  AffineElement.call(this, el)
  // A projection from the element to its parent.
  // Because transformations of the view are reflected
  // to its children. The projection to the parent is
  // always the identity transform.

  // Replace default type
  this.type = 'viewport'

  // TODO enable MouseConverter. Unlike touch events, mousemove events do not
  // respect the original target. To make dragging small elements a lot easier,
  // let viewport capture all mouse events and re-emit them as rat events
  // on their original targets. See note 2022-04-10
}

const proto = Object.assign({}, AffineElement.prototype)
AffineViewport.prototype = proto
module.exports = AffineViewport

proto.add = function (layer, placement) {
  // Insert the layer it into the viewport.
  //
  // Parameters:
  //   layer
  //     a Layer
  //   placement
  //     position
  //       a Point on the viewport, will match the point (0,0) on the layer.
  //     rotation
  //       number, radians
  //     scale
  //       number, multiplier
  //
  // Return
  //   this, for chaining
  //
  this.el.appendChild(layer.el)
  return this
}
