// AffineGroup
// Inherits AbstractPlane
//
// A set of affine components.
// The group element has zero width and height.
// Still, it can be interacted on its content.
//
const AbstractPlane = require('../AbstractPlane')

const AffineGroup = function () {
  const elem = document.createElement('div')
  elem.className = 'affine-group'

  // Use default anchor 0,0
  AbstractPlane.call(this, elem)
}

const proto = Object.assign({}, AbstractPlane.prototype)
AffineGroup.prototype = proto
module.exports = AffineGroup
