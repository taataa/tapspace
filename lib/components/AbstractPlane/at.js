const Point = require('../../geometry/Point')
const aff = require('affineplane')

module.exports = function (x, y, z) {
  // tapspace.components.AbstractPlane:at(x, y, z)
  //
  // Get a point on the plane by using local plane coordinates.
  //
  // Parameters
  //   x
  //     a number, the x coordinate on the plane.
  //     a point2, the {x,y} on the plane.
  //     a Point, the point in space. Will be projected onto this plane.
  //   y
  //     a number, the y coordinate on the plane. Optional if x is a point.
  //   z
  //     optional number, the z coordinate relative to the plane.
  //
  // Return
  //   a Point on the plane
  //

  if (typeof x === 'object') {
    if (x.basis) {
      // Transit on the plane
      const tran = this.getTransitionFrom(x.basis)
      x = aff.point3.transitFrom(x, tran)
    }
    // Assume basis is the plane already
    z = x.z
    y = x.y
    x = x.x
  }

  return new Point(this, x, y, z)
}
