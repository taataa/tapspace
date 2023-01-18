module.exports = function (space, position) {
  // @Viewport:addSpace(space, position)
  //
  // Attach a Space to the viewport.
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

  this.hyperspace.addChild(space, position)

  return this
}
