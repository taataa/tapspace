const fine = require('affineplane')
const box3 = fine.box3
const Point = require('../Point')

module.exports = function () {
  // @Box:atCenter()
  // @Box:atMid()
  //
  // Get the center point of the box.
  //
  // Return
  //   a Point
  //

  const p = box3.atNorm(this.box, 0.5, 0.5, 0.5)
  return new Point(this.basis, p)
}
