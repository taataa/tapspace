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

  // The parent may be loading. Ensure it is not loading anymore.
  delete this.loading[parentId]

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
    childId,
    data
  })
}
