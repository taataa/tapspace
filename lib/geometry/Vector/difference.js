const vec3 = require('affineplane').vec3

module.exports = function (vec) {
  // tapspace.geometry.Vector:difference(vec)
  // tapspace.geometry.Vector:subtract
  //
  // Vector subtraction, this minus the given vector.
  //
  // Parameters:
  //   vec
  //     a Vector, or {x,y,z} on the same basis.
  //
  // Return
  //   a Vector
  //

  // Normalise vec to the same coordinate system.
  if (vec.changeBasis) {
    vec = vec.changeBasis(this.basis).vec
  }

  const delta = vec3.diff(this.vec, vec)

  const Vector = this.constructor
  return new Vector(this.basis, delta)
}
