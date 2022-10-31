const point3 = require('affineplane').point3

module.exports = function (basis, camera) {
  // tapspace.geometry.Point:projectTo(basis, camera)
  //
  // Project the point onto the given plane
  //
  // Parameters:
  //   basis
  //     an affine component, the target basis.
  //   camera
  //     a Point, relative to the reference basis.
  //
  // Return
  //   a Point, represented on the target basis.
  //

  // Normalize camera
  if (camera.changeBasis) {
    camera = camera.changeBasis(this.basis).point
  }

  const pr = this.basis.getTransitionFrom(basis)

  const p = point3.projectTo(this.point, pr, camera)

  const Point = this.constructor
  return new Point(basis, p)
}
