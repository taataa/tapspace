const AbstractPlane = require('../../AbstractPlane')

const AffineSpace = function () {
  // Space is a part of viewport and act as a group for layers.
  // Space is needed to keep Controls and Layers separate and
  // still enable projections between controls and the space content.
  //
  // The space has zero size. TODO where to capture input, in view or space?
  //

  // Create element for the space
  const elem = document.createElement('div')
  elem.className = 'affine-space'

  // Use default anchor 0,0
  AbstractPlane.call(this, elem)
}

const proto = Object.assign({}, AbstractPlane.prototype)
AffineSpace.prototype = proto
module.exports = AffineSpace
