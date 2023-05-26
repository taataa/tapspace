const plane3 = require('affineplane').plane3

module.exports = function (newBasis) {
  // @Basis:changeBasis(newBasis)
  //
  // Transit the virtual basis to another element basis.
  // In other words, represent the same basis
  // in the coordinate system of the given element basis.
  //
  // Parameters:
  //   newBasis
  //     a Component
  //
  // Return
  //   a Basis
  //
  const pr = this.basis.getTransitionTo(newBasis)
  const pb = plane3.transitFrom(this.tran, pr)
  const Basis = this.constructor
  return new Basis(newBasis, pb)
}
