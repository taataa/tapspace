const geom = require('affineplane')

module.exports = function (distance, angle) {
  // tapspace.geometry.Point:polarOffset(distance, angle)
  //
  // Get the point at the given distance at the angle on the same plane.
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

  if (distance.changeBasis) {
    distance = distance.changeBasis(this.basis).d
  }
  if (angle.changeBasis) {
    angle = angle.changeBasis(this.basis).r
  }

  const offset = geom.point2.polarOffset(this, distance, angle)

  const Point = this.constructor
  return new Point(this.basis, offset.x, offset.y, this.z)
}
