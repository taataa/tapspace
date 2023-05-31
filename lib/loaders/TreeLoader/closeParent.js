module.exports = function (childId) {
  // @TreeLoader:closeParent(childId)
  //
  // Close parent space, given that the given child space exists.
  //
  // Parameters:
  //   childId
  //     a string
  //

  // The child may be already closed.
  const childSpace = this.spaces[childId]
  if (!childSpace) {
    return
  }

  // Find parent.
  const parentId = this.backtracker(childId, childSpace)

  // Parent may be already closed.
  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    return
  }

  // Close siblings
  const childIds = this.tracker(parentId, parentSpace)

  childIds.forEach((kid) => {
    if (kid !== childId) {
      this.closeChild(kid)
    }
  })

  // Close the parent's parent. Note the recursion.
  this.closeParent(parentId)

  // Then remove
  delete this.demand[parentId]
  delete this.spaces[parentId]
  parentSpace.remove()

  // Enable hooking to removals
  this.emit('close', { id: parentId })
}
