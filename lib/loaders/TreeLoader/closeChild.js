module.exports = function (parentId, childId, data) {
  // @TreeLoader:closeChild(parentId, childId[, data])
  //
  // Close child space.
  //
  // Parameters:
  //   parentId
  //     a string
  //   childId
  //     a string
  //   data
  //     optional object, the context data passed to 'close' event.
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

  // Default data
  if (!data) {
    data = {}
  }

  this.emit('close', {
    id: childId,
    space: childSpace,
    parentId: parentId,
    data: data
  })

  // Close its children. Note recursion.
  this.closeChildren(childId)
  // Then remove
  delete this.demand[childId]
  delete this.spaces[childId]
  childSpace.remove()

  // Enable host app to hook to removals
  this.emit('closed', {
    id: childId,
    parentId: parentId
  })
}
