module.exports = function (x, y, z) {
  // @Size:normAt(x, y[, z])
  //
  // Get normalized coords of the point (x,y,z) with respect to the size.
  // For example, norm coords of the point (2, 1) in a size (4, 4)
  // are (0.5, 0.25).
  //
  // Parameters:
  //   x
  //     a number.
  //   y
  //     a number.
  //   z
  //     optional number. Default is z=0.
  //
  // Return
  //   a { rx, ry, rz }. If the size is zero,
  //   .. will return { rx: 0, ry: 0, rz: 0 }
  //

  // Default z
  z = z || 0

  const w = this.size.w
  const h = this.size.h
  const d = this.size.d

  return {
    rx: w === 0 ? 0 : x / w,
    ry: h === 0 ? 0 : y / h,
    rz: d === 0 ? 0 : z / d
  }
}
