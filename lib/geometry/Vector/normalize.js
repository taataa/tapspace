const vec3 = require('affineplane').vec3

module.exports = function (magnitude) {
  // @Vector:normalize([magnitude])
  // @Vector:scaleTo
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

  // Normalize to number
  const type = typeof magnitude
  if (type === 'undefined') {
    magnitude = 1
  } else if (type === 'object' && magnitude.transitRaw) {
    // Assume is Distance. Normalize.
    magnitude = magnitude.transitRaw(this.basis)
  } else if (type !== 'number') {
    throw new Error('Invalid magnitude')
  }

  const v = vec3.scaleTo(this.vec, magnitude)

  const Vector = this.constructor
  return new Vector(this.basis, v)
}
