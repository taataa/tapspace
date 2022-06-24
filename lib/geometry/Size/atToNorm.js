module.exports = function (x, y) {
  // Get point at (x,y) and return its relative coordinates.
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

  return {
    rx: this.w === 0 ? 0 : x / this.w,
    ry: this.h === 0 ? 0 : y / this.h
  }
}
