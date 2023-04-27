const scalar2 = require('affineplane').scalar2

module.exports = function (plane, camera) {
  // @Area:projectTo(plane, camera)
  //
  // Project the area measure onto a plane. Can be used for
  // measuring item's apparent area on viewport, for example.
  //
  // Parameters:
  //   plane
  //     a BasisComponent, the view plane to which to project.
  //   camera
  //     a Point, the camera position.
  //
  // Return
  //   a Point
  //

  // Normalize camera
  if (camera.transitRaw) {
    camera = camera.transitRaw(this.basis)
  }

  const pr = this.basis.getTransitionFrom(plane)
  const ss = scalar2.projectToPlane(this.area, pr, camera)

  const Area = this.constructor
  return new Area(plane, ss)
}
