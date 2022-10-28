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

  // Normalise to vec3.
  if (vec.changeBasis) {
    vec = vec.changeBasis(this.basis).vec
  }

  const cv = vec3.dot(this.vec, vec)

  const Vector = this.constructor
  return new Vector(this.basis, cv)
}