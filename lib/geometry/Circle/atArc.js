const Point = require('../Point')
const fine = require('affineplane')
const point2 = fine.point2
const dir2 = fine.dir2

module.exports = function (dir) {
  // @Circle:atArc(dir)
  //
  // Get a point at the circle perimeter at the given direction.
  //
  // Parameters:
  //   dir
  //     a Direction or number in radians.
  //
  // Return
  //   a Point
  //

  // Normalize
  if (dir.transitRaw) {
    // To dir3 vector
    dir = dir.transitRaw(this.basis)
    // To dir2 angle
    dir = dir2.toPolar(dir)
  }

  // At perimeter
  const p = point2.polarOffset(this.circle, this.circle.r, dir)

  // Preserve depth
  p.z = this.circle.z

  return new Point(this.basis, p)
}
