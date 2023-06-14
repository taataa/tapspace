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

  // Space migth be already removed.
  if (!space) {
    return
  }

  delete this.spaces[spaceId]
  delete this.demand[spaceId]

  // Remove from DOM
  space.remove()

  // Enable hooking to removals
  this.emit('closed', { id: spaceId })
}
