module.exports = function (x, y) {
  // tapspace.components.AbstractFrame:atToNorm(x, y)
  //
  // Get relative coordinates from absolute coordinates.
  // Practically this is the inverse of AbstractFrame:atNorm.
  // For example, let frame have size (4, 4). Then the relative coords
  // for the point (2, 1) are (0.5, 0.25).
  //
  // Parameters:
  //   x
  //     a number or a Point
  //   y
  //     a number
  //
  // Return
  //   a { rx, ry }. If size is zero, will return { rx: 0, ry: 0 }.
  //

  // Normalise Point to x, y
  if (typeof x === 'object') {
    if (x.changeBasis) {
      x = x.changeBasis(this.basis)
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
