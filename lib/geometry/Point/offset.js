module.exports = function (dx, dy, dz) {
  // tapspace.geometry.Point:offset(dx, dy, dz)
  //
  // Get a point when the current point is offset by dx, dy, and dz.
  //
  // Parameters:
  //   dx
  //     a number of pixels to move horizontally.
  //   dy
  //     a number of pixels to move vertically.
  //   dz
  //     a number of pixels to move deeper.
  //
  // Return
  //   a Point
  //
  const Point = this.constructor
  return new Point(this.basis, this.x + dx, this.y + dy, this.z + dz)
}
