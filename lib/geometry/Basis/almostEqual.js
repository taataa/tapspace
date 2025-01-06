const plane3 = require('affineplane').plane3
const almostEqual = plane3.almostEqual

module.exports = function (b, tolerance) {
  // @Basis:almostEqual(b[, tolerance])
  //
  // Test if this is equal to the given basis b within tolerance.
  // Almost equality requires identical basis' basis
  // and that coordinates are equal within tolerance.
  //
  // Parameters:
  //   b
  //     a Basis
  //   tolerance
  //     optional number. Maximum tolerated distance between coordinates.
  //
  // Return
  //   a boolean
  //
  if (!b || !b.basis) {
    return false
  }

  return this.basis === b.basis && almostEqual(this.tran, b.tran, tolerance)
}
