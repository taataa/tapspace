module.exports = function (id) {
  // Get all living siblings for node id.
  //
  // Return
  //   an array of nodes
  //

  const parentId = this.backtracker(id)

  if (parentId === null) {
    // Root, no siblings
    return []
  }

  const kernelChildren = this.kernel(parentId).children
  const n = kernelChildren.length

  const living = []
  for (let i = 0; i < n; i += 1) {
    const cid = kernelChildren[i].id
    if (this.isAlive(cid) && id !== cid) {
      living.push(this.nodes[cid])
    }
  }

  return living
}
