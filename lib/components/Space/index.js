const Basis = require('../Basis')

const AffineSpace = function (viewport) {
  // tapspace.components.Space(viewport)
  //
  // Inherits Basis
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

  Basis.call(this, elem)

  this.view = viewport
}

module.exports = AffineSpace
const proto = Object.assign({}, Basis.prototype)
AffineSpace.prototype = proto

// Instance methods
proto.addBasis = require('./addBasis')
proto.addPlane = proto.addBasis
proto.getView = require('./getView')
proto.getViewport = proto.getView
// TODO proto.rotateBy
// TODO proto.rotateByDegrees
// TODO proto.scaleBy
proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')
proto.viewport = proto.getView
