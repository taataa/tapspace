const helm3 = require('affineplane').helm3

module.exports = function () {
  // tapspace.geometry.Transform:inverse()
  //
  // Invert the transform.
  //
  // Return
  //   a Transform
  //
  const Transform = this.constructor
  return new Transform(this.basis, helm3.inverse(this.helm))
}
