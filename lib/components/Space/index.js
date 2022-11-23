const AbstractNode = require('../AbstractNode')
const AbstractPlane = require('../AbstractPlane')

const AffineSpace = function (viewport) {
  // tapspace.components.Space(viewport)
  //
  // Inherits AbstractNode
  //
  // Space is a part of viewport and acts as a container for basis and planes.
  // Viewport needs Space to keep Controls and Planes separate and
  // still enable transitions between controls and the space content.
  //
  // Parameters:
  //   viewport
  //     a Viewport, reference to the viewport
  //
  // The space has zero size. TODO where to capture input, in view or space?
  //

  // Create element for the space
  const elem = document.createElement('div')
  elem.className = 'affine-space'

  AbstractNode.call(this, elem)

  this.view = viewport

  // Space shares many features from AbstractPlane but
  // lacks most of coordinate getters, setters, and transformation methods.
  this.tran = { a: 1, b: 0, x: 0, y: 0, z: 0 }

  // Use default anchor 0,0,0
  this.anchor = { x: 0, y: 0, z: 0 }
}

module.exports = AffineSpace
const proto = Object.assign({}, AbstractNode.prototype)
AffineSpace.prototype = proto

// Instance methods
proto.add = require('./add')
proto.addChild = AbstractPlane.prototype.addChild
proto.addBasis = require('./addBasis')
proto.addPlane = proto.addBasis
proto.getTransitionFrom = AbstractPlane.prototype.getTransitionFrom
proto.getTransitionTo = AbstractPlane.prototype.getTransitionTo
proto.getTransitionToParent = AbstractPlane.prototype.getTransitionToParent
proto.getTransitionToParentOf = AbstractPlane.prototype.getTransitionToParentOf
proto.getView = require('./getView')
proto.getViewport = proto.getView
proto.match = AbstractPlane.prototype.match
proto.matchPoints = AbstractPlane.prototype.matchPoints
// TODO proto.rotateBy
// TODO proto.rotateByDegrees
// TODO proto.scaleBy
proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')
proto.viewport = proto.getView
