const fine = require('affineplane')
const ray3 = fine.ray3
const Point = require('../Point')

module.exports = function (t) {
  // @Ray:at(t)
  // @Ray:getPoint
  //
  // Get a point along the ray.
  // The ray spanning vector defines the unit length.
  // Negative values default to the ray origin point.
  //
  // Parameters:
  //   t
  //     a number, the coordinate along the ray.
  //
  // Return:
  //   a Point
  //

  const p = ray3.at(this.ray, t)
  return new Point(this.basis, p)
}
