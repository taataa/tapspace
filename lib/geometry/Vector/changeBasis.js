const geom = require('affineplane')

module.exports = function (newBasis) {
  // tapspace.geometry.Vector:changeBasis(newBasis)
  //
  // Represent the vector on another plane.
  //
  // Parameters:
  //   newBasis
  //     an AbstractPlane
  //
  // Return
  //   a Vector
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const vec = geom.vec3.transitFrom(this, tran)
  const Vector = this.constructor
  return new Vector(newBasis, vec.x, vec.y, vec.z)
}
