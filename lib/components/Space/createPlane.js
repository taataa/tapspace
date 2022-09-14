const Plane = require('../Plane')

module.exports = function (position) {
  // tapspace.components.Space:createPlane()
  // tapspace.components.Space:plane
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
  this.element.appendChild(plane.element)

  return plane
}
