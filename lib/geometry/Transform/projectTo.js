const proj2 = require('affineplane').proj2

module.exports = function (newBasis) {
  // Project the transform to another plane.
  const pr = this.basis.getProjectionTo(newBasis)
  const tr = proj2.tran2(pr, this)
  const Transform = this.constructor
  return new Transform(newBasis, tr.a, tr.b, tr.x, tr.y)
}