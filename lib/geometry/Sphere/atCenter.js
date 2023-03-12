const Point = require('../Point')

module.exports = function () {
  // @Sphere:atCenter()
  // @Sphere:atMid()
  //
  // Get the center point of the sphere.
  //
  // Return
  //   a Point
  //

  return new Point(this.basis, {
    x: this.sphere.x,
    y: this.sphere.y,
    z: this.sphere.z
  })
}
