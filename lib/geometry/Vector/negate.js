const vec3 = require('affineplane').vec3

module.exports = function () {
  // tapspace.geometry.Vector:negate()
  //
  // Get same vector but in opposite direction.
  // This is equivalent to rotating the vector by 180 deg.
  //
  // Return
  //   a Vector
  //

  const v = vec3.negate(this)
  const Vector = this.constructor
  return new Vector(this.basis, v)
}
