const vec3 = require('affineplane').vec3

module.exports = function () {
  // tapspace.geometry.Vector:unit()
  //
  // Get parallel unit vector.
  //
  // Return
  //   a Vector
  //

  // TODO implement with vec3.unit of affineplane 2.4.0
  const Vector = this.constructor
  const magn = vec3.magnitude(this)
  let unit
  if (magn > 0) {
    unit = vec3.scaleBy(this, 1 / magn)
  } else {
    unit = { x: 1, y: 0, z: 0 }
  }
  return new Vector(this.basis, unit)
}
