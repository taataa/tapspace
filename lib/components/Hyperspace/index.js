const Component = require('../Component')

const Hyperspace = function (viewport) {
  // @Hyperspace(viewport)
  //
  // Inherits Component
  //
  // Hyperspace is a part of viewport and acts as a container for spaces.
  // Viewport needs Hyperspace to keep ControlComponents and Spaces separate
  // and still enable coordinate transitions between controls and the space.
  //
  // Unlike Space, Hyperspace implements a floating origin.
  // The floating origin adapts to the relative positions of the viewport and
  // spaces in order to diminish error caused by floating point arithmetic
  // when the user travels over vast spaces. Therefore the coordinate system
  // of the hyperspace, unlike the viewport and its spaces, changes over time
  // and cannot be used as a reliable reference to position content.
  //

  this.viewport = viewport

  // TODO where to capture input, in view or hyperspace?

  // Create element for the hyperspace
  const elem = document.createElement('div')
  elem.className = 'affine-hyperspace'

  // Inherit
  Component.call(this, elem)
}

module.exports = Hyperspace
const proto = Hyperspace.prototype
proto.isHyperspace = true

// Inherit
Object.assign(proto, Component.prototype)

// Instance methods
proto.animateOnce = require('./animateOnce')
proto.atAnchor = require('./atAnchor')
proto.atNorm = require('./atNorm')
proto.commit = require('./commit')
proto.getBoundingBox = require('./getBoundingBox')
proto.getBoundingCircle = require('./getBoundingCircle')
proto.renderTransform = require('./renderTransform')
// TODO proto.rotateBy
// TODO proto.rotateByDegrees
proto.scaleBy = require('./scaleBy')
proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')
