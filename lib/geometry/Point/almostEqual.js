const point3 = require('affineplane').point3

module.exports = function (p, tolerance) {
  // @Point:almostEqual(p[, tolerance])
  //
  // Test if the point is almost equal to p.
  // Almost equal requires strictly equal basis and
  // that coordinates are equal within tolerance.
  //
  // Parameters:
  //   p
  //     a Point
  //   tolerance
  //     optional number. Maximum Manhattan distance between this and p.
  //     Default is affineplane.epsilon
  //
  // Return
  //   a boolean
  //

  if (!p.basis) return false
  if (this.basis !== p.basis) return false

  return point3.almostEqual(this.point, p.point, tolerance)
}
