const Composite = require('../Composite')

const Plane = function () {
  // @Plane()
  //
  // Inherits Composite
  //
  // A flat container for space components.
  //
  // Example
  // ```
  // const nodeplane = tapspace.createPlane()
  // viewport.addChild(nodeplane)
  // const node = tapspace.createCircle(20, 'red')
  // nodeplane.addChild(node)
  // ```
  //

  // DEV NOTE 2D vs 3D
  // 2D is about 10x more lightweight for the browser to render than 3D. [1]
  // Planes can flatten their subspace.
  // Therefore components on a plane may appear rendered flat and on the plane,
  // even if they have a non-zero z coordinate.
  // Although they appear flat, components and geometry on the plane
  // do not lose their true z coordinates. The benefit is that we
  // can move 3D constructions between spaces and planes without
  // losing 3D information but still rendering faster. For example,
  // far-away graphs and scenes might benefit from flattening.
  //
  // [1] Tested on Chrome v109 in year 2023.
  //

  // Create element for the space
  const elem = document.createElement('div')
  elem.className = 'affine-plane'

  // Inherit
  Composite.call(this, elem)
}

module.exports = Plane
const proto = Plane.prototype
proto.isPlane = true

// Inherit
Object.assign(proto, Composite.prototype)

// Functions
Plane.create = require('./create')(Plane)

// Overriding methods
proto.addChild = require('./addChild')
proto.appendChild = proto.addChild
