module.exports = function (childId) {
  // @TreeLoader:openParent(childId)
  //
  // Open a parent space relative to the given child.
  //
  // Parameters:
  //   childId
  //     a string
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

  // The child may have low demand.
  const childDemand = this.demand[childId] || 0
  if (childDemand < 2) {
    return
  }

  // Set demand for the non-existing parent
  this.demand[parentId] = childDemand - 1

  this.emit('open', parentId)
}
