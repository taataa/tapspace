module.exports = function () {
  // tapspace.geometry.Point:round()
  //
  // Round the point to nearest integers.
  //
  // Return
  //   a Point
  //
  const Point = this.constructor
  return new Point(
    this.basis,
    Math.round(this.x),
    Math.round(this.y),
    Math.round(this.z)
  )
}
