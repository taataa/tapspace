const getSiblingTracks = require('./tracks/getSiblingTracks')

module.exports = function (id) {
  // Get existing siblings of the node with the given ID.
  //
  // Parameters:
  //   id
  //
  // Return:
  //   array of SpaceElement
  //

  if (!this.isAlive(id)) {
    // Node does not exist, thus it has no siblings.
    return []
  }

  const originNode = this.nodes[id]
  const originTrack = {
    id: id,
    basis: originNode.getBasis() // TODO change basis onto viewport?
  }
  const siblingTracks = getSiblingTracks(
    this.tracker,
    this.backtracker,
    originTrack
  )

  // Find which siblings are already rendered.
  const existingSiblingNodes = []
  siblingTracks.forEach(track => {
    const siblingNode = this.nodes[track.id]
    if (siblingNode) {
      existingSiblingNodes.push(siblingNode)
    }
  })

  return existingSiblingNodes
}
