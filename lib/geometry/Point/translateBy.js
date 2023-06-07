const point3 = require('affineplane').point3

module.exports = function (vec) {
  // @Point:translateBy(vec)
  //
  // Get a point that has been translated i.e. offset by the given vector.
  //
  // Parameters:
  //   vec
  //     a Vector or vec3, the translation.
  //
  // Return
  //   a Point
  //

  if (vec.transitRaw) {
    vec = vec.transitRaw(this.basis)
  }

  const p = point3.translate(this.point, vec)

  const Point = this.constructor
  return new Point(this.basis, p)
}
