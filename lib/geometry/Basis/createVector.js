const fine = require('affineplane')
const vec3 = fine.vec3
const Vector = require('../../geometry/Vector')

module.exports = function (x, y, z) {
  // @Basis:createVector(x, y[, z])
  //
  // Create a vector using coordinate system of this basis.
  //
  // Parameters:
  //   x
  //     a number
  //   y
  //     a number
  //   z
  //     optional number, default is 0.
  //
  // Return
  //   a Vector
  //

  // Build raw
  const v = { x, y, z: z || 0 }
  // We need to represent the vector on the element basis.
  const vb = vec3.transitFrom(v, this.tran)
  // Build tensor
  return new Vector(this.basis, vb)
}
