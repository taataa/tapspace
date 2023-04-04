const plane3 = require('affineplane').plane3

module.exports = function (newBasis) {
  // @Basis:changeBasis(newBasis)
  //
  // Transit the virtual basis to another basis element.
  // In other words, represent the same basis
  // in the coordinate system of the given basis element.
  //
  // Parameters:
  //   newBasis
  //     a BasisElement
  //
  // Return
  //   a Basis
  //
  const pr = this.basis.getTransitionTo(newBasis)
  const pb = plane3.transitFrom(this.tran, pr)
  const Basis = this.constructor
  return new Basis(newBasis, pb)
}
