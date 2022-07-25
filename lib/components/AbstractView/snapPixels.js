module.exports = function (options) {
  // tapspace.components.AbstractView:snapPixels(options)
  //
  // Snap viewport position and angle to pixels when the angle is near
  // a multitude of 90 degrees.
  //
  // Parameters:
  //   options
  //     optional object with props:
  //       anchor
  //         a point2 or Point
  //

  // Delegate to each layer.
  const layers = this.getLayers()
  for (let i = 0; i < layers.length; i += 1) {
    layers[i].snapPixels(options)
  }
}
