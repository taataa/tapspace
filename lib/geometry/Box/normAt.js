module.exports = function (x, y, z) {
  // @Box:normAt(x, y[, z])
  //
  // Get normalized coords of the point (x,y,z) with respect to the box size.
  // For example, norm coords of the point (2, 1) in a box of size (4, 4)
  // are (0.5, 0.25).
  //
  // Parameters:
  //   x
  //     a number. Relative to box origin.
  //   y
  //     a number. Relative to box origin.
  //   z
  //     optional number. Default is z=0. Relative to box origin.
  //
  // Alternative parameters:
  //   point
  //     a Point
  //
  // Return
  //   a { rx, ry, rz }. If the box has zero size,
  //   .. will return { rx: 0, ry: 0, rz: 0 }
  //

  // TODO alt params Point

  // Default z
  z = z || 0

  const w = this.box.w
  const h = this.box.h
  const d = this.box.d

  return {
    rx: w === 0 ? 0 : x / w,
    ry: h === 0 ? 0 : y / h,
    rz: d === 0 ? 0 : z / d
  }
}
