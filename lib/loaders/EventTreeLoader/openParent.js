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

  this.emit('open', parentId)
}
