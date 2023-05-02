const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (component) {
  // @Viewport:measureDilation(component)
  //
  // Measure dilation of the given component with respect to the viewport.
  //
  // Parameters:
  //   component
  //     a BasisComponent
  //
  // Returns:
  //   a number, the dilation.
  //

  const cameraOnViewport = this.atCamera().getRaw()
  const compOnViewport = component.atAnchor().transitRaw(this)
  const viewDepth = -cameraOnViewport.z
  const compDepth = viewDepth + compOnViewport.z

  const basis = component.getTransitionTo(this)
  const scaleOnViewport = plane3.getScale(basis)
  const dilation = scaleOnViewport * (viewDepth / compDepth)

  return dilation
}
