module.exports = function (id, content, isPlaceholder) {
  // @TreeLoader:open(id, content[, isPlaceholder])
  //
  // Open a space, given that there are neighbors.
  //
  // Parameters:
  //   id
  //     a string
  //   content
  //     a Component
  //   isPlaceholder
  //     optional boolean, default false.
  //     .. Set true to prevent loading propagation continuing to neighbors.
  //


  // TODO auto convert text content to Item

  // Space may already exist.
  const space = this.spaces[id]
  if (space) {
    // Reuse basis, replace content.
    // TODO what if this happens a lot accidentally due to recursion?
    const oldSpace = space
    const oldBasis = oldSpace.getBasis().changeBasis(this.viewport)
    oldSpace.remove()
    this.spaces[id] = content
    this.viewport.addChild(content)
    content.setBasis(oldBasis)

    this.emit('replaced', {
      id: id,
      old: oldSpace,
      new: content
    })

    // Continue to other spaces if there is demand.
    if (!isPlaceholder && this.demand[id] > 1) {
      setTimeout(() => {
        if (this.spaces[id] && this.demand[id] > 1) {
          this.openNeighbors(id, this.demand[id] - 1)
        }
      }, 0)
    }

    return
  }

  // Try find basis for the space.
  let basis = null
  // Try via parent first.
  const parentId = this.backtracker(id, space)
  if (parentId && this.spaces[parentId]) {
    // Has existing parent.
    const parentSpace = this.spaces[parentId]
    // Position about the parent.
    basis = this.mapper(parentId, parentSpace, id)
  }

  if (!basis) {
    // No parent for reference.
    // Try via children.
    const childIds = this.tracker(id, space)
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
    // Possibly a manually added basis. For example via init.
    if (this.bases[id]) {
      // Consume
      basis = this.bases[id]
      delete this.bases[id]
    }
  }

  if (!basis) {
    // Cannot find basis.
    return
  }

  // Basis found. Add the content.
  this.spaces[id] = content
  this.viewport.addChild(content)
  content.setBasis(basis)

  // The node is ready. Continue opening if there is demand.
  if (!isPlaceholder && this.demand[id] > 1) {
    setTimeout(() => {
      if (this.spaces[id] && this.demand[id] > 1) {
        this.openNeighbors(id, this.demand[id] - 1)
      }
    }, 0)
  }
}
