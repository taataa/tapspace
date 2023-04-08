const Plane = require('../../components/Plane')

module.exports = function (id) {
  // Recreate the parents of the node.
  //

  if (!this.isAlive(id)) {
    throw new Error('Cannot reunite non-existing node.')
  }
  // TODO generate node and find tracker-based siblings.

  const originNode = this.nodes[id]
  const originTrack = {
    id: id,
    basis: originNode.getBasis() // TODO change to viewport?
  }
  const parentTracks = this.backtracker([originTrack])

  if (parentTracks.length === 0) {
    // Cannot reunite root. Has no parent.
    return
  }

  // TODO support multiple parents
  const parentTrack = parentTracks[0]

  //
  const parentId = parentTrack.id
  const parentBasis = parentTrack.basis

  // Does the parent exist?
  if (this.isAlive(parentId)) {
    // Parent already exists.
    return
  }

  // Parent does not exist. Create.
  this.generator([parentId], (err, parentNodes) => {
    // Error during generation, e.g. connection timeout.
    if (err) {
      throw err
    }

    if (parentNodes.length === 0) {
      // No parent. Cannot generate. It is okay.
      return
    }

    const parentNode = parentNodes[0]

    // Check if the parent node has already been created during the generation.
    // That would indicate duplicate generator calls, very likely when
    // siblings open their parents concurrently.
    if (this.isAlive(parentId)) {
      // Already exist. Do not recreate.
      return
    }

    // Are any siblings of the parent alive?
    const siblingsOfParent = this.getSiblings(parentId)

    // Create the space for the parent.
    let space
    if (siblingsOfParent.length === 0) {
      // No siblings. We need to create a space.
      space = Plane.create()
      this.viewport.addChild(space)
      // Place the space at the parent basis. Best guess.
      space.setBasis(parentBasis)
    } else {
      // Reuse sibling's space. Assume first sibling has the primary space.
      const sibling = siblingsOfParent[0]
      space = sibling.getParent() // Affine parent in DOM
    }

    // Place into space
    space.addChild(parentNode)
    parentNode.setBasis(parentBasis)
  })
}
