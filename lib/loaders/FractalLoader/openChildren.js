const Plane = require('../../components/Plane')

module.exports = function (id) {
  // Open the node i.e. create its children.
  //
  // Parameters:
  //   id
  //     the identifier of the node to open.
  //

  if (!this.isNodeAlive(id)) {
    console.warn('Attempt to open dead node ' + id)
    return
  }

  const parent = this.nodes[id]
  const parentTracks = [
    {
      id,
      basis: parent.getBasis()
    }
  ]

  const childTracks = this.tracker(parentTracks)

  // Find non-existing children
  const idsToCreate = []
  const n = childTracks.length
  for (let i = 0; i < n; i += 1) {
    const id = childTracks[i].id
    const node = this.nodes[id]
    if (!node) {
      idsToCreate.push(id)
    }
  }

  const self = this
  this.generator(idsToCreate, (err, childNodes) => {
    if (err) {
      throw new Error(err)
    }

    // It is possible that the parent was removed during the generation.
    // It is also possible that previously existing children were removed
    // along with their space.
    // Find their space and create if it does not exist.

    const existingChildren = []
    for (let i = 0; i < n; i += 1) {
      const id = childTracks[i].id
      const node = this.nodes[id]
      if (node) {
        existingChildren.push(node)
      }
    }

    let space
    if (existingChildren.length === 0) {
      // No children exist, create the plane.
      space = Plane.create()
      this.viewport.addChild(space)
      // Maybe the basis of the first child track is a good guess
      // for the basis of the space.
      const spaceBasis = childTracks[0].basis
      space.setBasis(spaceBasis)
    } else {
      // Reuse the space of the children that already exists.
      space = existingChildren[0].getParent()
    }

    // Add children to the space, and place them accordingly.
    const m = childNodes.length
    for (let i = 0; i < m; i += 1) {
      const id = idsToCreate[i]
      const node = childNodes[i]
      const basis = childTracks.find(t => t.id === id).basis
      // Place into the local space.
      space.addChild(node)
      node.setBasis(basis)
      // Register to loader
      self.nodes[id] = node
      node.fractalId = id
    }
  })
}
