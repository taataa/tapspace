module.exports = function (id) {
  // Open parent nodes and populate siblings for the given node
  //
  const parentId = this.backtracker(id)

  if (parentId === null) {
    // Cannot reunite root
    return
  }

  this.openParent(id)
  this.populatePlane(parentId)
}
