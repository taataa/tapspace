const Vector = require('../../geometry/Vector')

module.exports = function (x, y, z) {
  // @Component:createVector(x, y[, z])
  //
  // Create a Vector on this basis.
  //
  // Parameters
  //   x
  //     a number
  //   y
  //     a number
  //   z
  //     optional number, default to zero.
  //
  // Return
  //   a Vector
  //

  // Default
  z = z || 0

  return new Vector(this, { x, y, z })
}
