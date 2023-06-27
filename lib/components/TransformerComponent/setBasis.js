module.exports = function (basis) {
  // @TransformerComponent:setBasis(basis)
  // @TransformerComponent:transformTo
  //
  // Transform this element so that its position, scale, and orientation match
  // the given basis.
  //
  // Parameters:
  //   basis
  //     a Basis or a Component.
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
  // DEBUG
  if (typeof basis.a !== 'number') {
    throw new Error('Invalid basis detected: ' + basis)
  }

  this.tran = basis
  this.renderTransform()

  return this
}
