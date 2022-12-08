module.exports = function () {
  // @Viewport:atCamera()
  //
  // Get camera position relative to the viewport.
  // If the viewport is not perspective, returns the middle point
  // of the viewport.
  //
  // Return
  //   a Point, the camera position in the viewport space.
  //
  const mid = this.atMid()
  if (this.cameraDistance > 0) {
    return mid.offset(0, 0, -this.cameraDistance)
  }
  return mid
}
