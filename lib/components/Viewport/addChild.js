module.exports = function (space, position) {
  // @Viewport:addChild(space, position)
  //
  // Appends a Space or Plane into the Viewport Hyperspace.
  // The placed component becomes an immediate child of viewport's hyperspace
  // which means that viewport will modify the coordinate transition of
  // the component in order to navigate the space.
  //
  // Parameters:
  //   space
  //     a Space or Plane.
  //   position
  //     optional Point. The position for the space origin.
  //
  // Returns:
  //   this, for chaining
  //

  this.hyperspace.addChild(space, position)

  return this
}