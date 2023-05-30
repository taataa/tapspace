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

  const closed = []

  kidIds.forEach(kid => {
    // Remove possible spaces.
    const kidSpace = this.spaces[kid]
    if (kidSpace) {
      // Close its children. Note recursion.
      this.closeChildren(kid)
      // Then remove
      delete this.demand[kid]
      delete this.spaces[kid]
      kidSpace.remove()
      // Enable hooking to removals
      closed.push(kid)
    }
  })

  // Enable host app to hook to removals
  for (let i = 0; i < closed.length; i += 1) {
    this.emit('close', { id: closed[i] })
  }
}
