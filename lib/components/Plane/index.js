const AbstractPlane = require('../AbstractPlane')

const AffinePlane = function () {
  // tapspace.components.Plane()
  //
  // Inherits tapspace.components.AbstractPlane
  //
  // A container for affine components.
  // The plane element has zero width and height.
  // The plane cannot be interacted with, except by viewport.
  // Its contents can be.
  //
  const elem = document.createElement('div')
  elem.className = 'affine-plane'

  // Use default anchor 0,0
  AbstractPlane.call(this, elem)
}

const proto = AffinePlane.prototype
Object.assign(proto, AbstractPlane.prototype)
module.exports = AffinePlane

proto.add = require('./add')
