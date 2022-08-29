const AbstractNode = require('../AbstractNode')

const AbstractPlane = function (element, opts) {
  // tapspace.components.AbstractPlane(element, opts)
  //
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

  // The projection to the parent plane as an affine transformation matrix.
  //   The proj.x .y and .z represent where the point (0,0,0) of the plane
  //   .. is positioned on the parent plane.
  //   The proj.a and proj.b define a linear transformation with
  //   .. uniform scaling and rotation.
  // The plane can have a projection even when it has no parent.
  //   That is useful when we want to build the projection before inserting
  //   .. the plane into the DOM.
  this.proj = { a: 1, b: 0, x: 0, y: 0, z: 0 }

  // The position of the gravity on the element. The anchor point.
  this.setAnchor(opts.anchor)
}

// Inherit from AbstractNode
const proto = AbstractPlane.prototype
Object.assign(proto, AbstractNode.prototype)
module.exports = AbstractPlane

proto.addChild = require('./addChild')

proto.animate = require('./animate')

proto.at = require('./at')
proto.atAnchor = require('./atAnchor')

proto.getDirection = require('./getDirection')
proto.getPosition = require('./getPosition')

proto.getTransitTo = require('./getTransitTo')
proto.getProjectionTo = proto.getTransitTo
proto.getProjectionToParent = require('./getProjectionToParent')
proto.getProjectionToParentOf = require('./getProjectionToParentOf')

proto.getRotation = proto.getDirection

proto.getScale = require('./getScale')

proto.match = require('./match')
proto.moveTo = require('./moveTo')

proto.renderTransform = require('./renderTransform')

// proto.resetProjection? moveTo with default params handles already.

proto.rotateBy = require('./rotateBy')
// TODO proto.rotateTo

proto.scaleBy = require('./scaleBy')
// TODO proto.scaleTo

proto.setAnchor = require('./setAnchor')

proto.setTransition = proto.animate

// TODO proto.snap that moves the element based on the best snapping pair

proto.snapPixels = require('./snapPixels')

proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')
