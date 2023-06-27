module.exports = function (id, content) {
  // @TreeLoader:addSpace(id, content)
  //
  // Add a space, given that it has existing neighbors and is expected.
  // A space is expected after the loader emits 'open' and before it is closed.
  // If the space exists already, the old space is replaced with the content.
  //
  // Parameters:
  //   id
  //     a string
  //   content
  //     a Component, the space
  //
  // Return
  //   a boolean. True if it was possible to add or replace the space
  //   .. and false otherwise.
  //

  // TODO auto convert text content to Item

  // Ensure valid id
  if (!id) {
    console.warn('Nullish space ID detected: ' + id)
    return false
  }

  // Space may already exist.
  if (this.spaces[id]) {
    // Just replace.
    // console.warn('Duplicate space addition detected: ' + id)
    const oldSpace = this.spaces[id]
    const basis = oldSpace.getBasis().changeBasis(this.viewport)
    this.spaces[id] = content
    this.viewport.hyperspace.replaceChild(oldSpace, content)
    content.setBasis(basis)
    return true
  }

  // If the space is not loading and does not exist, the addition is unexpected
  // and probably due to a delayed server response. Do not add these spaces.
  if (!this.loading[id]) {
    // DEBUG console.warn('Unexpected space addition detected: ' + id)
    return false
  }

  // Try find basis for the space. Three ways:
  // - cached basis
  // - mapped basis via the parent
  // - mapped basis via a child
  let basis = null
  // Record the direction to control the rendering order.
  // - render parents first
  // - add parent spaces by prepending
  // - add child spaces by appending
  let isChild = true

  // Try cached basis
  if (this.bases[id]) {
    // Consume so it does not stay haunting.
    basis = this.bases[id]
    delete this.bases[id]
  }

  // Try via parent.
  if (!basis) {
    isChild = true
    const parentId = this.backtracker(id, content)
    if (parentId && this.spaces[parentId]) {
      // Has existing parent.
      const parentSpace = this.spaces[parentId]
      // Position about the parent.
      basis = this.mapper(parentId, parentSpace, id)
      // If mapper fails, try reverse backmapper.
      if (!basis) {
        const insertionBasis = this.backmapper(id, content, parentId)
        if (insertionBasis) {
          // Insertion basis is the position of the parent w.r.t. the child.
          // However, the child does not yet exist in DOM.
          const parentBasis = parentSpace.getBasis()
          // Therefore compute where would the child basis be.
          basis = insertionBasis.getMatchedOuter(parentBasis)
        }
      }
    }
  }

  // Try via children.
  if (!basis) {
    isChild = false
    const childIds = this.tracker(id, content)
    // Try to find existing child.
    const childId = childIds.find((cid) => {
      return this.spaces[cid]
    })
    if (childId) {
      // Has existing child.
      const childSpace = this.spaces[childId]
      // Position about the child
      basis = this.backmapper(childId, childSpace, id)
      // If backmapper fails, try reverse mapper.
      if (!basis) {
        const insertionBasis = this.mapper(id, content, childId)
        if (insertionBasis) {
          // Insertion basis is the position of the child w.r.t. the parent.
          // However, the parent does not yet exist in DOM.
          const childBasis = childSpace.getBasis()
          // Therefore compute where would the parent basis be.
          basis = insertionBasis.getMatchedOuter(childBasis)
        }
      }
    }
  }

  if (!basis) {
    // Cannot find basis.
    // DEBUG console.warn('Cannot find position for space ' + id)
    return false
  }

  // Basis found. Add the content.
  this.spaces[id] = content
  if (isChild) {
    this.viewport.addChild(content)
  } else {
    this.viewport.prependChild(content)
  }
  content.setBasis(basis)

  // Register loading state.
  delete this.loading[id]

  // Signal that the node is now open and available.
  this.emit('opened', {
    id: id,
    space: content
  })

  return true
}
