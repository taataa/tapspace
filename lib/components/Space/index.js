const Basis = require('../Basis')

const Space = function (viewport) {
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

  // Inherit
  Basis.call(this, elem)

  this.view = viewport
}

module.exports = Space
const proto = Space.prototype

// Inherit
Object.assign(proto, Basis.prototype)

// Functions
Space.create = require('./create')

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
