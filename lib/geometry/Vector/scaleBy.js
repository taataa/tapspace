const vec3 = require('affineplane').vec3

module.exports = function (multiplier) {
  // @Vector:scaleBy(multiplier)
  //
  // Scale the vector uniformly with multiplier.
  //
  // Parameters:
  //   multiplier
  //     a number
  //
  // Return
  //   a Vector
  //

  const v = vec3.scaleBy(this.vec, multiplier)

  const Vector = this.constructor
  return new Vector(this.basis, v)
}
