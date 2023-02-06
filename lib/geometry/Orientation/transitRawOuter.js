const orient2 = require('affineplane').orient2

module.exports = function (basis) {
  // @Orientation:transitRawOuter(basis)
  //
  // Represent the orientation in the outer basis of the given component.
  // Unlike changeBasis, returns a plain object without basis data.
  // See Point:transitRawOuter for details.
  //
  // Parameters:
  //   basis
  //     a Basis
  //
  // Return
  //   a orient2, complex number
  //
  const tran = this.basis.getTransitionToParentOf(basis)
  return orient2.transitFrom(this.orient, tran)
}
