const proj2 = require('affineplane').proj2

module.exports = function (newBasis) {
  // Project the transform to another plane.
  const pr = this.basis.getProjectionTo(newBasis)
  const vec = proj2.vec2(pr, this)
  const Vector = this.constructor
  return new Vector(newBasis, vec.x, vec.y)
}
