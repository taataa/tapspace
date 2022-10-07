const Point = require('../../geometry/Point')
const aff = require('affineplane')

module.exports = function (x, y, z) {
  // tapspace.components.AbstractPlane:at(x, y, z)
  //
  // Get a point on the plane by using local plane coordinates.
  //
  // Parameters
  //   x
  //     Any of the following:
  //       a number, the x coordinate on the plane.
  //       a point2, {x,y} relative to the plane.
  //       a point3, {x,y,z} relative to the plane.
  //       a Point, relative to its basis.
  //   y
  //     a number, the y coordinate on the plane. Required if x is a number.
  //   z
  //     optional number, the z coordinate relative to the plane.
  //
  // Return
  //   a Point, relative to the plane
  //
  let p

  if (typeof x === 'object') {
    // Normalize to point3
    if (x.changeBasis) {
      p = x.changeBasis(this).point
    } else {
      // Normalise point2. Do not alter input.
      p = {
        x: x.x,
        y: x.y,
        z: (typeof x.z === 'number' ? x.z : 0)
      }
    }
  } else if (typeof x === 'number') {
    // From numbers
    p = {
      x: x,
      y: y,
      z: (typeof z === 'number' ? z : 0)
    }
  } else {
    // No valid input.
    // TODO Alternatively, at anchor if no params?
    throw new Error('Invalid coordinates')
  }

  return new Point(this, p)
}
