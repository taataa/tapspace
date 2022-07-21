const AbstractPlane = require('../AbstractPlane')

const AffineLayer = function (z) {
  // tapspace.components.Layer(z)
  //
  // Inherits tapspace.components.AbstractPlane
  //
  // Layers does not have size.
  // A Layer must be a children of a Space.
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
