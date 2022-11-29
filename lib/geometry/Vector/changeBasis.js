const vec3 = require('affineplane').vec3

module.exports = function (newBasis) {
  // tapspace.geometry.Vector:changeBasis(newBasis)
  //
  // Represent the vector in another basis.
  // Note that vectors are only affected by
  // scale and angle differences between bases.
  //
  // Parameters:
  //   newBasis
  //     a Basis
  //
  // Return
  //   a Vector
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const vec = vec3.transitFrom(this.vec, tran)

  const Vector = this.constructor
  return new Vector(newBasis, vec)
}
