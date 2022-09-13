const vec3 = require('affineplane').vec3

module.exports = function (vec, tolerance) {
  // tapspace.geometry.Vector:almostEqual(vec[, tolerance])
  //
  // Test if vectors are almost equal.
  //
  // Parameters:
  //   vec
  //     a Vector, or {x,y,z} in the same space.
  //   tolerance
  //     optional number. Default to affineplane.epsilon
  //
  // Return
  //   a boolean
  //

  // Normalise vec to the same coordinate system.
  if (vec.basis) {
    const tran = vec.basis.getTransitionTo(this.basis)
    vec = vec3.transitTo(vec, tran)
  }

  return vec3.almostEqual(this, vec, tolerance)
}
