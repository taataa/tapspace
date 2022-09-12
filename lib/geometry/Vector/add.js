const vec3 = require('affineplane').vec3

module.exports = function (vec) {
  // tapspace.geometry.Vector:add(vec)
  //
  // Vector addition, this plus the given vector.
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

  const av = vec3.add(this, vec)
  const Vector = this.constructor
  return new Vector(this.basis, av)
}
