module.exports = function (parentId, childId) {
  // @TreeLoader:closeChild(parentId, childId)
  //
  // Close child space.
  //
  // Parameters:
  //   parentId
  //     a string
  //   childId
  //     a string
  //

  // Parent may not exist anymore.
  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    return
  }

  // The child may be already removed
  const childSpace = this.spaces[childId]
  if (!childSpace) {
    return
  }

  // Close its children. Note recursion.
  this.closeChildren(childId)
  // Then remove
  delete this.demand[childId]
  delete this.spaces[childId]
  childSpace.remove()

  // Enable host app to hook to removals
  this.emit('close', { id: childId })
}
