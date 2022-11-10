const AbstractNode = require('../AbstractNode')
const point2 = require('affineplane').point2

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

  let anchorCandidate
  if (point2.validate(opts.anchor)) {
    anchorCandidate = opts.anchor
  } else {
    anchorCandidate = { x: 0, y: 0 } // z=0 filled by setAnchor
  }

  // The transition to the parent plane as an affine transformation matrix.
  //   The plane.x .y and .z represent where the point (0,0,0) of the plane
  //   .. is positioned on the parent plane.
  //   The plane.a and .b define a linear transformation with
  //   .. uniform scaling and rotation.
  // The plane can have a transition even when it has no parent.
  //   That is useful when we want to build the transition before inserting
  //   .. the plane into the DOM.
  this.tran = { a: 1, b: 0, x: 0, y: 0, z: 0 }

  // The position of the gravity on the element. The anchor point.
  this.setAnchor(anchorCandidate)
}

// Inherit from AbstractNode
const proto = AbstractPlane.prototype
Object.assign(proto, AbstractNode.prototype)
module.exports = AbstractPlane

// Methods
proto.addChild = require('./addChild')
proto.animate = require('./animate')
proto.at = require('./at')
proto.atAnchor = require('./atAnchor')
proto.getDirection = require('./getDirection')
proto.getDistanceTo = require('./getDistanceTo')
// TODO proto.getOrientation
proto.getPosition = require('./getPosition')
proto.getRotation = proto.getDirection
proto.getScale = require('./getScale')
proto.getTransitionFrom = require('./getTransitionFrom')
proto.getTransitionTo = require('./getTransitionTo')
proto.getTransitionToParent = require('./getTransitionToParent')
proto.getTransitionToParentOf = require('./getTransitionToParentOf')
proto.getVectorTo = require('./getVectorTo')
proto.match = require('./match')
proto.matchOrientation = require('./matchOrientation')
proto.matchPoints = require('./matchPoints')
proto.matchPosition = require('./matchPosition')
proto.matchScale = require('./matchScale')
proto.moveTo = require('./translateTo')
proto.renderTransform = require('./renderTransform')
// proto.resetPlane? moveTo with default params handles already.
proto.rotateBy = require('./rotateBy')
// TODO proto.rotateTo
proto.scaleBy = require('./scaleBy')
// TODO proto.scaleTo
proto.setAnchor = require('./setAnchor')
// TODO proto.snap that moves the element based on the best snapping pair
proto.snapGrid = require('./snapGrid')
proto.snapPixels = require('./snapPixels')
proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')
proto.translateTo = proto.moveTo
