module.exports = function (pivot) {
  // @Viewport:snapPixels([pivot])
  //
  // Snap viewport position and angle to pixels when the angle is near
  // a multitude of 90 degrees.
  //
  // Parameters:
  //   pivot
  //     optional Point. Snap rotation around this point.
  //
  // Return
  //   this, for chaining
  //

  // Delegate to each basis space.
  const spaces = this.hyperspace.getChildren()
  for (let i = 0; i < spaces.length; i += 1) {
    spaces[i].snapPixels(pivot)
  }

  return this
}
