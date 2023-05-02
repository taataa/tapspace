const plane3 = require('affineplane').plane3

module.exports = function (newBasis) {
  // @Basis:transitRaw(newBasis)
  //
  // Represent the virtual basis on another element basis.
  // Unlike changeBasis, returns a plain object without element basis.
  //
  // Parameters:
  //   newBasis
  //     a BasisComponent
  //
  // Return
  //   a plane3, an object.
  //
  const tr = this.basis.getTransitionTo(newBasis)
  return plane3.transitFrom(this.tran, tr)
}
