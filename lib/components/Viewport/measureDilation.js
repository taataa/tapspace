const fine = require('affineplane')
const plane3 = fine.plane3

module.exports = function (component) {
  // @Viewport:measureDilation(component)
  //
  // Measure dilation of the given component with respect to the viewport.
  //
  // Parameters:
  //   component
  //     a Component
  //
  // Returns:
  //   a number, the dilation.
  //

  const basis = component.getTransitionTo(this)
  return plane3.getScale(basis)
}
