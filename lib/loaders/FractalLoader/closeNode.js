module.exports = function (id) {
  // Close the node
  //

  if (!this.isAlive(id)) {
    throw new Error('Attempt to close non-existing node ' + id)
  }

  if (!this.isOpen(id)) {
    console.warn('Attempt to close closed node ' + id)
    return
  }

  const children = this.getChildren([id])
  const n = children.length

  for (let i = 0; i < n; i += 1) {
    this.removeNode(children[i].id)
  }
}
