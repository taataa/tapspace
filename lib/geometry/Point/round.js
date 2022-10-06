const round = Math.round

module.exports = function () {
  // tapspace.geometry.Point:round()
  //
  // Round the point to nearest integers.
  //
  // Return
  //   a Point
  //

  // TODO use affineplane.point3.round when implemented
  const p = this.point
  const rounded = {
    x: round(p.x),
    y: round(p.y),
    z: round(p.z)
  }

  const Point = this.constructor
  return new Point(this.basis, rounded)
}
