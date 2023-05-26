const size3 = require('affineplane').size3

module.exports = function (newBasis) {
  // @Size:transitRaw(newBasis)
  //
  // Represent the size in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a Component
  //
  // Return
  //   a size3, an object.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return size3.transitFrom(this.size, tran)
}
