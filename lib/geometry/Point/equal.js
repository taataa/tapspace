const point3 = require('affineplane').point3

module.exports = function (p) {
  // @Point:equal(p)
  //
  // Test if the point is strictly equal to p.
  // Strict equality requires strictly equal basis and coordinates.
  //
  // Parameters:
  //   p
  //     a Point
  //
  // Return
  //   a boolean
  //

  if (p && p.basis && this.basis === p.basis) {
    return point3.equal(this.point, p.point)
  }

  return false
}
