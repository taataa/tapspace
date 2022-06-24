const Vector = require('../Vector')

module.exports = function (p) {
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

  return new Vector(this.basis, dx, dy)
}