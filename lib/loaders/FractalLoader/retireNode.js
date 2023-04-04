module.exports = function (id) {
  // Retire the node by removing it but keeping its children.
  //

  if (!this.isAlive(id)) {
    throw new Error('Attempt to retire non-existing node ' + id)
  }

  const node = this.nodes[id]
  node.remove()
  delete this.nodes[id]

  // Remove the host plane if empty
  let parentId = this.backtracker(id)

  if (parentId === null) {
    parentId = 'ROOTPLANE'
  }

  this.removeEmptyPlane(parentId)
}
