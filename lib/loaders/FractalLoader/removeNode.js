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

  node.remove()
  delete this.nodes[id]

  // const siblings = this.getSiblings(id)
  //
  // if (siblings.length === 0) {
  //   // Remove the plane because it is empty
  //   const parentId = this.backtracker(id)
  //   if (this.isOpen(parentId)) {
  //     const plane = this.planes[parentId]
  //     plane.remove()
  //     delete this.planes[parentId]
  //     delete this.nodes[id]
  //   }
  // } else {
  //   // Remove only the node. Keep the siblings alive.
  //   node.remove()
  //   delete this.nodes[id]
  // }
}
