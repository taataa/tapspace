const Point = require('../Point')

module.exports = function (rx, ry) {
  // @Size:atNorm(rx, ry)
  //
  // Get point at (rx, ry) where rx is relative to the width and
  // the ry is relative to the height.
  //
  // Parameters:
  //   rx
  //     a number. Value of 1 will return a point with x = width.
  //   ry
  //     a number. Value of 1 will return a point with y = height.
  //
  // Return
  //   a Point
  //
  return new Point(this.basis, {
    x: rx * this.size.w,
    y: ry * this.size.h,
    z: 0
  })
}
