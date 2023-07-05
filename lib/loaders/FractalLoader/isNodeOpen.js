module.exports = function (id) {
  // Check if the node is already open.
  //
  // Return
  //   boolean, true if the node exists and has one or more existing children.
  //

  const node = this.nodes[id]

  if (!node) {
    return false
  }

  const parentTracks = [
    {
      id,
      basis: node.getBasis()
    }
  ]

  const childTracks = this.tracker(parentTracks)

  for (let i = 0; i < childTracks.length; i += 1) {
    const cid = childTracks[i].id
    if (this.nodes[cid]) {
      // At least one child exists
      return true
    }
  }

  return false
}
