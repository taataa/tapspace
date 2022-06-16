const AbstractNode = require('../AbstractNode')

const AbstractPlane = function (element, opts) {
  // Abstract class for affine components that span a coordinate plane.
  //
  // Parameters:
  //   element
  //     a HTMLElement
  //   opts
  //     anchor
  //       { x, y } on the element. Default { x:0, y:0 }
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
    // TODO Anchor key is set but nullish.
    anchor: { x: 0, y: 0 }
  }, opts)

  // The position of the gravity on the element. The anchor point.
  this.anchor = { x: opts.anchor.x, y: opts.anchor.y }

  // The projection to the parent plane as an affine transformation matrix.
  // The proj.x and proj.y contain the position of (0,0) of this plane
  // represented on the parent plane.
  // The proj.a and proj.b define a linear transformation with
  // uniform scaling and rotation.
  //
  // The plane can have a projection even when it has no parent.
  // That is useful when we want to build the projection before inserting
  // the plane into the DOM.
  this.proj = { a: 1, b: 0, x: 0, y: 0 }
}

// Inherit from AbstractNode
const proto = AbstractPlane.prototype
Object.assign(proto, AbstractNode.prototype)
module.exports = AbstractPlane

proto.add = require('./add')

proto.at = require('./at')
proto.atAnchor = require('./atAnchor')

proto.getDirection = require('./getDirection')
proto.getPosition = require('./getPosition')

proto.getProjectionTo = require('./getProjectionTo')
proto.getProjectionToParent = require('./getProjectionToParent')
proto.getProjectionToParentOf = require('./getProjectionToParentOf')

proto.match = require('./match')
proto.moveTo = require('./moveTo')

proto.renderCss = require('./renderCss')

// proto.resetProjection? moveTo with default params handles already.

proto.rotateBy = require('./rotateBy')
// TODO proto.rotateTo

proto.scaleBy = require('./scaleBy')
// TODO proto.scaleTo

proto.setAnchor = require('./setAnchor')

// TODO proto.setTransition for animation

// TODO proto.snap that moves the element based on the best snapping pair

proto.snapPixels = require('./snapPixels')

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
