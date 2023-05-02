const vec3 = require('affineplane').vec3

module.exports = function () {
  // @Vector:copy()
  //
  // Clone the vector.
  //
  // Return
  //   a Vector, the clone.
  //
  const v = vec3.copy(this.vec)

  const Vector = this.constructor
  return new Vector(this.basis, v)
}
