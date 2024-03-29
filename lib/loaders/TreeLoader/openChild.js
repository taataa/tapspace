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

  // Child may be from a null tracker
  if (!childId) {
    return
  }

  // Child may already exist.
  const childSpace = this.spaces[childId]
  if (childSpace) {
    return
  }

  // Child may already be loading.
  if (this.loading[childId]) {
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

  // Cache basis, if a map is available.
  const basis = this.mapper(parentId, parentSpace, childId)
  if (basis) {
    this.bases[childId] = basis
  }

  // Register loading state.
  this.loading[childId] = parentId

  this.emit('open', {
    id: childId,
    parentId,
    data
  })
}
