module.exports = function (pivot) {
  // @Viewport:snapPixels([pivot])
  //
  // Snap viewport position and angle to pixels when the angle is near
  // a multitude of 90 degrees.
  // Note that in perspective view mode the snapping is a lost cause,
  // because almost nothing is exact.
  //
  // Parameters:
  //   pivot
  //     optional Point. Snap rotation around this point.
  //
  // Return
  //   this, for chaining
  //

  // Delegate to each root plane.
  const planes = this.space.getChildren()
  for (let i = 0; i < planes.length; i += 1) {
    planes[i].snapPixels(pivot)
  }

  return this
}
