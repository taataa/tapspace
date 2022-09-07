const vec3 = require('affineplane').vec3

module.exports = function (vec) {
  // tapspace.geometry.Vector:dot(vec)
  //
  // Get dot product with another vector.
  //
  // Parameters:
  //   vec
  //     a Vector, or {x,y,z} in the same space.
  //
  // Return
  //   a Vector
  //

  // Normalise vec to the same coordinate system.
  if (vec.basis) {
    const tran = vec.basis.getTransitionTo(this.basis)
    vec = geom.vec3.transitTo(vec, tran)
  }

  const cv = vec3.dot(this, vec)
  const Vector = this.constructor
  return new Vector(this.basis, cv)
}
