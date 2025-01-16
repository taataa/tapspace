const sphere3 = require('affineplane').sphere3
const almostEqual = sphere3.almostEqual

module.exports = function (s, tolerance) {
  // @Sphere:almostEqual(s[, tolerance])
  //
  // Test if this sphere is equal to the given sphere s within tolerance.
  // Almost equality requires identical basis
  // and that radius and position of the spheres are equal within tolerance.
  //
  // Parameters:
  //   s
  //     a Sphere
  //   tolerance
  //     optional number. Maximum tolerated distance between values.
  //
  // Return
  //   a boolean
  //
  if (!s || !s.basis) {
    return false
  }

  return this.basis === s.basis && almostEqual(this.sphere, s.sphere, tolerance)
}
