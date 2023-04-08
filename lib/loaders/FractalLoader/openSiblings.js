const getSiblingTracks = require('./tracks/getSiblingTracks')

module.exports = function (id) {
  // Render missing siblings of the node.
  //
  // Parameters:
  //   id
  //     a string, the node id
  //

  if (!this.isAlive(id)) {
    throw new Error('Node does not exist: ' + id)
  }

  const originNode = this.nodes[id]
  const originTrack = {
    id: id,
    basis: originNode.getBasis() // TODO change basis to viewport?
  }

  const siblingTracks = getSiblingTracks(
    this.tracker,
    this.backtracker,
    originTrack
  )

  // Find which siblings are not already rendered.
  // Also store existing siblings for later.
  const existingSiblingIds = []
  const missingSiblingTracks = []
  siblingTracks.forEach(track => {
    const siblingNode = this.nodes[track.id]
    if (siblingNode) {
      existingSiblingIds.push(track.id)
    } else {
      missingSiblingTracks.push(track)
    }
  })

  const missingIds = missingSiblingTracks.map(track => track.id)

  this.generate(missingIds, (err, nodes) => {
    // Error during generation, e.g. connection timeout.
    if (err) {
      throw err
    }

    // Lets find a space where to place the nodes.
    let space = null

    // The source node might have been deleted while the generation.
    if (this.isAlive(id)) {
      const node = this.nodes[id]
      space = node.getParent()
    } else {
      // Use the previously found, existing siblings to find the space.
      const n = existingSiblingIds.length
      for (let i = 0; i < n; i += 1) {
        const id = existingSiblingIds[i]
        const node = this.nodes[id]
        if (node) {
          space = node.getParent()
          break
        }
      }
    }

    if (!space) {
      // We cannot find a reference space anymore. Stop generation.
      // Likely the navigation has proceed outside of reach.
      return
    }

    // Some of the nodes might have been generated elsewhere while the gen.
    // If not, add the new node to space.
    nodes.forEach((node, i) => {
      const mid = missingIds[i]
      if (!this.nodes[mid]) {
        const track = missingSiblingTracks[i]
        // Debug
        if (track.id !== mid) {
          throw new Error('Id mismatch. A bug.')
        }
        space.addChild(node)
        node.setBasis(track.basis)
        // Register
        this.nodes[mid] = node
      }
    })
  })
}
