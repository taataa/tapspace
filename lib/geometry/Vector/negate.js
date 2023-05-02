const vec3 = require('affineplane').vec3

module.exports = function () {
  // @Vector:negate()
  //
  // Get same vector but in opposite direction.
  //
  // Return
  //   a Vector
  //

  const iv = vec3.negate(this.vec)

  const Vector = this.constructor
  return new Vector(this.basis, iv)
}
