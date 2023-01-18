module.exports = function (position) {
  // @Space:createSpace(position)
  //
  // Create a subspace at the position and make it a child of this space.
  //
  // Return
  //   a Space
  //
  const Space = this.constructor
  const subspace = new Space()

  this.addChild(subspace, position)

  return subspace
}
