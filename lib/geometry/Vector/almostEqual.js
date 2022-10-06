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
  //     optional number. Defaults to affineplane.epsilon
  //
  // Return
  //   a boolean
  //

  // Normalise to vec3.
  if (vec.changeBasis) {
    vec = vec.changeBasis(this.basis).vec
  }

  // TODO normalize Distance tolerance?

  return vec3.almostEqual(this.vec, vec, tolerance)
}
