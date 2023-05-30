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

  // Register demand.
  if (this.demand[childId]) {
    this.demand[childId] = Math.max(1, this.demand[childId])
  } else {
    this.demand[childId] = 1
  }

  this.emit('open', childId)
}
