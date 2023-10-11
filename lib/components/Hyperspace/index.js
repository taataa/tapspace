const Composite = require('../Composite')
const Animatable = require('../Animatable')

const Hyperspace = function (viewport) {
  // @Hyperspace(viewport)
  //
  // Inherits Composite, Animatable
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
  Composite.call(this, elem)
  Animatable.call(this)
}

module.exports = Hyperspace
const proto = Hyperspace.prototype
proto.isHyperspace = true

// Inherit
Object.assign(proto, Composite.prototype)
Object.assign(proto, Animatable.prototype)

// Overriding methods
proto.atAnchor = require('./atAnchor')
proto.requestIdle = require('./requestIdle')
proto.renderTransform = require('./renderTransform')
proto.rotateBy = require('./rotateBy')
// TODO proto.rotateByDegrees
proto.scaleBy = require('./scaleBy')
proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')

// Instance methods
proto.commit = require('./commit')
