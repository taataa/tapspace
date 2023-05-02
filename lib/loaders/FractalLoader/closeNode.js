module.exports = function (id) {
  // Close the node
  //

  if (!this.isNodeAlive(id)) {
    throw new Error('Attempt to close non-existing node ' + id)
  }

  if (!this.isNodeOpen(id)) {
    console.warn('Attempt to close closed node ' + id)
    return
  }

  const children = this.getChildren([id])
  const n = children.length

  for (let i = 0; i < n; i += 1) {
    if (children[i].fractalId) {
      this.removeNode(children[i].fractalId)
    }
  }
}
