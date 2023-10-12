module.exports = function (space, position) {
  // @Viewport:prependChild(space, position)
  //
  // Add a Space as the first child of the Viewport Hyperspace.
  // See also Viewport:addChild
  //
  // Parameters:
  //   space
  //     a Space.
  //   position
  //     optional Point. The position for the space origin.
  //
  // Returns:
  //   this, for chaining
  //

  this.hyperspace.prependChild(space, position)

  return this
}
