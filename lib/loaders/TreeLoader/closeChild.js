module.exports = function (parentId, childId, data) {
  // @TreeLoader:closeChild(parentId, childId[, data])
  //
  // Close child space and all its children.
  // Makes the loader emit 'close'.
  // The event should be handled by calling loader.removeSpace()
  //
  // Parameters:
  //   parentId
  //     a string
  //   childId
  //     a string
  //   data
  //     optional object, the context data passed to 'close' event.
  //

  // The child may be loading. Ensure not.
  delete this.loading[childId]

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

  // Close its children. Note recursion.
  this.closeChildren(childId)

  this.emit('close', {
    id: childId,
    space: childSpace,
    parentId: parentId,
    data: data
  })
}
