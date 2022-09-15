const vec3 = require('affineplane').vec3

module.exports = function (tr) {
  // tapspace.geometry.Vector:transformBy(tr)
  //
  // Transform the displacement vector by affine transformation.
  // This can rotate and scale the vector but cannot translate it
  // because only position vectors can be translated.
  //
  // Parameters:
  //   tr
  //     a Transform
  //
  // Return
  //   a Vector
  //

  // Normalise transform to the same coordinate system.
  if (tr.changeBasis) {
    tr = tr.changeBasis(this.basis)
  }

  const v = vec3.transformBy(this, tr)
  const Vector = this.constructor
  return new Vector(this.basis, v)
}
