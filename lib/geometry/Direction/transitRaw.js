const dir3 = require('affineplane').dir3

module.exports = function (newBasis) {
  // @Direction:transitRaw(newBasis)
  //
  // Represent the direction in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a BasisElement
  //
  // Return
  //   a dir3 unit vector
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return dir3.transitFrom(this.dir, tran)
}
