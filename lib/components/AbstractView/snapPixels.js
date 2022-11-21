module.exports = function (anchor) {
  // tapspace.components.AbstractView:snapPixels([anchor])
  //
  // Snap viewport position and angle to pixels when the angle is near
  // a multitude of 90 degrees.
  //
  // Parameters:
  //   anchor
  //     optional Point. Snap rotation around this point.
  //
  // Return
  //   this, for chaining
  //

  // Delegate to each root plane.
  const planes = this.space.getChildren()
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].snapPixels(anchor)
  }

  return this
}
