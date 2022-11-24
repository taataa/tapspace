module.exports = function (plane) {
  // @Plane:getVectorTo(plane)
  //
  // Parameters
  //   plane
  //     an AbstractPlane
  //
  // Return
  //   a Vector, represented on this plane.
  //
  return this.atAnchor().getVectorTo(plane.atAnchor())
}
