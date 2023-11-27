module.exports = function (pivot) {
  // @Viewport:snapPixels([pivot])
  //
  // Snap viewport position and angle to pixels when the angle is near
  // a multitude of 90 degrees.
  // This does not modify the real position but only the appearance.
  // See Transformer:snapPixels for details.
  //
  // Parameters:
  //   pivot
  //     optional Point. Snap rotation around this point.
  //
  // Return
  //   this, for chaining
  //

  // TODO Snap Hyperspace too?
  // TODO Or wait for Hyperspace transform to be commited to spaces?

  // Delegate to each basis space.
  const spaces = this.hyperspace.getChildren()
  for (let i = 0; i < spaces.length; i += 1) {
    spaces[i].snapPixels(pivot)
  }

  return this
}
