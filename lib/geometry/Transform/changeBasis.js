const geom = require('affineplane')

module.exports = function (newBasis) {
  // tapspace.geometry.Transform:projectTo(newBasis)
  //
  // Project the transform to another plane.
  //
  // Return
  //   a Transform
  //
  const tran = this.basis.getTransitionTo(newBasis)
  const tr = geom.helm3(this, tran)
  const Transform = this.constructor
  return new Transform(newBasis, tr.a, tr.b, tr.x, tr.y, tr.z)
}
