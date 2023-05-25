module.exports = function (spaceId) {
  // Remove the space, given that the space exists.
  // Does not remove the children.
  // Synchronous.
  //
  // Parameters:
  //   parentId
  //     a string
  //

  const space = this.spaces[spaceId]

  if (!space) {
    return
  }

  delete this.spaces[spaceId]
  space.remove()
}
