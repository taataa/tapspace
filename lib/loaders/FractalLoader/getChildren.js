module.exports = function (ids) {
  // Get existing children for the given node IDs.
  //
  // Parameters:
  //   ids
  //     an array of string, parent node IDs.
  //
  // Return
  //   an array of nodes. May be empty array.
  //

  const parentTracks = []
  for (let i = 0; i < ids.length; i += 1) {
    const id = ids[i]

    const parent = this.nodes[id]
    if (parent) {
      parentTracks.push({
        id,
        basis: parent.getBasis()
      })
    }
  }

  const childTracks = this.tracker(parentTracks)

  if (childTracks.length === 0) {
    return []
  }

  const children = []
  const n = childTracks.length
  for (let i = 0; i < n; i += 1) {
    const id = childTracks[i].id
    const node = this.nodes[id]
    if (node) {
      children.push(node)
    }
  }

  return children
}
