const path3 = require('affineplane').path3

module.exports = function (newBasis) {
  // tapspace.geometry.Path:transitRaw(newBasis)
  //
  // Represent the path in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a path3, an array of point3
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return path3.transitFrom(this.path, tran)
}
