module.exports = function () {
  // @Viewport:getCameraBasis()
  //
  // Get the camera coordinate system.
  //
  // Return
  //   a Basis
  //
  const size = this.getSize().getRaw()
  const dx = size.w / 2
  const dy = size.h / 2
  const dz = -this.cameraDistance
  return this.getBasis().offset(dx, dy, dz)
}
