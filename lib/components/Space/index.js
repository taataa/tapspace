const AbstractPlane = require('../AbstractPlane')

const AffineSpace = function (viewport) {
  // tapspace.components.Space(viewport)
  //
  // Space is a part of viewport and act as a container for planes.
  // Space is needed to keep Controls and Planes separate and
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

  this.view = viewport

  // Use default anchor 0,0
  AbstractPlane.call(this, elem)
}

module.exports = AffineSpace
const proto = Object.assign({}, AbstractPlane.prototype)
AffineSpace.prototype = proto

proto.add = require('./add')
proto.getView = require('./getView')
proto.getViewport = proto.getView
proto.viewport = proto.getView

proto.createPlane = require('./createPlane')
proto.plane = proto.createPlane
proto.group = proto.createPlane
proto.basis = proto.createPlane
proto.createBasis = proto.createPlane

proto.transformBy = require('./transformBy')
proto.translateBy = require('./translateBy')
