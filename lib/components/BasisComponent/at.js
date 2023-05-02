const Point = require('../../geometry/Point')

module.exports = function (x, y, z) {
  // @BasisComponent:at(x, y, z)
  // @BasisComponent:getPoint
  //
  // Get a Point on the basis from local coordinates.
  //
  // Parameters
  //   x
  //     Any of the following:
  //       a number, the x coordinate on the plane.
  //       a point2, {x,y} relative to the plane.
  //       a point3, {x,y,z} relative to the plane.
  //       a Point
  //   y
  //     a number, the y coordinate on the plane. Required if x is a number.
  //   z
  //     optional number, the z coordinate relative to the plane.
  //
  // Return
  //   a Point, relative to the basis
  //
  let p

  if (typeof x === 'object' && x) {
    // Normalize to point3
    if (x.transitRaw) {
      p = x.transitRaw(this)
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
    // No valid input. Give the programmer a way to know that a bug created
    // nullish coordinate. It would be tempting to return anchor here.
    throw new Error('Invalid coordinates')
  }

  return new Point(this, p)
}
