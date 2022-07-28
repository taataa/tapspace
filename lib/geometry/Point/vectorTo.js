const Vector = require('../Vector')

module.exports = function (p) {
  // tapspace.geometry.Point:vectorTo(p)
  //
  // Get a vector from this to the point p.
  //
  // Parameters:
  //   p
  //     a Point
  //
  // Return:
  //   a Vector on this basis.
  //
  if (p.basis) {
    p = p.projectTo(this.basis)
  }

  const dx = p.x - this.x
  const dy = p.y - this.y
  const dz = p.z - this.z

  return new Vector(this.basis, dx, dy, dz)
}
