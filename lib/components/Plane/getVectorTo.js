module.exports = function (plane) {
  // @Plane:getVectorTo(plane)
  //
  // Get vector from this anchor to the anchor of the given plane.
  //
  // Parameters
  //   plane
  //     a Plane
  //
  // Return
  //   a Vector, represented on this plane.
  //
  return this.atAnchor().getVectorTo(plane.atAnchor())
}