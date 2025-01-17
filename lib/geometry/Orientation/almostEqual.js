const orient2 = require('affineplane').orient2

module.exports = function (orient, tolerance) {
  // @Orientation:almostEqual(orient[, tolerance])
  //
  // Test if this orientation is equal to a given orientation within tolerance.
  // Equality requires strictly equal basis and that the difference in orientation
  // is within the tolerance.
  //
  // Parameters:
  //   orient
  //     an Orientation
  //   tolerance
  //     optional number
  //
  // Return
  //   a boolean
  //

  if (orient && orient.basis && this.basis === orient.basis) {
    return orient2.almostEqual(this.orient, orient.orient, tolerance)
  }

  return false
}
