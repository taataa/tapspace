const Group = require('../Group')

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
  //
  // Return
  //   a Group
  //
  const group = Group.create()

  this.addChild(group, position)

  return group
}
