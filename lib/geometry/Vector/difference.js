const vec3 = require('affineplane').vec3

module.exports = function (vec) {
  // @Vector:difference(vec)
  // @Vector:subtract
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
  if (vec.transitRaw) {
    vec = vec.transitRaw(this.basis)
  }

  const delta = vec3.diff(this.vec, vec)

  const Vector = this.constructor
  return new Vector(this.basis, delta)
}
