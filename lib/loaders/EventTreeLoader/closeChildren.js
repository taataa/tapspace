module.exports = function (parentId) {
  // @TreeLoader:closeChildren(parentId)
  //
  // Close child spaces, given that the given space exists.
  // Synchronous.
  //
  // Parameters:
  //   parentId
  //     a string
  //

  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    return
  }

  // Find children.
  const kidIds = this.tracker(parentId, parentSpace)

  kidIds.forEach(kid => {
    this.closeChild(parentId, kid)
  })
}
