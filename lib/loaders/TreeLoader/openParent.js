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

  // The parent may be already loading.
  if (this.loading[parentId]) {
    return
  }

  // The child may have low demand.
  const childDemand = this.demand[childId] || 0
  if (childDemand < 2) {
    return
  }

  // Default data
  if (!data) {
    data = {}
  }

  // Set demand for the non-existing parent
  this.demand[parentId] = childDemand - 1
  // Begin loading
  this.loading[parentId] = true

  this.emit('open', {
    id: parentId,
    childId: childId,
    data: data
  })
}
