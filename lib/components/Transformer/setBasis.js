module.exports = function (basis) {
  // @Transformer:setBasis(basis)
  // @Transformer:transformTo
  //
  // Transform this element so that its position, scale, and orientation match
  // the given basis.
  //
  // Parameters:
  //   basis
  //     a Basis or a BasisComponent.
  //
  // Return
  //   this, for chaining
  //

  // Normalize
  if (basis.getBasis) {
    basis = basis.getBasis()
  }
  if (basis.transitRawOuter) {
    basis = basis.transitRawOuter(this)
  }
  // assert: basis is a plane3

  this.tran = basis
  this.renderTransform()

  return this
}
