module.exports = function (childId) {
  // @TreeLoader:closeParent(childId)
  //
  // Close parent space, given that the given child space exists.
  //
  // Parameters:
  //   childId
  //     a string
  //

  const childSpace = this.spaces[childId]
  if (!childSpace) {
    return
  }

  // Find parent.
  const parentId = this.backtracker(childId, childSpace)

  // Remove possible placeholders.
  const placeholder = this.placeholders[parentId]
  if (placeholder) {
    delete this.placeholders[parentId]
    placeholder.remove()
  }

  // Remove possible spaces.
  const parentSpace = this.spaces[parentId]
  if (parentSpace) {
    // Recursion. Close its parents.
    this.closeParent(parentId)
    // Then remove
    delete this.spaces[parentId]
    parentSpace.remove()
  }
}
