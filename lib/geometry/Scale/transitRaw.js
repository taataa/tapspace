const dist3 = require('affineplane').dist3

module.exports = function (newBasis) {
  // @Scale:transitRaw(newBasis)
  //
  // Represent the scale in another basis.
  // Unlike changeBasis, returns a plain number without basis data.
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a dist3, a number.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return dist3.transitFrom(this.m, tran)
}
