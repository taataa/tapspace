const Plane = require('../Plane')

module.exports = function (position) {
  // tapspace.components.Space:createPlane()
  // tapspace.components.Space:plane
  //
  // Create a plane for further content.
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
