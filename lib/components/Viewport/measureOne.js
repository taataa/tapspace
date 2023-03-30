const measurement = require('./measurement/create')

module.exports = function (node) {
  // @Viewport:measureOne(node)
  //
  // Measure the given node with respect to the viewport.
  //
  // Example:
  // ```
  // const measurement = view.measureOne(item)
  // ```
  //
  // Returns:
  //   a measurement
  //

  // Precompute viewport values
  const cameraOnViewport = this.atCamera().getRaw()
  const viewportSphere = this.getBoundingSphere().getRaw()
  const viewportArea = this.getArea().getRaw()

  // Precompute transition
  const basis = node.getTransitionTo(this)

  return measurement(node, basis, cameraOnViewport,
    viewportSphere, viewportArea)
}
