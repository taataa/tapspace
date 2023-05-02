const box3 = require('affineplane').box3

module.exports = function (plane, camera) {
  // @Box:projectTo(plane, camera)
  //
  // Project the box front face onto a plane.
  //
  // Parameters:
  //   plane
  //     a Plane, the target plane.
  //   camera
  //     a Point, relative to the reference basis.
  //
  // Return
  //   a Box, represented on the target basis.
  //

  // Normalize camera
  if (camera.transitRaw) {
    camera = camera.transitRaw(this.basis)
  }

  const pr = this.basis.getTransitionFrom(plane)

  const box = box3.projectToPlane(this.box, pr, camera)
  // Patch to box3
  box.z = 0
  box.d = 0

  const Box = this.constructor
  return new Box(plane, box)
}
