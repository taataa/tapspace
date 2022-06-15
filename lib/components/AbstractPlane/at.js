const Point = require('../../geometry/Point')
const geom = require('affineplane')

module.exports = function (x, y) {
  // Get a point on the plane by using local plane coordinates.
  //
  // Parameters
  //   x
  //     a number, the x coordinate on the plane.
  //     a point2, the {x,y} on the plane.
  //     a Point, the point in space. Will be projected onto this plane.
  //   y
  //     a number, the y coordinate on the plane. Optional if x is a point.
  //
  // Return
  //   a Point on the plane
  //

  if (typeof x === 'object') {
    if (x.basis) {
      // Project to the plane
      const pr = x.basis.getProjectionTo(this)
      x = geom.proj2.point2(pr, x)
    }
    // Assume on the plane
    y = x.y
    x = x.x
  }

  return new Point(this, x, y)
}
