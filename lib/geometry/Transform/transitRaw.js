const helm3 = require('affineplane').helm3

module.exports = function (newBasis) {
  // @Transform:transitRaw(newBasis)
  //
  // Represent the transform in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a helm3, an object.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return helm3.transitFrom(this.helm, tran)
}
