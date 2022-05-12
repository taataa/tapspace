const Point = require('../../geometry/Point')

module.exports = function (x, y) {
  // Get a point on the plane by using local plane coordinates.
  //
  // Parameters
  //   x
  //     a number
  //   y
  //     a number
  //
  // Return
  //   a Point on the plane
  //

  // TODO at(spacePoint) to represent spacePoint on el
  return new Point(this, x, y)
}
