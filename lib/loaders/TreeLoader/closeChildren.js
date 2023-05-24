module.exports = function (parentId) {
  // Close child spaces, given that the given space exists.
  // Synchronous.
  //
  // Parameters:
  //   parentId
  //     a string
  //

  const space = this.spaces[parentId]

  if (!space) {
    return
  }

  // Skip placeholders because cannot track those.
  if (space.isPlaceholder) {
    return
  }

  // Find children.
  const kidIds = this.tracker(space)

  kidIds.forEach(kid => {
    const kidSpace = this.spaces[kid]

    if (!kidSpace) {
      // No need to close
      return
    }
    // Close its children
    this.closeChildren(kid)
    // Then remove
    delete this.spaces[kid]
    kidSpace.remove()
  })
}
