const sphere3 = require('affineplane').sphere3

module.exports = function (newBasis) {
  // @Sphere:transitRaw(newBasis)
  //
  // Represent the sphere in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a BasisElement
  //
  // Return
  //   a sphere3, an object.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return sphere3.transitFrom(this.sphere, tran)
}
