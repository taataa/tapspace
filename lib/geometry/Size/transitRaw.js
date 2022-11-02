const size2 = require('affineplane').size2

module.exports = function (newBasis) {
  // tapspace.geometry.Size:transitRaw(newBasis)
  //
  // Represent the size in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a component
  //
  // Return
  //   a size2, an object.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return size2.transitFrom(this.size, tran)
}
