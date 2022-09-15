module.exports = function () {
  // tapspace.geometry.Vector:copy()
  //
  // Clone the vector.
  //
  // Return
  //   a Vector, the clone.
  //
  const Vector = this.constructor
  return new Vector(this.basis, this.x, this.y, this.z)
}
