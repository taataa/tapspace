const Point = require('../Point')

module.exports = function (x, y) {
  // Get point at (x,y).
  //
  // Parameters:
  //   x
  //     a number
  //   y
  //     a number
  //
  // Return
  //   a Point
  //
  return new Point(this.basis, x, y)
}
