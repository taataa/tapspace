const plane3 = require('affineplane').plane3

module.exports = function (basis) {
  // @Basis:transitRawOuter(basis)
  //
  // Represent the virtual basis on the parent of the basis element.
  // Unlike changeBasis, returns a plain object without basis element data.
  // This corresponds to `Basis:changeBasis(basis.getParent()).getRaw()`
  // but is more efficient and does not require the parent to exist.
  //
  // Parameters:
  //   basis
  //     a BasisElement
  //
  // Return
  //   a plane3, an object.
  //
  const tr = this.basis.getTransitionToParentOf(basis)
  return plane3.transitFrom(this.tran, tr)
}
