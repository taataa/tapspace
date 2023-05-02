const vec3 = require('affineplane').vec3

module.exports = function (tr) {
  // @Vector:transformBy(tr)
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

  // Normalise transform to helm3
  if (tr.transitRaw) {
    tr = tr.transitRaw(this.basis)
  }

  const v = vec3.transformBy(this.vec, tr)

  const Vector = this.constructor
  return new Vector(this.basis, v)
}
