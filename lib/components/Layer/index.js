const AbstractPlane = require('../AbstractPlane')

const AffineLayer = function (z) {
  // AffineLayer
  // Inherits AbstractPlane
  //
  // Aliases: Space, Plane, Layer, Group
  //
  // Layer does not have size.
  // Layer must be a children of a View.
  //
  // Parameters
  //   z
  //     optional number. The depth coordinate for perspective viewports.
  //

  // Create empty element for the layer
  const elem = document.createElement('div')
  elem.className = 'affine-element affine-layer'

  // Use default anchor {x:0,y:0}
  AbstractPlane.call(this, elem)

  // Depth coordinate
  this.z = z
}

const proto = AffineLayer.prototype
Object.assign(proto, AbstractPlane.prototype)
module.exports = AffineLayer
