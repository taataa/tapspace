module.exports = function (plane) {
  // @Plane:getDistanceTo(plane)
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
