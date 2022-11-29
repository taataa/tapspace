const Plane = require('../Plane')
const Interactive = require('../Interactive')

const AffineGroup = function () {
  // tapspace.components.Group()
  //
  // Inherits Plane
  // Inherits Interactive
  //
  // A set of affine components.
  // The group element has zero width and height.
  // Still, it can be interacted on its content.
  //
  const elem = document.createElement('div')

  // Use default anchor 0,0
  Plane.call(this, elem)
  Interactive.call(this)

  // Add special class
  elem.classList.add('affine-group')
}

const proto = AffineGroup.prototype
Object.assign(proto, Plane.prototype)
Object.assign(proto, Interactive.prototype)
module.exports = AffineGroup
