module.exports = function (parentId, childId, data) {
  // @TreeLoader:openChild(parentId, childId[, data])
  //
  // Open a child space, given that the parent exists.
  //
  // Parameters:
  //   parentId
  //     a string
  //   childId
  //     a string
  //   data
  //     optional object, the context data passed to 'open' event.
  //
  // Emits:
  //   open
  //     with { id, parentId, data }
  //

  // Child may already exist.
  const childSpace = this.spaces[childId]
  if (childSpace) {
    return
  }

  // Parent may be already removed.
  const parentSpace = this.spaces[parentId]
  if (!parentSpace) {
    return
  }

  // Default data
  if (!data) {
    data = {}
  }

  this.emit('open', {
    id: childId,
    parentId: parentId,
    data: data
  })
}
