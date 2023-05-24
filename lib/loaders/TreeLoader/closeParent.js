module.exports = function (childId) {
  // Close parent space, given that the given space exists.
  // Synchronous.
  //
  // Parameters:
  //   childId
  //     a string
  //

  const childSpace = this.spaces[childId]

  if (!childSpace) {
    return
  }

  // Skip placeholders because cannot track those.
  if (childSpace.isPlaceholder) {
    return
  }

  // Find parent.
  const parentId = this.backer(childId)

  const parentSpace = this.spaces[parentId]

  if (!parentSpace) {
    // Already removed
    return
  }

  delete this.spaces[parentId]
  parentSpace.remove()
}
