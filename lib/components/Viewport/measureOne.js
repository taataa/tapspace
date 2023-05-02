const Measurement = require('../../metrics/Measurement')

module.exports = function (component) {
  // @Viewport:measureOne(component)
  //
  // Measure the given component with respect to the viewport.
  //
  // Example:
  // ```
  // const measurement = view.measureOne(item)
  // ```
  //
  // Parameters:
  //   component
  //     a TransformerComponent
  //
  // Returns:
  //   a Measurement
  //

  // Precompute viewport values
  const cameraOnViewport = this.atCamera().getRaw()
  const viewportSphere = this.getBoundingSphere().getRaw()
  const viewportArea = this.getArea().getRaw()

  // Precompute transition
  const basis = component.getTransitionTo(this)

  return new Measurement(
    component, basis,
    cameraOnViewport, viewportSphere, viewportArea
  )
}
