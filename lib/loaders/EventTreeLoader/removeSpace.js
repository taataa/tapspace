module.exports = function (spaceId) {
  // @TreeLoader:removeSpace(spaceId)
  //
  // Remove the space, given that the space exists.
  // Does not remove the children.
  //
  // Parameters:
  //   parentId
  //     a string
  //

  const space = this.spaces[spaceId]
  if (space) {
    delete this.spaces[spaceId]
    delete this.demand[spaceId]
    space.remove()
    // Enable hooking to removals
    this.emit('close', { id: spaceId })
  }
}
