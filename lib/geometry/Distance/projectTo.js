const fine = require('affineplane')
const dist3 = fine.dist3

module.exports = function (plane, camera) {
  // @Distance:projectTo(plane, camera)
  //
  // Project the distance onto a plane.
  // The projection tells how long the distance is when viewed from the camera.
  // We assume the distance to have same orientation as its basis.
  // Both the scale difference and z difference affect the result.
  //
  // Parameters:
  //   plane
  //     a Plane, the target basis.
  //   camera
  //     a Point, relative to the reference basis.
  //
  // Return
  //   a Point, represented on the target basis.
  //

  // Normalize camera
  if (!camera) {
    throw new Error('Cannot project a distance without a camera position')
  }
  if (camera.transitRaw) {
    camera = camera.transitRaw(this.basis)
  }

  // Represent the given plane geometry on this basis.
  const pr = plane.getTransitionTo(this.basis)

  // Project from this basis to the given plane.
  const dist = dist3.projectTo(this.dist, pr, camera)

  const Distance = this.constructor
  return new Distance(plane, dist)
}
