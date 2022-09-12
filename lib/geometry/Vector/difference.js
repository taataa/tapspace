const vec3 = require('affineplane').vec3

module.exports = function (vec) {
  // tapspace.geometry.Vector:difference(vec)
  // tapspace.geometry.Vector:subtract
  //
  // Vector subtraction, this minus the given vector.
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
    vec = vec3.transitTo(vec, tran)
  }

  const av = vec3.difference(this, vec)
  const Vector = this.constructor
  return new Vector(this.basis, av)
}
