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
  //     optional number of pixels to move deeper. Default 0.
  //
  // Return
  //   a Point
  //

  // Defaults
  if (typeof dx !== 'number' || typeof dy !== 'number') {
    throw new Error('Invalid offset parameters')
  }
  if (typeof dz !== 'number') {
    dz = 0
  }

  const po = point3.offset(this.point, dx, dy, dz)

  const Point = this.constructor
  return new Point(this.basis, po)
}
