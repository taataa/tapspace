module.exports = function (id) {
  // Remove the node.
  //

  if (!this.isNodeAlive(id)) {
    // Already removed. Happens easily when a node is about to be closed and
    // some of the children are about to be removed. The closing already
    // removes the children, thus the removals after that are duplicates.
    return
  }

  if (this.isNodeOpen(id)) {
    this.closeNode(id)
  }

  const node = this.nodes[id]
  const space = node.getParent()

  // Register removal
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
