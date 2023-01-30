const fine = require('affineplane')
const box3 = fine.box3
const Point = require('../Point')

module.exports = function (x, y, z) {
  // @Box:at(x, y, z)
  //
  // Get a point using the internal coordinates of the box.
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

  const p = box3.at(this.box, x, y, z)
  return new Point(this.basis, p)
}
