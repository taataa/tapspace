module.exports = function (x, y) {
  // @Frame:normAt(x, y)
  //
  // Get normalized coordinates from a point.
  // Practically this is the inverse of Frame:atNorm.
  // For example, let a frame have size (4, 4). Then the normalized coords
  // for the point (2, 1) are (0.5, 0.25).
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
      x = x.transitRaw(this.basis)
    }
    y = x.y
    x = x.x
  }

  const size = this.size

  return {
    rx: size.w === 0 ? 0 : x / size.w,
    ry: size.h === 0 ? 0 : y / size.h
  }
}
