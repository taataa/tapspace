const scalar2 = require('affineplane').scalar2

module.exports = function (newBasis) {
  // @Area:transitRaw(newBasis)
  //
  // Represent the area in another basis.
  // Unlike changeBasis, returns a plain number without basis data.
  //
  // Parameters:
  //   newBasis
  //     a BasisElement
  //
  // Return
  //   a scalar2, a number. The area in the new basis.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return scalar2.transitFrom(this.area, tran)
}
