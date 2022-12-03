module.exports = function (plane) {
  // @Plane:getDistanceTo(plane)
  //
  // Get distance between the anchors of two planes.
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
