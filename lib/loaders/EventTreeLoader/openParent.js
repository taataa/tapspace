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

  // Register demand
  if (this.demand[parentId]) {
    this.demand[parentId] = Math.max(1, this.demand[parentId])
  } else {
    this.demand[parentId] = 1
  }

  this.emit('open', parentId)
}
