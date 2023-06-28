const Measurement = require('../../metrics/Measurement')

module.exports = function (components) {
  // @Viewport:measureMany(components)
  //
  // Measure each given component with respect to the viewport.
  //
  // Example:
  // ```
  // const items = plane.getChildren()
  // const measurements = view.measureMany(items)
  // ```
  //
  // Parameters:
  //   component
  //     an array of Component
  //
  // Returns:
  //   an array of Measurement
  //

  // Precompute viewport values
  const viewportCircle = this.getBoundingCircle().getRaw()
  const viewportArea = this.getArea().getRaw()

  return components.map(comp => {
    // Precompute transition
    const silent = true
    const basis = comp.getTransitionTo(this, silent)

    return new Measurement(
      comp,
      basis,
      viewportCircle,
      viewportArea
    )
  })
}
