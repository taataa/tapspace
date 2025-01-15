const box3 = require('affineplane').box3
const almostEqual = box3.almostEqual

module.exports = function (b, tolerance) {
  // @Box:almostEqual(b[, tolerance])
  //
  // Test if this box is equal to the given box b within tolerance.
  // Almost equality requires identical basis
  // and that box size, position, and orientation are equal within tolerance.
  //
  // Parameters:
  //   b
  //     a Box
  //   tolerance
  //     optional number. Maximum tolerated distance between values.
  //
  // Return
  //   a boolean
  //
  if (!b || !b.basis) {
    return false
  }

  return this.basis === b.basis && almostEqual(this.box, b.box, tolerance)
}
