// AffineViewport
// Inherits AbstractRectangle
//
// TODO The viewport transformation to the element are inverted to its children
// instead of the element itself. This, combined to overflow styles
// set by affine-viewport CSS class, creates an illusion of a viewport
// to a 2D space.
//
const AbstractRectangle = require('../AbstractRectangle')
const tran2 = require('affineplane').tran2

const AffineViewport = function (element, opts) {
  // Parameters
  //   element
  //     HTMLElement or query string
  //   opts
  //     interaction
  //       pannable
  //         boolean, default true
  //       scalable
  //         boolean, default true
  //       rotatable
  //         boolean, default false
  //       wheelable
  //         boolean, default true
  //
  if (typeof element === 'string') {
    // Treat as selector string. The querySelector returns the first match.
    // If not found, results null
    element = document.querySelector(element)
  }

  AbstractRectangle.call(this, element)
  // A projection from the element to its parent.
  // Because transformations of the view are reflected
  // to its children. The projection to the parent is
  // always the identity transform.

  // TODO enable MouseConverter. Unlike touch events, mousemove events do not
  // respect the original target. To make dragging small elements a lot easier,
  // let viewport capture all mouse events and re-emit them as rat events
  // on their original targets. See note 2022-04-10

  this.element.addEventListener('transformed', (ev) => {
    // TODO listen additions and transformations,
    // TODO capture them to queue, and
    // TODO update their CSS at next animation frame.
  })
}

const proto = Object.assign({}, AbstractRectangle.prototype)
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
  //       { x, y } on the viewport or a Point.
  //       The layer's (0,0) will be initially matched with this position.
  //     rotation
  //       number, radians
  //     scale
  //       number, multiplier
  //
  // Return
  //   this, for chaining
  //

  // Insert to DOM
  this.element.appendChild(layer.element)

  // Create transformation
  const r = placement.rotation
  const s = placement.scale
  const tx = placement.position.x
  const ty = placement.position.y
  const proj = tran2.fromPolar(s, r, tx, ty)

  // Set layer projection.
  // Is a combination of viewport projection TODO think through
  layer.proj = tran2.compose(this.proj, proj)

  // For chaining
  return this
}
