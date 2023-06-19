module.exports = function (id, content) {
  // @TreeLoader:addSpace(id, content)
  //
  // Add a space, given that the space does not exist and
  // that it has existing neighbors.
  // Use TreeLoader:replaceSpace to add an existing space.
  //
  // Parameters:
  //   id
  //     a string
  //   content
  //     a Component, the space
  //

  // TODO auto convert text content to Item

  // Ensure valid id
  if (!id) {
    console.warn('Nullish space ID detected: ' + id)
    return
  }

  // Space may already exist.
  if (this.spaces[id]) {
    console.warn('Duplicate space addition detected: ' + id)
    return
  }

  // Try find basis for the space.
  let basis = null
  // Try via parent first.
  const parentId = this.backtracker(id, content)
  if (parentId && this.spaces[parentId]) {
    // Has existing parent.
    const parentSpace = this.spaces[parentId]
    // Position about the parent.
    basis = this.mapper(parentId, parentSpace, id)
  }

  if (!basis) {
    // No parent for reference.
    // Try via children.
    const childIds = this.tracker(id, content)
    // Try to find existing child.
    const childId = childIds.find((cid) => {
      return this.spaces[cid]
    })
    if (childId) {
      // Child space available.
      const childSpace = this.spaces[childId]
      // Position about the child
      const insertionBasis = this.mapper(id, content, childId)
      if (insertionBasis) {
        // Insertion basis is the position of the child w.r.t. the parent.
        // However, the parent does not yet exist.
        const childBasis = childSpace.getBasis()
        // Therefore compute where would the parent basis be.
        basis = insertionBasis.getMatchedOuter(childBasis)
      }
    }
  }

  if (!basis) {
    // Possibly a manually added basis via init.
    if (this.bases[id]) {
      // Consume so it does not stay haunting.
      basis = this.bases[id]
      delete this.bases[id]
    }
  }

  if (!basis) {
    // Cannot find basis.
    console.warn('Cannot find position for space ' + id)
    return
  }

  // Basis found. Add the content.
  this.spaces[id] = content
  this.viewport.addChild(content)
  content.setBasis(basis)

  // Signal that the node is now open and available.
  this.emit('opened', {
    id: id,
    space: content
  })
}
