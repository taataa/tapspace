const fine = require('affineplane')
const point2 = fine.point2
const point3 = fine.point3

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

  // Use point projection for computation.
  // TODO use dist3.projectTo when available.
  const p0 = point3.projectTo({ x: 0, y: 0, z: 0 }, pr, camera)
  const p1 = point3.projectTo({ x: this.dist, y: 0, z: 0 }, pr, camera)
  const dist = point2.distance(p0, p1)

  const Distance = this.constructor
  return new Distance(plane, dist)
}
