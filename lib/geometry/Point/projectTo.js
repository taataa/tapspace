const point3 = require('affineplane').point3

module.exports = function (plane, camera) {
  // @Point:projectTo(plane, camera)
  //
  // Project the point onto a plane.
  //
  // Parameters:
  //   plane
  //     a Plane, the target plane.
  //   camera
  //     a Point, relative to the reference basis.
  //
  // Return
  //   a Point, represented on the target basis.
  //

  // Normalize camera
  if (camera.transitRaw) {
    camera = camera.transitRaw(this.basis)
  }

  const pr = this.basis.getTransitionFrom(plane)

  const p = point3.projectTo(this.point, pr, camera)

  const Point = this.constructor
  return new Point(plane, p)
}
