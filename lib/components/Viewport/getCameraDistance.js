const Distance = require('../../geometry/Distance')

module.exports = function () {
  // @Viewport:getCameraDistance()
  //
  // Get distance between camera and the viewport center.
  // The distance is measured along z-axis.
  // In simplified human eye, the distance is analogous to the distance
  // from pupil to the fovea.
  //
  // Return
  //   a Distance
  //
  if (this.cameraDistance) {
    return new Distance(this, this.cameraDistance)
  }
  return new Distance(this, 0) // TODO is really zero in ortho?
}
