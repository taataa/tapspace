module.exports = function (childId, data) {
  // @TreeLoader:closeParent(childId[, data])
  //
  // Close parent space, given that the given child space exists.
  //
  // Parameters:
  //   childId
  //     a string
  //   data
  //     optional object to be passed to 'close' event.
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

  // Default data
  if (!data) {
    data = {}
  }

  // Close siblings
  const childIds = this.tracker(parentId, parentSpace)

  childIds.forEach((kid) => {
    if (kid !== childId) {
      this.closeChild(kid, data)
    }
  })

  // Close the parent's parent. Note the recursion.
  this.closeParent(parentId, data)

  this.emit('close', {
    id: parentId,
    space: parentSpace,
    childId: childId,
    data: data
  })

  // Then remove
  delete this.demand[parentId]
  delete this.spaces[parentId]
  parentSpace.remove()

  // Enable hooking to removals
  this.emit('closed', {
    id: parentId,
    childId: childId,
    data: data
  })
}
