const dist3 = require('affineplane').dist3

module.exports = function (newBasis) {
  // tapspace.geometry.Distance:transitRaw(newBasis)
  //
  // Represent the distance in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a component
  //
  // Return
  //   a dist3 number
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return dist3.transitFrom(this.dist, tran)
}
