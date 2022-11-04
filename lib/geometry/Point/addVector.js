const point3 = require('affineplane').point3

module.exports = function (vec) {
  // tapspace.geometry.Point:addVector(vec)
  //
  // Translate the point by a vector.
  //
  // Parameters:
  //   vec
  //     a Vector
  //
  // Return
  //   a Point
  //

  // Rebase
  if (vec.transitRaw) {
    vec = vec.transitRaw(this.basis)
  }

  const po = point3.translate(this.point, vec)

  const Point = this.constructor
  return new Point(this.basis, po)
}
