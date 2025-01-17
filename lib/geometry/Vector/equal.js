const vec3 = require('affineplane').vec3

module.exports = function (v) {
  // @Vector:equal(v)
  //
  // Test if the vector is strictly equal to v.
  // Strict equality requires strictly equal basis and numerical components.
  //
  // Parameters:
  //   v
  //     a Vector
  //
  // Return
  //   a boolean
  //

  if (v && v.basis && this.basis === v.basis) {
    return vec3.equal(this.vec, v.vec)
  }

  return false
}
