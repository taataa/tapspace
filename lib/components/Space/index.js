const AbstractPlane = require('../AbstractPlane')

const AffineSpace = function () {
  // Space is a part of viewport and has
  // equal size with it.
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
