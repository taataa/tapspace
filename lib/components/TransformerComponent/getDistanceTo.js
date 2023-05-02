module.exports = function (basis) {
  // @TransformerComponent:getDistanceTo(basis)
  //
  // Get distance between the transformer anchor to
  // the anchor of a BasisComponent.
  // If the basis does not have an anchor, default is (0,0).
  //
  // Parameters
  //   basis
  //     a BasisComponent
  //
  // Return
  //   a Distance
  //
  if (basis.atAnchor) {
    return this.atAnchor().getDistanceTo(basis.atAnchor())
  }

  return this.atAnchor().getDistanceTo(basis.at(0, 0))
}
