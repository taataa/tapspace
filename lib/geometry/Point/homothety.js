const point3 = require('affineplane').point3

module.exports = function (factor, origin) {
  // @Point:homothety(factor, origin)
  //
  // Get a point when the current point distance from the origin is multiplied
  // by the given factor.
  //
  // Parameters:
  //   factor
  //     a number, multiplier
  //   origin
  //     a Point.
  //
  // Return
  //   a Point
  //

  // Defaults
  if (typeof factor !== 'number') {
    throw new Error('Invalid factor parameter')
  }

  if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  const ph = point3.homothety(this.point, origin, factor)

  const Point = this.constructor
  return new Point(this.basis, ph)
}
