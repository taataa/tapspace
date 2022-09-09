const vec3 = require('affineplane').vec3

module.exports = function (magnitude) {
  // tapspace.geometry.Vector:normalize([magnitude])
  // tapspace.geometry.Vector:scaleTo
  //
  // Scale the vector uniformly so that its length
  // becomes the given optional magnitude, 1 by default.
  //
  // Parameters:
  //   magnitude
  //     optional number, default 1.
  //
  // Return
  //   a Vector
  //

  if (typeof magnitude === 'undefined') {
    magnitude = 1
  }

  const v = vec3.scaleTo(this, magnitude)
  const Vector = this.constructor
  return new Vector(this.basis, v)
}
