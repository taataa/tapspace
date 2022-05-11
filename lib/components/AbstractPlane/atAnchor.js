const Point = require('../../geometry/Point')

module.exports = function () {
  // Get the anchor point of the plane.
  //
  // Return
  //   a Point
  //
  return new Point(this, this.anchor.x, this.anchor.y)
}
