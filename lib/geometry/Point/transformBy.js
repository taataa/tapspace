const fine = require('affineplane')
const point3 = fine.point3
const plane3 = fine.plane3

module.exports = function (tr, origin) {
  // @Point:transformBy(tr, origin)
  //
  // Transform the point by helmert transformation.
  // This can rotate and scale the point about another origin point
  // and translate it.
  //
  // Parameters:
  //   tr
  //     a Transform
  //   origin
  //     a Point, the origin for the transformation.
  //     Rotation and dilation will be performed about this point.
  //
  // Return
  //   a Point
  //

  // Normalise transform to helm3
  if (tr.transitRaw) {
    tr = tr.transitRaw(this.basis)
  }
  // Normalise origin to point3
  if (origin.transitRaw) {
    origin = origin.transitRaw(this.basis)
  }

  const basis = plane3.fromHelmert(tr, origin)
  const p = point3.transitTo(this.point, basis)

  const Point = this.constructor
  return new Point(this.basis, p)
}
