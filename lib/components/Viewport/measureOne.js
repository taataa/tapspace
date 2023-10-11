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
  //     a Transformer
  //
  // Returns:
  //   a Measurement
  //

  // Precompute viewport values
  const viewportCircle = this.getBoundingCircle().getRaw()
  const viewportArea = this.getArea().getRaw()

  // Precompute transition
  const basis = component.getTransitionTo(this)

  return new Measurement(
    component,
    basis,
    viewportCircle,
    viewportArea
  )
}
