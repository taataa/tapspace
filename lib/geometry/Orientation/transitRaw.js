const orient2 = require('affineplane').orient2

module.exports = function (newBasis) {
  // @Orientation:transitRaw(newBasis)
  //
  // Represent the orientation in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a orient2, complex number
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return orient2.transitFrom(this.orient, tran)
}
