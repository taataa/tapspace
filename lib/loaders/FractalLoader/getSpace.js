module.exports = function (id) {
  // Get the space onto which this node is placed.
  //
  // Parameters:
  //   id
  //     a string
  //
  // Return
  //   a Space, if the node exists.
  //   null, if the node does not exist.
  //
  const node = this.nodes[id]

  if (!node) {
    return null
  }

  const space = node.getParent()

  if (!space) {
    // No parent exists
    return null
  }

  return space
}
