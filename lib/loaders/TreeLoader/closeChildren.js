module.exports = function (parentId, data) {
  // @TreeLoader:closeChildren(parentId[, data])
  //
  // Close child spaces, given that the given space exists.
  // Synchronous.
  //
  // Parameters:
  //   parentId
  //     a string
  //   data
  //     optional object passed to 'close' event
  //

  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    return
  }

  if (!data) {
    data = {}
  }

  // Find children.
  const kidIds = this.tracker(parentId, parentSpace)

  kidIds.forEach(kid => {
    this.closeChild(parentId, kid, data)
  })
}
