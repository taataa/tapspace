module.exports = function (basis) {
  // @Transformer:getDistanceTo(basis)
  //
  // Get distance between the transformer anchor to the anchor of a Basis.
  // If the basis does not have an anchor, default is (0,0).
  //
  // Parameters
  //   basis
  //     a Basis
  //
  // Return
  //   a Distance
  //
  if (basis.atAnchor) {
    return this.atAnchor().getDistanceTo(basis.atAnchor())
  }

  return this.atAnchor().getDistanceTo(basis.at(0, 0))
}