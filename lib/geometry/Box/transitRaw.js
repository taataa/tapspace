const box3 = require('affineplane').box3

module.exports = function (newBasis) {
  // @Box:transitRaw(newBasis)
  //
  // Represent the box in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a BasisComponent
  //
  // Return
  //   a box3, an object.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return box3.transitFrom(this.box, tran)
}
