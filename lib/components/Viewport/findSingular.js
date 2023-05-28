const epsilon = require('affineplane').epsilon

module.exports = function () {
  // @Viewport:findSingular()
  //
  // Find spaces with singular or near-singular scale.
  // Singular spaces cannot be transformed reliably due to
  // floating point overflow and underflow.
  // Useful for detecting near-singular spaces for graceful unloading.
  //
  // Return
  //   array of Component
  //     min length is 0
  //     max length is the number of spaces
  //

  // TODO FEATURE detect overflow too

  const hyperspace = this.getHyperspace()
  const spaces = hyperspace.getChildren()

  const metrics = this.measureMany(spaces)
  // TODO OPTIMIZE measure only dilations

  // Detect all too small spaces.
  return metrics.filter((metric) => {
    // Ensure that inversion determinants do not go near epsilon.
    const determinant = metric.dilation * metric.dilation
    return determinant < epsilon * 100
  }).map((metric) => {
    // Return only components
    return metric.target
  })
}
