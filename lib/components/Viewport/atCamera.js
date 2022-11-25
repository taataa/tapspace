module.exports = function () {
  // @Viewport:atCamera()
  //
  // Get camera position relative to the viewport.
  // If the viewport is not perspective, returns the anchor position
  // on the viewport.
  //
  // Return
  //   a Point, the camera position in the viewport space.
  //
  if (this.cameraDistance > 0) {
    return this.atMid().offset(0, 0, -this.cameraDistance)
  }
  return this.atAnchor()
}
