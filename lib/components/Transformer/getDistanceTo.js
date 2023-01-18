module.exports = function (plane) {
  // @Transformer:getDistanceTo(basis)
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
