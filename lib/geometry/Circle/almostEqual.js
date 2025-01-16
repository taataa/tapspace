const circle3 = require('affineplane').circle3
const almostEqual = circle3.almostEqual

module.exports = function (c, tolerance) {
  // @Circle:almostEqual(c[, tolerance])
  //
  // Test if this circle is equal to the given circle c within tolerance.
  // Almost equality requires identical basis
  // and that circle radius and position are equal within tolerance.
  //
  // Parameters:
  //   c
  //     a Circle
  //   tolerance
  //     optional number. Maximum tolerated distance between values.
  //
  // Return
  //   a boolean
  //
  if (!c || !c.basis) {
    return false
  }

  return this.basis === c.basis && almostEqual(this.circle, c.circle, tolerance)
}
