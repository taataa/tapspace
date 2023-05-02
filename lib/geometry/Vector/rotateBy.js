const vec3 = require('affineplane').vec3

module.exports = function (roll, pitch) {
  // @Vector:rotateBy(roll[, pitch])
  //
  // Rotate the vector. The vector magnitude stays the same.
  //
  // Parameters:
  //   roll
  //     a number, roll angle in radians.
  //     .. Right-hand rotation around z-axis.
  //   pitch
  //     optional number, pitch angle in radians. Default 0.
  //     .. Right-hand rotation around x-axis.
  //
  //
  // Return
  //   a Vector
  //
  const v = vec3.rotateBy(this.vec, roll, pitch)

  const Vector = this.constructor
  return new Vector(this.basis, v)
}
