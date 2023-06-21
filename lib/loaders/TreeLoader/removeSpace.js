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

  // The space may be loading. Ensure it is not loading anymore.
  delete this.loading[spaceId]

  // Space might be already removed.
  const space = this.spaces[spaceId]
  if (!space) {
    return
  }

  delete this.bases[spaceId]
  delete this.spaces[spaceId]

  // Remove from DOM
  space.remove()

  // Enable hooking to removals
  this.emit('closed', { id: spaceId })
}
