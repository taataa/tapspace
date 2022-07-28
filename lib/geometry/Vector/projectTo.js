const proj3 = require('affineplane').proj3

module.exports = function (newBasis) {
  // tapspace.geometry.Vector:projectTo(newBasis)
  //
  // Project the vector onto another plane.
  //
  // Parameters:
  //   newBasis
  //     an AbstractPlane
  //
  // Return
  //   a Vector
  //
  const pr = this.basis.getProjectionTo(newBasis)
  const vec = proj3.vec3(pr, this)
  const Vector = this.constructor
  return new Vector(newBasis, vec.x, vec.y, vec.z)
}
