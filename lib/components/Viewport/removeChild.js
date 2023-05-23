module.exports = function (space) {
  // @Viewport:removeChild(space)
  //
  // Remove a Component from the Viewport Hyperspace.
  //
  // Parameters:
  //   space
  //     a Component
  //
  // Returns:
  //   this, for chaining
  //

  this.hyperspace.removeChild(space)

  return this
}
