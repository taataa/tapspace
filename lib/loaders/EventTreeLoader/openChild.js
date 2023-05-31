module.exports = function (parentId, childId) {
  // @TreeLoader:openChild(parentId, childId)
  //
  // Open a child space, given that the parent exists.
  //
  // Parameters:
  //   parentId
  //     a string
  //   childId
  //     a string
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

  // Parent may have low demand.
  const parentDemand = this.demand[parentId] || 0
  if (parentDemand < 2) {
    return
  }

  // Set demand for the non-existing child.
  this.demand[childId] = parentDemand - 1

  this.emit('open', childId)
}
