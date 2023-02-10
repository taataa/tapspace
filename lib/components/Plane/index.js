const Transformer = require('../Transformer')

const Plane = function () {
  // @Plane()
  //
  // Inherits Transformer
  //
  // A flat container for space components.
  // About 10x more lightweight for the browser to render than Space. [1]
  // Planes flatten their subspace. Therefore components on a plane may appear
  // rendered flat and on the plane, even if they have a non-zero z coordinate.
  // Although they appear flat, components and geometry on the plane
  // do not lose their true z coordinates. The benefit is that we
  // can move 3D constructions between spaces and planes without
  // losing 3D information but still rendering faster. For example,
  // far-away graphs and scenes might benefit from flattening.
  //
  // Example
  // ```
  // const nodeplane = tapspace.createPlane()
  // viewport.addPlane(nodeplane)
  // const node = tapspace.createCircle(20, 'red')
  // nodeplane.addChild(node)
  // ```
  //
  // [1] Tested on Chrome v109 year 2023.
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
proto.getBoundingBox = require('./getBoundingBox')
