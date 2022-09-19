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
  //     optional number or a Distance. Default 1.
  //
  // Return
  //   a Vector
  //

  const type = typeof magnitude
  if (type === 'undefined') {
    magnitude = 1
  } else if (type === 'object' && magnitude.changeBasis) {
    // Assume is Distance. Normalize.
    magnitude = magnitude.changeBasis(this.basis).d
  } else if (type !== 'number') {
    throw new Error('Invalid magnitude')
  }

  const v = vec3.scaleTo(this, magnitude)
  const Vector = this.constructor
  return new Vector(this.basis, v)
}
