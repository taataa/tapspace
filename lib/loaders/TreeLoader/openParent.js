module.exports = function (childId, data) {
  // @TreeLoader:openParent(childId[, data])
  //
  // Open a parent space relative to the given child.
  //
  // Parameters:
  //   childId
  //     a string
  //   data
  //     optional object, the context data passed to 'open' event.
  //

  // Child may not exist anymore.
  const childSpace = this.spaces[childId]
  if (!childSpace) {
    return
  }

  const parentId = this.backtracker(childId, childSpace)

  // Root has no parent.
  if (!parentId) {
    return
  }

  // Parent may exist already.
  const parentSpace = this.spaces[parentId]
  if (parentSpace) {
    return
  }

  // Parent may already be loading.
  if (this.loading[parentId]) {
    return
  }

  // Default data
  if (!data) {
    data = {}
  }

  // Cache basis, if a map is available.
  const basis = this.backmapper(childId, childSpace, parentId)
  if (basis) {
    this.bases[parentId] = basis
  }

  // Register loading state.
  this.loading[parentId] = childId

  this.emit('open', { id: parentId, childId, data })
}
