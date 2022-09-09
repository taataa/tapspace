const geom = require('affineplane')

module.exports = function () {
  // tapspace.geometry.Transform:inverse()
  //
  // Invert the transform.
  //
  // Return
  //   a Transform
  //
  const Transform = this.constructor
  return new Transform(this.basis, geom.helm3.inverse(this))
}
