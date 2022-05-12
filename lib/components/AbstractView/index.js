// AbstractView
// Inherits AbstractRectangle
//
// The viewport transformation to the element are inverted to its children
// instead of the element itself. This, combined to overflow styles
// set by affine-viewport CSS class, creates an illusion of a viewport
// to a 2D space.
//
const AbstractRectangle = require('../AbstractRectangle')

const AbstractView = function (element, opts) {
  // Parameters
  //   element
  //     HTMLElement
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
AbstractView.prototype = proto
module.exports = AbstractView

// TODO ensure only layers are added
// proto.add = require('./add')

// Overwrite AbstractPlane:transformBy
proto.transformBy = require('./transformBy')