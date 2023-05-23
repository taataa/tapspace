const plane3 = require('affineplane').plane3

module.exports = function (basis) {
  // @Basis:transitRawOuter(basis)
  //
  // Represent the virtual basis on the parent of the element basis.
  // Unlike changeBasis, returns a plain object without the element basis.
  // This corresponds to `Basis:changeBasis(basis.getParent()).getRaw()`
  // but is more efficient and does not require the parent to exist.
  //
  // Parameters:
  //   basis
  //     a Component
  //
  // Return
  //   a plane3, an object.
  //
  const tr = this.basis.getTransitionToParentOf(basis)
  return plane3.transitFrom(this.tran, tr)
}
