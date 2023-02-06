const fine = require('affineplane')
const box3 = fine.box3
const Point = require('../Point')

module.exports = function (nx, ny, nz) {
  // @Box:atNorm(nx, ny[, nz])
  //
  // Get a point using the internal size-normalized coordinates of the box.
  // The normalized point (0,0,0) means the front top left corner,
  // and the normalized point (1,1,1) means the back bottom right corner.
  //
  // Parameters:
  //   nx
  //     a number, normalized over box width
  //   ny
  //     a number, normalized over box height
  //   nz
  //     optional number, zero by default, normalized over box depth
  //
  // Return:
  //   a Point
  //

  // Allow undefined z
  if (!nz) { nz = 0 }

  const p = box3.atNorm(this.box, nx, ny, nz)
  return new Point(this.basis, p)
}
