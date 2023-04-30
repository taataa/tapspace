const fine = require('affineplane')
const point3 = fine.point3
const Distance = require('../Distance')

module.exports = function (point) {
  // @Ray:getDistanceToPoint(point)
  //
  // Compute shortest distance between the ray and the given point.
  //
  // Parameters:
  //   point
  //     a Point
  //
  // Return:
  //   a Point
  //

  if (point.transitRaw) {
    point = point.transitRaw(this.basis)
  }

  const dist = point3.distanceToRay(point, this.ray)
  return new Distance(this.basis, dist)
}
