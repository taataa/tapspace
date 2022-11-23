const Plane = require('../Plane')

module.exports = function (position) {
  // tapspace.components.Space:addBasis(position)
  // tapspace.components.Space:addPlane
  //
  // Create an origin plane for further content. Origin planes
  // are immediate children of the space. Each origin plane
  // spans a coordinate system, unlike the space.
  //
  // Parameters:
  //   position
  //     a Point, the origin of the plane.
  //     a Transit, the origin of the plane with scale and orientation.
  //
  // Return
  //   a Plane
  //
  const plane = new Plane()

  this.add(plane, position)

  return plane
}
