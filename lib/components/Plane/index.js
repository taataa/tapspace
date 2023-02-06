const Transformer = require('../Transformer')

const Plane = function () {
  // @Plane()
  //
  // Inherits Transformer
  //
  // A flat container for space components. The element does not preserve 3D
  // in DOM and enforces content onto the same plane.
  //
  // Example
  // ```
  // const nodeplane = tapspace.createPlane()
  // viewport.addPlane(nodeplane)
  // const node = tapspace.createCircle(20, 'red')
  // nodeplane.addChild(node)
  // ```
  //

  // Create element for the space
  const elem = document.createElement('div')
  elem.className = 'affine-plane'

  // Inherit
  Transformer.call(this, elem)
}

module.exports = Plane
const proto = Plane.prototype
proto.isPlane = true

// Inherit
Object.assign(proto, Transformer.prototype)

// Functions
Plane.create = require('./create')(Plane)

// Overriding methods
proto.addChild = require('./addChild')
proto.appendChild = proto.addChild

// Plane methods
proto.createPlane = require('./createPlane')
