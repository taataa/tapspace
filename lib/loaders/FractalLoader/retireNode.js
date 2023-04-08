module.exports = function (id) {
  // Retire the node by removing it but keeping its children.
  //

  if (!this.isAlive(id)) {
    throw new Error('Attempt to retire non-existing node ' + id)
  }

  const node = this.nodes[id]
  const space = node.getParent()

  // Register
  node.remove()
  delete this.nodes[id]

  // Remove empty spaces to prevent them from accumulating.
  if (space) {
    const siblings = space.getChildren()
    if (siblings.length === 0) {
      space.remove()
    }
  }
}
