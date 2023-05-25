module.exports = function (parentId) {
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
  const kidIds = this.tracker(parentSpace)

  kidIds.forEach(kid => {
    // Remove possible placeholders.
    const placeholder = this.placeholders[kid]
    if (placeholder) {
      delete this.placeholders[kid]
      placeholder.remove()
    }

    // Remove possible spaces.
    const kidSpace = this.spaces[kid]
    if (kidSpace) {
      // Close its children. Note recursion.
      this.closeChildren(kid)
      // Then remove
      delete this.spaces[kid]
      kidSpace.remove()
    }
  })
}
