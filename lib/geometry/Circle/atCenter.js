const Point = require('../Point')

module.exports = function () {
  // @Circle:atCenter()
  // @Circle:atMid()
  //
  // Get the center point of the circle.
  //
  // Return
  //   a Point
  //

  return new Point(this.basis, {
    x: this.circle.x,
    y: this.circle.y,
    z: this.circle.z
  })
}
