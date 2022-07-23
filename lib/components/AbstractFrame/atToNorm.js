module.exports = function (x, y) {
  // tapspace.components.AbstractFrame:atToNorm(x, y)
  //
  // Get relative coordinates for the given point.
  // For example, relative coords of point (2, 1) in size (4, 4) is (0.5, 0.25)
  //
  // Parameters:
  //   x
  //     a number or a Point
  //   y
  //     a number
  //
  // Return
  //   a { rx, ry }. If size is zero, will return { rx: 0, ry: 0 }
  //

  // Normalise Point to x, y
  if (typeof x === 'object') {
    if (x.basis && x.basis !== this.basis) {
      x = x.projectTo(this.basis)
    }
    y = x.y
    x = x.x
  }

  const size = this.getSize()

  return {
    rx: size.w === 0 ? 0 : x / size.w,
    ry: size.h === 0 ? 0 : y / size.h
  }
}
