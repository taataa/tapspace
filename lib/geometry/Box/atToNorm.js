const fine = require('affineplane')
const box3 = fine.box3
const plane3 = fine.plane3

module.exports = function (x, y, z) {
  // @Box:atToNorm(x, y[, z])
  //
  // Get normalized coords of the point (x,y,z) with respect to the box size.
  // For example, relative coords of the point (2, 1) in a box of size (4, 4)
  // are (0.5, 0.25).
  //
  // Parameters:
  //   x
  //     a number
  //   y
  //     a number
  //   z
  //     optional number. Default is z=0
  //
  // Return
  //   a { rx, ry, rz }. If the box has zero size,
  //   .. will return { rx: 0, ry: 0, rz: 0 }
  //

  // Default z
  z = z ? z : 0

  const w = this.box.w
  const h = this.box.h
  const d = this.box.d

  return {
    rx: w === 0 ? 0 : x / w,
    ry: h === 0 ? 0 : y / h,
    rz: d === 0 ? 0 : z / d,
  }
}
