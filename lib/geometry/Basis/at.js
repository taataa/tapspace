const fine = require('affineplane')
const plane3 = fine.plane3
const Point = require('../Point')

module.exports = function (x, y, z) {
  // @Basis:at(x, y, z)
  // @Basis:getPoint
  //
  // Get a point using the internal coordinates of the basis.
  //
  // Parameters:
  //   x
  //     a number
  //   y
  //     a number
  //   z
  //     optional number, zero by default.
  //
  // Return:
  //   a Point
  //

  // Allow undefined z
  if (!z) { z = 0 }

  const p = plane3.at(this.tran, x, y, z)
  return new Point(this.basis, p)
}
