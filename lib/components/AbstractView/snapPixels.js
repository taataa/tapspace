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

  // Delegate to each root plane.
  const planes = this.space.getChildren()
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].snapPixels(options)
  }
}
