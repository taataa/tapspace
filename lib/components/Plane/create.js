const Plane = require('./index')

module.exports = () => {
  // tapspace.createBasis()
  // tapspace.components.Plane.create
  //
  // Create an origin plane for further content. Origin planes
  // are immediate children of the space. Each origin plane
  // spans a coordinate system, unlike the space.
  //
  // Return
  //   a Plane
  //
  return new Plane()
}
