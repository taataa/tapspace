module.exports = function (plane) {
  // @Plane:getDistanceTo(plane)
  //
  // Parameters
  //   plane
  //     a Plane
  //
  // Return
  //   a Distance
  //
  return this.atAnchor().getDistanceTo(plane.atAnchor())
}
