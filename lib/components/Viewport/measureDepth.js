module.exports = function (component) {
  // @Viewport:measureDepth(component)
  //
  // Measure depth of the given component with respect to the camera.
  //
  // Parameters:
  //   component
  //     a BasisComponent
  //
  // Returns:
  //   a number, the depth in viewport pixels.
  //

  // Precompute viewport values
  const cameraOnViewport = this.atCamera().getRaw()
  const compOnViewport = component.atAnchor().transitRaw(this)

  return compOnViewport.z - cameraOnViewport.z
}
