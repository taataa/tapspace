const scalar3 = require('affineplane').scalar3

module.exports = function (newBasis) {
  // @Volume:transitRaw(newBasis)
  //
  // Represent the volume in another basis.
  // Unlike changeBasis, returns a plain number without basis data.
  //
  // Parameters:
  //   newBasis
  //     a BasisComponent
  //
  // Return
  //   a scalar3, a number. The volume represented in the new basis.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return scalar3.transitFrom(this.volume, tran)
}
