// AffineLayer
// Inherits AbstractPlane
//
// Aliases: Space, Plane, Layer, Group
//
// Layer does not have size.
// Layer must be a children of a View.
//
const AbstractPlane = require('../AbstractPlane')

const AffineLayer = function () {
  const elem = document.createElement('div')
  elem.className = 'affine-element affine-layer'

  // Use default anchor {x:0,y:0}
  AbstractPlane.call(this, elem)
}

const proto = Object.assign({}, AbstractPlane.prototype)
AffineLayer.prototype = proto
module.exports = AffineLayer
