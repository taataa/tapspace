const point2 = require('affineplane').point2

module.exports = function (distance, angle) {
  // Get the point at the given distance at the angle.
  //
  // Parameters:
  //   distance
  //     a number on the basis or a Distance.
  //   angle
  //     a number in radians on the basis or a Direction.
  //
  // Return
  //   a Point
  //

  if (distance.basis) {
    distance = distance.projectTo(this.basis).d
  }
  if (angle.basis) {
    angle = angle.projectTo(this.basis).r
  }

  const offset = point2.polarOffset(this, distance, angle)

  const Point = this.constructor
  return new Point(this.basis, offset.x, offset.y)
}
