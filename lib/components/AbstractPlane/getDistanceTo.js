module.exports = function (plane) {
  // tapspace.components.AbstractPlane:getDistanceTo(plane)
  //
  // Parameters
  //   plane
  //     an AbstractPlane
  //
  // Return
  //   a Distance
  //
  return this.atAnchor().getDistanceTo(plane.atAnchor())
}
