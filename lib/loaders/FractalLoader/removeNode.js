module.exports = function (id) {
  // Remove the node.
  //

  if (!this.isAlive(id)) {
    console.warn('Duplicate removal for node ' + id)
    return
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
