module.exports = function (id) {
  // Recreate the parents of the node.
  //

  const parentId = this.backtracker(id)

  if (parentId === null) {
    // Cannot recreate parent for root.
    return
  }

  if (!this.isOpen(parentId)) {
    throw new Error('Attempt to open parent from non-existent plane ' + parentId)
  }

  if (this.isAlive(parentId)) {
    // Parent already alive
    return
  }

  console.log('TODO openParent')
}
