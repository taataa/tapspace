module.exports = function (space, position) {
  // @Viewport:addChild(space, position)
  //
  // Appends a Space into the Viewport Hyperspace.
  // The placed component becomes an immediate child of viewport's hyperspace
  // which means that viewport will modify the coordinate transition of
  // the component in order to navigate the space.
  //
  // The method cannot add the component as an immediate child of
  // the Viewport because those are hard-coded and
  // have specific responsibilities.
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
