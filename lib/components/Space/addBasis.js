const Group = require('../Group')

module.exports = function (position) {
  // @Space:addBasis(position)
  // @Space:addPlane
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
