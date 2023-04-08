module.exports = function (id) {
  // Remove the node.
  //

  if (!this.isAlive(id)) {
    throw new Error('Attempt to remove non-existing node ' + id)
  }

  if (this.isOpen(id)) {
    this.closeNode(id)
  }

  const node = this.nodes[id]
  const space = node.getParent()

  node.remove()
  delete this.nodes[id]

  // Remove empty space to prevent them from accumulating.
  if (space) {
    const siblings = space.getChildren()
    if (siblings.length === 0) {
      space.remove()
    }
  }
}
