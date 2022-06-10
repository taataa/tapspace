// AffineGroup
// Inherits AbstractPlane
//
// A set of affine components.
// The group element has zero width and height.
// Still, it can be interacted on its content.
//
const AbstractPlane = require('../AbstractPlane')
const AbstractActive = require('../AbstractActive')

const AffineGroup = function () {
  const elem = document.createElement('div')
  elem.className = 'affine-group'

  // Use default anchor 0,0
  AbstractPlane.call(this, elem)
  AbstractActive.call(this)
}

const proto = AffineGroup.prototype
Object.assign(proto, AbstractPlane.prototype)
Object.assign(proto, AbstractActive.prototype)
module.exports = AffineGroup
