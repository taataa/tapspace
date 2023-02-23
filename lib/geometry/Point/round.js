const point3 = require('affineplane').point3

module.exports = function () {
  // @Point:round()
  //
  // Round the point to nearest integers.
  //
  // Return
  //   a Point
  //

  const rounded = point3.round(this.point)

  const Point = this.constructor
  return new Point(this.basis, rounded)
}
