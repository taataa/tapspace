const vec3 = require('affineplane').vec3

module.exports = function (newBasis) {
  // @Vector:transitRaw(newBasis)
  //
  // Represent the vector in another basis.
  // Unlike changeBasis, returns a plain object without basis data.
  //
  // Parameters:
  //   newBasis
  //     a Component
  //
  // Return
  //   a vec3, an object.
  //
  const tran = this.basis.getTransitionTo(newBasis)
  return vec3.transitFrom(this.vec, tran)
}
