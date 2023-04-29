module.exports = function (x, y) {
  // @Viewport:normAt(x, y)
  //
  // Get normalized coordinates from a point.
  // Practically this is the inverse of Viewport:atNorm.
  // For example, let a viewport have size (400, 400).
  // Then the normalized coords for the point (200, 100) are (0.5, 0.25).
  //
  // Parameters:
  //   x
  //     a number
  //   y
  //     a number
  //
  // Alternative parameters:
  //   point
  //     a Point
  //
  // Return
  //   a { rx, ry }. If size is zero, will return { rx: 0, ry: 0 }.
  //

  // Normalise Point to x, y
  if (typeof x === 'object') {
    if (x.transitRaw) {
      x = x.transitRaw(this)
    }
    y = x.y
    x = x.x
  }

  const size = this.getSize().getRaw()

  return {
    rx: size.w === 0 ? 0 : x / size.w,
    ry: size.h === 0 ? 0 : y / size.h
  }
}
