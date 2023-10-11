module.exports = function (basis) {
  // @Transformer:getVectorTo(basis)
  //
  // Get vector from this anchor to the anchor of the given basis.
  // If basis does not have an anchor, we assume (0,0) for the anchor.
  //
  // Parameters
  //   basis
  //     a Basis or Component
  //
  // Return
  //   a Vector, represented on this plane.
  //
  if (basis.atAnchor) {
    return this.atAnchor().getVectorTo(basis.atAnchor())
  }
  return this.atAnchor().getVectorTo(basis.at(0, 0))
}
