module.exports = function (basis, pivot) {
  // @Transformer:setBasis(basis[, pivot])
  // @Transformer:transformTo
  //
  // Transform this basis so that its position, scale, and orientation match
  // the given basis.
  // The transform is performed about the given pivot point.
  //
  // Parameters:
  //   basis
  //     a Basis or a component.
  //   pivot
  //     optional Point, the transform origin.
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
